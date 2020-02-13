package com.anna.cultivar.service;

import java.time.LocalDate;

public interface ExemplarTransitionService {
	void createExemplarFromSteamSeparation(Long exemplarId, LocalDate date);
	void createLeafFromLeafSeparation(Long exemplarId, LocalDate date);
	void createExemplarFromChildSeparation(Long leafId, LocalDate date);
}
