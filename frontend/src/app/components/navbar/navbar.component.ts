import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isMobile, isTablet, isDesktop } from '../../state/viewwidth/viewwidth.actions'
import { openDropdown, closeDropdown } from 'src/app/state/mobilenav/mobilenav.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  loggedIn: boolean = true;
  hamburgerStatus!: string;
  dropdownStatus$!: Observable<string>;
  viewWidth$!: Observable<number>;

  constructor(private store: Store<{ viewWidth: number, mobileNav: string }>) {
    this.viewWidth$ = store.select('viewWidth');
    this.dropdownStatus$ = store.select('mobileNav');
    this.dropdownStatus$.subscribe(v => this.hamburgerStatus = v);
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
    this.hamburgerStatus === 'close' ?
    this.openDropDown() :
    this.closeDropDown();
  }

  closeDropDown() {
    this.store.dispatch(closeDropdown());
  }

  openDropDown() {
    this.store.dispatch(openDropdown());
  }
}
