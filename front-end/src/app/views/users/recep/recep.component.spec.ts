import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepComponent } from './recep.component';

describe('RecepComponent', () => {
  let component: RecepComponent;
  let fixture: ComponentFixture<RecepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
