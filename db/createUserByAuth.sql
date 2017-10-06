INSERT INTO users (name, email, credit_card, past_orders, current_orders) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, email, credit_card, past_orders, current_orders, reviews_written;
