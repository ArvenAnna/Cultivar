package com.anna.cultivar.entity;

import java.util.ArrayList;
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

import com.anna.cultivar.dto.CreateLeafRequest;
import com.anna.cultivar.dto.VarietyBaseDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "leaves")
public class Leaf {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "parent")
	private Exemplar parent;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "variety_id")
	private Variety variety;

	@OneToMany(mappedBy = "leaf", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<LeafHistory> history = new ArrayList<>();

	public static Leaf of(CreateLeafRequest request) {
		Leaf entity = new Leaf();
		Optional.ofNullable(request.getParent()).ifPresent(parentEx -> {
			Exemplar parent = new Exemplar();
			parent.setId(parentEx.getId());
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
