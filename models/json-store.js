'use strict';

// Importing necessary modules from lowdb for managing JSON files
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Defining the JsonStore class
class JsonStore {
  // Constructor to initialize the JsonStore object
  constructor(file, defaults) {
    // Creating a new instance of Low with a JSONFile adapter
    this.db = new Low(new JSONFile(file), defaults);
    // Reading data from the JSON file
    this.db.read();
  }

  // Method to find all items in a collection
  findAll(collection) {
    return this.db.data[collection];
  }

  // Method to find items in a collection based on a filter function
  findBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results;
  }

  // Method to find one item in a collection based on a filter function
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }

  // Method to add a new collection to the database
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write();
  }

  // Method to add a new item to a collection in the database
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }

  // Method to remove a collection from the database
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write();
  }

  // Method to remove an item from a collection in the database
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    const item = data[0][arr].filter((i) => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    await this.db.write();
  }

  // Method to edit a collection in the database
  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection].splice(index, 1, obj);
    }
    await this.db.write();
  }

  // Method to edit an item in a collection in the database
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }
}

// Exporting the JsonStore class
export default JsonStore;
