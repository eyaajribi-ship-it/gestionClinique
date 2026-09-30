import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniqueComponent } from './clinique';

describe('CliniqueComponent', () => {
  let component: CliniqueComponent;
  let fixture: ComponentFixture<CliniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CliniqueComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CliniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
