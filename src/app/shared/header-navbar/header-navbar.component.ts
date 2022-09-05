import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {
  // name:string;
  name = localStorage["jobseekerName"];
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
