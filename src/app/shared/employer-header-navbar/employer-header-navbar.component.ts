import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-employer-header-navbar',
  templateUrl: './employer-header-navbar.component.html',
  styleUrls: ['./employer-header-navbar.component.css']
})
export class EmployerHeaderNavbarComponent implements OnInit {
  name:string;
  constructor() { }

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.name = localStorage["organisationName"];
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
