import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { SideMenuOptionsComponent } from './side-menu-options.component';

describe('SideMenuOptionsComponent', () => {
  let component: SideMenuOptionsComponent;
  let fixture: ComponentFixture<SideMenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuOptionsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
