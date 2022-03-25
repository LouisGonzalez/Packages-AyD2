package com.gt.interpackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gt.interpackage.model.PackageCheckpoint;
import org.springframework.stereotype.Repository;

/**
 *
 * @author helmuth
 */
@Repository
public interface PackageCheckpointRepository extends JpaRepository<PackageCheckpoint, Long>{

    public boolean existsPackageCheckpointByCheckpointId(Long id);
}
