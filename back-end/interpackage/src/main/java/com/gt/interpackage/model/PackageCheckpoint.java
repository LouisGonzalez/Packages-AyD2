/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.model;

import com.gt.interpackage.pk.PKPackageCheckpoint;
import java.sql.Time;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author bryan
 */
@Entity
@Table (name = "package_checkpoint")
@IdClass (value = PKPackageCheckpoint.class)
public class PackageCheckpoint {
    
    @Id
    @ManyToOne
    @JoinColumn (name = "id_checkpoint", nullable = false)
    private Checkpoint checkpoint;
    
    @Id 
    @ManyToOne
    @JoinColumn (name = "id_package", nullable = false)
    private Package packages;
    
    @Column (name = "time_on_checkpoint", nullable = false)
    private Time timeOnCheckpoint;

    public PackageCheckpoint(Checkpoint checkpoint, Package packages, Time timeOnCheckpoint) {
        this.checkpoint = checkpoint;
        this.packages = packages;
        this.timeOnCheckpoint = timeOnCheckpoint;
    }

    public Checkpoint getCheckpoint() {
        return checkpoint;
    }

    public void setCheckpoint(Checkpoint checkpoint) {
        this.checkpoint = checkpoint;
    }

    public Package getPackages() {
        return packages;
    }

    public void setPackages(Package packages) {
        this.packages = packages;
    }

    public Time getTimeOnCheckpoint() {
        return timeOnCheckpoint;
    }

    public void setTimeOnCheckpoint(Time timeOnCheckpoint) {
        this.timeOnCheckpoint = timeOnCheckpoint;
    }
    
}


