package com.agro.eficaz.dto;

public class DadosCalculoDto {
    private double area;
    private double recomendacao;

    public DadosCalculoDto() {}

    public DadosCalculoDto(double area, double recomendacao) {
        this.area = area;
        this.recomendacao = recomendacao;
    }

    public double getArea() { return area; }
    public void setArea(double area) { this.area = area; }
    public double getRecomendacao() { return recomendacao; }
    public void setRecomendacao(double recomendacao) { this.recomendacao = recomendacao; }
}
