import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import FIRE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/FireListUpdate__c';
export default class FireMap extends LightningElement {
  mapMarkers = [];
  subscription = null;
  @wire(MessageContext)
  messageContext;
  connectedCallback() {
    // Subscribe to FireListUpdate__c message
    this.subscription = subscribe(
        this.messageContext,
        FIRE_LIST_UPDATE_MESSAGE,
        (message) => {
            this.handleFireListUpdate(message);
        });
  }
  disconnectedCallback() {
    // Unsubscribe from FireListUpdate__c message
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  handleFireListUpdate(message) {
    this.mapMarkers = message.fires.map(fire => {
      const Latitude = fire.Location__Latitude__s;
      const Longitude = fire.Location__Longitude__s;
      return {
        location: { Latitude, Longitude },
        title: fire.Name,
        description: `Coords: ${Latitude}, ${Longitude}`,
        icon: 'utility:warning'
      };
    });
  }
}