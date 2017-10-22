import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialModuleComponent } from './tutorial-module.component';

describe('TutorialModuleComponent', () => {
  let component: TutorialModuleComponent;
  let fixture: ComponentFixture<TutorialModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
