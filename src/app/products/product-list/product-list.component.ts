import { Component, OnInit } from '@angular/core';
import { IProdcut } from '../dtos/product';

@Component({
  selector: 'amc-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public title: string = 'Product List';
  public imageWidth: number = 50;
  public imageMargin: number = 2;
  public showImage: boolean = false;
  private _productFilter: string;
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
  public products: IProdcut[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2019',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
    },
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2019',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
    },
  ];
  constructor() {
    this.productFilter = 'cart';
    this.filteredProducts = this.products;
  }

  ngOnInit(): void {}

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
}
