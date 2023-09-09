import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { AuthService } from 'src/app/service/auth.service';

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
    private authService: AuthService,
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
    this.authService.request("POST", "/api/login", login)
          .subscribe({
            next: (data) => {
              this.authService.setAuthToken(data.token);
              this.router.navigate(['/boards'])
            },
            error: (e) => {
              this.authService.setAuthToken(null);
              alert(e);
            }
          })
  }
}
