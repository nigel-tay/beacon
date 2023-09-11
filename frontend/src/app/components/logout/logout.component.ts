import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.setAuthToken(null);
    this.router.navigate(['/login']);
  }
}
