import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import Leito from '../models/Leito.js';

dotenv.config();

const conectarMongo = async () => {
  return mongoose.connect(process.env.DB_CONNECTION_STRING);
};

const importarCSV = async () => {
  await conectarMongo();
  const resultados = [];

  fs.createReadStream('./data/Leitos_2025.csv')
    .pipe(csv({
      separator: ';',
      mapHeaders: ({ header }) => header.trim(),
      mapValues: ({ value }) => value.trim()
    }))
    .on('data', (data) => {
      if (data.UF === 'MA') {
        // Mapeia para o schema simplificado
        resultados.push({
          Hospital: data.NOME_ESTABELECIMENTO,
          Tipo: data.DS_TIPO_UNIDADE,
          Natureza: data.DESC_NATUREZA_JURIDICA || '',
          CadastroCNES: data.CNES,
          Disponivel: data.LEITOS_SUS > 0 ? 'Sim' : 'No',
          Email: data.NO_EMAIL || '',
          Telefone: data.NU_TELEFONE || '',
          Endereco: {
            Estado: data.UF || '',
            Cidade: data.MUNICIPIO || '',
            Bairro: data.NO_BAIRRO || '',
            Rua: data.NO_LOGRADOURO || '',
            Numero: data.NO_ENDERECO || '',
            Cep: data.CO_CEP || ''
          }
        });
      }
    })
    .on('end', async () => {
      try {
        console.log(`Lidos ${resultados.length} registros`);

        // Remover duplicatas com base em Hospital + Cidade
        const unicos = Array.from(
          new Map(
            resultados.map(item => [item.Hospital + item.Endereco.Cidade + item.Endereco.Bairro, item])
          ).values()
        );

        console.log(`Registros únicos após filtragem: ${unicos.length}`);

        await Leito.deleteMany();
        const inserted = await Leito.insertMany(unicos);
        console.log(`Importados ${inserted.length} registros com sucesso!`);
        process.exit();
      } catch (err) {
        console.error('Erro ao importar:', err);
        process.exit(1);
      }
    });
};

export default importarCSV;
