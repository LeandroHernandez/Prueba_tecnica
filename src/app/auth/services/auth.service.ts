import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentType } from 'src/app/interfaces/document-type.interface';
import { IGender } from 'src/app/interfaces/gender.interface';
import { IToken } from 'src/app/interfaces/token.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { RoutesApi } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  private _apiBase: string = `${environment.api}/${RoutesApi.public}`;

  signIn(sigInDTO: any): Observable<IToken> {
    // signIn(sigInDTO: any): Observable<any> {
    return this._http.post<IToken>(`${this._apiBase}/auth/signIn`, sigInDTO);
  }

  registerUser(user: any): Observable<IUser> {
    // console.log({ userDTO: user });
    return this._http.post<IUser>(`${this._apiBase}/user`, user);
  }

  getDocumentTypes(): Observable<IDocumentType[]> {
    return this._http.get<IDocumentType[]>(`${this._apiBase}/document-type`);
  }

  getGenders(): Observable<IGender[]> {
    return this._http.get<IGender[]>(`${this._apiBase}/gender`);
  }
}
