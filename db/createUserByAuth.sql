INSERT INTO users (name, authid) VALUES ($1, $2)  RETURNING *;

-- meals_made, past_orders, current_orders, authid, reviews_written, upcoming orders
-- $3, $4, $5, $6, $7, $8
