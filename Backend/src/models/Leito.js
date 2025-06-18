import mongoose from "mongoose";
import { enderecoSchema } from "./Endereco.js";

const leitoSchema = new mongoose.Schema({
  Hospital: { type: String },
  Tipo: { type: String },
  Natureza: { type: String },
  CadastroCNES: { type: String },
  Disponivel: { type: String },
  Email: { type: String },
  Endereco: enderecoSchema
}, { versionKey: false });

const leito = mongoose.model("leitos", leitoSchema);

export default leito;
