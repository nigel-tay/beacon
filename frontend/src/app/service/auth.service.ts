import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getId(): string | null {
    return window.localStorage.getItem("id");
  }

  setUserData(data: any | null): void {
    if (data !== null) {
      window.localStorage.setItem("user_id", data.id);
      window.localStorage.setItem("username", data.username);
    }
  }
}
