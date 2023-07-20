import { User } from './models/User';

const init = async () => {
    // const user = new User({ id: 1 });
    // await user.fetch();
    // user.set({ name: 'Mike', age: 7 });
    // await user.save();
    const newUser = new User({ name: 'Emily', age: 0.3 });
    await newUser.save();
    console.log(newUser);
};

init();
