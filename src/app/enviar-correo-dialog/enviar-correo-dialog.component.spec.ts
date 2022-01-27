import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarCorreoDialogComponent } from './enviar-correo-dialog.component';

describe('EnviarCorreoDialogComponent', () => {
  let component: EnviarCorreoDialogComponent;
  let fixture: ComponentFixture<EnviarCorreoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarCorreoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarCorreoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
