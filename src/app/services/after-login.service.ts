import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{

  constructor(private token:TokenService,private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.token.loggedIn()) {
      // all ok, proceed navigation to routed component
      return true;
    }
    else {
      // start a new navigation to redirect to login page
      this.router.navigate(['/login']);
      // abort current navigation
      return false;
    }
  }
}
