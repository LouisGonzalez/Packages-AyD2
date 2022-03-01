import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesOnARouteComponent } from './packages-on-a-route.component';

describe('PackagesOnARouteComponent', () => {
  let component: PackagesOnARouteComponent;
  let fixture: ComponentFixture<PackagesOnARouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesOnARouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesOnARouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
