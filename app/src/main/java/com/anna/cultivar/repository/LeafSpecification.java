package com.anna.cultivar.repository;

import com.anna.cultivar.dto.LeafSearchParams;
import com.anna.cultivar.entity.Exemplar;
import com.anna.cultivar.entity.ExemplarHistory;
import com.anna.cultivar.entity.Leaf;
import com.anna.cultivar.entity.LeafHistory;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;

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

		if (searchParams.getClosed() != null && !searchParams.getClosed()) {
			Subquery<Leaf> sq = query.subquery(Leaf.class);

			Root<LeafHistory> history = sq.from(LeafHistory.class);
			Join<LeafHistory, Leaf> historyJoin = history.join("leaf", JoinType.INNER);

			sq.select(historyJoin).where(cb.equal(history.get("eventType"), LeafHistory.LeafEvent.DISAPPEARANCE));


			Predicate containClosedHistoryPredicate = cb.in(leafRoot).value(sq).not();
			predicates.add(containClosedHistoryPredicate);
		}

		query.distinct(true);

		return cb.and(predicates.toArray(new Predicate[0]));
	}
}
