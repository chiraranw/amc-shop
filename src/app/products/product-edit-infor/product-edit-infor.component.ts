import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../dtos/product';

@Component({
  selector: 'amc-product-edit-infor',
  templateUrl: './product-edit-infor.component.html',
  styleUrls: ['./product-edit-infor.component.css'],
})
export class ProductEditInforComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) productForm: NgForm;

  errorMessage: string;
  product: IProduct;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data) => {
      if (this.productForm) {
        this.productForm.reset();
      }
      this.product = data['resolvedData'].product;
    });
  }
}
