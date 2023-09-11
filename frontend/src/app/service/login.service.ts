import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getId(): string | null {
    return window.localStorage.getItem("id");
  }

  setAuthToken(id: string | null): void {
    if (id !== null) {
      window.localStorage.setItem("user_id", id);
    }
    else {
      window.localStorage.removeItem("user_id");
    }
  }
}
