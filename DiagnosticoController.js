const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/defensivos/calcular', (req, res) => {
    const { area, dosagem, tipoFormulacao, tipoDefensivo } = req.body;

    if (area === undefined || dosagem === undefined) {
        return res.status(400).json({ error: "Dados inválidos ou incompletos." });
    }

    const unidade = (tipoFormulacao && tipoFormulacao.toLowerCase() === 'liquido') ? ' Litros' : ' Quilos';
    
    const totalInsumo = area * dosagem;
    const volumeAgua = area * 150; // Média de 150L/ha de calda líquida
    
    let status = "Manejo de Precisão Recomendado";
    let recomendacao = `Prescrição aprovada para aplicação de ${tipoDefensivo}. Certifique-se de que a velocidade do vento esteja entre 3 e 10 km/h para evitar derivas.`;

    if (dosagem > 3.5) {
        status = "Atenção: Concentração elevada por hectare";
        recomendacao = `Cuidado técnico redobrado. Esta dosagem de ${tipoDefensivo} exige monitoramento rígido pós-aplicação. Respeite o período de carência de segurança.`;
    }

    const resultado = {
        totalInsumo: totalInsumo.toFixed(2) + unidade,
        volumeAgua: volumeAgua.toFixed(0) + " Litros de calda líquida",
        classeInsumo: tipoDefensivo,
        status: status,
        recomendacao: recomendacao
    };

    return res.status(200).json(resultado);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});