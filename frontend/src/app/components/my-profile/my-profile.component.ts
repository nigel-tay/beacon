import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private routerOutler: RouterOutlet
    ){}

  ngOnInit(): void {
    this.authService.verifyTokenValidity()
  }
}
