import leito from "../models/Leito.js";

class LeitosController {

  //Troquei as duas funções de busca por uma só, que aceita parâmetros opcionais e da pra incluir mais se precisar
  static async buscarLeitos(req, res) {
    try {
      const { hospital, cidade, bairro, rua, cep } = req.query;

      if (!cidade && !bairro && !rua && !cep && !hospital) {
        return res.status(400).json({ success: false, error: "Parâmetros de localização ausentes." });
      }

      const criarRegex = (valor) => new RegExp(valor, "i");
      const match = {};
      if (hospital) match["Hospital"] = criarRegex(hospital);
      if (cidade) match["Endereco.Cidade"] = criarRegex(cidade);
      if (bairro) match["Endereco.Bairro"] = criarRegex(bairro);
      if (rua) match["Endereco.Rua"] = criarRegex(rua);
      if (cep) match["Endereco.Cep"] = criarRegex(cep);

      const resultados = await leito.aggregate([
        { $match: match },
        {
          $project: {
            _id: 0,
            Hospital: 1,
            Tipo: 1,
            Natureza: 1,
            CadastroCNES: 1,
            Disponivel: 1,
            Email: 1,
            Telefone: 1,
            Endereco: 1
          }
        }
      ]);

      res.status(200).json({
        success: true,
        data: resultados
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar hospitais." });
    }
  }
}

export default LeitosController;
