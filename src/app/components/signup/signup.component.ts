import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../../confirm-equal-validator.directive';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
  export class SignupComponent implements OnInit {

  ngFormSignup: FormGroup;
  submitted = false;

  constructor(public _uw:UserWService,private formBuilder: FormBuilder,private authService: AuthService, private router: Router,private location:Location) { }
  public user : UserInterface ={
  	name:"",
  	email:"",
  	password:""
  };

  public isError = false;
  public isLogged =false;

  ngOnInit() {
    this.ngFormSignup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
    this.onCheckUser()
  }
  
  onRegister(): void{
     this.submitted = true;
     if (this.ngFormSignup.invalid) {
          return;
            }    	
        this.authService.registerUser(
    		this.user.name, 
    		this.user.email, 
    		this.user.password
    		)
    	.subscribe(user => {
        // console.log(user);	
        this.authService.setUser(user);
        const token  = user.id;
        this.authService.setToken(token);
        this.router.navigate(['/mytixs']);
        this._uw.name= user.name;
      });
  }

  get fval() {
  return this.ngFormSignup.controls;
  }
     
  onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
      this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this.isLogged = true;
            this._uw.isLogged=true;
      this.router.navigate(['/mytixs']);
    }
  }
}
