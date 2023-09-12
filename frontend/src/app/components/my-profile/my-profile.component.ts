import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{

  user!: User;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.authService.verifyTokenValidity();
    this.getUserData();
  }

  // get id param, make call to BE to retrieve user info
  getUserData() {
    let userId: string = this.activatedRoute.snapshot.params['id'];
    this.httpService.request('GET', `/api/users/${userId}`, '')
      .subscribe((data: User) => {
        this.user = data;
        console.log(this.user.image);
      })
  }
    // get user using id
    // get pets using id

  // display data
}
