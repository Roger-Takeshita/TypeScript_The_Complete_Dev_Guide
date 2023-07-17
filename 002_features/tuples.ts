const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
};

// Tuple
const pepsi: [string, boolean, number] = ['brown', true, 40];

pepsi[0] = 40; // Type 'number' is not assignable to type 'string'.

// Type alias
type Drink = [string, boolean, number];

const sprite: Drink = ['white', true, 30];

const carSpecs: [number, number] = [400, 3354];

const carStats = {
    horsePower: 400,
    weight: 3354,
};
