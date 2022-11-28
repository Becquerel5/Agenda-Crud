package com.agenda.services;

import com.agenda.Exception.ResourceNotFoundException;
import com.agenda.entity.Agenda;
import com.agenda.repository.AgendaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class AgendaImpl implements AgendaService {

    private AgendaRepository agendaRepository;

    public AgendaImpl(AgendaRepository agendaRepository) {
        this.agendaRepository = agendaRepository;
    }

    @Override
    public Agenda createAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    @Override
    public List<Agenda> getAllAgendas() {
        return agendaRepository.findAll();
    }

    @Override
    public ResponseEntity<Agenda> getAgendaById(long id) {
        Agenda agenda = agendaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agenda not exist with id:" + id));
        return  ResponseEntity.ok(agenda);
    }

    @Override
    public ResponseEntity<Agenda> updateAgenda(long id, Agenda agenda) {
        Agenda updateAgenda =agendaRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Agenda not exist with id:" +id));
        updateAgenda.setSubject(agenda.getSubject());
        updateAgenda.setLocation(agenda.getLocation());
        updateAgenda.setObjectives(agenda.getObjectives());
        updateAgenda.setReponsable(agenda.getReponsable());
        updateAgenda.setNamesparticipant(agenda.getNamesparticipant());
        updateAgenda.setDatestart(agenda.getDatestart());
        updateAgenda.setDateend(agenda.getDateend());

        agendaRepository.save(agenda);
        return  ResponseEntity.ok(updateAgenda);
    }

    @Override
    public ResponseEntity<HttpStatus> deleteAgenda(long id) {
        Agenda agenda = agendaRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Agenda doesnot exist"));
        agendaRepository.delete(agenda);

        return  new ResponseEntity<>( HttpStatus.NO_CONTENT );
    }
}
