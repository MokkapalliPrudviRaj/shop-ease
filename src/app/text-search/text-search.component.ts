import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { TextSearchService } from '../services/text-search.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-text-search',
  standalone: false,
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit, OnDestroy {
  query: string = '';
  @Output() productsChange = new EventEmitter<any[]>(); // EventEmitter to send products array to the parent
  private searchTerms = new Subject<string>(); // Subject to capture search terms
  private subscription: Subscription = new Subscription(); // Subscription to manage observable cleanup

  constructor(private textSearchService: TextSearchService) {}

  products$ = this.searchTerms.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term) =>
      this.textSearchService.search(term).pipe(
        catchError((error) => {
          console.error('Error fetching search results:', error);
          return of([]); // Return empty array on error
        })
      )
    )
  );

  ngOnInit(): void {
    // Subscribe to products$ and emit results to the parent
    this.subscription = this.products$.subscribe((products) => {
      this.productsChange.emit(products); // Emit the latest products array
    });
  }

  ngOnDestroy(): void {
    // Cleanup subscriptions
    this.subscription.unsubscribe();
  }

  onSearch(): void {
    if (this.query.length > 3) {
      this.searchTerms.next(this.query); // Push the query to the Subject
    }
  }

  clearSearch(): void {
    this.query = ''; // Clear the search query
    this.productsChange.emit([]); // Emit an empty array to clear results
    this.searchTerms.next(''); // Reset the search terms to ensure further searches work
  }
  
}

