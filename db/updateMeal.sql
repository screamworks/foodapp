UPDATE addmeal
SET mealname = $1, mealcost = $2, description= $3, vegan= $4, vegetarian= $5, nonveg= $6, glutenfree= $7, soy= $8, nuts= $9, schedule= $10, image= $11
WHERE id = $12;
