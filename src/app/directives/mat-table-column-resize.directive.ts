import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  NgZone,
  Input,
} from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appColumnResize]',
})
export class ColumnResizeDirective implements OnInit, OnDestroy {
  @Input() resizableTable: HTMLElement | null = null;
  private isResizing = false;
  private startX!: number;
  private startWidth!: number;
  private column: HTMLElement;
  private table: HTMLElement | null = null;
  private resizer!: HTMLElement;
  private destroy$ = new Subject<void>();
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone
  ) {
    this.column = this.el.nativeElement;
  }
  ngOnInit() {
    this.table = this.resizableTable || this.findParentTable(this.column);
    if (!this.table) {
      console.error(
        'Parent table not found. Make sure the directive is applied to a th element within a table.'
      );
      return;
    }
    this.createResizer();
    this.initializeResizeListener();
  }
  private createResizer() {
    this.resizer = this.renderer.createElement('div');
    this.renderer.addClass(this.resizer, 'column-resizer');
    this.renderer.setStyle(this.resizer, 'position', 'absolute');
    this.renderer.setStyle(this.resizer, 'right', '0');
    this.renderer.setStyle(this.resizer, 'top', '0');
    this.renderer.setStyle(this.resizer, 'height', '100%');
    this.renderer.setStyle(this.resizer, 'width', '5px');
    this.renderer.setStyle(this.resizer, 'cursor', 'col-resize');
    this.renderer.appendChild(this.column, this.resizer);
  }
  private initializeResizeListener() {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.resizer, 'mousedown')
        .pipe(takeUntil(this.destroy$))
        .subscribe((e: Event) => this.onMouseDown(e as MouseEvent));
      fromEvent(document, 'mousemove')
        .pipe(takeUntil(this.destroy$))
        .subscribe((e: Event) => this.onMouseMove(e as MouseEvent));
      fromEvent(document, 'mouseup')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.onMouseUp());
    });
  }
  private onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isResizing = true;
    this.startX = e.pageX;
    this.startWidth = this.column.offsetWidth;
    this.renderer.addClass(this.column, 'resizing');
    if (this.table) {
      this.renderer.addClass(this.table, 'resizing');
    }
  }
  private onMouseMove(e: MouseEvent) {
    if (!this.isResizing) return;
    const width = this.startWidth + (e.pageX - this.startX);
    this.renderer.setStyle(this.column, 'width', `${width}px`);
  }
  private onMouseUp() {
    if (!this.isResizing) return;
    this.isResizing = false;
    this.renderer.removeClass(this.column, 'resizing');
    if (this.table) {
      this.renderer.removeClass(this.table, 'resizing');
    }
  }
  private findParentTable(element: HTMLElement): HTMLElement | null {
    while (element && element.tagName !== 'TABLE') {
      element = element.parentElement as HTMLElement;
      if (!element) return null;
    }
    return element;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
