import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pendingList = [];
  successList = [];
  cookingList = [];
  latestTimeout;
  pan: number = 3;
  id: number = 1;
  vid: number = 1;

  ngOnInit() {}

  counter(i: number) {
    return new Array(i);
  }

  onHandleOrder(type) {
    if (type == 'vip') {
      let vipNum = this.pendingList.filter((list) => list.includes('V'));
      this.pendingList.splice(
        vipNum.length,
        0,
        'V' + this.vid.toString().padStart(4, '0')
      );
      this.vid++;
    } else if (type == 'normal') {
      this.pendingList.push('N' + this.id.toString().padStart(4, '0'));
      this.id++;
    }
    this.onCooking();
  }

  onCooking() {
    if (this.cookingList.length < this.pan) {
      this.cookingList.push(this.pendingList[0]);
      this.pendingList = this.pendingList.filter(
        (list) => list != this.pendingList[0] && list != undefined
      );
      let timeout = setTimeout(() => {
        this.successList.push(this.cookingList[0]);
        this.cookingList = this.cookingList.filter(
          (list) => list != this.cookingList[0] && list != undefined
        );
        if (this.pendingList.length != 0) this.onCooking();
        clearTimeout(timeout);
      }, 5000);
      this.latestTimeout = timeout;
    }
  }

  onAddorMinus(type) {
    if (type == 'add') {
      this.pan++;
      this.onCooking();
    } else if (type == 'minus') {
      this.pan--;
      if (this.cookingList.length > this.pan) {
        this.pendingList.unshift(this.cookingList[this.cookingList.length - 1]);
        this.cookingList.pop();
        clearTimeout(this.latestTimeout);
      }
    }
  }
}
