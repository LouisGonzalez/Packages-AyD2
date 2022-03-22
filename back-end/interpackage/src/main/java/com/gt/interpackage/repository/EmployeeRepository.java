/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.repository;

import com.gt.interpackage.model.Employee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Luis
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

    @Query(value = "SELECT * FROM employee e WHERE e.activo = true", nativeQuery = true)
    List<Employee> getAllActivates();
    
    @Query(value = "SELECT * FROM employee e WHERE e.activo = false", nativeQuery = true)
    List<Employee> getAllDeactivates();
}
