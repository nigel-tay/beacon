import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class RegisterPetComponent implements OnInit, OnDestroy{

  @ViewChild('imageInput')
  imageInput!: ElementRef;

  @ViewChild('petFeaturesInput')
  petFeaturesInput!: ElementRef;
  
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
    }
    // get all existing features from the backend and save to localstorage as features
    // this.petService.getAllFeatures()
    //       .subscribe((data: any) => {
    //         if (data.length > 0) {
    //           this.dbFeaturesArray = [...data];
    //           console.log(this.dbFeaturesArray);
    //         }
    //       })
    this.dbFeaturesArray = ['brown', 'furry', 'short', 'broad', 'fat', 'cute']
    this.initialisePetForm();
  }

  initialisePetForm() {
    this.petFormGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      ownerId: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      image: this.fb.control(''),
    })
  }

  handlePetFormSubmit() {
    // get user_id and set owner_id on pet table
    // 
    // rest of the field get from form data
  }

  // handleFormSubmit() {
  //   if (this.imageInput.nativeElement.files.length > 0) {
  //     const formData = new FormData();
  //     formData.append('imageFile', this.imageInput.nativeElement.files[0]);
  //     this.httpService.request('POST', '/api/upload', formData)
  //       .subscribe((data: any) => {
  //         this.user.image = data.image;
  //         this.assignRemainingUserFieldsAndRegister();
  //       });
  //   }
  //   else {
  //     this.user.image = "";
  //     this.assignRemainingUserFieldsAndRegister();
  //   }
  // }

  assignRemainingUserFieldsAndRegister() {
    this.pet.id = crypto.randomUUID().toString();
    this.pet.ownerId = this.authService.getUserId() as string;
    this.pet.name = this.petFormGroup.value.name;
    this.pet.type = this.petFormGroup.value.type;
    this.httpService.request('POST', '/api/register', this.pet)
      .subscribe((data: any) => {
        this.authService.setAuthToken(data.token);
        this.authService.setUserData(data);
        this.router.navigate([`/my-profile/${data.id}`])
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

  handleFeatureClick(feature: string) {
    if (!this.featuresArray.includes(feature)) {
      this.featuresArray.push(feature);
    }
    this.populatedArray = [];
    this.petFeaturesInput.nativeElement.value = '';
  }

  removeFeature(feature: string) {
    const index = this.featuresArray.indexOf(feature);
    if (index !== -1) {
      this.featuresArray.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    // delete features hash
  }

}
