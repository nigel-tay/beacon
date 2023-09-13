import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/interface/pet';
import { Sighting } from 'src/app/interface/sighting';
import { AuthService } from 'src/app/service/auth.service';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.scss']
})
export class PetProfileComponent implements OnInit{

  pet!: Pet;
  sightingsArray: Sighting[] = [];
  userId: string | null = this.authService.getUserId();
  
  constructor(
    private petService: PetService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.petService.getPetData(this.activatedRoute.snapshot.params['id'])
      .subscribe((data: Pet) => {
        this.pet = data;
        console.log(this.pet);
      })
  }

}
