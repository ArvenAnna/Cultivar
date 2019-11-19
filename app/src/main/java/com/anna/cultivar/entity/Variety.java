package com.anna.cultivar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.anna.cultivar.dto.VarietyDto;

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

	@Column(name = "author")
	private String author;

	@Column(name = "description")
	private String description;

	public static Variety of (VarietyDto dto) {
		Variety variety = new Variety();
		variety.setId(dto.getId());
		variety.setName(dto.getName());
		variety.setAuthor(dto.getAuthor());
		variety.setDescription(dto.getDescription());
		return variety;
	}
}
