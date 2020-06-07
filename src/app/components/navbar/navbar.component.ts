import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { AuthStatusService } from './../../services/auth-status.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public loggedIn: boolean;
user;
public imageDirectory = "http://localhost:8000/user.png";
  constructor(private authSv: AuthStatusService,private token:TokenService,
    private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
     this.authSv.authStatus.subscribe(value => this.loggedIn = value);
     this.authSv.userObs.subscribe(
       (data) => this.user = data.toUpperCase() 
       );
       if(this.loggedIn ===true) this.authSv.getUserName();
      }
 logout(event:MouseEvent){
  /*event.preventDefault();
  this.authSv.changeAuthStatus(false);
  this.user = null;
  this.token.remove();
  this.router.navigate(['']);*/
  this.authSv.logout();
  this.user = null;


 }
 canDisplay(){
   if (this.router.url !== '/signup') return true;
 }
}
