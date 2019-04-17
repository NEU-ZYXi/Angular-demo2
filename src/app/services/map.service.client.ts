import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Location {
  lat: string;
  lng: string;
  region: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<Location>('https://geo.ipify.org/api/v1?apiKey=at_oVTOjvWzfktZRJDeQsm1wwVWJSOLL&ipAddress=8.8.8.8');
  }
}
