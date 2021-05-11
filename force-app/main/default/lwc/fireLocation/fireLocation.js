import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Set Fire object fields
const NAME_FIELD = 'Fire__c.Name';
const LOCATION_LATITUDE_FIELD = 'Fire__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Fire__c.Location__Longitude__s';
const RADIUS_FIELD = 'Fire__c.Radius__c';
const fireFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD,
  RADIUS_FIELD
];
export default class FireLocation extends LightningElement {
  @api recordId;
  name;
  mapMarkers = [];
  @wire(getRecord, { recordId: '$recordId', fields: fireFields })
  loadFire({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Fire data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      const Radius = getFieldValue(data, RADIUS_FIELD);
      // Transform Fire data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        type: 'Circle',
        radius: Radius,
        strokeColor: '#FFF000', 
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFF000', 
        fillOpacity: 0.35,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'Fire location';
  }
}