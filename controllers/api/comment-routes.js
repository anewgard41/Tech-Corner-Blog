const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/auth.js');

router.post('/:post_id', withAuth, async (req, res) => {
    try {
        const { content } = req.body;
        const { user_id } = req.session;
        const post_id = req.params.post_id;

        // Create the comment and associate it with the specific post
        const newComment = await Comment.create({
            content,
            user_id,
            post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete route to delete a comment by its id. The user_id is taken from the session.
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If no comment is found with the given id, return an error message.
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;