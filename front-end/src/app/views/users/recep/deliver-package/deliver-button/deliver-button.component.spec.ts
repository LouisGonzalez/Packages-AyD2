import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverButtonComponent } from './deliver-button.component';

describe('DeliverButtonComponent', () => {
  let component: DeliverButtonComponent;
  let fixture: ComponentFixture<DeliverButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
