import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployerProfileComponent } from './add-employer-profile.component';

describe('AddEmployerProfileComponent', () => {
  let component: AddEmployerProfileComponent;
  let fixture: ComponentFixture<AddEmployerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
