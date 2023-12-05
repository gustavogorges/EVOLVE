import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFullScreenComponent } from './projeto-full-screen.component';

describe('ProjetoFullScreenComponent', () => {
  let component: ProjetoFullScreenComponent;
  let fixture: ComponentFixture<ProjetoFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFullScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
