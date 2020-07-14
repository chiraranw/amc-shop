import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { StarComponent } from '../shared/star/star.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './product-details.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    StarComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailsComponent,
        canActivate: [ProductDetailsGuard],
      },
    ]),
  ],
})
export class ProductModule {}
