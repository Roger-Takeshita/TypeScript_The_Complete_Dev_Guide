# TYPESCRIPT_THE_COMPLETE_DEV_GUIDE

<details>
  <summary id='table-of-contents' style="padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 1.5em; border-bottom: 1px solid #D8DEE3;">
    Table of Contents
  </summary>

<!-- Begin Table of Contents GFM -->

- [Links](#links)
- [What is a Type System?](#what-is-a-type-system)
  - [Type](#type)
- [Type Annotations in Action](#type-annotations-in-action)
  - [Type Any](#type-any)
- [Annotations With Functions and Objects](#annotations-with-functions-and-objects)
  - [Interface Around Functions](#interface-around-functions)
  - [Interface for Anonymous Functions](#interface-for-anonymous-functions)
  - [Void and Never](#void-and-never)
  - [Destructuring With Annotations](#destructuring-with-annotations)
  - [Annotations Around Objects](#annotations-around-objects)
- [Arrays](#arrays)
- [Tuples](#tuples)
- [Interfaces](#interfaces)
- [Classes](#classes)

<!-- End Table of Contents -->

</details>

## Links

- [Typescript: The Complete Developer's Guide](https://www.udemy.com/course/typescript-the-complete-developers-guide)
- [Json Place Holder](https://jsonplaceholder.typicode.com/)

## What is a Type System?

### Type

[☰ Contents](#table-of-contents)

`Type` = Easy way to refer to the different properties + functions that a value has

![](./assets/images/2023-07-14-15-33-50.png)

Why do we care about types?

- Types are used by the TypeScript Compiler to analyze our code for errors.
- Types allow other engineers to understand what values are flowing around our codebase.

## Type Annotations in Action

[☰ Contents](#table-of-contents)

- `Type Annotations`

  - Code we add to tell TypeScript what type of value a variable will refer to

- `Type Inference`

  - TypeScript tries to figure out what type of value a variable refers to

![](./assets/images/2023-07-14-16-01-40.png)

### Type Any

[☰ Contents](#table-of-contents)

- A type, just as `string` or `boolean` are
- Means TS has no idea what this is - can't check for correct property references
- **Avoid variables with `any` at all costs**

  ```typescript
  // 1) Function that returns the `any` type
  const json = '{"x": 10, "y": 20}';
  const coordinates: Point = JSON.parse(json);
  console.log(coordinates);

  // 2) When we declare a variable on one line and initialize it later
  let words = ["red", "green", "blue"];
  let foundWords = false;

  words.forEach((word) => {
    if (word === "green") foundWords = true;
  });

  // 3) Variable whose type cannot be inferred correctly
  let numbers = [-10, -1, 12];
  let numberAboveZero: number | boolean = false;

  number.forEach((num) => {
    if (num > 0) numberAboveZero = num;
  });
  ```

## Annotations With Functions and Objects

[☰ Contents](#table-of-contents)

- `Type Annotations for Functions`

  - Code we add to tell Typescript what type of arguments a function will receive and what type of values it will return

- `Type Inference for Functions`

  - TypeScript tries to figure out what type of value a function will return

### Interface Around Functions

[☰ Contents](#table-of-contents)

```typescript
interface AddFn {
  (a: number, b: number): number;
}

const add: AddFn = (a, b) => {
  return a + b;
};

const add2 = (a: number, b: number): number => {
  return a + b;
};

// TypeScript didn't give us an error
const subtratct = (a: number, b: number) => {
  a - b;
};

function devide(a: number, b: number): number {
  return a / b;
}
```

### Interface for Anonymous Functions

[☰ Contents](#table-of-contents)

```typescript
const multiply = function (a: number, b: number): number {
  return a * b;
};
```

### Void and Never

[☰ Contents](#table-of-contents)

```typescript
const logger = (message: string): void => {
  console.log(message);
};

// Probably never we are going to use in the real world
const throwError = (message: string): never => {
  throw new Error(message);
};

// This is more like a real world scenario
const throwError2 = (message: string): string => {
  if (!message) throw new Error(message);

  return message;
};
const throwError3 = (message: string): void => {
  if (!message) throw new Error(message);
  console.log(message);
};
```

### Destructuring With Annotations

[☰ Contents](#table-of-contents)

```typescript
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

logWeather(todaysWeather);
```

```typescript
// ES2015
const logWeather2 = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather2(todaysWeather);

interface LogWeather3Fn {
  (forecast: { date: Date; weather: string }): void;
}
const logWeather3: LogWeather3Fn = ({ date, weather }) => {
  console.log(date);
  console.log(weather);
};

logWeather3(todaysWeather);

type Forecast = {
  date: Date;
  weather: string;
};

interface LogWeather4Fn {
  (forecast: Forecast): void;
}
const logWeather4: LogWeather4Fn = ({ date, weather }) => {
  console.log(date);
  console.log(weather);
};

logWeather4(todaysWeather);
```

### Annotations Around Objects

[☰ Contents](#table-of-contents)

```typescript
const profile = {
  name: "Roger",
  age: 36,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age, name: firstName }: { age: number; name: string } = profile;
const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
```

## Arrays

[☰ Contents](#table-of-contents)

Array where each element is some consistent type of value.

- Why do we care?

  - TS can do type inference when extracting values from an array
  - TS can prevent us from adding incompatible values to the array
  - We can get help with `map`, `forEach`, `reduce` functions
  - Flexible - arrays can still contain multiple different types

- Where to use typed arrays?

  - Any time we need to represent a collection of records with some arbitrary sort order

```typescript
const carMakers: string[] = ["ford", "tyota", "chevy"];
const dates = [new Date(), new Date(), new Date()];

// Two dimensional array
const carsByMake: string[][] = [["f150"], ["corola"], ["camaro"]];

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100); //Argument of type 'number' is not assignable to parameter of type 'string'.

// Help with `map`
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push("2023-10-10");
importantDates.push(new Date());
```

## Tuples

[☰ Contents](#table-of-contents)

Array-like structure where each element represents some property of a record

![](./assets/images/2023-07-17-09-37-52.png)

```typescript
const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
};

// Tuple
const pepsi: [string, boolean, number] = ["brown", true, 40];

pepsi[0] = 40; // Type 'number' is not assignable to type 'string'.

// Type alias
type Drink = [string, boolean, number];

const sprite: Drink = ["white", true, 30];
```

## Interfaces

[☰ Contents](#table-of-contents)

General strategy for reusable code in TS

- Create functions that accept arguments that are types with interfaces
- Objects/classes can decide to `implement` a given interface to work with a function

```typescript
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary() {
    return `Name: ${this.name}`;
  },
};

const drink2 = {
  color: "brown",
  carbonated: true,
  sugar: 40,
  summary() {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink2);
```

## Classes

[☰ Contents](#table-of-contents)

- TypeScript Class vs JavaScript Class

  - **Modifiers**
    - `public`: this method can be called any where, any time
    - `private`: this method can only be called by other methods in `this` class
    - `protected`: this method can be called by other methods in `this` class, or by other methods in child classes

```typescript
class Vehicle {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  protected honk(): void {
    console.log("beep");
  }
}

class VehicleShortcut {
  constructor(public color: string) {}

  protected honk(): void {
    console.log("beep");
  }
}

const vehicle = new Vehicle("red");
console.log(vehicle.color);

const vehicle2 = new VehicleShortcut("red");
console.log(vehicle2.color);

class Car extends Vehicle {
  constructor(
    public wheels: number,
    color: string,
  ) {
    super(color);
  }

  private drive(): void {
    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car1 = new Car(4, "orange");
car1.startDrivingProcess();
```
