import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOfRoutesComponent } from './top-of-routes.component';

describe('TopOfRoutesComponent', () => {
  let component: TopOfRoutesComponent;
  let fixture: ComponentFixture<TopOfRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopOfRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOfRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
