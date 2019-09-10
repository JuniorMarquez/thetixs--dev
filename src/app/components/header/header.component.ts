import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserWService } from "../../services/user-w.service";
import { isError } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../../confirm-equal-validator.directive';

declare var NgForm:any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

ngFormSignup: FormGroup;

submitted = false;



  constructor(private router: Router, private formBuilder: FormBuilder, public _uw:UserWService, private authService: AuthService,private location: Location) { }
//user: UserInterface;
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
      this.user = this.authService.getCurrentUser();
      this.onCheckUser();
      this.router.navigate(['/coming']);
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

  onLogout():void{
    this.authService.logoutUser();
    location.reload();
  }
    onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
      this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this._uw.name=this.user.name;
    //this._uw.email=this.user.email;
      this.isLogged = true;
      this._uw.isLogged=true;
    }
  }

}
