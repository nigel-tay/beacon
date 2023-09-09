import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isMobile, isTablet, isDesktop } from '../../state/viewwidth/viewwidth.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  loggedIn: boolean = true;
  hamburgerToggled: boolean = false;
  viewWidth$!: Observable<number>;

  constructor(private store: Store<{ viewWidth: number }>) {
    this.viewWidth$ = store.select('viewWidth');
  }

  ngOnInit(): void {
    if (window.screen.width <= 640) { // 768px portrait
      this.store.dispatch(isMobile());
    }
    else if (window.screen.width > 640 && window.screen.width <= 768) {
      this.store.dispatch(isTablet());
    }
    else {
      this.store.dispatch(isDesktop());
    }
  }

  toggleHamburger() {
    this.hamburgerToggled = !this.hamburgerToggled;
  }
}
