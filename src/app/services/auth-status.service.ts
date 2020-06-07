import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ParseSpan } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  userSubject = new Subject<string>();
  userObs = this.userSubject.asObservable();
  constructor(private token:TokenService,private authService:AuthService,private http: HttpClient,private router:Router) {
              this.authService.loginObs.subscribe(
                () =>  this.getUserName() 
              )
  }
  getUserName(){
     this.http.get(`${this.authService.baseUrl}/me?token=${this.token.get()}`).subscribe(
       
      (data:any) =>{ 
      this.userSubject.next(data.name);
    },
    (error) => console.log(error),
  )
  }
  logout(){
    this.changeAuthStatus(false);
    this.token.remove();
    this.router.navigate(['']);
  }
  getUserPasswordReset(token){
    return this.http.post(`${this.authService.baseUrl}/resetUser`,token);
  }
  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }
}
