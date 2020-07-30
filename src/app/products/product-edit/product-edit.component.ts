import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct, ResolvedProduct } from '../dtos/product';

@Component({
  selector: 'amc-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  public pageTitle: string = 'Edit Product';
  public errorMessage: string;
  //_product: IProduct;

  /**
   * Helpers for the CanDeactivate Guard
   */
  private currentProduct: IProduct;
  private oldProduct: IProduct;
  get product(): IProduct {
    return this.currentProduct;
  }

  set product(value: IProduct) {
    this.currentProduct = value;
    this.oldProduct = { ...value };
  }

  public get isDirty() {
    return (
      JSON.stringify(this.oldProduct) !== JSON.stringify(this.currentProduct)
    );
  }
  //End Helpers

  private dataIsValid: { [key: string]: boolean } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Loading Data
    this.activatedRoute.data.subscribe((data) => {
      const resolvedData: ResolvedProduct = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.oldProduct = null;
  }

  onProductRetrieved(prdct: IProduct): void {
    this.product = prdct;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.isValid) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      //this.messageService.addMessage(message);
    }
    this.reset();
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }

    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  validate(): void {
    //clear validation obj and start on a new slate
    this.dataIsValid = {};
    //info tab
    if (
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid['infor'] = true;
    } else {
      this.dataIsValid['infor'] = false;
    }

    if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
