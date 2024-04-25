import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardPerfilComponent } from './user-card-perfil.component';

describe('UserCardPerfilComponent', () => {
  let component: UserCardPerfilComponent;
  let fixture: ComponentFixture<UserCardPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
