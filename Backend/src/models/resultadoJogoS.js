import mongoose from "mongoose";

const relatorioJogoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  pontuacao: { type: String, required: true },
  profissional: { type: String },
  diagnosticosIdentificados: { type: Array, default: [], required: true },
  nivelDeRisco: { type: String }
}, { versionKey: false });

const relatorioJogo = mongoose.model("exames", relatorioJogoSchema);

export default relatorioJogo;
// Preparar rotas de tratamento dos dados (em json) enviados pelo jogo