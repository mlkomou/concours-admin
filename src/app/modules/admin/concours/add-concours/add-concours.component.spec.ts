import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConcoursComponent } from './add-concours.component';

describe('AddConcoursComponent', () => {
  let component: AddConcoursComponent;
  let fixture: ComponentFixture<AddConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
