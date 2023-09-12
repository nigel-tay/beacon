import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  // Token
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    }
    else {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("username");
    }
  }

  

  verifyTokenValidity() {
    if (this.getAuthToken() !== null && this.getAuthToken() !== undefined) {
      const token: string | null = this.getAuthToken()
      const tokenPayload: JwtPayload = jwt_decode(token as string);
      const expirationTime: number | undefined = tokenPayload.exp ? tokenPayload.exp * 1000 : undefined

      if (expirationTime !== undefined && Date.now() >= expirationTime) {
        console.log('Token has expired');
        alert("Your session has expired. Please login again");
        this.logout();
      }
    }
    else {
      alert("Your session has expired. Please login again");
      this.logout();
    }
  }

  logout() {
    this.setAuthToken(null);
    this.router.navigate(['/login']);
  }

  // User data
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
