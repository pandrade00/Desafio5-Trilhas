import mongoose from "mongoose";
import { enderecoSchema } from "./Endereco.js";

const usuarioSchema = new mongoose.Schema({
  role: { type: String, enum: ["admin", "usuario"], default: "usuario" },
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
  genero: { type: String },
  telefones: { type: Array, default: [] },
  dataNascimento: { type: String },
  refreshTokenHash: { type: String },
  endereco: enderecoSchema
}, { versionKey: false });

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
