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
  bot: number = 3;
  id: number = 1;
  vid: number = 1;

  ngOnInit() { 
    
  }

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
    if (this.cookingList.length < this.bot && this.pendingList.length != 0) {

      let timeout = setTimeout(() => {
        // Move cooking to success
        this.successList.push(this.cookingList[0]);
        clearTimeout(this.cookingList[0].timeout);
        this.cookingList = this.cookingList.filter(
          (list) => list != this.cookingList[0] && list != undefined
        );
        // After bot is free, check pending
        if (this.pendingList.length != 0) this.onCooking();
      }, 10000);

      // Move pending to cooking
      this.cookingList.push({ id: this.pendingList[0], timeout });
      this.pendingList = this.pendingList.filter(
        (list) => list != this.pendingList[0] && list != undefined
      );
    }
  }

  onAddorMinus(type) {
    if (type == 'add') {
      this.bot++;
    } else if (type == 'minus') {
      this.bot--;
      if (this.cookingList.length > this.bot) {
        this.pendingList.unshift(this.cookingList[this.cookingList.length - 1].id);
        clearTimeout(this.cookingList[this.cookingList.length - 1].timeout)
        this.cookingList.pop();
      }
    }
    this.onCooking();
  }
}
