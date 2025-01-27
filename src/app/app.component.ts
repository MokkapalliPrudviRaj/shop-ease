import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Product Search App';
  products: any[] = []; // Holds the search results

  // Updates products when emitted from TextSearchComponent
  onProductsChange(products: any[]): void {
    this.products = products;
  }
}
