'use strict' 

const Post = require ('../models/post');
const World = require('../models/world');
const User = require('../models/user');
const router = require('express').Router();

// router.get('/', async (req, res, next) => {
//     try {
//         const worlds = await World.findAll();
//         res.json(worlds);
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/:worldId', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                WorldId: req.params.worldId
            },
            //include: [User]
        });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

// router.post('/', async (req, res, next) => {
//     try {
//         const world = await World.create(req.body);
//         res.json(world);
//     } catch (error) {
//         next(error);
//     }
// });

// router.delete('/:worldId', async (req, res, next) => {
//     try {
//         const world = await World.findByPk(req.params.worldId);
//         await world.destroy();
//         res.send(world);
//     } catch (error) {
//         next(error);
//     }
// });

// router.put('/:worldId', async (req, res, next) => {
//     try {
//         const world = await World.findByPk(req.params.worldId);
//         res.send(await world.update(req.body));
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;