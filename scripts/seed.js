'use strict';

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

  // Creating User, currently only one. Will add more when user functionality is being implemented
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
      //grabbing images from picsum, the randomizer is for the id
      imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  
      UserId: 1
    });
  }

  await World.bulkCreate(worlds);

  let NPCposts = [];
  for (let i = 0; i < 25; i++) {
    NPCposts.push({
      title: `${faker.name.findName()}`,
      content: `${faker.lorem.sentence()}`,
      type: "NPC",  
      //imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  //posts wont always have images
      WorldId: Math.floor(Math.random() * 10) + 1,
      UserId: 1
    });
  }

  await Post.bulkCreate(NPCposts);

  let placePosts = [];
  for (let i = 0; i < 25; i++) {
    placePosts.push({
    title: `${faker.address.county()}`,
    content: (i % 2 === 0 ? `${faker.lorem.paragraph()}` : `${faker.lorem.sentence()}`),  //to simulate that post lenght will vary
    type: "location",  
    imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  
    WorldId: Math.floor(Math.random() * 10) + 1,
    UserId: 1
    });
  }

  await Post.bulkCreate(placePosts);

  let itemPosts = [];
  for (let i = 0; i < 25; i++) {
    itemPosts.push({
      title: `${faker.commerce.product()}`,
      content: `${faker.lorem.sentence()}`,
      type: "item",  
      imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  
      WorldId: Math.floor(Math.random() * 10) + 1,
      UserId: 1
    });
  }

  await Post.bulkCreate(itemPosts);

  let extraTypePosts = [];
  for (let i = 0; i < 25; i++) {
    extraTypePosts.push({
      title: `${faker.commerce.product()}`,
      content: (i % 2 === 0 ? `${faker.lorem.paragraph()}` : `${faker.lorem.sentence()}`),  //to simulate that post lenght will vary
      type: `extraType${Math.floor(Math.random() * 5) + 1}`,  
      imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  
      WorldId: Math.floor(Math.random() * 10) + 1,
      UserId: 1
    });
  }

  await Post.bulkCreate(extraTypePosts);

  let comments = [];
  for (let i = 0; i < 200; i++) {
    comments.push({
      content: `${faker.lorem.sentence()}`, 
      imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000`,  
      PostId: Math.floor(Math.random() * 60) + 1,
      UserId: 1
    });
  }

  await Comment.bulkCreate(comments);

  
  console.log(`seeded successfully`);
}


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


if (module === require.main) {
  runSeed();
}

module.exports = seed;
