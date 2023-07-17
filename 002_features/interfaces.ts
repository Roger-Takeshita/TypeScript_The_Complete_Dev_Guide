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
    name: 'civic',
    year: new Date(),
    broken: true,
    summary() {
        return `Name: ${this.name}`;
    },
};

const drink2 = {
    color: 'brown',
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
