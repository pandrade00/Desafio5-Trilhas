import mongoose from "mongoose";
import { enderecoSchema } from "./Endereco.js";

const usuarioSchema = new mongoose.Schema({
  role: { type: String, enum: ["admin", "usuario"], default: "usuario" },
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
  sus: { type: String },
  telefones: { type: [String], default: [] },
  genero: { type: String },
  dataNascimento: { type: Date },
  refreshTokenHash: { type: String },
  endereco: enderecoSchema,
}, { versionKey: false, timestamps: true });

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
