package com.anna.cultivar.entity;

import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.anna.cultivar.dto.ExemplarCreationRequest;
import com.anna.cultivar.dto.VarietyBaseDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "exemplars")
public class Exemplar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "variety_id")
	private Variety variety;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "parent")
	private Exemplar parent;

	@Column(name = "is_sport")
	private boolean isSport;

	@OneToMany(mappedBy = "exemplar", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<ExemplarHistory> history;

	public static Exemplar of(ExemplarCreationRequest request) {
		Exemplar entity = new Exemplar();
		entity.setName(request.getName());
		Optional.ofNullable(request.getParent()).ifPresent(id -> {
			Exemplar parent = new Exemplar();
			parent.setId(id);
			entity.setParent(parent);
		});
		Optional.ofNullable(request.getVariety()).map(VarietyBaseDto::getId).ifPresent(id -> {
			Variety v = new Variety();
			v.setId(id);
			entity.setVariety(v);
		});

		return entity;
	}

}