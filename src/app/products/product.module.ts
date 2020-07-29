import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { StarComponent } from '../shared/star/star.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './product-details.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SaveEditsGuard } from './save-edits.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './data/product-data';
import { ResolvedProduct } from './dtos/product';
import { ProductResolverService } from './services/product-resolver.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailsComponent,
        resolve: { resolvedData: ProductResolverService },
        canActivate: [ProductDetailsGuard],
      },
      {
        path: 'products/:id/edit',
        resolve: { resolvedData: ProductResolverService },
        component: ProductEditComponent,
        canDeactivate: [SaveEditsGuard],
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}
