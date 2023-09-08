import { ElementRef, Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor() { }

  initialisePlacesAutoComplete(autocomplete: google.maps.places.Autocomplete | undefined, input: ElementRef, user: User) {
    autocomplete = new google.maps.places.Autocomplete(input.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      user.lat = place?.geometry?.location?.lat();
      user.lng = place?.geometry?.location?.lng();
    })
  }
}
