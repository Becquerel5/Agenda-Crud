package com.agenda.controller;

import com.agenda.entity.Agenda;
import com.agenda.services.AgendaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agenda")
@CrossOrigin("*")
public class AgendaController {

    private AgendaService agendaService;

    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @PostMapping(path = "/save")
    public Agenda saveAgenda(@RequestBody Agenda agenda){
        return agendaService.createAgenda(agenda);
    }

    @GetMapping(path = "/getall")
    public List<Agenda> Agendas(){
        return agendaService.getAllAgendas();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agenda> updateAgendaById(@PathVariable long id, @RequestBody Agenda agenda){
        return agendaService.updateAgenda(id,agenda);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agenda> getAgendaById(@PathVariable long id){
        return agendaService.getAgendaById(id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAgendaById(@PathVariable long id){
        return agendaService.deleteAgenda(id);
    }


}
