import { LightningElement, api } from 'lwc';
import yosemiteResources from '@salesforce/resourceUrl/yosemite_park';
export default class fireTile extends LightningElement {
	@api fire;
	appResources = {
        fireSilhouette: `${yosemiteResources}/img/fire-silhouette.png`,
	};
    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('fireview', {
            detail: this.fire.Id
        });
        this.dispatchEvent(selectEvent);
    }
}