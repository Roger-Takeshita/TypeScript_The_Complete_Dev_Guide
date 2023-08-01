import { User } from './models/User';

// const user = User.buildUser({ id: 1, name: 'Mike Cabecinha', age: 7 });
const user = User.buildUser({ id: 1 });

user.on('change', () => console.log({ event: 'change', user }));
user.on('save', () => console.log({ event: 'save', user }));

// user.save();
user.fetch();
