const mongoose = require("mongoose");

// *** Actualiza esta URI con tu nuevo cluster de MongoDB Atlas ***
const MONGOURI = "mongodb+srv://ocAdmin:omnicare2024@omnicaredb.fs4e5ab.mongodb.net/omnicaredb?retryWrites=true&w=majority&appName=OmnicareDB";

const InitiateMongoServer = async () => {
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