const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET all posts for homepage. Read operation. 
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
            order: [['date_created', 'DESC']],  
            });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts,
            loggedIn: req.session.loggedIn });
        } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single post. Read operation.
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('single-post', { 
                post,
                loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end();
        }
        } catch (err) {
        res.status(500).json(err);
    }
});

// GET login route. if successful, redirect to homepage. Otherwise, render login page.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// GET signup route for user if they want to signup. If already logged in, redirect to homepage.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;


