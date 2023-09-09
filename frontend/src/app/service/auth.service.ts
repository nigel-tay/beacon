import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    }
    else {
      window.localStorage.removeItem("auth_token");
    }
  }

  request(method: string, url: string, data: any): Observable<any> {
    let headers: any;

    if (this.getAuthToken() !== null) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
      console.log("im here")
    }

    // if (method === 'POST') {
      return this.httpClient.post<any>(url, data, {headers: headers});
    // }
  }
}
