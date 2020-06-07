import { AuthStatusService } from './auth-status.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor{
   loggedIn;
  constructor(private authSv:AuthStatusService) { 
    this.authSv.authStatus.subscribe(
      (value) => this.loggedIn = value
      )
  }
  intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
     
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
         if(error.status === 401 && this.loggedIn){
            this.authSv.logout();
         }
         return throwError(error);
      }
        )
      );
  }
}
