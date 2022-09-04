import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // private url: string = 'http://localhost:3000/api/v1/user';
  // constructor(private _http: HttpClient) {}
  // async get(): Promise<any> {
  //   // return this._http.get(this.url);
  //   let comodin: any;
  //   console.log({ comodin: comodin });
  //   await this._http.get(this.url).subscribe((data) => {
  //     // console.log('hola');
  //     console.log('data: ', data);
  //   });
  //   // console.log({ comodin: comodin });
  // }
}
