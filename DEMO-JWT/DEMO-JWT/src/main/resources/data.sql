INSERT INTO users (id, username, password) VALUES (1, 'admin', 'admin');
ALTER TABLE users ALTER COLUMN id RESTART WITH 2;
