import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditInforComponent } from './product-edit-infor.component';

describe('ProductEditInforComponent', () => {
  let component: ProductEditInforComponent;
  let fixture: ComponentFixture<ProductEditInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
