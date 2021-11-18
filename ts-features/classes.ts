class Vehicle {
    // In classes, properties must be initialized inline or
    // in the constructor
    private number: number = 0;
    protected wheel: boolean;
    public color: string;
    public drive(): void {
        console.log('driving');
    }

    public constructor(color: string) {
        this.color = color;
        this.wheel = true;
    } 

/**
 * With this syntax, the first argument will become
 * a property of the object:
 * public color: string;
 */
    // public constructor(public color: string) {} 

    public honk(): void {
        console.log('honking');
    }

    public ignite(): void {
        this.drive();
        this.honk();
    }
}

const vehicle = new Vehicle('red');
vehicle.drive();

// Inheritance in ts
class Car extends Vehicle {
    /**
     * Wheels have the public modifier, so it will become a property
     * of the Car object. color doesn't have modifier because its passed to fullfill parent's constructor
     * @param wheels
     * @param color 
     */
    constructor(public wheels: number, color: string) {
        // call parent's constructor
        super(color);
    }
    // ovewriting Vehicle drive method
    // To override a method, the method scope (public, private, protected ) must be the same
    public drive(): void {
        console.log('driving car')
    }
}

const car = new Car(4, 'red');

car.drive();
car.honk();