import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/interface/pet';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { PetService } from 'src/app/service/pet.service';

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
    private petService: PetService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    let userId: string = this.activatedRoute.snapshot.params['id'];
    this.getUserData(userId);
    this.petService.getPetsData(userId)
        .subscribe((data: any) => {
          this.petsArray = [...data.pets]
        });
  }

  // get id param, make call to BE to retrieve user info
  getUserData(userId: string) {
    this.httpService.request('GET', `/api/users/${userId}`, '')
      .subscribe((data: User) => {
        this.user = data;
      })
  }
}
