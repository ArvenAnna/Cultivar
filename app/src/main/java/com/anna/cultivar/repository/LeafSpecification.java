package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.anna.cultivar.dto.LeafSearchParams;
import com.anna.cultivar.entity.Leaf;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LeafSpecification implements Specification<Leaf> {

	private LeafSearchParams searchParams;

	@Override
	public Predicate toPredicate(Root<Leaf> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		Root<Leaf> leafRoot = root;
		List<Predicate> predicates = new ArrayList<>();

		if (searchParams.getVarietyId() != null) {
			predicates.add(cb.equal(leafRoot.get("variety"), searchParams.getVarietyId()));
		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
