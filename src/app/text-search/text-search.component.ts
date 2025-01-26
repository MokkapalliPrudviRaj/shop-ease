import {Component} from '@angular/core';
import {TextSearchService} from '../services/text-search.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'app-text-search',
  standalone: false,

  templateUrl: './text-search.component.html',
  styleUrl: './text-search.component.css'
})
export class TextSearchComponent {
  query: string = '';
  private searchTerms = new Subject<string>();
  results$ = this.searchTerms.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term) => this.textSearchService.search(term).pipe(
      catchError(error => {
        console.error('Error fetching search results:', error);
        return of([]);
      })
    )),
  );

  constructor(private textSearchService: TextSearchService) {
  }

  onSearch() {
    if (this.query.length > 3) {
      this.searchTerms.next(this.query);
    }
  }
}

