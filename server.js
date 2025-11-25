// server.js (Versão Final - Google Sheets Simplificada)

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// *** SUBSTITUA ESTA LINHA COM A SUA URL DO APLICATIVO WEB DO GOOGLE SHEETS ***
const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbxhs8FzE0rswswYWL0zl4YaMLVbdTP0oz0mNPLD779FoXOLAmYz9217LjeoeKuTCIqw/exec";
// ********************************************************

app.post("/confirm", async (req, res) => {
  const data = req.body;

  // Verifica se os dados mínimos estão presentes
  if (!data || !data.ListaConfirmados || !data.Timestamp) {
    return res.status(400).send("Dados de confirmação inválidos.");
  }

  // Mapeia os dados do convite para os cabeçalhos da planilha (Timestamp e Lista Confirmados)
  const sheetData = {
    Timestamp: data.Timestamp,
    "Lista Confirmados": data.ListaConfirmados, // Já vem como string ordenada do Front-end
  };

  try {
    // Envia os dados para a API do Google Sheets
    const sheetResponse = await fetch(SHEET_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (!sheetResponse.ok) {
      // Se a API do Sheets retornar um erro, avisa no console do Render
      const errorText = await sheetResponse.text();
      console.error(
        "Erro ao enviar dados para o Google Sheets:",
        sheetResponse.status,
        errorText
      );
      return res.status(500).send("Erro ao salvar no Sheets.");
    }

    return res.send("Salvo no Google Sheets com sucesso!");
  } catch (err) {
    console.error("Erro de comunicação com a API do Google Sheets:", err);
    return res.status(500).send("Erro de conexão ao salvar.");
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
