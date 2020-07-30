import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Injectable({
  providedIn: 'root',
})
export class SaveEditsGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(
    component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentSate: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (component.isDirty) {
      const prodName = component.product.productName || 'New Product';
      return confirm(`Are you sure you don't want to save ${prodName}`);
    }
    return true;
  }
}
