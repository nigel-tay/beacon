import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { PlacesService } from 'src/app/service/places.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit{

  @ViewChild('addressInput', {static: true})
  addressInput!: ElementRef;

  @ViewChild('imageInput')
  imageInput!: ElementRef;

  registerForm!: FormGroup
  visibility: boolean = false;
  contentExists: boolean = false;
  user!: User;

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(
    private fb: FormBuilder,
    private placesService: PlacesService,
    private httpService: HttpService) {}
  
  ngOnInit(): void {
    this.initialiseRegisterForm();
    this.user = {
      id: "",
      address: "",
      email: "",
      username: "",
      password: "",
      lat: 0,
      lng: 0,
      image: ""
    }
  }

  ngAfterViewInit(): void {
    this.placesService.initialisePlacesAutoComplete(this.autocomplete, this.addressInput, this.user);
  }

  initialiseRegisterForm() {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      address: this.fb.control(''),
      image: this.fb.control('')
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

  handleFormSubmit() {
    if (this.imageInput.nativeElement.files.length > 0) {
      const formData = new FormData();
      formData.append('imageFile', this.imageInput.nativeElement.files[0]);
      this.httpService.request('POST', '/api/upload', formData)
        .subscribe((data: any) => {
          this.user.image = data.image;
          this.user.id = crypto.randomUUID().toString();
          this.user.email = this.registerForm.value.email;
          this.user.username = this.registerForm.value.username;
          this.user.password = this.registerForm.value.password;
          this.httpService.request('POST', '/api/register', this.user)
            .subscribe(v => console.log(v));
        });
    }
    else {
      this.user.image = "";
      this.user.id = crypto.randomUUID().toString();
      this.user.email = this.registerForm.value.email;
      this.user.username = this.registerForm.value.username;
      this.user.password = this.registerForm.value.password;
      this.httpService.request('POST', '/api/register', this.user)
        .subscribe(v => console.log(v));
    }
  }
}
