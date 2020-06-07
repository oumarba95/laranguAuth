import { Router } from '@angular/router';
import { SnotifyModule, SnotifyService } from 'ng-snotify';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  form = {
    email:null
  };
  error;
  sendDone = false;
  constructor(private auth:AuthService,private notify:SnotifyService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    
    this.auth.sendResetPasswordLink(this.form).subscribe(
      (data) => {
        this.handleResponse(data);
        this.error = null;
      },
      (error)=> {
        this.handleError(error);
      }
    )
  }
  handleResponse(res){
    console.log(res);
    this.sendDone = true;
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
   this.form.email = ''
  }
}
