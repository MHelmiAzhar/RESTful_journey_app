'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hash = bcrypt.hashSync('admin123', 10);
    await queryInterface.bulkInsert('users', [{
      name: 'Admin Rude-D',
      email: 'rude.admin@gmail.com',
      address: 'Jl. Admin No. 1',
      phone_number: '081234567890',
      password: hash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', { email: 'admin@mlaku-mulu.local' }, {});
  }
};
