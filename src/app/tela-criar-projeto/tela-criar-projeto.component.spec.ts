import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCriarProjetoComponent } from './tela-criar-projeto.component';

describe('TelaCriarProjetoComponent', () => {
  let component: TelaCriarProjetoComponent;
  let fixture: ComponentFixture<TelaCriarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaCriarProjetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaCriarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
