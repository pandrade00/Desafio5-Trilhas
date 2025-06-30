import mongoose from "mongoose";

const relatorioJogoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  pontuacao: { type: Number, required: true },
  diagnoses: { type: Array, default: [], required: true },
  nivelDeRisco: { type: String, required: true },
  data: { type: String, required: true }
}, { versionKey: false });

const relatorioJogo = mongoose.model("relatoriosJogo", relatorioJogoSchema);

export default relatorioJogo;
