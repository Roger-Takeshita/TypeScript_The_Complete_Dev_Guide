@classDecorator
class Boat {
    @testDecorator
    color: string = 'red';

    @testDecorator
    get formattedColor(): string {
        return `this boats color is ${this.color}`;
    }

    @logError('Ops boat was sunk in ocean')
    pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {
        if (speed === 'fast') {
            console.log('for family');
        } else {
            console.log('nothing');
        }
    }
}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value;
        desc.value = function () {
            try {
                method();
            } catch (e) {
                console.log(errorMessage);
            }
        };
    };
}

function testDecorator(target: any, key: string) {
    console.log({ location: 'testDecorator', target, key });
}

function parameterDecorator(target: any, key: string, idx: number) {
    console.log({ location: 'parameterDecorator', target, key, idx });
}

function classDecorator(constructor: typeof Boat) {
    console.log({ location: 'classDecorator', constructor });
}

new Boat().pilot('fast', true);
