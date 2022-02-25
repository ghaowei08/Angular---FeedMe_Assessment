import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pendingList = []
  successList = []
  cookingList = []
  latestTimeout
  pan: number = 2
  id: number = 1
  vid: number = 1

  ngOnInit() {

  }

  counter(i: number) {
    return new Array(i)
  }

  onHandleOrder(type) {
    if (type == 'vip') {
      let vipNum = this.pendingList.filter(list => list.includes('V'))
      this.pendingList.splice(vipNum.length, 0, 'V' + this.vid.toString().padStart(4, '0'))
      this.vid++
    }
    else if (type == 'normal') {
      this.pendingList.push('N' + this.id.toString().padStart(4, '0'))
      this.id++
    }
    this.onCooking()
  }

  onCooking(){
    if(this.cookingList.length < this.pan && (this.pendingList.length || this.cookingList.length)){
      console.log(this.cookingList.length)
      this.cookingList.push(this.pendingList[0])
      this.pendingList.shift()
      this.latestTimeout = setTimeout(() => {
        this.successList.push(this.cookingList[0])
        this.cookingList.shift()
        clearTimeout(this.latestTimeout)
        this.onCooking()
      }, 3000)
    }
  }

  onAddorMinus(type) {
    if (type == 'add') {
      this.pan++
      this.onCooking()
    }
    else if (type == 'minus') {
      this.pan--
      if(this.cookingList.length > this.pan){
        this.pendingList.unshift(this.cookingList[this.cookingList.length - 1])
        this.cookingList.pop()
        clearTimeout(this.latestTimeout)
      }
    }
  }
}
