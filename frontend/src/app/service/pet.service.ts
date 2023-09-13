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

  getPetsData(userId: string): Observable<any> {
    return this.httpService.request('GET', `/api/pets/user/${userId}`, '');
  }

  getPetData(petId: string): Observable<any> {
    return this.httpService.request('GET', `/api/pets/${petId}`, '');
  }

  putPetLost(petId: string, lostValue: any): Observable<any> {
    return this.httpService.request('PUT', `/api/pets/lost/${petId}`, lostValue)
  }
}
