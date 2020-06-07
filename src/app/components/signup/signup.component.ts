import { ValidationService } from './../../services/validation.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = {
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  };
  errors = {
    email:null,
    password:null
  };
  successMessages = {
    success_email:null,
    success_15:null,
    success_8:null,
    success_upper:null,
    success_lower:null,
    success_number:null
  };
  color = '';
  onKeyUpEmail = false;
  onKeyUpPassword = false;
  signupDone = false;
  constructor(private http:HttpClient,private authService:AuthService,private validation:ValidationService) { }

  ngOnInit(): void {
  }
  onSubmit(form){
    this.authService.signup(this.form).subscribe(
      (data)=> {
        this.initError();
        this.initSuccessMessagesall();
        form.reset();
        this.onKeyUpEmail = false;
        this.onKeyUpPassword = false;
        this.signupDone = true;
        console.log(data);
       },
      (error)=>{
        this.handleError(error);
      }
    );
  }
  handleError(error){
    this.errors = error.error.errors;
  }
  onEmailChange(){
    this.onKeyUpEmail = true;
    this.validation.emailValidation(this.form.email,this.successMessages,this.errors);
  
  }
  onPasswordChange(){
    this.onKeyUpPassword = true;
    this.color= 'red';
    this.errors.password = null;
    this.InitSuccessMessageUnlessEmail();
    this.validation.passwordValidation(this.form.password,this.successMessages);
    if(this.successMessages.success_15 ===true || this.successLUN()===true) this.color = '';


  } 
  InitSuccessMessageUnlessEmail() {
    this.successMessages = {
      success_email:this.successMessages.success_email,
      success_15:null,
      success_8:null,
      success_upper:null,
      success_lower:null,
      success_number:null
    }
  }
  initSuccessMessagesall() {
    this.successMessages = {
      success_email:null,
      success_15:null,
      success_8:null,
      success_upper:null,
      success_lower:null,
      success_number:null
    }
  }
  initError(){
    this.errors = {
      email:null,
      password:null
    };
  }
  successLUN(){
    if (this.successMessages.success_8 === true 
      && this.successMessages.success_upper === true 
      && this.successMessages.success_lower === true
      && this.successMessages.success_number === true)
       return true;
  }
}
