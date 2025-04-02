CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'manager', 'staff')) NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE stock_movements (
    movement_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    movement_type VARCHAR(20) NOT NULL CHECK (
        movement_type IN ('stock-in', 'sale', 'remove')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores (store_id) ON DELETE CASCADE
);

CREATE INDEX idx_product_store ON stock_movements (product_id, store_id);
CREATE INDEX idx_store_inventory ON stock_movements (store_id);
CREATE INDEX idx_movement_type ON stock_movements (movement_type);


INSERT INTO users (username, password, role) VALUES
('admin', '1234', 'admin');

INSERT INTO stores (name, location) VALUES
('Store A', 'New York'),
('Store B', 'Los Angeles'),
('Store C', 'Chicago');

INSERT INTO products (name, category, price) VALUES
('Laptop', 'Electronics', 1200.00),
('Phone', 'Electronics', 800.00),
('TV', 'Electronics', 1500.00),
('PlayStation', 'Electronics', 1850.00);

INSERT INTO stock_movements (product_id, store_id, quantity, movement_type) VALUES
(1, 1, 50, 'stock-in'),
(2, 2, 30, 'stock-in'),
(3, 3, 20, 'stock-in'),
(1, 1, 10, 'sale');
