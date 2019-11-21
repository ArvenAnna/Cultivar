package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.anna.cultivar.entity.Variety;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class VarietyKeywordSpecification implements Specification<Variety>  {

	private String keyword;

	@Override
	public Predicate toPredicate(Root<Variety> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		Root<Variety> varietyRoot = root;
		List<Predicate> predicates = new ArrayList<>();

		if (keyword != null) {
			Predicate searchInNamePredicate = cb.like(cb.upper(varietyRoot.get("name")), "%" + keyword.toUpperCase() + "%");
			predicates.add(searchInNamePredicate);
		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
