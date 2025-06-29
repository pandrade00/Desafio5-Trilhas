import "dotenv/config";
import app from "./src/app.js";
import conectaNaDatabase from "./src/config/dbConnect.js";

const PORT = process.env.PORT;

(async () => {
  try {
    const db = await conectaNaDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (erro) {
    console.error("❌ Erro ao iniciar o servidor:", erro);
    process.exit(1); // Finaliza o processo se a conexão falhar
  }
})();