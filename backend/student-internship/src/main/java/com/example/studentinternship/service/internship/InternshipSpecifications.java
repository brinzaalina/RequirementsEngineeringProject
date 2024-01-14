package com.example.studentinternship.service.internship;

import com.example.studentinternship.model.Internship;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class InternshipSpecifications
{
    public static Specification<Internship> withDynamicFilter(
            List<String> locations,
            List<String> fields,
            Boolean salaryFilter,
            String titleSearch)
    {

        return (root, query, criteriaBuilder) ->
        {
            List<Predicate> predicates = new ArrayList<>();

            // Location filter
            if (locations != null && !locations.isEmpty())
            {
                predicates.add(root.get("location").in(locations));
            }

            // Field filter
            if (fields != null && !fields.isEmpty())
            {
                predicates.add(root.get("field").in(fields));
            }

            // Salary filter
            if (salaryFilter != null)
            {
                if (salaryFilter)
                {
                    predicates.add(criteriaBuilder.greaterThan(root.get("salary"), 0));
                } else
                {
                    predicates.add(criteriaBuilder.equal(root.get("salary"), 0));
                }
            }

            // Title search (like '%title%')
            if (titleSearch != null && !titleSearch.isEmpty())
            {
                predicates.add(criteriaBuilder
                        .like(criteriaBuilder.lower(root.get("title")), "%" + titleSearch.toLowerCase() + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
