'use strict';

import logger from "./utils/logger.js";
import express from 'express';
const router = express.Router();

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import animelist from './controllers/animelist.js';
import accounts from './controllers/accounts.js';

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/animelist/:id', animelist.createView);
router.post('/animelist/:id/addmovie', animelist.addMovie);
router.post('/dashboard/addanimelist', dashboard.addAnimelist);
router.get('/animelist/:id/deleteanime/:movieid', animelist.deleteMovie);
router.get('/dashboard/deleteanimelist/:id', dashboard.deleteAnimelist);
router.post('/animelist/:id/updatemovie/:movieid', animelist.updateMovie);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

export default router;