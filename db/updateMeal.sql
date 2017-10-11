UPDATE addmeal
SET mealname = ${mealname}, mealcost = ${mealcost}, description= ${description}, vegan= ${vegan}, vegetarian= ${vegetarian}, nonveg= ${nonveg}, glutenfree= ${glutenfree}, soy= ${soy}, nuts= ${nuts}, schedule= ${schedule}, image= ${image}
WHERE id = ${id};
