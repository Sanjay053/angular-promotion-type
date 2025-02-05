import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePromoComponent } from './update-promo.component';

describe('UpdatePromoComponent', () => {
  let component: UpdatePromoComponent;
  let fixture: ComponentFixture<UpdatePromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePromoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
