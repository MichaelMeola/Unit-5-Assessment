-- Problem 1:
SELECT email
FROM customers
ORDER BY email ASC;

-- Problem 2:
SELECT id
FROM orders
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE fname = 'Elizabeth'
    AND lname = 'Crocker'
);

-- Problem 3:
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = FALSE;

-- Problem 4:
SELECT cupcakes.name, SUM(orders.num_cupcakes) AS sum
FROM cupcakes
LEFT JOIN orders ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name
ORDER BY cupcakes.name ASC;

-- Problem 5:
SELECT customers.email, SUM(orders.num_cupcakes) AS total
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.email
ORDER BY total DESC;

-- Problem 6:
SELECT customers.fname, customers.lname, customers.email
FROM customers AS customers
JOIN orders AS orders ON customers.id = orders.customer_id
JOIN cupcakes AS cupcakes ON orders.cupcake_id = cupcakes.id
WHERE cupcakes.id = 5
AND orders.processed = true
GROUP BY customers.fname, customers.lname, customers.email;