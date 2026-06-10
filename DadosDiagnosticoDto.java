package com.agro.sustentavel.dto;

public class DadosDiagnosticoDto {
    private double area;
    private double fertilizantes;

    // Construtores
    public DadosDiagnosticoDto() {}

    public DadosDiagnosticoDto(double area, double fertilizantes) {
        this.area = area;
        this.fertilizantes = fertilizantes;
    }

    // Getters e Setters
    public double getArea() { return area; }
    public void setArea(double area) { this.area = area; }
    public double getFertilizantes() { return fertilizantes; }
    public void setFertilizantes(double fertilizantes) { this.fertilizantes = fertilizantes; }
}
