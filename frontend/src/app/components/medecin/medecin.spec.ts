import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinComponent } from './medecin';

describe('MedecinComponent', () => {
  let component: MedecinComponent;
  let fixture: ComponentFixture<MedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
