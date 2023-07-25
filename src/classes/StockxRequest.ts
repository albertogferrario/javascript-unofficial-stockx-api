// @ts-nocheck

import { IConfig } from "../types/StockxRequest";
import dayjs from "dayjs";
import UserAgent from "user-agents";
import splitproxy from "split-proxy"
import { HttpsProxyAgent } from "https-proxy-agent";
import axios, { Axios } from "axios";
import { StockxClient } from "./StockxClient";

export class StockxRequest extends Axios {
    constructor(public client: StockxClient) {
        super(axios.defaults);

        // rotate proxies at every request
        this.interceptors.request.use(async (axiosConfig) => {
            const config = this._createConfig()

            axiosConfig.headers["user-agent"] = config.userAgent;
            axiosConfig.headers["cookie"] = config.cookie;
            axiosConfig.httpsAgent = config.httpsAgent;

            if (axiosConfig.url === "https://stockx.com/api/p/e") {
                axiosConfig.headers["apollographql-client-version"] = "2023.07.16.00";
                axiosConfig.headers["apollographql-client-name"] = "Iron";
                axiosConfig.headers["app-platform"] = "Iron";
                axiosConfig.headers["app-version"] = "2023.07.16.00";
            }

            axiosConfig.headers["accept-language"] = "en-US";
            axiosConfig.headers["accept"] = "*/*";
            axiosConfig.headers["x-stockx-device-id"] = "fe841f0b-8c64-4deb-b631-c18bbbd24174";
            axiosConfig.headers["x-stockx-session-id"] = "300605a7-889f-4ba8-b9c2-29efea0f6620";

            return axiosConfig;
        });
    };

    private _createCookie(): string {
        const data = {
            __cf_bm: "q3a78mK98D01Jz_0_ay6jWnSBYtZRILizmfYBxXAhTI-1690310934-0-AaxeF1IvkY8PC2epYI5ktO/pxPpFStn88oPeqZbUYHGQCSKeUEh2lxZOkTahU2Fknc7DZJk+sZpKx47SFFx25K4=",
            stockx_device_id: "fe841f0b-8c64-4deb-b631-c18bbbd24174",
            stockx_session_id: "300605a7-889f-4ba8-b9c2-29efea0f6620",
            stockx_session: "81ee1c36-12fd-4d99-9f57-4217ae5e7434",
            stockx_selected_region: this.client.countryCode,
            pxcts: "d7431155-2b0b-11ee-be74-456c48497573",
        }

        let cookie = "";
        for (const key in data) {
            // @ts-ignore
            cookie += `${key}=${data[key]}; `;
        }

        return cookie;
    }

    private _createConfig(): IConfig {
        const proxy = this.client.proxys.shift();
        if (proxy != null) {
            this.client.proxys.push(proxy);
        }

        const splitedProxy = proxy ? splitproxy(proxy) : undefined;

        return <IConfig>{
            httpsAgent: splitedProxy ? new HttpsProxyAgent({
                host: splitedProxy.host,
                port: splitedProxy.port,
                auth: splitedProxy.login && splitedProxy.password ? `${splitedProxy.login}:${splitedProxy.password}` : undefined
            }) : undefined,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            cookie: this.client.cookie ? this.client.cookie : this._createCookie()
        };
    }
}