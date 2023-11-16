const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Import all models

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them

    // Create users
    const users = await User.bulkCreate([
        { username: 'Josh', password: 'password1' },
        { username: 'Diane', password: 'password2' },
    ], { individualHooks: true });

    // Create posts
    const posts = await Post.bulkCreate([
        { title: 'New playstation portal released!', content: 'Nintendo Switch watch out!', user_id: users[0].id },
        { title: 'Clojure is a unique programming language', content: 'Highly functional', user_id: users[1].id },
    ]);

    // Create comments
    const comments = await Comment.bulkCreate([
        { content: 'The JS covention was crazy.', user_id: users[0].id, post_id: posts[0].id },
        { content: 'I love computers.', user_id: users[1].id, post_id: posts[1].id },
        
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
};

seedDatabase();
