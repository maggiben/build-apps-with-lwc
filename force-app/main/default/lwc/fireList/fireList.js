import { publish, MessageContext } from 'lightning/messageService';
import FIRE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/FireListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
/** FireController.searchFires(searchTerm) Apex method */
import searchFires from '@salesforce/apex/FireController.searchFires';
export default class FireList extends NavigationMixin(LightningElement) {
	searchTerm = '';
    fires;
    @wire(MessageContext) messageContext;
    @wire(searchFires, {searchTerm: '$searchTerm'})
    loadFires(result) {
      this.fires = result;
      if (result.data) {
        const message = {
			fires: result.data
        };
        publish(this.messageContext, FIRE_LIST_UPDATE_MESSAGE, message);
      }
    }
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.fires.data.length > 0);
	}
	handleFireView(event) {
		// Get fire record id from fireview event
		const fireId = event.detail;
		// Navigate to fire record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: fireId,
				objectApiName: 'Fire__c',
				actionName: 'view',
			},
		});
	}
}