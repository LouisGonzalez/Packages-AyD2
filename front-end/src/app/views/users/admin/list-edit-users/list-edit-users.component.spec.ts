import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditUsersComponent } from './list-edit-users.component';

describe('ListEditUsersComponent', () => {
  let component: ListEditUsersComponent;
  let fixture: ComponentFixture<ListEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEditUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
