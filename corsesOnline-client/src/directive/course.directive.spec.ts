import { CourseDirective } from './course.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('CourseDirective', () => {
  let directive: CourseDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    // צור מופע של ElementRef עם אלמנט דמה
    elementRef = new ElementRef(document.createElement('div'));
    // צור מופע דמה של Renderer2
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    // צור את הדירקטיבה
    directive = new CourseDirective(elementRef, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply scale on mouse over', () => {
    directive.onMouseOver();
    expect(renderer.setStyle).toHaveBeenCalledWith(elementRef.nativeElement, 'transform', 'scale(1.08)');
  });

  it('should reset scale on mouse leave', () => {
    directive.onMouseLeave();
    expect(renderer.setStyle).toHaveBeenCalledWith(elementRef.nativeElement, 'transform', 'scale(1)');
  });
});
