import { AuthStatusService } from './../../services/auth-status.service';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    email:null,
    password:null
  };
  error:null;
  constructor(private authStatus :AuthStatusService,private router:Router,
    private http:HttpClient,
    private authService:AuthService
    ,private token:TokenService,
     private auth:AuthService
    ) { }

  ngOnInit(): void {
  }
 onSubmit(){
   
   this.authService.login(this.form).subscribe(
     (data)=> {
       this.handleResponse(data);
      },
     (error)=>{
       this.handleError(error);
     }
   );
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
  this.error = error.error.error;
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
  this.form = {
     email:null,
     password:null
  };
 }
 handleResponse(data){
   this.token.handle(data.access_token);
   this.authStatus.changeAuthStatus(true);
   this.router.navigateByUrl('');
 }
}
