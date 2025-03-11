import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsDetailsComponent } from './lessons-details.component';

describe('LessonsDetailsComponent', () => {
  let component: LessonsDetailsComponent;
  let fixture: ComponentFixture<LessonsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
