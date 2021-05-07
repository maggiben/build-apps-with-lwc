public with sharing class FireController {
    @AuraEnabled(Cacheable=true)
    public static Fire__c[] getAllFires() {
        return [
            SELECT
                Id,
                Name,
                Age__c,
                Radius__c,
                Temperature__c,
                Humidity__c,
                Height__c,
                Weight__c,
                Location__Latitude__s,
                Location__Longitude__s,
                Supervisor__r.Name
            FROM Fire__c
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Fire__c[] searchFires(String searchTerm) {
        // Return all Fires when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllFires();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT
                Id,
                Name,
                Age__c,
                Radius__c,
                Temperature__c,
                Humidity__c,
                Height__c,
                Weight__c,
                Location__Latitude__s,
                Location__Longitude__s,
                Supervisor__r.Name
            FROM Fire__c
            WHERE Name LIKE :searchTerm
            ORDER BY Name
            LIMIT 50
        ];
    }
}
