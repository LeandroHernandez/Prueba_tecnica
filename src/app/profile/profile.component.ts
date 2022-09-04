import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDocumentType } from '../interfaces/document-type.interface';
import { IUser } from '../interfaces/user.interface';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // public users: IUser[] = [];
  public user: IUser | null = null;
  public documentTypes: IDocumentType[] | null = null;
  public conditionShopping: boolean = false;

  // userDataForm: FormGroup = new FormGroup({
  //   documentType: new FormControl(),
  //   documentNumber: new FormControl(),
  // });

  userDataForm: FormGroup = this._fb.group({
    documentType: ['', [Validators.required]],
    documentNumber: [0, [Validators.required]],
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
  });

  constructor(private _profileSvc: ProfileService, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUser();
    this.getDocumentTypes();
  }

  getUser(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const userIdParse = JSON.parse(userId);
      this._profileSvc.getUser(userIdParse).subscribe((data) => {
        this.user = data;
        this.loadFom(data);
        this.user.shopping?.forEach((pur) => {
          this._profileSvc
            .getProduct(pur.selectedProduct)
            .subscribe((product) => {
              this.conditionShopping = true;
              pur.selectedProduct = product;
            });
        });
      });
    }
  }

  getDocumentTypes(): void {
    this._profileSvc.getDocumentTypes().subscribe((data) => {
      this.documentTypes = data;
    });
  }

  loadFom(user: IUser): void {
    this.userDataForm.patchValue({
      documentType: user.documentType?.name,
      documentNumber: user.documentNumber,
      names: user.names,
      surnames: user.surnames,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      community: user.community,
      country: user.country,
      city: user.city,
      division: user.division,
      companyWhereWork: user.companyWhereWork,
      position: user.position,
    });
  }

  submit(): void {
    console.log({ user: this.user });
    if (this.userDataForm.valid) {
      const userDTO = {
        documentTypeId: this.user?.documentType?._id,
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
        genderId: this.user?.gender?._id,
        username: this.user?.username,
        password: this.user?.password,
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
      if (this.user?._id) {
        this._profileSvc
          .updateUser(userDTO, this.user?._id)
          .subscribe((user) => {
            this.user = user;

            this.loadFom(this.user);
          });
      }
    }
  }

  SignOff(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
