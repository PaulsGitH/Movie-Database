'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const animelistStore = {

  store: new JsonStore('./models/mycollection.json', { animelistCollection: [] }),
  collection: 'animelistCollection',
  array: 'movies',

  getAllAnimelists() {
    return this.store.findAll(this.collection);
  },
  
  getAnimelist(id) {
    return this.store.findOneBy(this.collection, (animelist => animelist.id === id));
  },
  
  addMovie(id, movie) {
    this.store.addItem(this.collection, id, this.array, movie);
  },
  
  async addAnimelist(animelist, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(animelist.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  animelist.picture = result.url;

  this.store.addCollection(this.collection, animelist);
  response();
},
  
  removeMovie(id, movieId) {
    this.store.removeItem(this.collection, id, this.array, movieId);
  },
  
  removeAnimelist(id) {
    const animelist = this.getAnimelist(id);
    this.store.removeCollection(this.collection, animelist);
  },
  
  editMovie(id, movieId, updatedMovie) {
    this.store.editItem(this.collection, id, movieId, this.array, updatedMovie);
  },
  
  getUserAnimelists(userid) {
  return this.store.findBy(this.collection, (animelist => animelist.userid === userid));
},

};

export default animelistStore;