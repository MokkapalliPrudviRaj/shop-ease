import { Component } from '@angular/core';
import { TextSearchService } from '../services/text-search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchResult } from '../models/SerachResult';

@Component({
  selector: 'app-text-search',
  standalone: false,
  
  templateUrl: './text-search.component.html',
  styleUrl: './text-search.component.css'
})
export class TextSearchComponent {
  query: string = '';
  results: SearchResult[] = [];
  private searchTerms = new Subject<string>(); // Subject to handle input changes

  constructor(private textSearchService: TextSearchService) {
    // Listen to search term changes and fetch data
    this.searchTerms.pipe(
      debounceTime(500), // Wait for 500ms after the user stops typing
      distinctUntilChanged(), // Only trigger when the search term actually changes
      switchMap((term) => {
        return this.textSearchService.search(term); // Call the service to fetch data
      })
    ).subscribe(
      (data) => {
        this.results = data; // Store the results in the component
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
  }

  // This method gets called on every input change
  onSearch() {
    if (this.query.length > 3) {
      this.searchTerms.next(this.query); // Push the query to the subject
    }
  }
}

