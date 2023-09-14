import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pet } from 'src/app/interface/pet';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { PetService } from 'src/app/service/pet.service';
import { PlacesService } from 'src/app/service/places.service';
import { toggleModal } from 'src/app/state/modalopen/modalopen.actions';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, AfterViewInit{

  @ViewChild('editAddressInput', {static: true})
  editAddressInput!: ElementRef;

  modalOpen!: boolean;
  user!: User;
  petsArray!: Pet[]

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(
    private httpService: HttpService,
    private petService: PetService,
    private placesService: PlacesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ modalOpen: boolean }>
    ){
      store.select('modalOpen').subscribe(data => this.modalOpen = data);
    }

  ngOnInit(): void {
    let userId: string = this.activatedRoute.snapshot.params['id'];
    this.getUserData(userId);
    this.petService.getPetsData(userId)
        .subscribe((data: any) => {
          this.petsArray = [...data.pets]
        });
  }

  ngAfterViewInit(): void {
    this.placesService.initialisePlacesAutoComplete(this.autocomplete, this.editAddressInput, this.user);
  }

  // get id param, make call to BE to retrieve user info
  getUserData(userId: string) {
    this.httpService.request('GET', `/api/users/${userId}`, '')
      .subscribe((data: User) => {
        this.user = data;
        
      })
  }

  handleOpenModal() {
    this.store.dispatch(toggleModal());
  }

  handleEditAddressSubmit() {
    this.httpService.request('PUT', `/api/users/edit/${this.user.id}`, this.user)
    this.store.dispatch(toggleModal());
  }
}
