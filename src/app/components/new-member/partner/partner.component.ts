import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/user-interface';  
import { CardInterface } from '../../../models/card-interface';  
import { UserWService } from "../../../services/user-w.service";
import { DataApiService } from '../../../services/data-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  ngFormPartner: FormGroup;
  submitted = false;


partner:boolean=false;
affiliate:boolean=false;
selectorType:boolean=true;  
constructor(public _uw:UserWService, private location: Location, private router: Router,private formBuilder: FormBuilder) { }
  		  
  public user : CardInterface ={
      userd:"",
      phone:""
      //password:""
    };
  public isError = false;
  public isLogged =false;
  




ngOnInit() {

   this.ngFormPartner = this.formBuilder.group({
      phone: ['', [Validators.required,Validators.phone]]
      //password: ['', [Validators.required]]
    });


   // if (this._uw.selectorA===true){
   //  location.reload();
   // }
  }

    get fval() {
  return this.ngFormPartner.controls;
  }

  sendProfile(){
     this.submitted = true;
      if (this.ngFormPartner.invalid) {
      return;
        } 
//      alert('form fields are validated successfully!');
      return this.authService.loginUser(
        this.card.phone
        )
      .subscribe( 
        data => {
              this.authService.setUser(data.user);
              const token = data.id;
              this.authService.setToken(token);
              this._uw.name=data.name;
              this.router.navigate(['/mytixs']);
              this.isError = false;
        },
         error => this.onIsError()
        ); 
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
