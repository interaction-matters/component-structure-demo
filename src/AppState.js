import { observable, action } from 'mobx';

class AppState {
  @observable timer = 0;
  @observable markerCollapse = false;
  @observable pinnedItemsCollapse = false;
  @observable dualScreen = false;
  @observable panelSize = "50%";

  @action collapseMarkers = () => {
  	this.markerCollapse = !this.markerCollapse;
  }

  @action triggerViewerMode = () => {
    this.dualScreen ? this.panelSize = "50%" : this.panelSize = 70; 
    this.dualScreen = !this.dualScreen;
    this.collapseMarkers();
    this.pinnedItemsCollapse = !this.pinnedItemsCollapse;
  }
}

export default AppState;