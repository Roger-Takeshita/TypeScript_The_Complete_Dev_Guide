import 'reflect-metadata';

@controller
class Plane {
    color: string = 'red';

    @get('/')
    fly(): void {
        console.log('vrrrrrr');
    }
}

function get(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
    };
}

function controller(constructor: typeof Plane) {
    for (const key in constructor.prototype) {
        const path = Reflect.getMetadata('path', constructor.prototype, key);
        router.get(path, target.prototype[key]);
    }
}

const secret = Reflect.getMetadata('path', Plane.prototype, 'fly');
console.log(secret);
