const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Import all models

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them

    // Create users
    const users = await User.bulkCreate([
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
    ], { individualHooks: true });

    // Create posts
    const posts = await Post.bulkCreate([
        { title: 'Post 1', content: 'This is the content of Post 1', user_id: users[0].id },
        { title: 'Post 2', content: 'This is the content of Post 2', user_id: users[1].id },
    ]);

    // Create comments
    const comments = await Comment.bulkCreate([
        { content: 'The JS covention was crazy.', user_id: users[0].id, post_id: posts[0].id },
        { content: 'I love computer.', user_id: users[1].id, post_id: posts[1].id },
        
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
};

seedDatabase();
