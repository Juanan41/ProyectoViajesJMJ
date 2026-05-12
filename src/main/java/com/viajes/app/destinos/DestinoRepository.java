package com.viajes.app.destinos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinoRepository extends JpaRepository<Destino,Long> {
	List<Destino> findByPaisIgnoreCase(String pais);
}

