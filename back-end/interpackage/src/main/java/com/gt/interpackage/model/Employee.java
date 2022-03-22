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
    private Long cui;
    
    @Column (nullable = false, length = 75)
    private String name;
    
    @Column (nullable = false, length = 75)
    private String lastName;
    
    @Column (nullable = false, length = 75)
    private String username;
    
    @Column (nullable = false, length = 200)
    private String email;
    
    @Column (nullable = false)
    private Integer employeeType;
    
    @Column (nullable = false, length = 60)
    @JsonDeserialize (using = BCryptPasswordDeserializer.class)
    private String password;
    
    public Employee() { }

    @Column (nullable = false)
    private Boolean active;
    
    public Employee(Long cui, String name, String lastName, Integer employeeType, String password, String email, String username, Boolean active) {
        this.cui = cui;
        this.name = name;
        this.lastName = lastName;
        this.employeeType = employeeType;
        this.password = password;
        this.username = username;
        this.email = email;
        this.active = active;
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

    public Integer getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(Integer employeeType) {
        this.employeeType = employeeType;
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

    public Boolean getActive(){
        return active;
    }
    
    public void setActive(Boolean active){
        this.active = active;
    }
    
}
