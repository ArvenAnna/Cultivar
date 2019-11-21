package com.anna.cultivar.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.anna.cultivar.dto.VarietyDto;
import com.anna.recept.entity.Detail;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "varieties")
public class Variety {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "variety_type")
	private Type type;

	@Column(name = "hybridisation_date")
	private LocalDate hybridisationDate;

	@Column(name = "sport_of")
	private Long sportOf;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "author")
	private Hybridisator author;

	@OneToMany(mappedBy = "variety", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<VarietyDetail> details = new ArrayList<>();

	public enum Type {
		MINIATURE, SEMIMINI, COMPACT_STANDART, LARGE_STANDART
	}

	public static Variety of (VarietyDto dto) {
		Variety variety = new Variety();
		variety.setId(dto.getId());
		variety.setName(dto.getName());
		variety.setAuthor(Optional.ofNullable(dto.getAuthor()).map(Hybridisator::of).orElse(null));
		variety.setDescription(dto.getDescription());
		variety.setType(dto.getType());
		variety.setHybridisationDate(dto.getHybridisationDate());
		variety.setSportOf(dto.getSportOf());
		variety.setDetails(Optional.ofNullable(dto.getDetails())
				.map(details -> details.stream().map(detail -> VarietyDetail.of(detail, variety)).collect(Collectors.toList()))
				.orElse(new ArrayList<>()));
		return variety;
	}
}
