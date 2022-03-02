import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPackageComponent } from './process-package.component';

describe('ProcessPackageComponent', () => {
  let component: ProcessPackageComponent;
  let fixture: ComponentFixture<ProcessPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
