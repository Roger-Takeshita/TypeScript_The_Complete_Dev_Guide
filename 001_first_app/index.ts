import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

interface LogTodoFn {
    (id: number, title: string, completed: boolean): void;
}

axios.get(url).then((response) => {
    const { id, title, completed } = response.data as Todo;
    // const { id, title, completed } = <Todo>response.data;
    logTodo(id, title, completed);
});

const logTodo: LogTodoFn = (id, title, completed) => {
    console.log(`
        The todo with ID: ${id}
        Has a title of: ${title}
        Is it finished? ${completed}
    `);
};
