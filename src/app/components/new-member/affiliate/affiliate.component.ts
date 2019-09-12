import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
//import { UserInterface } from '../../../models/user-interface'; 
import { CardInterface } from '../../../models/card-interface';  
import { UserWService } from '../../../services/user-w.service';
import { DataApiService } from '../../../services/data-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isError } from "util";
import { Location } from '@angular/common';
import { ConfirmEqualValidatorDirective } from '../../../confirm-equal-validator.directive';

import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

declare var NgFormAffiliate:any;
@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {
  
 ngFormAffiliate: FormGroup;
  submitted = false;

  constructor(
  public _uw:UserWService, 
  private dataApiService: DataApiService,
  private authService: AuthService, 
  private location: Location,
  private router: Router,
 // public userInterface: UserInterface,
  private formBuilder: FormBuilder
    ) { }

  public card : CardInterface ={
      userd:"",
      type:"",
      phone:"",
      companyAddress:"",
      country:"",
      city:""
    };

  public isError = false;
  public isLogged =false;
      
ngOnInit() {
   this.ngFormAffiliate = this.formBuilder.group({
      phone: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  get fval() {
  return this.ngFormAffiliate.controls;
  }

  sendProfile(){
     this.submitted = true;
      if (this.ngFormAffiliate.invalid) {
      return;
        } 
     if (this.ngFormAffiliate.value.cardId == null){
      this.ngFormAffiliate.value.userd="a"+this._uw.userd;
      return this.dataApiService.saveCard(this.ngFormAffiliate.value)
        .subscribe(card => this.router.navigate(['/mytixs']));
      } else{
        //UPDATE
        console.log('update card');
      }
  }    
    
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  reset():void{
    this._uw.selectorA=true;
    this.router.navigate(['/new-member']);
  }
}
