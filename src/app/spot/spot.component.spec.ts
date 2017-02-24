/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppSpotComponent } from './app-spot.component';

describe('AppSpotComponent', () => {
  let component: AppSpotComponent;
  let fixture: ComponentFixture<AppSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
