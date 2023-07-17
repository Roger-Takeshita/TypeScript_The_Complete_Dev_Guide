const carMakers: string[] = ['ford', 'tyota', 'chevy'];
const dates = [new Date(), new Date(), new Date()];

// Two dimensional array
const carsByMake: string[][] = [['f150'], ['corola'], ['camaro']];

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
importantDates.push('2023-10-10');
importantDates.push(new Date());
