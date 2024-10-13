'use strict';

// Importing dependencies
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';

// Defining the 'about' object
const about = {
  // Function to create the view for the about page
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'Animelist App Dashboard',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        info: appStore.getAppInfo()
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

// Exporting the 'about' object
export default about;
