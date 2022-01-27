import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilDialogComponent } from './editar-perfil-dialog.component';

describe('EditarPerfilDialogComponent', () => {
  let component: EditarPerfilDialogComponent;
  let fixture: ComponentFixture<EditarPerfilDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
