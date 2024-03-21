import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoRemasteredComponent } from './projeto-remastered.component';

describe('ProjetoRemasteredComponent', () => {
  let component: ProjetoRemasteredComponent;
  let fixture: ComponentFixture<ProjetoRemasteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoRemasteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoRemasteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
