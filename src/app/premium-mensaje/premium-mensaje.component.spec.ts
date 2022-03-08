import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumMensajeComponent } from './premium-mensaje.component';

describe('PremiumMensajeComponent', () => {
  let component: PremiumMensajeComponent;
  let fixture: ComponentFixture<PremiumMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumMensajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
