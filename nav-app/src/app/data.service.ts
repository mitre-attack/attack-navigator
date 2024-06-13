import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCompanyData(): Observable<any> {
    return this.http.get('../assets/coverageDCPerCompany.json');
  }
}

export class LayerService {
  constructor(private http: HttpClient) { }

  getLayers(): Observable<any> {
    return this.http.get('/api/layers');
  }
}

