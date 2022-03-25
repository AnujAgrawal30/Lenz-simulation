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
    path: "./assets/MagenticFieldAnim.json"
  }

  constructor(){
  }

  ngAfterViewInit(): void {
    var elem = document.getElementById("dragger");
    var arrow1 = document.getElementById('arrow1');
    var arrow2 = document.getElementById('arrow2');
    var current = document.getElementById('current');
    var num_coils_elem = document.getElementById('num_coils');
    var bulb = document.getElementById('bulb');
    var ammeter = document.getElementById('ammeter');
    if ((elem) && (arrow1) && (arrow2) && (current) && (num_coils_elem) && (bulb) && (ammeter)){
      this.dragElement(elem, arrow1, arrow2, current, num_coils_elem, bulb, ammeter);
    }
  }

  dragElement(elmnt: HTMLElement, arrow1: HTMLElement, arrow2: HTMLElement, current_elem: HTMLElement, num_coils_elem: HTMLElement, bulb: HTMLElement, ammeter: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var time = Date.now();
    var noise = 10, scale = 1000;
    var current = 0;
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
      var dt = Date.now() - time;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      // pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      // pos4 = e.clientY;
      // set the element's new position:
      // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      if (dt > 100) {
        current = scale*pos1/dt;
        time = Date.now();
      }
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
        bulb.style.setProperty('visibility', 'collapse');
        current_elem.textContent = "Current: " + '0 uA';
        ammeter.style.backgroundImage = "url('./assets/Ammeter.svg')";
        return;
      }
      arrow1.style.setProperty('visibility', 'unset');
      arrow2.style.setProperty('visibility', 'unset');
      bulb.style.setProperty('visibility', 'unset');
      if (current < 0) {
        // Left current
        arrow1.style.setProperty('transform', 'none');
        arrow2.style.setProperty('transform', 'none');
        ammeter.style.backgroundImage = "url('./assets/AmmeterLeft.svg')";
      } else {
        // Right current
        arrow1.style.setProperty('transform', 'rotate(180deg)');
        arrow2.style.setProperty('transform', 'rotate(180deg)');
        ammeter.style.backgroundImage = "url('./assets/AmmeterRight.svg')";
        
      }
      if (num_coils_elem.textContent){
        var num: number = +num_coils_elem.textContent;
        // current_moving = (1000*current_moving + current) / 1001;
        current_elem.textContent = "Current: " + Math.abs(num*current).toFixed(0) + "uA";
      }
    }
  }
}
