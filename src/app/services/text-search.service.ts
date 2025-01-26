import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/SerachResult';

@Injectable({
  providedIn: 'root'
})
export class TextSearchService {

  private apiUrl = 'http://localhost:8080/product/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<SearchResult[]>(this.apiUrl, { params });
  }
}
