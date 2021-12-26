import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDossierComponent } from './validation-dossier.component';

describe('ValidationDossierComponent', () => {
  let component: ValidationDossierComponent;
  let fixture: ComponentFixture<ValidationDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
