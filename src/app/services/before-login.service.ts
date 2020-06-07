import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate{

  constructor(private token:TokenService,private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.token.loggedIn()){
       this.router.navigate(['']);
       return false;
    }
    return !this.token.loggedIn();
}
}
