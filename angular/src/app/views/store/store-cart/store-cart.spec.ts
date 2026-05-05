import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCart } from './store-cart';

describe('StoreCart', () => {
  let component: StoreCart;
  let fixture: ComponentFixture<StoreCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
