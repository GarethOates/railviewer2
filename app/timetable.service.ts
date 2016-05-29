import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxJS/Rx'
import 'rxjs/add/operator/map'

@Injectable()
export class TimetableService {
    
    url: string = "http://nationalrail.azurewebsites.net/";
    
    constructor(private _http: Http) { }
    
    getDepartures(city: string) {
        return this._http.get(this.url + "/departures/" + city).map(response => response.json());   
    }
    
    getArrivals(city: string) {
        return this._http.get(this.url + "/arrivals/" + city).map(response => response.json());   
    }
    
}