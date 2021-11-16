import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// Interfaces helps define an object structure
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then((response) => {
    // Assign interface to object
    const todo = response.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
});

// Add type annotations to function parameters
const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
        The todo with id: ${id}
        Has a title of: ${title}
        Is it completed? ${completed}
    `);
};
