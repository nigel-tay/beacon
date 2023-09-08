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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initialiseRegisterForm();
    this.initialisePlacesAutoComplete();
  }

  initialisePlacesAutoComplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      console.log(place);
    })
  }

  initialiseRegisterForm() {
    this.registerForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email])
    })
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
  }
}
