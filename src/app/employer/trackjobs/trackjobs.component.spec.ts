import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackjobsComponent } from './trackjobs.component';

describe('TrackjobsComponent', () => {
  let component: TrackjobsComponent;
  let fixture: ComponentFixture<TrackjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
