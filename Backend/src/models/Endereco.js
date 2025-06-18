import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
  Estado: { type: String, required: true },
  Bairro: { type: String, required: true },
  Cidade: { type: String, required: true },
  Rua: { type: String },
  Numero: { type: String },
  Cep: { type: String, required: true }
  
}, { versionKey: false });

const endereco = mongoose.model("enderecos", enderecoSchema);

export { endereco, enderecoSchema };