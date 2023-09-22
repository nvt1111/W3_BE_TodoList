import * as yup from 'yup';

export default async function validateTodo(ctx, next) {
    try {
        const data = ctx.request.body;
        console.log(data);
        let schema = yup.object().shape({
            title: yup.string().required().trim(),
            completed: yup.boolean(),
        });
        await schema.validate(data);

        return next();
    } catch (e) {
        console.error(e);
    }

}

