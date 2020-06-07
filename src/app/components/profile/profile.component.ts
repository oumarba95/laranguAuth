import { Subject } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { AuthStatusService } from './../../services/auth-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService,private at:AuthStatusService) { }

  ngOnInit(): void {
      
  }

}
