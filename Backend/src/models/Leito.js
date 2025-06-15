import mongoose from "mongoose";

const LeitoSchema = new mongoose.Schema({
  hospital: String,
  tipo: String,
  andar: String,
  numero: String,
  disponivel: String
});

export default mongoose.model("Leito", LeitoSchema);
 