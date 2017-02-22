import { observable, action } from 'mobx';

class AppState {
  @observable timer = 0;
  @observable markerCollapse = false;
  @observable dualScreen = false;
  @observable panelSize = "50%";

  @action toggleSize = () => {
  	console.log(this.dualScreen);
  	console.log(this.panelSize);
  	console.log(this.markerCollapse);
  }

  @action triggerViewerMode = () => {
    this.dualScreen ? this.panelSize = "50%" : this.panelSize = "20%"; 
    this.dualScreen = !this.dualScreen;
    this.markerCollapse = !this.markerCollapse;
  }
}

export default AppState;