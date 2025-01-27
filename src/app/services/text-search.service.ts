import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class TextSearchService {

  private apiUrl = 'http://localhost:8080/product/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Product[]> {
    const params = new HttpParams().set('searchText', query);
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
