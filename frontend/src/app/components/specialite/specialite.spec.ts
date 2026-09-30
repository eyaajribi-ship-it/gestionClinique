import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteComponent } from './specialite';

describe('SpecialiteComponent', () => {
  let component: SpecialiteComponent;
  let fixture: ComponentFixture<SpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialiteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
