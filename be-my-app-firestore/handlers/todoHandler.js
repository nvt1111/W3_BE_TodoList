import {
    getAll, add,
    updateTodo, deleteTodo
} from '../database/todoRepository.js';

const getTodos = async (ctx) => {
    try {
        const data = await getAll();
        ctx.body = {
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const createTodo = async (ctx) => {
    try {
        const data = ctx.request.body
        const newTodos = await add(data);

        ctx.status = 201;
        ctx.body = {
            success: true,
            message: `Todo with ID ${data.id} has been created`,
            data: newTodos
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}


const updateTodoById = async (ctx) => {
    try {
        const data = await updateTodo([ctx.params.id]);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.params.id} has been UPDATED`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const updateTodoByIds = async (ctx) => {
    try {
        const data = await updateTodo(ctx.request.body.ids);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.request.body.ids} has been UPDATE`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const deleteTodoById = async (ctx) => {
    try {
        const data = await deleteTodo([ctx.params.id]);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.params.id} has been deleted`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const deleteTodoByIds = async (ctx) => {
    try {
        const data = await deleteTodo(ctx.request.body.ids);

        ctx.body = {
            success: true,
            message: `Todo with ID ${ctx.request.body} has been DELETE`,
            data: data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

export default {
    updateTodoById,
    createTodo,
    getTodos,
    deleteTodoById,
    updateTodoByIds,
    deleteTodoByIds
}

