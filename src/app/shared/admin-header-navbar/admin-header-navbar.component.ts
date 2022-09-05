import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header-navbar',
  templateUrl: './admin-header-navbar.component.html',
  styleUrls: ['./admin-header-navbar.component.css']
})
export class AdminHeaderNavbarComponent implements OnInit {

  constructor() { }
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
