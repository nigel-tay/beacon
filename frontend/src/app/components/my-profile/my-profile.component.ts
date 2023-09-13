import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/interface/pet';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{

  user!: User;
  petsArray!: Pet[]

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.getUserData();
    this.getPetsData();
  }

  // get id param, make call to BE to retrieve user info
  getUserData() {
    let userId: string = this.activatedRoute.snapshot.params['id'];
    this.httpService.request('GET', `/api/users/${userId}`, '')
      .subscribe((data: User) => {
        this.user = data;
      })
  }

  getPetsData() {
    let userId: string = this.activatedRoute.snapshot.params['id'];
    this.httpService.request('GET', `/api/pets/user/${userId}`, '')
      .subscribe((data: any) => {
        console.log(data);
        this.petsArray = [...data.pets];
      })
  }
}
