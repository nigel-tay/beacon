import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  request() {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken()};
    }
  }
}
