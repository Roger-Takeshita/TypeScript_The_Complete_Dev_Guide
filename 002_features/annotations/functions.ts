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

const multiply = function (a: number, b: number): number {
    return a * b;
};

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

const todaysWeather = {
    date: new Date(),
    weather: 'sunny',
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
};

logWeather(todaysWeather);

// ES2015
const logWeather2 = ({ date, weather }: { date: Date; weather: string }): void => {
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
