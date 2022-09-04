import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';
import { IPurchase } from 'src/app/interfaces/purchase.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { RoutesApi } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // public products: any;
  private _apiBase: string = `${environment.api}/${RoutesApi.public}`;
  public user: IUser | null = null;

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this._apiBase}/product`);
  }

  getUser(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiBase}/user/${userId}`);
  }

  makeAnOrder(purchases: IPurchase[], userId: string) {
    purchases.forEach((pur, i) => {
      const purchaseDTO = {
        selectedProductId: pur.selectedProduct._id,
        amount: pur.amount,
        total: pur.total,
      };
      this._http
        .post<IPurchase>(`${this._apiBase}/purchase`, purchaseDTO)
        .subscribe((purDB) => {
          this._http
            .get<IUser>(
              `${this._apiBase}/user/assingPurchaseToClient/userId/${userId}/purchaseId/${purDB._id}`
            )
            .subscribe((userDB) => {
              if (purchases.length === i + 1) {
                localStorage.setItem('user', JSON.stringify(userDB));
              }
              // console.log({ userDB: userDB });
            });
        });
    });
    localStorage.removeItem('purchases');
    // this.getUser(userId).subscribe((userDB) => {
    //   console.log({ user: userDB });
    // });
  }

  // makeAnOrder(purchases: IPurchase[], userId: string) {
  // makeAnOrder(purchase: any, userId: string) {
  //   // class purchaseDTO {
  //   //   selectedProductId = '62d5a47ff87df7b98f889e78';
  //   //   amount = 5;
  //   // }
  //   console.log({ purchase: purchase });
  //   this._http
  //     .post<any>(`${this._apiBase}/purchase`, purchase)
  //     .subscribe((purchaseDB) => {
  //       console.log({ purchaseDB: purchaseDB });
  //     });
  // }
}
