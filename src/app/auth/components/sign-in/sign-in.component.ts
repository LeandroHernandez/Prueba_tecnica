import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  credentialForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private _authSvc: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
  }

  sigIn(): void {
    if (this.credentialForm.valid) {
      this._authSvc.signIn(this.credentialForm.value).subscribe(
        (data) => {
          // console.log({ token: data });
          // console.log(data);
          // console.log(data.access_token);
          localStorage.setItem('token', JSON.stringify(data.access_token));
          localStorage.setItem('userId', JSON.stringify(data.userId));
          this._router.navigate(['home']);
        },
        (err) => {
          alert('credenciales invalidas');
          console.log({ error: err });
        }
      );
    } else {
      alert('credenciales invalidas');
    }
  }
}
