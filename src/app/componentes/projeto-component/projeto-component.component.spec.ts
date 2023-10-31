import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoComponentComponent } from './projeto-component.component';

describe('ProjetoComponentComponent', () => {
  let component: ProjetoComponentComponent;
  let fixture: ComponentFixture<ProjetoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
