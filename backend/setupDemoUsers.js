const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const connectDB = require('./src/config/db');

const setupDemoUsers = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Demo users data
    const demoUsers = [
      {
        name: 'Student User',
        email: 'student@test.com',
        password: 'password123',
        role: 'student',
        isEmailVerified: true,
      },
      {
        name: 'Employee User',
        email: 'employee@test.com',
        password: 'password123',
        role: 'employee',
        isEmailVerified: true,
      },
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password123',
        role: 'super_admin',
        isEmailVerified: true,
      },
    ];

    // Hash passwords and create users
    for (const userData of demoUsers) {
      const exists = await User.findOne({ email: userData.email });
      
      if (exists) {
        console.log(`⚠️  User ${userData.email} already exists, updating...`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.updateOne(
          { email: userData.email },
          {
            name: userData.name,
            password: hashedPassword,
            role: userData.role,
            isEmailVerified: true,
          }
        );
        console.log(`✅ Updated ${userData.email}`);
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
          ...userData,
          password: hashedPassword,
        });
        console.log(`✅ Created ${userData.email}`);
      }
    }

    console.log('\n✅ Demo users setup complete!');
    console.log('\nTest Credentials:');
    console.log('─────────────────────────────────────');
    console.log('🎓 Student:');
    console.log('   Email:    student@test.com');
    console.log('   Password: password123');
    console.log('\n💼 Employee:');
    console.log('   Email:    employee@test.com');
    console.log('   Password: password123');
    console.log('\n👨‍💼 Admin:');
    console.log('   Email:    admin@test.com');
    console.log('   Password: password123');
    console.log('─────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up demo users:', error);
    process.exit(1);
  }
};

setupDemoUsers();
