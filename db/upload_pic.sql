

  INSERT INTO addmeal (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image, authid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
