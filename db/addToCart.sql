INSERT INTO cart (mealname, quantity, mealcost, foodid) VALUES ($1, $2, $3, $4) RETURNING *;
