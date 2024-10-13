'use strict';

import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import animelistStore from "../models/animelist-store.js";
import accounts from './accounts.js';

const dashboard = {
  createView(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Animelist Dashboard',
      animelists: animelistStore.getUserAnimelists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    logger.info('about to render' + viewData.animelists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  addAnimelist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);   
    const timestamp = new Date();
	
    const newAnimelist = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      movies: [],
      date: timestamp,
      picture: request.files.picture,
    };
    
    animelistStore.addAnimelist(newAnimelist, function() {
        response.redirect("/dashboard");
    });
},
  
  deleteAnimelist(request, response) {
    const animelistId = request.params.id;
    logger.debug(`Deleting Animelist ${animelistId}`);
    animelistStore.removeAnimelist(animelistId);
    response.redirect("/dashboard");
  },
  
};

export default dashboard;