const today = new Date();
today.getDate();

const person = {
    age: 20,
};

// Classes also define types on ts, so here we have a type of Color
class Color {}

const red = new Color();

/** Type annotation: code to tell typescript the type of value */
/** Type inference: typescript tries to guess the type of value */

/**
 * IMPORTANT!!!! for ts to figure out a type for itself (type inference) the declaration and initialization must be in the same line
 *
 * USE TYPE INFERENCE ANY TIME YOU CAN!!!!!!
 * USE TYPE ANNOTATIONS when:
 * * declaring a variable on one line and initialize it later
 * * variable have a type that cant be inferred
 * * function returns the 'any' type and we need to clarify the value
 * */

// Annotations with variables
const apples: number = 5;
const flag: boolean = true;
const twoTypes: number | boolean = 10;

let nothing: null = null;
// let nothing2: null = undefined;
let nothing3: undefined = undefined;
// let nothing4: undefined = null;

// Type Annotations with built in objects
let now: Date = new Date();

// Type Annotations with arrays
// IMPORTANT! the annotation is not creating an array, just declaring the type of the values inside
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [];
let myBooleans: boolean[] = [true, true, false];

// Type Annotations with Classes
class Car {}

let car: Car = new Car();

// Type Annotations with object literal
let point: { x: number; y: number } = {
    x: 10,
    y: 20,
};

// Type Annotations with functions
// void is to return nothing
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};

/**
 * The 'any' type
 * It means ts cannot figure out the type of the entity
 * AVOID VARIABLES WITH 'ANY' AT ALL COST
 * */
const json = '{"x": 10, "y": 20}';

// Here, JSON.parse() returns any, so we can add an object type annotation in order to ensure
// the coordinates variable to have as type and not any
const coordinates = JSON.parse(json);
console.log(coordinates); // { x: 10, y: 20 }

let coordinates2: { x: number; y: number } = JSON.parse(json);

/**
 * Annotations for functions.
 * For functions, type inference only works for the return value and not
 * for the arguments, but anyway we never try to let ts infer a function return value because
 * If you dont type annotate the return value and you forget the return statement, ts will
 * not mark it as an error
 * */
const add = (a: number, b: number): number => {
    return a + b;
};

function divide(a: number, b: number): number {
    return a / b;
}

const logger = (message: string): void => {
    console.log(message);
};

const throwError = (message: string): never => {
    throw new Error(message);
};

const throwError2 = (message: string): string => {
    if (!message) {
        throw new Error(message);
    }

    return message;
};

/**
 * Destructuring with annotations
 */
const todaysWeather = {
    date: new Date(),
    weather: 'sunny',
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
};

logWeather(todaysWeather);

const logWeather2 = ({ date, weather }: { date: Date; weather: string }): void => {
    console.log(date);
    console.log(weather);
};

/**
 * type annotations with objects
 */
const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15,
    },
    setAge(age: number): void {
        this.age = age;
    },
};

const { age }: { age: number } = profile;
const {
    coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

/**
 * Type annotations for arrays
 */

// If all values are of the same type, ts infer the type
const carMakers = ['ford', 'toyota', 'chevy'];

// If we initialize the array empty, then we annotate it
const carMarks: string[] = [];

// with objects inside
// ts infer a type Date
const dates = [new Date(), new Date()];

// ts infer a type of string[][]
const carsByMake = [
    ['f50'],
    ['corolla'],
    ['camaro']
];

const carsByMake2: string[][] = [];

// flexible array types
// here, ts infer a type of (Date | String)[]
const importantDates = [
    new Date(),
    '2030-10-10'
];

// Annotate if you dont initialize the array right away
const importantDates2: (Date | String)[] = [];
importantDates2.push('3032-10-10');
importantDates2.push(new Date);
