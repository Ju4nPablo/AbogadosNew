import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAbogadoComponent } from './inicio-abogado.component';

describe('InicioAbogadoComponent', () => {
  let component: InicioAbogadoComponent;
  let fixture: ComponentFixture<InicioAbogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioAbogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
