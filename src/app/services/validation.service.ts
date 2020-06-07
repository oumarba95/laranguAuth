import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  userEmails =[];

  constructor(private http:HttpClient,private auth:AuthService) {
    this.getUserEmail();
  
    this.auth.userSubjectObservable.subscribe((
         () => this.getUserEmail()
    ));
   }
  passwordValidation(password,successMessage){
    if (password==''){
      return false;
    }
    const passwordLen = password.length ;
    if( passwordLen >= 15){
      successMessage.success_15 = true;
    }else if (passwordLen >=8){
        successMessage.success_8 = true;
        if(this.verifyOneUpper(password)) successMessage.success_upper = true;
        if(this.verifyOneLower(password)) successMessage.success_lower = true;
        if(this.verifyOneNumber(password)) successMessage.success_number = true;
    }else{
      if(this.verifyOneUpper(password)) successMessage.success_upper = true;
      if(this.verifyOneLower(password)) successMessage.success_lower = true;
      if(this.verifyOneNumber(password)) successMessage.success_number = true;
    }
  }
  getUserEmail(){
    return this.http.get(this.auth.baseUrl+'/getUserEmail').subscribe(
      (data:[]) =>{
        this.userEmails = data;
      } 
    );
  }
  emailValidation(emailSaisi,successMessages,errors){
    if (emailSaisi == ''){
      successMessages.success_email = null;
      return false;
    }
    errors.email = null;
    successMessages.success_email = null;
     if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-_]+\.[a-z]{1,}$/.test(emailSaisi)){
         const existEmail = this.userEmails.filter(
           (userEmails:any) => {
             return userEmails === emailSaisi;
           }
           )
         if (existEmail.length >0){
          errors.email = 'Email already taken.'
         }else{
           successMessages.success_email = true;
         }
     }else{
       errors.email = 'Email format invalid.';
     }
  }
  verifyOneUpper(password){
    if(/^(?=.*[A-Z])[a-zA-Z0-9]{1,14}$/.test(password))  return true;
  }
  verifyOneLower(password){
    if(/^(?=.*[a-z])[a-zA-Z0-9]{1,14}$/.test(password))  return true;
  }
  verifyOneNumber(password){
    if(/^(?=.*[0-9])[a-zA-Z0-9]{1,14}$/.test(password))  return true;
  }
}
