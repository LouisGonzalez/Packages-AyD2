import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracePackageComponent } from './trace-package.component';

describe('TracePackageComponent', () => {
  let component: TracePackageComponent;
  let fixture: ComponentFixture<TracePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracePackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
