import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductEditInforComponent } from './product-edit-infor/product-edit-infor.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
    ProductEditInforComponent,
    ProductEditTagsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailsComponent,
        resolve: { resolvedData: ProductResolverService },
      },
      {
        path: ':id/edit',
        resolve: { resolvedData: ProductResolverService },
        component: ProductEditComponent,
        children: [
          { path: '', redirectTo: 'infor', pathMatch: 'full' },
          { path: 'infor', component: ProductEditInforComponent },
          { path: 'tags', component: ProductEditTagsComponent },
        ],
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}
