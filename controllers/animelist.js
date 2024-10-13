'use strict';

import logger from '../utils/logger.js';
import animelistStore from '../models/animelist-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const animelist = {
  createView(request, response) {
    const animelistId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Animelist id = ' + animelistId);
    
    const viewData = {
      title: 'Animelist',
      singleAnimelist: animelistStore.getAnimelist(animelistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    response.render('animelist', viewData);
},
  
  addMovie(request, response) {
    const animelistId = request.params.id;
    const animelist = animelistStore.getAnimelist(animelistId);
    const newMovie = {
      id: uuidv4(),
      title: request.body.title,
      director: request.body.director,
      release_date: request.body.release_date,
      genre: request.body.genre
    };
    animelistStore.addMovie(animelistId, newMovie);
    response.redirect('/animelist/' + animelistId);
},
  
  deleteMovie(request, response) {
    const animelistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie  $(movieId} from Animelist ${animelistId}`);
    animelistStore.removeMovie(animelistId, movieId);
    response.redirect('/animelist/' + animelistId);
},
  
  updateMovie(request, response) {
    const animelistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      id: movieId,
      title: request.body.title,
      director: request.body.director,
      release_date: request.body.release_date,
      genre: request.body.genre
    };
    animelistStore.editMovie(animelistId, movieId, updatedMovie);
    response.redirect('/animelist/' + animelistId);
},
  
};

export default animelist;