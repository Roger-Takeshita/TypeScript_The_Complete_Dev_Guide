const profile = {
    name: 'Roger',
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
