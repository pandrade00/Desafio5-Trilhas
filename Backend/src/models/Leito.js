import mongoose from "mongoose";

const leitoSchema = new mongoose.Schema({
  Hospital: { type: String },
  Tipo: { type: String },
  Natureza: { type: String },
  Numero: { type: String },
  Disponivel: { type: String },
  Logradouro: { type: String },
  Bairro: { type: String },
  Cidade: { type: String }
}, { versionKey: false });

const leito = mongoose.model("leitos", leitoSchema);

export default leito;
