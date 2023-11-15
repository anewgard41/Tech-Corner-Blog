const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Adjust the path as needed

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them

    // Create users
    const users = await User.bulkCreate([
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        // Add more users as needed
    ], { individualHooks: true });

    // Create posts
    const posts = await Post.bulkCreate([
        { title: 'Technology is Cool', body: 'This is the body of Post 1', user_id: users[0].id },
        { title: 'Post 2', body: 'This is the body of Post 2', user_id: users[1].id },
        // Add more posts as needed
    ]);

    // Create comments
    const comments = await Comment.bulkCreate([
        { body: 'Comment 1', user_id: users[0].id, post_id: posts[0].id },
        { body: 'Comment 2', user_id: users[1].id, post_id: posts[1].id },
        // Add more comments as needed
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
};

seedDatabase();