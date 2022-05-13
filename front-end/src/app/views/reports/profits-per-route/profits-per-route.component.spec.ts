import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsPerRouteComponent } from './profits-per-route.component';

describe('ProfitsPerRouteComponent', () => {
  let component: ProfitsPerRouteComponent;
  let fixture: ComponentFixture<ProfitsPerRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitsPerRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsPerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
