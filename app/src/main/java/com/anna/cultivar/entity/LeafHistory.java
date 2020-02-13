package com.anna.cultivar.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.LeafHistoryDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "leaf_history")
public class LeafHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "leaf_id")
	private Leaf leaf;

	@Column(name = "event_type")
	@Enumerated(EnumType.STRING)
	private LeafEvent eventType;

	@Column(name = "event_date")
	private LocalDate date;

	@Column(name = "description")
	private String description;

	@Column(name = "photo")
	private String photo;

	public enum LeafEvent {
		APPEARANCE,
		LEAF_ROOTS,
		PLANTING_GROUND,
		FIRST_LEAF,
		SEPARATE_FROM_LEAF,
		DISAPPEARANCE,
		GROW
	}

	public static LeafHistory of(LeafHistoryDto dto) {
		LeafHistory entity = new LeafHistory();
		entity.setId(dto.getId());
		entity.setDate(dto.getDate());
		entity.setDescription(dto.getDescription());
		entity.setPhoto(dto.getPhoto());
		entity.setEventType(dto.getEventType());
		return entity;
	}

	public static LeafHistory of(CreateLeafRequest request) {
		LeafHistory entity = new LeafHistory();
		entity.setDate(request.getDate());
		entity.setDescription(request.getDescription());
		entity.setPhoto(request.getPhoto());
		entity.setEventType(LeafEvent.APPEARANCE);
		return entity;
	}
}
