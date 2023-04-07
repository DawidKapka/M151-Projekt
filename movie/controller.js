import {getAll, remove, get, save, saveRating, getAllRatings, getRatingAverages} from './model.js';
import { render } from './view.js';
import { render as form } from './form.js';

export async function listAction(request, response) {
  const data = await getAll(request.user.id);
  const ratings = await getAllRatings(request.user.id);
  const ratingAverages = await getRatingAverages(data);
  const body = render(data, request.user, ratings, ratingAverages);
  response.send(body);
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id, request.user.id);
  response.redirect(request.baseUrl);
}

export async function formAction(request, response) {
  let movie = { id: '', title: '', year: '', public: '' };
  console.log(request.params.id);

  if (request.params.id) {
    movie = await get(request.params.id, request.user.id);
  }
  const body = form(movie);
  response.send(body);
}

export async function saveAction(request, response) {
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
    public: request.body.public === '1' ? 1 : 0,
  };
  await save(movie, request.user.id);
  response.redirect(request.baseUrl);
}

export async function rateAction(request, response) {
  const rating = {
    movie: request.params.id,
    rating: request.body.rating,
    user: request.user.id
  };
  await saveRating(rating);
  response.redirect(request.baseUrl);
}
