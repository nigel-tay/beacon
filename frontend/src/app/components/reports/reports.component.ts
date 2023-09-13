import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reports } from 'src/app/interface/reports';
import { ZoneBoundaries } from 'src/app/interface/zone-boundaries';
import { PlacesService } from 'src/app/service/places.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{

  @ViewChild('addressInput', {static: true})
  addressInput!: ElementRef;

  zoneBoundaries: ZoneBoundaries = {
    north: {
      latMin: 1.2700,
      latMax: 1.4500,
      lngMin: 103.7200,
      lngMax: 103.8200
    },
    south: {
      latMin: 1.2700,
      latMax: 1.3400,
      lngMin: 103.7200,
      lngMax: 103.8200
    },
    east: {
      latMin: 1.2700,
      latMax: 1.3900,
      lngMin: 103.8200,
      lngMax: 103.9800
    },
    west: {
      latMin: 1.3400,
      latMax: 1.4500,
      lngMin: 103.6600,
      lngMax: 103.8200
    }
  };

  reportFormGroup!: FormGroup;
  report!: Reports;
  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private placesService: PlacesService
  ){}

  ngOnInit(): void {
    let petId: string = this.activatedRoute.snapshot.params['id'];
    this.report = {
      id: "",
      petId: petId,
      lat: "",
      lng: "",
      dateTime: "",
      zone: "",
      description: "",
      closed: 0
    }
    this.initialiseReportFormGroup();
    this.placesService.initialisePlacesAutoComplete(this.autocomplete, this.addressInput, this.report);
  }

  ngAfterInit(): void {
    this.placesService.initialisePlacesAutoComplete(this.autocomplete, this.addressInput, this.report);
  }

  initialiseReportFormGroup() {
    this.reportFormGroup = this.fb.group({
      dateTime: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
    })
  }

  determineZone(userLat: number, userLng: number): string {
    for (let zoneName in this.zoneBoundaries) {
      const zone = this.zoneBoundaries[zoneName];
      if (
        userLat >= zone.latMin &&
        userLat <= zone.latMax &&
        userLng >= zone.lngMin &&
        userLng <= zone.lngMax
      ) {
        return zoneName;
      }
    }
    // If user coordinates don't match any zone, you can handle it as needed.
    return "others";
  }

  handleFormSubmit() {
    console.log(this.report)
  }
}
 