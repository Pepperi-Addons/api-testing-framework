import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import { PepAddonService, PepHttpService, PepDataConvertorService, PepSessionService } from '@pepperi-addons/ngx-lib';

import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';

@Injectable({ providedIn: 'root' })
export class ApiTesterService {

    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    pluginUUID;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.pluginUUID,
            suppressLogging: true
        })
    }

    constructor(
        public addonService: PepAddonService
        , public session: PepSessionService
        , public httpService: PepHttpService
        , public pepperiDataConverter: PepDataConvertorService
        , public dialogService: PepDialogService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }

    getAddonApiBaseURL(): string {
        // const dev = (this.userService.getAddonStaticFolder() as string).indexOf('localhost') > -1;
        const dev = false;
        return dev ? "http://localhost:4400" : `${this.papiBaseURL}/addons/api/async/d9999883-ef9a-4295-99db-2f1d3fc34af6`;//async added
    }

    // getAddonStaticFolderURL(): string {
    //     return this.httpService.getAddonStaticFolder();
    // }

    getApiEndpoint(url, sync?) {
        if (sync) {
            return this.httpService.getHttpCall(this.getAddonApiBaseURL().replace("/async/", "/") + url);
        } else {
            return this.httpService.getHttpCall(this.getAddonApiBaseURL() + url);
        }
    }

    get(url) {
        return this.httpService.getHttpCall(this.papiBaseURL + url);
    }

    getTestsList() {
        return "all, sanity, test_data, file_storage, data_views, data_views_positive, data_views_negative, fields, sync, sync_big_data, sync_clean, objects, audit_logs";
    }
}
