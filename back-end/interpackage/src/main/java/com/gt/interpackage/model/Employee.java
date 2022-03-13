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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    
    @ManyToOne
    @JoinColumn (name = "employee_type", nullable = false)
    private EmployeeType employeeType;
    
    @Column (nullable = false, length = 60)
    @JsonDeserialize (using = BCryptPasswordDeserializer.class)
    private String password;

    public Employee(Long cui, String name, String lastName, EmployeeType employeeType, String password) {
        this.cui = cui;
        this.name = name;
        this.lastName = lastName;
        this.employeeType = employeeType;
        this.password = password;
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

    public EmployeeType getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(EmployeeType employeeType) {
        this.employeeType = employeeType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
