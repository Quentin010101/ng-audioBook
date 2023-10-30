import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon-container.component.html',
  styleUrls: ['./icon-container.component.scss']
})
export class IconContainerComponent implements AfterViewInit {
  @ViewChild("icon") icon!: ElementRef
  @Input() size: number = 20
  
  ngAfterViewInit(): void {
    this.icon.nativeElement.style.width = this.size + 'px'
    this.icon.nativeElement.style.height = this.size + 'px'
    this.icon.nativeElement.style.aspectRation = "1/1"
  }

}
