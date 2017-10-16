INSERT INTO cart (mealname, quantity, mealcost, foodid, authid) VALUES ($1, $2, $3, $4, $5) RETURNING *;
