import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/products/dtos/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = '/assets/api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      tap((data) => console.log('All :', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map((products: IProduct[]) => products.find((p) => p.productId === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('Error :', err);
    return throwError(err);
  }
}
