import faker from 'faker'; 

export class User {
    name: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.name = faker.name.firstName();
        // this.location.lat = 10; -> this will throw undefined because we
        // need to initilize location fist
        this.location = {
            // we parseFloat because these 2 methods return strings and we need numbers
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    };
}