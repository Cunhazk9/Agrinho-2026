package com.agro.sustentavel.controller;

import com.agro.sustentavel.dto.DadosDiagnosticoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/diagnostico")
@CrossOrigin(origins = "*") 
public class DiagnosticoController {

    @PostMapping("/calcular")
    public ResponseEntity<Map<String, Object>> calcularImpacto(@RequestBody DadosDiagnosticoDto dados) {
        double area = dados.getArea();
        double fertilizantes = dados.getFertilizantes();
        
        double emissoesCalculadas = (area * 0.12) + (fertilizantes * 2.4);
        double potencialCredito = area * 1.5; 
        
        String status = "Equilíbrio Excelente!";
        String recomendacao = "Sua propriedade cumpre ótimos requisitos ecológicos. Você está apto a aplicar para certificações internacionais de créditos de carbono.";

        if ((fertilizantes / area) > 0.5) {
            status = "Alerta: Alto uso de insumos químicos.";
            recomendacao = "Recomendamos a transição parcial para biofertilizantes e a adoção de técnicas de plantio direto para reter nitrogênio no solo.";
        }

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("emissoes", String.format("%.2f toneladas de CO₂eq/ano", emissoesCalculadas));
        resultado.put("creditos", String.format("%.2f tCO₂ passíveis de monetização", potencialCredito));
        resultado.put("status", status);
        resultado.put("recomendacao", recomendacao);

        return ResponseEntity.ok(resultado);
    }
}
