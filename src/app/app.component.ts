import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private _appSvc: AppService) {}

  ngOnInit(): void {
    // this._appSvc.get();
  }
}
