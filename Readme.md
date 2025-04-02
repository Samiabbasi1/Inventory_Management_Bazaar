This project is an Inventory Tracking System designed to manage product stock movements efficiently. Initially built for a single store, it has now evolved to support 500+ stores, using a relational database (PostgreSQL), REST API endpoints, and authentication & request throttling.

Technology Stack:

Backend: Express.js (Node.js)

Database: PostgreSQL

Authentication: JWT (JSON Web Token)

Containerization: Docker & Docker Compose

Database Schema:

Tables:

Products (id, name, category, price)

Stores (id, name, location)

Stock Movements (id, store_id, product_id, quantity, type [stock-in/sale/remove], timestamp)

Key Architectural Decisions:

Move from local storage to PostgreSQL for scalability and data integrity.

Multi-store inventory tracking via store_id in stock movements.

Authentication & rate limiting to prevent API misuse.

RESTful API for operations & reports with filtering capabilities.

2. API Design

Base URL: localhost:5000/

Endpoint

Method

Description

/products

POST

Add a new product

/stores

POST

Register a new store

/stock/stock-in

POST

Add stock to a store

/stock/sale

POST

Deduct stock from a store

/stock/remove

POST

Manually remove stock

/inventory

GET

View current stock by store

/report

GET

Generate stock movement reports by date range



Evolution Strategy (Stage 1 → Stage 2)

Stage 1: Single Store

Used local storage (SQLite/JSON file).

Simple CLI/API for stock-in, sales, and manual removals.

Stage 2: Multi-Store (Current Stage)

Switched to PostgreSQL for relational data handling.

Added REST API with authentication and rate limiting.

Enabled store-based inventory tracking & reporting.

