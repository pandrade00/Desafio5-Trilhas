import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (erro) => {
      console.error("❌ Erro de conexão com o banco:", erro);
    });

    console.log("✅ Conexão com o banco feita com sucesso");

    return db;
  } catch (erro) {
    console.error("❌ Erro ao tentar conectar ao banco:", erro);
    process.exit(1); // Finaliza o processo se falhar
  }
};

export default conectaNaDatabase;
