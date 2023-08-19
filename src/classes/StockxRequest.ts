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

            axiosConfig.headers["accept-language"] = this.client.languageCode.toLowerCase();
            axiosConfig.headers["accept"] = "application/json";
            axiosConfig.headers["x-stockx-device-id"] = "fe841f0b-8c64-4deb-b631-c18bbbd24174";
            axiosConfig.headers["x-stockx-session-id"] = "300605a7-889f-4ba8-b9c2-29efea0f6620";


            return axiosConfig;
        });
    };

    private _createCookie(): string {
        const data = {

            stockx_device_id: "fe841f0b-8c64-4deb-b631-c18bbbd24174",
            language_code: this.client.languageCode.toLowerCase(),
            stockx_selected_region: this.client.countryCode,
            stockx_session: "81ee1c36-12fd-4d99-9f57-4217ae5e7434",
            stockx_homepage: "sneakers",
            stockx_preferred_market_activity: "sales",
            stockx_dismiss_modal: true,
            IR_gbd: "stockx.com",
            cookie_policy_accepted: true,
            stockx_product_visits: Math.floor(Math.random() * 10),
            stockx_default_sneakers_size: "All",
            IR_PI: "f6f37f50-2b13-11ee-9cbe-5fa66b8f373d%7C1690394310588",
            forterToken: "86ce8bad5fe4463d9f3334f8ac047de2_1690307908285__UDF43-mnf-a4_13ck",
            __pdst: "b8a0d70a9f544e778159034c2a42c32d",
            ajs_anonymous_id: "11dd6f04-c534-4de8-8b11-e22d7bef632f",
            _ga_TYYSNQDG4W: "GS1.1.1690307525.1.1.1690309221.0.0.0",
            _pin_unauth: "dWlkPVl6Z3laREU1TkRZdFpUUXpZeTAwTm1WaUxUazRPRGd0WkRCaU56QXhOVEZtTXpBMA",
            rbuid: "rbos-cf69f30d-02a3-4654-b32c-6a62e4eb3fc7",
            _uetsid: "f90e95702b1311ee82c5891a49a6e65c",
            _uetvid: "f90ea9d02b1311ee91aa17e691c7cef9",
            _pxvid: "d7430512-2b0b-11ee-be74-0d0cca4dee76",
            pxcts: "d7431155-2b0b-11ee-be74-456c48497573",
            OptanonConsent: new URLSearchParams([
                ["isGpcEnabled", "0"],
                ["datestamp", dayjs().format("ddd+MMM+DD+YYYY+HH%3Amm%3Ass+Z")],
                ["version", "202211.2.0"],
                ["isIABGlobal", "false"],
                ["hosts", ""],
                ["consentId", "8697caa0-9560-4311-a979-5bbb0cd04da2"],
                ["interactionCount", "2"],
                ["landingPath", "NotLandingPage"],
                ["groups", encodeURIComponent("C0001:1,C0002:1,C0005:1,C0004:1,C0003:1")],
            ]).toString(),
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
            userAgent: new UserAgent().toString(),
            cookie: this.client.cookie ? this.client.cookie : this._createCookie()
        };
    }
}