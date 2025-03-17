import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDCourse]',
  standalone: true
})
export class DCourseDirective {

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
