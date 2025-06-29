import mongoose from "mongoose";

const exameSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  tipo: { type: String, required: true },
  data: { type: String, required: true },
  local: { type: String, required: true },
  status: { type: String, enum: ["Agendado", "Realizado", "Cancelado"], default: "Agendado" }
}, { versionKey: false });

const exame = mongoose.model("exames", exameSchema);

export default exame;
