package com.anna.recept.repository;

import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.entity.Proportion;
import com.anna.recept.entity.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeCriteriaRepositoryImpl implements RecipeCriteriaRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<Recipe> findRecipesBySearchParams(SearchRecipeParams params) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Recipe> cq = cb.createQuery(Recipe.class);

        Root<Recipe> recipe = cq.from(Recipe.class);
        List<Predicate> predicates = new ArrayList<>();

        if (params.getSearch() != null) {
            Predicate searchInNamePredicate = cb.like(cb.upper(recipe.get("name")), "%" + params.getSearch().toUpperCase() + "%");
            Predicate searchInTextPredicate = cb.like(cb.upper(recipe.get("text")), "%" + params.getSearch().toUpperCase() + "%");
            Predicate searchPredicate = cb.or(searchInNamePredicate, searchInTextPredicate);

            predicates.add(searchPredicate);
        }

        if (params.getDepartmentId() != null) {
            predicates.add(cb.equal(recipe.get("department"), params.getDepartmentId()));
        }

        if (params.getRefs() != null && !params.getRefs().isEmpty()) {
            Predicate containAllRefsPredicate = null;
            for (Long ref : params.getRefs()) {
                Join<Recipe, Recipe> recipeJoin = recipe.join("refs", JoinType.INNER);
                Predicate refPredicate = cb.equal(recipeJoin.get("referenceRecipe"), ref);
                if (containAllRefsPredicate == null) {
                    containAllRefsPredicate = refPredicate;
                } else {
                    containAllRefsPredicate = cb.and(containAllRefsPredicate, refPredicate);
                }
            }
            if (containAllRefsPredicate != null) {
                predicates.add(containAllRefsPredicate);
            }
        }

        if (params.getIngredients() != null && !params.getIngredients().isEmpty()) {
            Predicate containAllIngredientsPredicate = null;
            for (Long ing : params.getIngredients()) {
                Join<Recipe, Proportion> propJoin = recipe.join("proportions", JoinType.INNER);
                Predicate containIngredientPredicate =  cb.equal(propJoin.get("ingredient"), ing);
                if (containAllIngredientsPredicate == null) {
                    containAllIngredientsPredicate = containIngredientPredicate;
                } else {
                    containAllIngredientsPredicate = cb.and(containAllIngredientsPredicate, containIngredientPredicate);
                }
            }
            if (containAllIngredientsPredicate != null) {
                predicates.add(containAllIngredientsPredicate);
            }
        }

        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}
