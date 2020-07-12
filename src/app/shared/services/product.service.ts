import { Injectable } from '@angular/core';
import { IProdcut } from 'src/app/products/dtos/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = '/assets/api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProdcut[]> {
    return this.http.get<IProdcut[]>(this.baseUrl).pipe(
      tap((data) => console.log('All :', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('Error :', err);
    return throwError(err);
  }
}
