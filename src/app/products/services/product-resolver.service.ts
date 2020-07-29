import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IProduct, ResolvedProduct } from '../dtos/product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<ResolvedProduct> {
  constructor(private productSvc: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolvedProduct> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.log('Error:', message);
      return of({ product: null, error: message });
    }

    return this.productSvc.getProduct(+id).pipe(
      map((p) => ({ product: p })),
      catchError((error) => {
        return of({ product: null, error: `Retrieval error:${error}` });
      })
    );
  }
}
