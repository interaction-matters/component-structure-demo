import { observable } from 'mobx';

class CounterStore {
  @observable timer = 0;

  plusClick() {
    this.timer +=1;
  }

  minusClick() {
  	this.timer -=1;
  }
}

export default CounterStore;
