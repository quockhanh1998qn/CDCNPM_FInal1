import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ApiService{
    constructor(
        private httpClient: HttpClient,
    ) { }

    get(url: string, header?) {
        return this.httpClient.get(url, header);
    }

    post(url: string, data?) {
        return this.httpClient.post(url, data);
    }

    put(url: string, data) {
        return this.httpClient.put(url, data);
    }

    delete(url: string, data) {
        return this.httpClient.delete(url,data);
    }

}
