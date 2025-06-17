import leito from "../models/Leito.js";

class LeitosController {
  
  static async buscarLeitos(req, res) {
    try {
      const filtros = {};

      if (req.query.hospital) {
        filtros.Hospital = new RegExp(req.query.hospital, 'i'); // Busca case-insensitive
      }
      if (req.query.tipo) {
        filtros.Tipo = new RegExp(req.query.tipo, 'i');
      }
      if (req.query.bairro) {
        filtros.Bairro = new RegExp(req.query.bairro, 'i');
      }
      if (req.query.disponivel) {
        filtros.Disponivel = req.query.disponivel;
      } else {
        filtros.Disponivel = "Sim"; // Valor padrão
      }

      const resultados = await leito.find(filtros);
      res.status(200).json({
        success: true,
        count: resultados.length,
        data: resultados
      });
      
    } catch (err) {
      console.error('Erro na busca:', err);
      res.status(500).json({ 
        success: false,
        error: "Erro ao buscar leitos no banco de dados" 
      });
    }
  }

  static async buscarHospitaisPorNome(req, res) {
    try {
      const termo = req.query.q;
      if (!termo) {
        return res.status(400).json({ success: false, error: "Parâmetro de busca ausente." });
      }

      const resultados = await leito.aggregate([
        {
          $match: {
            Hospital: { $regex: termo, $options: "i" }
          }
        },
        {
          $group: {
            _id: { Hospital: "$Hospital", Bairro: "$Bairro", Cidade: "$Cidade" }
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            Hospital: "$_id.Hospital",
            Bairro: "$_id.Bairro",
            Cidade: "$_id.Cidade"
          }
        }
      ]);

      res.status(200).json({
        success: true,
        data: resultados,
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar hospitais." });
    }
  }
}

export default LeitosController;
