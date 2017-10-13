INSERT INTO cart (mealname, quantity, mealcost, authid) VALUES ($1, $2, $3, $4) RETURNING *;
