const oldCivic = {
    name: 'civic',
    year: 2000,
    broken: true,
};

const printVehicle = (vehicle: { name: string, year: number, broken: boolean }): void => {
    console.log(`Name: ${vehicle.name}`)
    console.log(`Year: ${vehicle.year}`)
    console.log(`Broken: ${vehicle.broken}`)
}

printVehicle(oldCivic);

// better implementation of vehicle
interface Vehicle {
    name: string;
    year: number;
    broken: boolean;
    dispatchDate: Date;

    // method summary that returns a string
    summary(): string;
}

const printVehicle2 = (vehicle: Vehicle): void => {
    console.log(`Name: ${vehicle.name}`)
    console.log(`Year: ${vehicle.year}`)
    console.log(`Broken: ${vehicle.broken}`)
}

const oldCivic2 = {
    name: 'civic',
    year: 2000,
    broken: true,
    dispatchDate: new Date(),
    summary(): string {
        return this.name
    }
};

printVehicle2(oldCivic2);