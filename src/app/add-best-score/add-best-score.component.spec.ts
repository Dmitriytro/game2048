import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBestScoreComponent } from './add-best-score.component';

describe('AddBestScoreComponent', () => {
  let component: AddBestScoreComponent;
  let fixture: ComponentFixture<AddBestScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBestScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBestScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
