const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../util/auth.js');


// GET all posts for dashboard. req.session.user_id is used to find all posts by the logged in user.
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts
        });
    } catch (err) {
        res.redirect('login');
    }
});

// GET /new route, which renders the new-post page.
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    });
});

// GET /edit/:id route, which renders the edit-post page for a given post.
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;