'use strict' 

const Comment = require ('../models/comment');
const Post = require('../models/post');
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

router.get('/:postId', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            where: {
                PostId: req.params.postId
            },
            //include: [User]
        });
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create(req.body);
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

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