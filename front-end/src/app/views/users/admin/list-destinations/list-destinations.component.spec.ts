import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDestinationsComponent } from './list-destinations.component';

describe('ListDestinationsComponent', () => {
  let component: ListDestinationsComponent;
  let fixture: ComponentFixture<ListDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDestinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
