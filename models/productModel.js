const db = require("../config/db");

function addProduct(name, category, price, callback) {
    const query = 'INSERT INTO products(name, category, price) VALUES (?, ?, ?)';
    db.run(query, [name, category, price], function (err) {
        callback(err, { id: this.lastID, name, category, price });
    });
}

function getAllProducts(callback) {
    db.all('SELECT * FROM products', (err, rows) => callback(err, rows));
}

// ✅ Correct module.exports
module.exports = {
    addProduct,
    getAllProducts
};





// const db = require("../config/db");

// exports.addProduct = (name,category,price,callback) => {
//     const query = 'INSERT INTO products(name,category,price) values(?,?,?)';
//     db.run(query,[name,category,price], function(err) {
//         callback(err, {id:this.lastID,name,category,price})
//     });
// };

// exports.getAllProducts = (callback) =>{
//     db.all('SELECT * FROM products',(err,rows)=>callback(err,rows))
// };


// module.exports = {
//     addProduct,
//     getAllProducts
// }