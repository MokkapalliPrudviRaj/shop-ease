import { Component } from '@angular/core';
import { Product } from './models/Product';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Product Search App';
  products: Product[] = [];
  brands: Set<any> = new Set();
  selectedBrands: Set<any> = new Set();
  filteredProducts: Product[] = [];
  selectedProduct: any = null;
  showproductDetails: boolean = false;

  constructor(private router: Router) {}


  showProductDetails(product: any) {
    this.selectedProduct = product;
    this.showproductDetails= true;
    // this.router.navigate(['/product', product.id]);
  }



  closeDetails() {
    this.selectedProduct = null;
  }


  ratingSort(isAscending: boolean) {
    if (isAscending) {
      this.filteredProducts.sort((a, b) => a.rating - b.rating);
      return;
    }
    this.filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  onCheckboxChange(event: Event, brand: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedBrands.add(brand);
      this.filteredProducts = this.products.filter(product => this.selectedBrands.has(product.brand));
      return;
    }

    this.selectedBrands.delete(brand);
    if (this.selectedBrands.size === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => this.selectedBrands.has(product?.brand));
    }
  }

  onProductsChange(products: any[]): void {
    this.products = products;
    this.filteredProducts = products;
    this.brands = new Set(products.map(a => a.brand));
  }
}

