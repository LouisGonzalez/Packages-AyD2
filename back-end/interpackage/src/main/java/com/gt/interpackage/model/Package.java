/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author bryan
 */
@Entity
@Table (name = "package")
public class Package {
    
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    
    @Column (name = "on_way", nullable = false)
    private Boolean onWay;
    
    @Column (name = "at_destination", nullable = false)
    private Boolean atDestination;
    
    @Column (nullable = false)
    private Boolean retirted;
    
    @Column (scale = 2, nullable = false)
    private Double weight;
    
    @Column (name = "sub_total", scale = 2, nullable = false)
    private Double subTotal;
    
    @Column (nullable = false)
    private Boolean priorized;
    
    @Column (columnDefinition = "TEXT", nullable = true)
    private String description;
    
    @ManyToOne
    @JoinColumn (name = "cui_client", nullable = false)
    private Client cui;

    @ManyToOne
    @JoinColumn (name = "id_invoice", nullable = false)
    private Invoice invoice;

    public Package(Long id, Boolean onWay, Boolean atDestination, Boolean retirted, Double weight, Double subTotal, Boolean priorized, String description, Client cui, Invoice invoice) {
        this.id = id;
        this.onWay = onWay;
        this.atDestination = atDestination;
        this.retirted = retirted;
        this.weight = weight;
        this.subTotal = subTotal;
        this.priorized = priorized;
        this.description = description;
        this.cui = cui;
        this.invoice = invoice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getOnWay() {
        return onWay;
    }

    public void setOnWay(Boolean onWay) {
        this.onWay = onWay;
    }

    public Boolean getAtDestination() {
        return atDestination;
    }

    public void setAtDestination(Boolean atDestination) {
        this.atDestination = atDestination;
    }

    public Boolean getRetirted() {
        return retirted;
    }

    public void setRetirted(Boolean retirted) {
        this.retirted = retirted;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Boolean getPriorized() {
        return priorized;
    }

    public void setPriorized(Boolean priorized) {
        this.priorized = priorized;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Client getCui() {
        return cui;
    }

    public void setCui(Client cui) {
        this.cui = cui;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    
}