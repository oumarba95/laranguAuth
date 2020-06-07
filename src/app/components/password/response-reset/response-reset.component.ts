import { ValidationService } from './../../../services/validation.service';
import { AuthStatusService } from './../../../services/auth-status.service';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  form = {
    password:null,
    password_confirmation:null,
    resetToken:null
  };
  resetDone = false;
  error;
  userName;
  constructor(private route:ActivatedRoute,private auth:AuthService,
    private router:Router,
    private notify:SnotifyService,
    private authSt:AuthStatusService,) { 
    this.route.queryParams.subscribe(params=>

            this.form.resetToken = params['token']
      );
    
  }

  ngOnInit(): void {
    const token = {
      token:this.form.resetToken
    }
    console.log(token);
    this.auth.getToken(token).subscribe(
      (token:any) => this.userName = token[0].name
      )
   }

  onSubmit(){
    this.auth.changePassword(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    )
  }
  handleResponse(data){
    this.resetDone = true;
    this.error = null;
   this.resetForm();
    this.notify.success('Password reset successfully',{timeout:2000});

  }

  handleError(error){
    let loginDiv = document.getElementById('login');
    let alert;
    alert = document.getElementById('alert');
    if(alert){
      loginDiv.removeChild(alert);
      this.createAlert(error);
    }else{
      this.createAlert(error);
    }
 
  }
  createAlert(error){
  this.error = error.error.errors ? error.error.errors.password : error.error.error;
   var newElement = document.createElement('div');
   let loginDiv = document.getElementById('login');
   var textNode = document.createTextNode(this.error);
   let close = document.createElement('a');
   const textClose = document.createTextNode('x');
   close.href = "#";
   close.className ='close';
   close.setAttribute('data-dismiss','alert');
   close.setAttribute('area-label','close');
   close.appendChild(textClose);
   newElement.className = 'alert alert-danger alert-dismissible';
   newElement.id = 'alert';
   newElement.appendChild(close);
   newElement.style.fontSize = '14px';
   
   newElement.appendChild(textNode);
   loginDiv.insertBefore(newElement,loginDiv.firstElementChild.nextElementSibling);
   this.resetForm();
  }
  resetForm(){
    this.form = {
      password:'',
      password_confirmation:'',
      resetToken:this.form.resetToken
    }
  }
}
