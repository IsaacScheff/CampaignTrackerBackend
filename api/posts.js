// 'use strict' 

const Post = require ('../models/post');
const World = require('../models/world');
const User = require('../models/user');
const router = require('express').Router();


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

router.get('/singlepost/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.delete('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        await post.destroy();
        res.send(post);
    } catch (error) {
        next(error);
    }
});

router.put('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        res.send(await post.update(req.body));
    } catch (error) {
        next(error);
    }
});

module.exports = router;