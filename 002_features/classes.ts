class Vehicle {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    protected honk(): void {
        console.log('beep');
    }
}

class VehicleShortcut {
    constructor(public color: string) {}

    protected honk(): void {
        console.log('beep');
    }
}

const vehicle = new Vehicle('red');
console.log(vehicle.color);

const vehicle2 = new VehicleShortcut('red');
console.log(vehicle2.color);

class Car extends Vehicle {
    constructor(
        public wheels: number,
        color: string
    ) {
        super(color);
    }

    private drive(): void {
        console.log('vroom');
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const car1 = new Car(4, 'orange');
car1.startDrivingProcess();
