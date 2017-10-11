UPDATE addmeal
SET mealname = $2, mealcost = $3, description= $4, vegan= $5, vegetarian= $6, nonveg= $7, glutenfree= $8, soy= $9, nuts= $10, schedule= $11, image= $12
WHERE id = $1;
