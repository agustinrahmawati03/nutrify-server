const database = require('../../src/config/database');
database
  .then(async () => {
    console.log('connect database successfully !');
    const User = require('../../src/models/user');

    try {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        console.log('Admin user already exists:', existingAdmin);
        return;
      }

      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'secure123', // Replace with a hashed password in production
        role: 'admin',
        levelActivity: 5, // Example value for activity level
      });

      await adminUser.save();
      console.log('Admin user created successfully:', adminUser);
    } catch (error) {
      console.error('Error seeding admin user:', error.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });
