import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Fire object fields
import SUPERVISOR_FIELD from '@salesforce/schema/Fire__c.Supervisor__c';
const fireFields = [SUPERVISOR_FIELD];
export default class FireSupervisor extends LightningElement {
	@api recordId; // Fire Id
	@wire(getRecord, { recordId: '$recordId', fields: fireFields })
	fire;
	get supervisorId() {
		return getFieldValue(this.fire.data, SUPERVISOR_FIELD);
	}
}