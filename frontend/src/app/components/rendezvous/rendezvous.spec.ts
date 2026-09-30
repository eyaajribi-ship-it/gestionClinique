import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Rendezvous } from './rendezvous';

describe('Rendezvous', () => {
  let component: Rendezvous;
  let fixture: ComponentFixture<Rendezvous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rendezvous],
      providers: [
        provideHttpClient(),
        provideAnimations()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Rendezvous);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});