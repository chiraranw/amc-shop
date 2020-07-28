import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IProduct } from '../dtos/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeIProduct());
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      tap((data) => console.log('getIProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  createProduct(IProduct: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    IProduct.id = null;
    return this.http
      .post<IProduct>(this.baseUrl, IProduct, { headers })
      .pipe(
        tap((data) => console.log('createIProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete<IProduct>(url, { headers })
      .pipe(
        tap((data) => console.log('deleteIProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(IProduct: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${IProduct.id}`;
    return this.http
      .put<IProduct>(url, IProduct, { headers })
      .pipe(
        tap(() => console.log('updateIProduct: ' + IProduct.id)),
        // Return the IProduct on an update
        map(() => IProduct),
        catchError(this.handleError)
      );
  }

  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeIProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null,
    };
  }
}
