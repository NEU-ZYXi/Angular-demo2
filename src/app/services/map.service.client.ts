import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Location {
  location: {
    lat: string;
    lng: string;
    region: string;
    country: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  ip;

  constructor(private http: HttpClient) {
    this.http.get<{ip:string}>('https://jsonip.com')
        .subscribe( data => {
          // console.log('th data', data);
          this.ip = data
        });
  }

  getLocation() {
    return this.http.get<Location>('https://geo.ipify.org/api/v1?apiKey=at_oVTOjvWzfktZRJDeQsm1wwVWJSOLL&ipAddress=' + this.ip);
  }
}
