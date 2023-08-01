import { User } from './models/User';

const user = new User({ id: 1, name: 'Mike Cabecinha', age: -1 });

user.on('change', () => console.log({ event: 'change', user }));
user.on('save', () => console.log({ event: 'save', user }));

user.save();
