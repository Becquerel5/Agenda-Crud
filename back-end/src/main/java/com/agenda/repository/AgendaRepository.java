package com.agenda.repository;

import com.agenda.entity.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaRepository extends JpaRepository<Agenda,Long> {
}
