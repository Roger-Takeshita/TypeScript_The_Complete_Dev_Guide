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
