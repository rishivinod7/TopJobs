import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerHeaderNavbarComponent } from './employer-header-navbar.component';

describe('EmployerHeaderNavbarComponent', () => {
  let component: EmployerHeaderNavbarComponent;
  let fixture: ComponentFixture<EmployerHeaderNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerHeaderNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerHeaderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
