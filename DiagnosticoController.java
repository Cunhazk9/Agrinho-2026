package com.agro.eficaz.controller;

import com.agro.eficaz.dto.DadosCalculoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/diagnostico")
@CrossOrigin(origins = "*")
public class CalculoController {

    @PostMapping("/calcular")
    public ResponseEntity<Map<String, Object>> calcularDefensivos(@RequestBody DadosCalculoDto dados) {
        double area = dados.getArea();
        double recomendacao = dados.getRecomendacao();
        
        double totalProduto = area * recomendacao;
        double totalAgua = area * 150; // Constante padrão de 150 Litros de calda por Hectare
        
        String status = "Manejo Padrão Seguro";
        String recomendacaoTexto = "A quantidade indicada está dentro dos limites sustentáveis de segurança. Monitore as condições climáticas (vento e umidade) antes de iniciar a pulverização.";

        if (recomendacao > 4.0) {
            status = "Atenção: Alta concentração de princípio ativo.";
            recomendacaoTexto = "Dosagem elevada detectada. Certifique-se do uso correto de EPIs por toda a equipe e verifique as condições do solo para evitar escoamento superficial em direção a corpos d'água.";
        }

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("emissoes", String.format("%.1f Litros de defensivo", totalProduto));
        resultado.put("creditos", String.format("%.0f Litros de água (Média de 150L/ha)", totalAgua));
        resultado.put("status", status);
        resultado.put("recomendacao", recomendacaoTexto);

        return ResponseEntity.ok(resultado);
    }
}
