import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonacionesService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  verDonaciones(): Observable<any> {
    return this.http.get<any>(this.url + 'donaciones');
  }
}
