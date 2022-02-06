'use strict';

//require('dotenv').config();
const { faker } = require('@faker-js/faker');
const {
  db, User, World, Post, Comment 
} = require('../models');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating User, currently only one. Will add more when user functianlity is being implemented
  let user = {
      name: 'admin',
      email: 'email@email.com',
      password: '12345'
    };

  await User.create(user);
  

  let worlds = [];
  for (let i = 0; i < 10; i++) {
    worlds.push({
      name: `${faker.company.companyName()}`,
      description: `${faker.lorem.paragraph()}`,
      imageUrl: `${faker.image.nature()}`,  //if .nature not working try .imageUrl
      UserId: 1
    });
  }

  await World.bulkCreate(worlds);

  let NPCposts = [];
  for (let i = 0; i < 30; i++) {
    NPCposts.push({
      title: `${faker.company.companyName()}`,
      content: `${faker.lorem.sentence()}`,
      type: "NPC",  
      //imageUrl: `${faker.image.people()}`,  //if .people not working try .imageUrl
      WorldId: Math.floor(Math.random() * 10) + 1,
      UserId: 1
    });
  }

  await Post.bulkCreate(NPCposts);

  let placePosts = [];
  for (let i = 0; i < 30; i++) {
    placePosts.push({
    title: `${faker.address.county()}`,
    content: `${faker.lorem.sentence()}`,
    type: "location",  
    imageUrl: `${faker.image.city()}`,  //if .city not working try .imageUrl
    WorldId: Math.floor(Math.random() * 10) + 1,
    UserId: 1
    });
  }

  await Post.bulkCreate(placePosts);

  let itemPosts = [];
  for (let i = 0; i < 30; i++) {
    itemPosts.push({
      title: `${faker.commerce.product()}`,
      content: `${faker.lorem.sentence()}`,
      type: "item",  
      imageUrl: `${faker.image.technics()}`,  //if .people not working try .imageUrl
      WorldId: Math.floor(Math.random() * 10) + 1,
      UserId: 1
    });
  }

  await Post.bulkCreate(itemPosts);

  let comments = [];
  for (let i = 0; i < 100; i++) {
    comments.push({
      content: `${faker.lorem.sentence()}`, 
      imageUrl: `${faker.image.technics()}`,  //if .people not working try .imageUrl
      PostId: Math.floor(Math.random() * 90) + 1,
      UserId: 1
    });
  }

  await Comment.bulkCreate(comments);

  
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
