import { AuthStatusService } from './services/auth-status.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  constructor(private auth:AuthStatusService,private router:Router,private titleService: Title){
 
  }
  ngOnInit(){
    this.auth.authStatus.subscribe((data)=> this.loggedIn = data);
   }
   public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  activeNav(){
     if(this.router.url !== '/login' && this.router.url !== '/request-password-reset' && !this.router.url.startsWith('/response-password-reset') )
        return true;
  }
  backColorChange(){
    if(this.router.url == '/') return true;
  }
  routesCible(){
    if(this.router.url ==='/request-password-reset' ||
    this.router.url ==='/login' ||
     this.router.url.startsWith('/response-password-reset'
     ))
       return true;
  }
}
