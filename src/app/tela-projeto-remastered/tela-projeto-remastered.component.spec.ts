import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaProjetoRemasteredComponent } from './tela-projeto-remastered.component';

describe('TelaProjetoRemasteredComponent', () => {
  let component: TelaProjetoRemasteredComponent;
  let fixture: ComponentFixture<TelaProjetoRemasteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaProjetoRemasteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaProjetoRemasteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
