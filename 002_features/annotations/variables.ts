// Primitives
let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// Built in objects
let now: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue'];
let number: number[] = [1, 2, 3];
let thruhs: boolean[] = [true, true, false];

// Classes
class Car {}

let car: Car = new Car();

// Object literal
type Point = {
    x: number;
    y: number;
};

let point: Point = {
    x: 10,
    y: 20,
};

// Functions
interface LogNumberFn {
    (i: number): void;
}

const logNumber: LogNumberFn = (i) => {
    console.log(i);
};

const logNumber2: (i: number) => void = (i) => {
    console.log(i);
};

// When to use annotations
// 1) Function that returns the `any` type
const json = '{"x": 10, "y": 20}';
const coordinates: Point = JSON.parse(json);
console.log(coordinates);

// 2) When we declare a variable on one line and initialize it later
let words = ['red', 'green', 'blue'];
let foundWords = false;

words.forEach((word) => {
    if (word === 'green') foundWords = true;
});

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: number | boolean = false;

number.forEach((num) => {
    if (num > 0) numberAboveZero = num;
});
