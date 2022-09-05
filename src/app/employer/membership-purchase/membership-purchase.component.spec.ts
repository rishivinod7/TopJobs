import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPurchaseComponent } from './membership-purchase.component';

describe('MembershipPurchaseComponent', () => {
  let component: MembershipPurchaseComponent;
  let fixture: ComponentFixture<MembershipPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
