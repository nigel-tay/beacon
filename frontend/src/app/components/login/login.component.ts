import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/interface/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginDetails!: Login;

  constructor(private fb: FormBuilder) {}

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
    // CREATE SERVICE TO CALL BACKEND
  }
}
