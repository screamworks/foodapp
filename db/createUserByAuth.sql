INSERT INTO users (name, email, creditCard, pastOrders, currentOrders) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, email, creditCard, pastOrders, currentOrders, reviewsWritten;
