import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-list.component.ts.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(private readonly _productService: ProductService) {
  }
  pageTitle: string = "Product List!";
  imageWidth: number = 50;
  imageMargin: number = 2;s;
  errorMessage: string;

  products: IProduct[] = [];
  private _listFilter: string;

  get listFilter() : string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  };

  filteredProducts: IProduct[];

  imageShown: boolean = false;

  private performFilter(filterBy: string) : IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.imageShown = !this.imageShown;
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = products;
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message: string) : void {
    this.pageTitle = `Product List: ${message}`;
  }
}
