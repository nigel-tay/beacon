import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("username");
    }
  }

  request(method: string, url: string, data: any): Observable<any> {
    let headers: any;

    if (this.getAuthToken() !== null) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    }

    switch(method.toLowerCase()) {
      case 'get':
          return this.httpClient.get<any>(url, {headers: headers});  
        break;
      case 'post':
          return this.httpClient.post<any>(url, data, {headers: headers});
        break;
      case 'put':
          return this.httpClient.put<any>(url, data, {headers: headers});
        break;
      default:
          return this.httpClient.delete<any>(url);
    }
  }
}
