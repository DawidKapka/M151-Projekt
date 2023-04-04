import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as movieRouter } from './movie/index.js';
import auth from './auth.js';
import { ensureLoggedIn } from 'connect-ensure-login';
import bodyParser from "body-parser";

const app = express();
const PORT = 8080;

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

app.use(morgan('common', { immediate: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

auth(app);

app.use('/movie', ensureLoggedIn('/login.html'), movieRouter);

app.get('/', (request, response) => response.redirect('/movie'));

app.listen(PORT, () => {
  console.log(`Server startet at: http://localhost:${PORT}`);
});
