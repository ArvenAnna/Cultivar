package com.anna.cultivar.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.recept.entity.Recipe;
import org.hibernate.Criteria;
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

		if (searchParams.getClosed() != null && !searchParams.getClosed()) {
			Subquery<Exemplar> sq = query.subquery(Exemplar.class);

			Root<ExemplarHistory> history = sq.from(ExemplarHistory.class);
			Join<ExemplarHistory, Exemplar> historyJoin = history.join("exemplar", JoinType.INNER);

			sq.select(historyJoin).where(cb.equal(history.get("eventType"), ExemplarHistory.ExemplarEvent.DISAPPEARANCE));


			Predicate containClosedHistoryPredicate = cb.in(exRoot).value(sq).not();
			predicates.add(containClosedHistoryPredicate);
		}

		if (searchParams.getChildrenFor() != null) {
			predicates.add(cb.equal(exRoot.get("parent"), searchParams.getChildrenFor()));
		}

		if (searchParams.getChildrenForLeaf() != null) {
			predicates.add(cb.equal(exRoot.get("parentLeaf"), searchParams.getChildrenForLeaf()));
		}

		query.distinct(true);

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
