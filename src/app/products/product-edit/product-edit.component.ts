import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, merge, fromEvent, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProduct, ResolvedProduct } from '../dtos/product';
import { NumberValidator } from 'src/app/shared/number-validator';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'amc-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  public productForm: FormGroup;
  public pageTitle: string = 'Edit Product';
  public errorMessage: string;
  product: IProduct;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productSvc: ProductService,
    private router: Router
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', [Validators.required]],
      starRating: ['', [NumberValidator.range(1, 5)]],
      tags: this.formBuilder.array([]),
      description: [],
    });

    //Loading Data
    this.activatedRoute.data.subscribe((data) => {
      const resolvedData: ResolvedProduct = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productSvc.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productSvc.createProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.productSvc.updateProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
