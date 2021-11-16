// Tuples are an array-like structure where each element represents
// some property of a record
const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
}

// Define the order of elements inside the tuple
const pepsi: [string, boolean, number] = ['brown', true, 40];

// We can use a type alias to define the drink
type Drink = [string, boolean, number];

const pepsi2: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];