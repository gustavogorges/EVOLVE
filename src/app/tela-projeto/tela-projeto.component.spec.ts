import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaProjetoComponent } from './tela-projeto.component';

describe('TelaProjetoComponent', () => {
  let component: TelaProjetoComponent;
  let fixture: ComponentFixture<TelaProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaProjetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
