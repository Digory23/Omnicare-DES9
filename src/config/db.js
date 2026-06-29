const mongoose = require("mongoose");

const MONGOURI = process.env.MONGODB_URI;

const InitiateMongoServer = async () => {
  if (!MONGOURI) {
    console.error("ERROR: La variable MONGODB_URI no está definida en el archivo .env");
    return;
  }
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.error("No se pudo conectar a la BD:", e.message);
  }
};

module.exports = InitiateMongoServer;
module.exports.MONGOURI = MONGOURI;