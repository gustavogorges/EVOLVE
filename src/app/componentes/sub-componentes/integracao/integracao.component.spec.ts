import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracaoComponent } from './integracao.component';

describe('IntegracaoComponent', () => {
  let component: IntegracaoComponent;
  let fixture: ComponentFixture<IntegracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
