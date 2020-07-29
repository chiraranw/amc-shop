import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ResolvedProduct } from '../dtos/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'amc-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Details ';
  product: IProduct;
  errorMessage: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const resolvedData: ResolvedProduct = this.route.snapshot.data[
      'resolvedData'
    ];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  onBack(): void {
    this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
  }
}
