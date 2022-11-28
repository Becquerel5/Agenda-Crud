package com.agenda.services;

import com.agenda.entity.Agenda;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AgendaService {

    Agenda createAgenda(Agenda agenda);
    List<Agenda> getAllAgendas();
    ResponseEntity<Agenda> getAgendaById(long id);
    ResponseEntity<Agenda> updateAgenda(long id, Agenda agenda);
    ResponseEntity<HttpStatus> deleteAgenda(long id);




}
