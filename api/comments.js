'use strict' 

const Comment = require ('../models/comment');
const router = require('express').Router();

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
    console.log(req.body);
    try {
        const comment = await Comment.create(req.body);
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

router.delete('/:commentId', async (req, res, next) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        await comment.destroy();
        res.send(comment);
    } catch (error) {
        next(error);
    }
});


module.exports = router;