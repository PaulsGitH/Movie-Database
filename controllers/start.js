'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import animelistStore from '../models/animelist-store.js';
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");

    if (loggedInUser) {
      const userAnimelists = animelistStore.getUserAnimelists(loggedInUser.id);
      
      if (userAnimelists.length > 0) {
        const numAnimelists = userAnimelists.length;
        let numMovies = 0;
        for (const animelist of userAnimelists) {
          numMovies += animelist.movies.length;
        }
        
        let largestAnimelist = userAnimelists.reduce((max, animelist) => (animelist.movies.length > max.movies.length ? animelist : max), userAnimelists[0]);
        let smallestAnimelist = userAnimelists.reduce((min, animelist) => (animelist.movies.length < min.movies.length ? animelist : min), userAnimelists[0]);
        
        const average = (numMovies/numAnimelists);
        
        const viewData = {
          title: 'Welcome to the Animelist app!',
          fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
          picture: loggedInUser.picture,
          firstName: loggedInUser.firstName,
          displayNumAnimelists: numAnimelists,
          displayNumMovies: numMovies,
          displayAvgMovies: average,
          displayLargestAnimelist: largestAnimelist.title,
          displaySmallestAnimelist: smallestAnimelist.title
        };
        
        response.render('start', viewData);
      } else {
        const viewData = {
          title: 'Welcome to the Animelist app!',
          fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
          picture: loggedInUser.picture,
          firstName: loggedInUser.firstName,
          displayNumAnimelists: 0,
          displayNumMovies: 0,
          displayAvgMovies: 0,
          displayLargestAnimelist: "No animelists yet",
          displaySmallestAnimelist: "No animelists yet"
        };
        
        response.render('start', viewData);
      }
    }
    else {
      response.redirect('/');
    }  
  },
};

export default start;
