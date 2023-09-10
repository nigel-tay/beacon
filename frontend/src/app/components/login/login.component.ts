import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginDetails!: Login;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router) {}

  ngOnInit(): void {
    this.initialiseLoginForm();
    this.loginDetails = {
      username: "",
      password: ""
    }
  }

  initialiseLoginForm() {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })
  }
  
  handleSubmit() {
    this.loginDetails.username = this.loginForm.value.username;
    this.loginDetails.password = this.loginForm.value.password;
    console.log(this.loginDetails);
    this.login(this.loginDetails)
  }

  login(login: Login) {
    this.httpService.request("POST", "/api/login", login)
          .subscribe({
            next: (data) => {
              this.httpService.setAuthToken(data.token);
              this.router.navigate(['/boards'])
            },
            error: (e) => {
              this.httpService.setAuthToken(null);
              alert(e);
            }
          })
  }
}
