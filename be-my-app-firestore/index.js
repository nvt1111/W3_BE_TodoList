import Koa from 'koa'
import cors from '@koa/cors'
import { koaBody } from 'koa-body'
import routes from './routes/routes.js';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["PUT", "GET", "POST", "DELETE"],
        credentials: true
    })
);
// truyền body vào delete
app.use(koaBody({
    parsedMethods: ["PUT", "GET", "POST", "DELETE"]
}));
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(bodyParser())
app.use(koaBody({ urlencoded: true }));

app.listen(3001, () => {
    console.log('Server is listening http://localhost:3001');
})
