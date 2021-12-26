import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePostulantComponent } from './liste-postulant.component';

describe('ListePostulantComponent', () => {
  let component: ListePostulantComponent;
  let fixture: ComponentFixture<ListePostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePostulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
