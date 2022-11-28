package com.agenda;

import com.agenda.entity.Agenda;
import com.agenda.repository.AgendaRepository;
import com.agenda.services.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Instant;
import java.util.Date;

@SpringBootApplication
public class AgendaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendaApplication.class, args);
	}

	@Autowired
	private AgendaRepository agendaRepository;

	@Autowired
	private AgendaService agendaService;

	@Bean
	CommandLineRunner start(AgendaService agendaService){
		return args -> {
			agendaService.createAgenda(new Agenda(
					1l,
					"subject",
					"samesparticipant",
					"location",
					Date.from(Instant.now()),
					Date.from(Instant.now()),
					"reponsable",
					"JSUT"


			));
		};
	}



}
