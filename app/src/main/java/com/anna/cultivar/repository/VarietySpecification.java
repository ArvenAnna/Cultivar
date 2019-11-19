package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.anna.cultivar.dto.VarietySearchParams;
import com.anna.cultivar.entity.Variety;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class VarietySpecification implements Specification<Variety> {

	private VarietySearchParams searchParams;

	@Override
	public Predicate toPredicate(Root<Variety> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		Root<Variety> varietyRoot = root;
		List<Predicate> predicates = new ArrayList<>();

		if (searchParams.getSearch() != null) {
			Predicate searchInNamePredicate = cb.like(cb.upper(varietyRoot.get("name")), "%" + searchParams.getSearch().toUpperCase() + "%");
			Predicate searchInDescriptionPredicate = cb.like(cb.upper(varietyRoot.get("description")), "%" + searchParams.getSearch().toUpperCase() + "%");
			Predicate searchInAuthorPredicate = cb.like(cb.upper(varietyRoot.get("author")), "%" + searchParams.getSearch().toUpperCase() + "%");
			Predicate searchPredicate = cb.or(searchInNamePredicate, searchInDescriptionPredicate, searchInAuthorPredicate);

			predicates.add(searchPredicate);
		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
