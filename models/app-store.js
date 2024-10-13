'use strict';

// Importing the logger utility module
import logger from '../utils/logger.js';
// Importing the JsonStore class from json-store.js module
import JsonStore from './json-store.js';

// Defining the appStore object
const appStore = {
  // Creating a new instance of JsonStore for storing app information
  store: new JsonStore('./models/app-store.json', { info: {} }),
  // Collection name for storing app information
  collection: 'info',
  // Array name within the collection
  array: 'creators',

  // Method to get all app information
  getAppInfo() {
    return this.store.findAll(this.collection);
  },
};

// Exporting the appStore object
export default appStore;
