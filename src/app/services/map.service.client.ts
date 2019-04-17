import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
  region_name: string,
  country_name: string
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getLocation() {
    //d12fb954d7ca1e3102a00de5145debe4
    return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=d12fb954d7ca1e3102a00de5145debe4')
  }
}
