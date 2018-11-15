import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaFlujoProcesoComponent } from './baja-flujo-proceso.component';

describe('BajaFlujoProcesoComponent', () => {
  let component: BajaFlujoProcesoComponent;
  let fixture: ComponentFixture<BajaFlujoProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaFlujoProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaFlujoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
