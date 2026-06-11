const express = require('express');
const cors = require('cors');
const { z } = require('zod');

const app = express();

app.use(express.json());
app.use(cors());

const RequisicaoCalculoDtoSchema = z.object({
    tipoDefensivo: z.string({ required_error: "tipoDefensivo é obrigatório" }),
    tipoFormulacao: z.string({ required_error: "tipoFormulacao é obrigatório" }),
    area: z.number({ required_error: "area é obrigatória" }).positive("A área deve ser maior que zero"),
    dosagem: z.number({ required_error: "dosagem é obrigatória" }).positive("A dosagem deve ser maior que zero")
});

app.post('/api/defensivos/calcular', (req, res) => {
    
    const validacao = RequisicaoCalculoDtoSchema.safeParse(req.body);

    if (!validacao.success) {
        return res.status(400).json({
            status: "Erro de Validação",
            erros: validacao.error.errors.map(err => err.message)
        });
    }

    const dto = validacao.data;

    const unidade = dto.tipoFormulacao.toLowerCase() === 'liquido' ? ' Litros' : ' Quilos';
    
    const totalInsumo = dto.area * dto.dosagem;
    const volumeAgua = dto.area * 150; // Média de 150L/ha de calda líquida
    
    let status = "Manejo de Precisão Recomendado";
    let recomendacao = `Prescrição aprovada para aplicação de ${dto.tipoDefensivo}. Certifique-se de que a velocidade do vento esteja entre 3 e 10 km/h para evitar derivas.`;

    if (dto.dosagem > 3.5) {
        status = "Atenção: Concentração elevada por hectare";
        recomendacao = `Cuidado técnico redobrado. Esta dosagem de ${dto.tipoDefensivo} exige monitoramento rígido pós-aplicação. Respeite o período de carência de segurança.`;
    }

    const resultado = {
        totalInsumo: totalInsumo.toFixed(2) + unidade,
        volumeAgua: volumeAgua.toFixed(0) + " Litros de calda líquida",
        classeInsumo: dto.tipoDefensivo,
        status: status,
        recomendacao: recomendacao
    };

    return res.status(200).json(resultado);
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`[AgroEficaz Backend] Servidor rodando com sucesso na porta ${PORT}`);
});