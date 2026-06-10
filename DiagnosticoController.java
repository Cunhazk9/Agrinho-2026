package com.agro.eficaz.controller;

import com.agro.eficaz.dto.RequisicaoCalculoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/defensivos")
@CrossOrigin(origins = "*")
public class DefensivoController {

    @PostMapping("/calcular")
    public ResponseEntity<Map<String, Object>> realizarCalculoAgro(@RequestBody RequisicaoCalculoDto dto) {
        double area = dto.getArea();
        double dosagem = dto.getDosagem();
        String unidade = "Liquido".equalsIgnoreCase(dto.getTipoFormulacao()) ? " Litros" : " Quilos";
        
        // Regra de negócio exata solicitada
        double totalInsumo = area * dosagem;
        double volumeAgua = area * 150; // Média de 150L/ha de calda líquida
        
        String status = "Manejo de Precisão Recomendado";
        String recomendacao = "Prescrição aprovada para aplicação de " + dto.getTipoDefensivo() + 
                              ". Certifique-se de que a velocidade do vento esteja entre 3 e 10 km/h para evitar derivas.";

        if (dosagem > 3.5) {
            status = "Atenção: Concentração elevada por hectare";
            recomendacao = "Cuidado técnico redobrado. Esta dosagem de " + dto.getTipoDefensivo() + 
                           " exige monitoramento rígido pós-aplicação. Respeite o período de carência de segurança.";
        }

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("totalInsumo", String.format("%.2f", totalInsumo) + unidade);
        resultado.put("volumeAgua", String.format("%.0f", volumeAgua) + " Litros de calda líquida");
        resultado.put("classeInsumo", dto.getTipoDefensivo());
        resultado.put("status", status);
        resultado.put("recomendacao", recomendacao);

        return ResponseEntity.ok(resultado);
    }
}
