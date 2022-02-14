'use strict' 
const World = require('../models/world');
const User = require('../models/user');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        const worlds = await World.findAll();
        res.json(worlds);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:WorldId', async (req, res, next) => {
    try {
        const world = await World.findOne({
            where: {
                id: req.params.WorldId
            },
            include: [User]
        });
        res.json(world);
    } catch (error) {
        next(error);
    }
});

router.get('/name/:worldName', async (req, res, next) => {
    try {
        const world = await World.findOne({
            where: {
                name: req.params.worldName
            }
        });
        res.json(world);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const world = await World.create(req.body);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(world);
    } catch (error) {
        console.log(error.errors[0].message);
        res.json(error);
    }
});

router.delete('/:worldId', async (req, res, next) => {
    try {
        const world = await World.findByPk(req.params.worldId);
        await world.destroy();
        res.send(world);
    } catch (error) {
        next(error);
    }
});

router.put('/:worldId', async (req, res, next) => {
    try {
        const world = await World.findByPk(req.params.worldId);
        res.send(await world.update(req.body));
    } catch (error) {
        next(error);
    }
});

module.exports = router;