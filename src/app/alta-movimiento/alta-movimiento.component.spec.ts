import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMovimientoComponent } from './alta-movimiento.component';

describe('AltaMovimientoComponent', () => {
  let component: AltaMovimientoComponent;
  let fixture: ComponentFixture<AltaMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
