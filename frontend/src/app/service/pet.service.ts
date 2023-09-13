import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private httpService: HttpService
  ) { }

  getAllFeatures(): Observable<any> {
    return this.httpService.request('GET', '/api/pets/features', '');
  }
}