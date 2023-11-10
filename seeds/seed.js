const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./user-data.json');
const postData = require('./post-data.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    
  const users = await User.bulkCreate(userData, {
    // This is to make sure the passwords are hashed.
    individualHooks: true,
    returning: true,
  });

  // Loops through the postData array and creates a new post for each entry.
  for (const post of postData) {
    await Post.create({
      ...post,
      // Randomly assigns a user_id from the users array to each post.
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();