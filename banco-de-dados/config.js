const mongoose = require('mongoose');

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('❌ MONGODB_URI não definida no .env');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB conectado');
};

module.exports = connectDatabase;
