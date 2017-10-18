INSERT INTO orders (mealname, quantity, foodid, authid, mealcost) VALUES ($1, $2, $3, $4, $5) RETURNING *;
