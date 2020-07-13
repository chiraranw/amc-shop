import { Component, OnInit } from '@angular/core';
import { IProduct } from '../dtos/product';
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

  public filteredProducts: IProduct[];
  public products: IProduct[] = [];

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

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked(message: string): void {
    this.title = message;
  }
}
