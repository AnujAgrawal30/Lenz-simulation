import { AfterViewInit, Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'lenz';
  num_coils = 13;
  options: AnimationOptions = {
    path: "../assets/MagenticFieldAnim.json"
  }

  constructor(){
  }

  ngAfterViewInit(): void {
    var elem = document.getElementById("dragger");
    var arrow1 = document.getElementById('arrow1');
    var arrow2 = document.getElementById('arrow2');
    var current = document.getElementById('current');
    if ((elem) && (arrow1) && (arrow2) && (current)){
      this.dragElement(elem, arrow1, arrow2, current);
    }
  }

  dragElement(elmnt: HTMLElement, arrow1: HTMLElement, arrow2: HTMLElement, current_elem: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var time = Date.now();
    var noise = 10, scale = 1000;
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      // pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      var dt = time - Date.now();
      time = Date.now();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      // pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      // pos4 = e.clientY;
      // set the element's new position:
      // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      var current = scale*pos1/dt;
      setCurrent(current);
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      setCurrent(0);
    }

    function setCurrent(current: number) {
      if ((current > -noise) && (current < noise)) {
        arrow1.style.setProperty('visibility', 'collapse');
        arrow2.style.setProperty('visibility', 'collapse');
        current_elem.textContent = "Current: " + '0 uA';
        return;
      }
      arrow1.style.setProperty('visibility', 'unset');
      arrow2.style.setProperty('visibility', 'unset');
      if (current < 0) {
        // Left current
        arrow1.style.setProperty('transform', 'none');
        arrow2.style.setProperty('transform', 'none');
      } else {
        // Right current
        arrow1.style.setProperty('transform', 'rotate(180deg)');
        arrow2.style.setProperty('transform', 'rotate(180deg)');
      }
      current_elem.textContent = "Current: " + Math.abs(current).toFixed(0) + "uA";
    }
  }
}
