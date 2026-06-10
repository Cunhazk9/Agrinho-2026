package com.agro.eficaz.dto;

public class RequisicaoCalculoDto {
    private String tipoDefensivo;
    private String tipoFormulacao;
    private double area;
    private double dosagem;

    // Construtores
    public RequisicaoCalculoDto() {}

    // Getters e Setters
    public String getTipoDefensivo() { return tipoDefensivo; }
    public void setTipoDefensivo(String tipoDefensivo) { this.tipoDefensivo = tipoDefensivo; }
    public String getTipoFormulacao() { return tipoFormulacao; }
    public void setTipoFormulacao(String tipoFormulacao) { this.tipoFormulacao = tipoFormulacao; }
    public double getArea() { return area; }
    public void setArea(double area) { this.area = area; }
    public double getDosagem() { return dosagem; }
    public void setDosagem(double dosagem) { this.dosagem = dosagem; }
}
