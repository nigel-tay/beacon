import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/interface/pet';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrls: ['./register-pet.component.scss']
})
export class RegisterPetComponent implements OnInit {

  @ViewChild('imageInput')
  imageInput!: ElementRef;

  @ViewChild('petFeaturesInput')
  petFeaturesInput!: ElementRef;
  
  @ViewChild('lostInput')
  lostInput!: ElementRef;

  pet!: Pet;
  petFormGroup!: FormGroup;
  featuresArray: string[] = [];
  populatedArray: string[] = [];
  dbFeaturesArray!: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private petService: PetService
  ){}

  ngOnInit(): void {
    this.pet = {
      id: "",
      ownerId: "",
      name: "",
      type: "",
      image: "",
      lost: 0
    }
    this.petService.getAllFeatures()
          .subscribe((data: any) => {
            console.log(data)
            if (data.length > 0) {
              this.dbFeaturesArray = [...data];
              console.log(this.dbFeaturesArray);
            }
          })
    this.initialisePetForm();
  }

  initialisePetForm() {
    this.petFormGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      ownerId: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      image: this.fb.control(''),
      lost: this.fb.control(0),
    })
  }

  handlePetFormSubmit() {
    this.pet.id = crypto.randomUUID().toString();
    this.assignPetFieldsAndPost();
  }

  postFeatures() {
    let featuresDto = {
      pet_id: this.pet.id,
      features: [...this.featuresArray]
    }
    console.log(featuresDto)
    this.httpService.request('POST', '/api/pets/features', featuresDto)
      .subscribe((data: any) => {
        console.log(data.message);
      })
  }

  assignPetFieldsAndPost() {
    const formData = new FormData();
      formData.append('imageFile', this.imageInput.nativeElement.files[0]);
      this.httpService.request('POST', '/api/upload', formData)
        .subscribe((data: any) => {
          this.pet.image = data.image;
          this.pet.ownerId = this.authService.getUserId() as string;
          this.pet.name = this.petFormGroup.value.name;
          this.pet.type = this.petFormGroup.value.type.toLowerCase();
          this.pet.lost = this.lostInput.nativeElement.checked ? 1 : 0;
          console.log(this.pet);
          this.httpService.request('POST', '/api/pets/add', this.pet)
            .subscribe((data: any) => {
              this.postFeatures();
              alert("Pet registered successfully!");
              this.router.navigate([`/pet-profile/${data.id}`])
            });
        });
  }

  onInputChange(inputValue: string) {
    this.populatedArray = [];

    if (inputValue.trim() !== '') {
      this.dbFeaturesArray.forEach(word => {
        if (word.toLowerCase().includes(inputValue.toLowerCase())) {
          this.populatedArray.push(word);
        }
      });

    }
  }

  onEnterKeyPressed(event: any, value: string) {
    if (value.trim() !== '') {
        this.handleFeatureClick(value);
    }
  }

  handleFeatureClick(feature: string) {
    if (!this.featuresArray.includes(feature)) {
      this.featuresArray.push(feature);
    }
    this.populatedArray = [];
    this.petFeaturesInput.nativeElement.value = '';
    this.petFeaturesInput.nativeElement.focus();
  }

  removeFeature(feature: string) {
    const index = this.featuresArray.indexOf(feature);
    if (index !== -1) {
      this.featuresArray.splice(index, 1);
    }
  }
}
