package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.anna.cultivar.dto.ExemplarSearchParams;
import com.anna.cultivar.entity.Exemplar;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ExemplarSpecification implements Specification<Exemplar> {

	private ExemplarSearchParams searchParams;

	@Override
	public Predicate toPredicate(Root<Exemplar> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		Root<Exemplar> exRoot = root;
		List<Predicate> predicates = new ArrayList<>();

		if (searchParams.getSearch() != null) {
			Predicate searchInNamePredicate = cb.like(cb.upper(exRoot.get("name")), "%" + searchParams.getSearch().toUpperCase() + "%");
			predicates.add(searchInNamePredicate);
		}

		if (searchParams.getVarietyId() != null) {
			predicates.add(cb.equal(exRoot.get("variety"), searchParams.getVarietyId()));
		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
