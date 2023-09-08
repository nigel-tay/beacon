import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor() { }

  initialisePlacesAutoComplete(autocomplete: google.maps.places.Autocomplete | undefined, input: ElementRef) {
    autocomplete = new google.maps.places.Autocomplete(input.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      console.log(place?.geometry?.location?.lat());
    })
  }
}
