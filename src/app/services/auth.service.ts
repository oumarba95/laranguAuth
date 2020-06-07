import { Router } from '@angular/router';
import { AuthStatusService } from './auth-status.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl ="http://localhost:8000/api";
  newUserSubject = new Subject<any>();
  userSubjectObservable = this.newUserSubject.asObservable();
  loginSubject = new Subject<string>();
  loginObs = this.loginSubject.asObservable();
  constructor(private http:HttpClient,private token:TokenService,private router:Router) {  
  }

  login(data){
    return this.http.post(`${this.baseUrl}/login`,data);
  }
  signup(data){
    return this.http.post(`${this.baseUrl}/signup`,data).pipe(
      tap(() =>{
         this.newUserSubject.next();
         
      })
    );
  }
 
  sendResetPasswordLink(data){
    return this.http.post(`${this.baseUrl}/sendResetPasswordLink`,data);
  }
  changePassword(data){
    return this.http.post(`${this.baseUrl}/changePassword`,data);
  }
  getToken(token){
    return this.http.post(`${this.baseUrl}/getTokenRaw`,token);
  }
}
