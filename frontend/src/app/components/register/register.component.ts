import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  @ViewChild('addressInput', {static: true})
  addressInput!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

  registerForm!: FormGroup
  visibility: boolean = false;
  contentExists: boolean = false;

  constructor(private fb: FormBuilder) {}

        // // If you want to move your map center to the searched lat long position. Use below any one
        // // (with animation)
        // this.gmap.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }); 
        // // (without animation)
        // this.gmap.setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }); 

  ngOnInit(): void {
    this.initialiseRegisterForm();
    this.initialisePlacesAutoComplete();
  }

  initialisePlacesAutoComplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      console.log(place?.geometry?.location?.lat());
    })
  }

  initialiseRegisterForm() {
    this.registerForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('')
    })
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
  }

  checkAddressInput() {
    if (this.addressInput.nativeElement.value.length > 0) {
      this.contentExists = true;
    }
    else {
      this.contentExists = false;
    }
  }
}
