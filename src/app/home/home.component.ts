import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { IPurchase } from '../interfaces/purchase.interface';
import { IUser } from '../interfaces/user.interface';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // public products: IProduct[] = [];
  public products: IProduct[] = [];
  public pur: IPurchase[] = [];
  public purchases: IPurchase[] = [];
  public total: number = 0;
  // public userId: string = '62d09b99cb528a467208082a';

  constructor(private _homeSvc: HomeService) {}

  ngOnInit(): void {
    this.getProducts();
    // localStorage.removeItem('purchases');
  }

  getProducts() {
    return this._homeSvc.getProducts().subscribe((data) => {
      this.products = data;

      //
      const pur = localStorage.getItem('purchases');
      if (pur) {
        this.purchases = JSON.parse(pur);
      }
      this.products.forEach((product, i) => {
        this.pur[i] = {
          amount: 0,
          selectedProduct: product,
          total: product.price,
        };
      });
      this.total = 0;
      this.purchases.forEach((purchase) => {
        this.pur.forEach((p, y) => {
          if (p.selectedProduct.name === purchase.selectedProduct.name) {
            this.pur[y] = purchase;
          }
        });
        this.total = this.total + purchase.total;
      });
    });
  }

  // less(product: IProduct) {
  //   // if (this.cant > 0) {
  //   //   this.cant = this.cant - 1;
  //   // }
  //   if (product.amount > 0) {
  //     product.amount = product.amount - 1;
  //   }
  //   if (product.amount === 0 && this.purchases.length > 0) {
  //     this.purchases = this.purchases.filter((p) => p != product);
  //   }
  // }

  less(purchase: IPurchase) {
    if (purchase.amount > 0) {
      purchase.amount = purchase.amount - 1;
      if (purchase.total) {
        purchase.total = purchase.selectedProduct.price * purchase.amount;
      } else {
        purchase.total = purchase.selectedProduct.price;
      }
    }
    if (purchase.amount === 0) {
      this.purchases = this.purchases.filter((p) => p != purchase);
    }
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  // plus(product: IProduct) {
  //   // this.cant = this.cant + 1;
  //   if (!product.amount) {
  //     product.amount = 1;
  //   } else {
  //     product.amount = product.amount + 1;
  //   }
  // }

  plus(purchase: IPurchase) {
    purchase.amount = purchase.amount + 1;
    if (purchase.total) {
      purchase.total = purchase.selectedProduct.price * purchase.amount;
    } else {
      purchase.total = purchase.selectedProduct.price;
    }
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  // addProductToPurchase(product: IProduct) {
  //   this.purchases.push(product);
  // }

  addPurToPurchase(purchase: IPurchase) {
    const condition = this.purchases.find((pur) => pur === purchase);
    if (!condition) {
      this.purchases.push(purchase);
    }
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  addPursToPurchases(): void {
    this.purchases = [];
    this.total = 0;
    this.pur.forEach((pur) => {
      if (pur.amount > 0) {
        this.purchases.push(pur);
        this.total = this.total + pur.total;
      }
    });
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  removePurchase(purchase: IPurchase): void {
    this.purchases = this.purchases.filter((p) => p !== purchase);
    this.total = 0;
    this.purchases.forEach((purchase) => {
      if (purchase.amount > 0) {
        this.total = this.total + purchase.total;
      }
    });
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  // makeAnOrder(userId: string) {
  async makeAnOrder() {
    const purLocal = localStorage.getItem('purchases');
    const userId = localStorage.getItem('userId');
    if (purLocal && userId) {
      const purLocalParse = JSON.parse(purLocal);
      const userIdParse = JSON.parse(userId);
      if (purLocalParse.length > 0) {
        this._homeSvc.makeAnOrder(purLocalParse, userIdParse);
        this.purchases = [];
        this.total = 0;
      }
    }
  }
}
