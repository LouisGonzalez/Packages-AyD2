/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author bryan
 */
@Entity
@Table (name = "client")
public class Client {
    
    @Id
    private Long cui;
    
    @Column (nullable = false, length = 75)
    private String name;
    
    @Column (nullable = false, length = 75)
    private String lastName;
    
    @Column (nullable = true)
    private Integer age;
    
    @Column (nullable = false)
    private Integer nit;
    
    @Column (nullable = true, length = 250)
    private String address;

    public Client(Long cui, String name, String lastName, Integer age, Integer nit, String address) {
        this.cui = cui;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.nit = nit;
        this.address = address;
    }

    public Long getCui() {
        return cui;
    }

    public void setCui(Long cui) {
        this.cui = cui;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getNit() {
        return nit;
    }

    public void setNit(Integer nit) {
        this.nit = nit;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
}
