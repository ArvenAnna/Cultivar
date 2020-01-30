package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.anna.cultivar.entity.Exemplar;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ExemplarKeywordSpecification implements Specification<Exemplar> {
	private String keyword;

	@Override
	public Predicate toPredicate(Root<Exemplar> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		List<Predicate> predicates = new ArrayList<>();

		if (keyword != null) {
			Predicate searchInVarietyPredicate = cb.like(cb.upper(root.get("variety").get("name")), "%" + keyword.toUpperCase() + "%");
			Predicate searchInNamePredicate = cb.like(cb.upper(root.get("name")), "%" + keyword.toUpperCase() + "%");
			Predicate fullPredicate = cb.or(searchInNamePredicate, searchInVarietyPredicate);

			predicates.add(fullPredicate);
		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
