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
		List<Predicate> predicates = new ArrayList<>();

//		if (searchParams.getSearch() != null) {
//			Predicate searchInNamePredicate = cb.like(cb.upper(root.get("name")), "%" + searchParams.getSearch().toUpperCase() + "%");
//			Predicate searchInDescriptionPredicate = cb.like(cb.upper(root.get("description")), "%" + searchParams.getSearch().toUpperCase() + "%");
//			//			Predicate searchInAuthorPredicate = cb.like(cb.upper(varietyRoot.get("author")), "%" + searchParams.getSearch().toUpperCase() + "%");
//			Predicate searchPredicate = cb.or(searchInNamePredicate, searchInDescriptionPredicate);
//
//			predicates.add(searchPredicate);
//		}

//		if (searchParams.getHybridisatorId() != null) {
//			predicates.add(cb.equal(varietyRoot.get("author"), searchParams.getHybridisatorId()));
//		}
//
//		if (searchParams.getType() != null) {
//			predicates.add(cb.equal(varietyRoot.get("ype"), searchParams.getType()));
//		}
//
//		if (searchParams.getSportOf() != null) {
//			predicates.add(cb.equal(varietyRoot.get("sportOf"), searchParams.getSportOf()));
//		}

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
