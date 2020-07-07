import { EventEmitter, Injectable } from "@angular/core";
import {IProduct} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError, filter, first, mergeAll, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  getProduct(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      mergeAll(),
      filter(p => p.productId == id)
    );
  }
  private productUrl = 'api/products/products.json';
  private products : IProduct[];
  private getProductsTask : Observable<IProduct[]>;

  constructor(private readonly http : HttpClient) {
  }

  getProducts() : Observable<IProduct[]> {
    if (this.products) {
      return new Observable<IProduct[]>(sub => sub.next(this.products));
    }

    if (this.getProductsTask) {
      return this.getProductsTask;
    }

    this.getProductsTask = this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log(`All : ${JSON.stringify(data)}`)),
      tap(products => this.products = products),
      catchError(handleError)
    );

    return this.getProductsTask;

    function handleError(err : HttpErrorResponse) : Observable<never>{
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }
}
