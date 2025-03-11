import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCourse]'
})
export class CourseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  // כאשר העכבר נמצא על האלמנט
  @HostListener('mouseover') onMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.08)');
  }

  // כאשר העכבר יוצא מהאלמנט
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }

}