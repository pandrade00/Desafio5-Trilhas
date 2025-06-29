import mongoose from "mongoose";

const consultaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
  especialidade: { type: String, required: true },
  local: { type: String },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  status: { type: String, enum: ["Agendada", "Concluída", "Cancelada"], default: "Agendada" }
}, { versionKey: false });

const consulta = mongoose.model("consultas", consultaSchema);

export default consulta;
