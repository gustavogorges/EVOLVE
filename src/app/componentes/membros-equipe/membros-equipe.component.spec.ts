import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosEquipeComponent } from './membros-equipe.component';

describe('MembrosEquipeComponent', () => {
  let component: MembrosEquipeComponent;
  let fixture: ComponentFixture<MembrosEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembrosEquipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembrosEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
