/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.gt.interpackage.source.BCryptPasswordDeserializer;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author bryan
 */
@Entity
@Table (name = "employee")
public class Employee {
    
    @Id
    private Long CUI;
    
    @Column (nullable = false, length = 75)
    private String name;
    
    @Column (nullable = false, length = 75)
    private String lastname;
    
    @Column (nullable = false, length = 75)
    private String username;
    
    @Column (nullable = false, length = 200)
    private String email;
    
    @Column (nullable = false)
    private Integer type;
    
    @Column (nullable = false, length = 60)
    //@JsonDeserialize (using = BCryptPasswordDeserializer.class)
    private String password;
    
    public Employee() { }

    @Column (nullable = false)
    private Boolean activo;
    
    public Employee(Long CUI, String name, String lastname, Integer type, String password, String email, String username, Boolean activo) {
        this.CUI = CUI;
        this.name = name;
        this.lastname = lastname;
        this.type = type;
        this.password = password;
        this.username = username;
        this.email = email;
        this.activo = activo;
    }
    
    public Employee(String name, String lastname, Integer type, String password, String email, String username, Boolean activo) {
        this.name = name;
        this.lastname = lastname;
        this.type = type;
        this.password = password;
        this.username = username;
        this.email = email;
        this.activo = activo;
    }
    
    
    public Long getCUI() {
        return CUI;
    }

    public void setCUI(Long CUI) {
        this.CUI = CUI;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer employeeType) {
        this.type = employeeType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActivo(){
        return activo;
    }
    
    public void setActivo(Boolean activo){
        this.activo = activo;
    }
    
}
