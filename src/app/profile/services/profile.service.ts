import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentType } from 'src/app/interfaces/document-type.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { RoutesApi } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _apiBase: string = `${environment.api}/${RoutesApi.public}`;

  constructor(private _http: HttpClient) {}

  getUser(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiBase}/user/${userId}`);
  }

  getProduct(productId: IProduct): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._apiBase}/product/${productId}`);
  }

  getDocumentTypes(): Observable<IDocumentType[]> {
    return this._http.get<IDocumentType[]>(`${this._apiBase}/document-type`);
  }

  updateUser(user: any, userId: string): Observable<IUser> {
    console.log({ userDTO: user });
    return this._http.put<IUser>(`${this._apiBase}/user/${userId}`, user);
    // return this._http.put<IUser>(
    //   `${this._apiBase}/user/62d09b99cb528a467208082a`,
    //   user
    // );
  }
}
