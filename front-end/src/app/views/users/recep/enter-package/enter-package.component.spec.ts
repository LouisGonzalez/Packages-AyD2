import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPackageComponent } from './enter-package.component';

describe('EnterPackageComponent', () => {
  let component: EnterPackageComponent;
  let fixture: ComponentFixture<EnterPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
