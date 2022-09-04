import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDocumentType } from 'src/app/interfaces/document-type.interface';
import { IGender } from 'src/app/interfaces/gender.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public documentTypes: IDocumentType[] | null = null;
  public genders: IGender[] | null = null;

  userDataForm: FormGroup = this._fb.group({
    documentType: ['Cedula de diudadania', [Validators.required]],
    documentNumber: [, [Validators.required]],
    names: ['', [Validators.required, Validators.min(3)]],
    surnames: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    community: ['', [Validators.required]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    division: ['', [Validators.required]],
    companyWhereWork: [''],
    position: [''],
    gender: ['Cedula de diudadania', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _authSvc: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getGenders();
  }

  getDocumentTypes(): void {
    this._authSvc.getDocumentTypes().subscribe((data) => {
      this.documentTypes = data;
    });
  }

  getGenders(): void {
    this._authSvc.getGenders().subscribe((data) => {
      this.genders = data;
    });
  }

  submit(): void {
    // console.log(this.userDataForm.value);
    // console.log(this.userDataForm.valid);
    if (this.userDataForm.valid) {
      const userDTO = {
        documentTypeId: '',
        documentNumber: this.userDataForm.value.documentNumber,
        names: this.userDataForm.value.names,
        surnames: this.userDataForm.value.surnames,
        email: this.userDataForm.value.email,
        phoneNumber: this.userDataForm.value.phoneNumber,
        address: this.userDataForm.value.address,
        community: this.userDataForm.value.community,
        country: this.userDataForm.value.country,
        city: this.userDataForm.value.city,
        division: this.userDataForm.value.division,
        companyWhereWork: this.userDataForm.value.country,
        position: this.userDataForm.value.position,
        genderId: '',
        username: this.userDataForm.value.username,
        password: this.userDataForm.value.password,
      };
      if (this.userDataForm.controls?.['documentNumber'].pristine === false) {
        userDTO.documentNumber = JSON.stringify(
          this.userDataForm.value.documentNumber
        );
      }
      if (this.userDataForm.controls?.['phoneNumber'].pristine === false) {
        userDTO.phoneNumber = JSON.stringify(
          this.userDataForm.value.phoneNumber
        );
      }
      this.documentTypes?.forEach((documentType) => {
        if (documentType.name === this.userDataForm.value.documentType) {
          if (documentType._id) {
            userDTO.documentTypeId = documentType._id;
          }
        }
      });
      this.genders?.forEach((gender) => {
        if (gender.name === this.userDataForm.value.gender) {
          if (gender._id) {
            userDTO.genderId = gender._id;
          }
        }
      });
      this._authSvc.registerUser(userDTO).subscribe(
        (user) => {
          // console.log({ us: user });
          this._router.navigate(['auth']);
        },
        (error) => {
          console.log(error);
          if ((error.statusText = 'Bad Request')) {
            alert(' Valores invalidos ');
          }
        }
      );
    } else {
      alert('Valores invalidos');
    }
  }
}
