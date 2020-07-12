import { Component, OnInit } from '@angular/core';
import { IProdcut } from '../dtos/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'amc-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public title: string;
  public imageWidth: number = 50;
  public imageMargin: number = 2;
  public showImage: boolean = false;
  private _productFilter: string;
  error: any;
  public get productFilter(): string {
    return this._productFilter;
  }
  public set productFilter(value: string) {
    this._productFilter = value;
    this.filteredProducts = this.products
      ? this.performFilter(this.productFilter)
      : this.products;
  }

  public filteredProducts: IProdcut[];
  public products: IProdcut[] = [];

  constructor(private productSvc: ProductService) {}

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.error = err),
    });
  }

  public toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProdcut[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(
      (product: IProdcut) =>
        product.productName.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked(message: string): void {
    this.title = message;
  }
}
