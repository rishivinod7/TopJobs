import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAnalyticsComponent } from './employer-analytics.component';

describe('EmployerAnalyticsComponent', () => {
  let component: EmployerAnalyticsComponent;
  let fixture: ComponentFixture<EmployerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
