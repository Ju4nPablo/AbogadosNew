import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoAbogadoComponent } from './caso-abogado.component';

describe('CasoAbogadoComponent', () => {
  let component: CasoAbogadoComponent;
  let fixture: ComponentFixture<CasoAbogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoAbogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
