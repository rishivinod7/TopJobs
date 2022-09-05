import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderNavbarComponent } from './admin-header-navbar.component';

describe('AdminHeaderNavbarComponent', () => {
  let component: AdminHeaderNavbarComponent;
  let fixture: ComponentFixture<AdminHeaderNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeaderNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
