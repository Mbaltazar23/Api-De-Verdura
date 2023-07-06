const db = require("../config/config");

const Order = {};

Order.create = (order, result) => {
    const sql = `
      INSERT INTO orders(
        id_client,
        id_address,
        lat,
        lng,
        status,
        timestamp,
        created_at,
        updated_at
    )  VALUES(?,?,?,?,?,?,?,?)`;

    db.query(sql, [
        order.id_client,
        order.id_address,
        order.lat,
        order.lng,
        "PAGADO", // 1. PAGADO  2. DESPACHADO  3. ENTREGADO
        Date.now(),
        new Date(),
        new Date(),
    ], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Id de la nueva orden : ", res.insertId);
            result(null, res.insertId);
        }
    });
};

Order.findByStatus = (status, result) => {
    const sql = `SELECT 
CONVERT(O.id,char) AS id,
CONVERT(O.id_client,char) AS id_client,
CONVERT(O.id_address,char) AS id_address,
O.status,
O.timestamp,
JSON_OBJECT(
   'id', CONVERT(A.id, char),
   'address', A.address,
   'neighborhood', A.neighborhood,
   'lat', A.lat,
   'lng', A.lng
) AS address,
JSON_OBJECT(
   'id', CONVERT(U.id, char),
   'name', U.name,
   'lastname', U.lastname,
   'image', U.image,
   'phone', U.phone
) AS client,
JSON_ARRAYAGG(
       JSON_OBJECT(
           'id', CONVERT(P.id, char),
           'name', P.name,
           'description', P.description, 
           'image', P.image,
           'price', P.price,
           'quantity', OHP.quantity
       )
   ) AS products
FROM
orders AS O
INNER JOIN
users AS U
ON
U.id = O.id_client
INNER JOIN 
address AS A
ON 
A.id = O.id_address
INNER JOIN 
order_has_products AS OHP
ON
OHP.id_order = O.id
INNER JOIN
products AS P
ON
P.id = OHP.id_product
WHERE 
O.status = ?  
GROUP BY O.id`;

    db.query(sql, status, (err, data) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Orders : ", data);
            result(null, data);
        }
    });
};


Order.findByDeliveryAndStatus = (id_delivery, status, result) => {
    const sql = `SELECT 
CONVERT(O.id,char) AS id,
CONVERT(O.id_client,char) AS id_client,
CONVERT(O.id_address,char) AS id_address,
O.status,
O.timestamp,
JSON_OBJECT(
   'id', CONVERT(A.id, char),
   'address', A.address,
   'neighborhood', A.neighborhood,
   'lat', A.lat,
   'lng', A.lng
) AS address,
JSON_OBJECT(
   'id', CONVERT(U.id, char),
   'name', U.name,
   'lastname', U.lastname,
   'image', U.image,
   'phone', U.phone
) AS client,
JSON_ARRAYAGG(
       JSON_OBJECT(
           'id', CONVERT(P.id, char),
           'name', P.name,
           'description', P.description, 
           'image', P.image,
           'price', P.price,
           'quantity', OHP.quantity
       )
   ) AS products
FROM
orders AS O
INNER JOIN
users AS U
ON
U.id = O.id_client
INNER JOIN 
address AS A
ON 
A.id = O.id_address
INNER JOIN 
order_has_products AS OHP
ON
OHP.id_order = O.id
INNER JOIN
products AS P
ON
P.id = OHP.id_product
WHERE O.status = ?  
GROUP BY O.id`;

    db.query(sql, [
        id_delivery, status
    ], (err, data) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Orders : ", data);
            result(null, data);
        }
    });
};


Order.findByClientAndStatus = (id_client, status, result) => {
    const sql = `SELECT 
CONVERT(O.id,char) AS id,
CONVERT(O.id_client,char) AS id_client,
CONVERT(O.id_address,char) AS id_address,
O.status,
O.timestamp,
JSON_OBJECT(
   'id', CONVERT(A.id, char),
   'address', A.address,
   'neighborhood', A.neighborhood,
   'lat', A.lat,
   'lng', A.lng
) AS address,
JSON_OBJECT(
   'id', CONVERT(U.id, char),
   'name', U.name,
   'lastname', U.lastname,
   'image', U.image,
   'phone', U.phone
) AS client,
JSON_ARRAYAGG(
       JSON_OBJECT(
           'id', CONVERT(P.id, char),
           'name', P.name,
           'description', P.description, 
           'image', P.image,
           'price', P.price,
           'quantity', OHP.quantity
       )
   ) AS products
FROM
orders AS O
INNER JOIN
users AS U
ON
U.id = O.id_client
INNER JOIN 
address AS A
ON 
A.id = O.id_address
INNER JOIN 
order_has_products AS OHP
ON
OHP.id_order = O.id
INNER JOIN
products AS P
ON
P.id = OHP.id_product
WHERE 
O.id_client = ? AND O.status = ?  
GROUP BY O.id`;

    db.query(sql, [
        id_client, status
    ], (err, data) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Orders : ", data);
            result(null, data);
        }
    });
};


Order.updateToDispatched = (id_order, result) => {
    const sql = `
  UPDATE
       orders 
  SET 
     status = ?,
     updated_at = ?
  WHERE 
      id = ?`;

    db.query(sql, [
        "DESPACHADO", new Date(), id_order
    ], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Id de la Orden actualizada : ", res.insertId);
            result(null, id_order);
        }
    });
};


Order.updateToDelivered = (id_order, result) => {
    const sql = `
  UPDATE
       orders 
  SET 
     status = ?,
     updated_at = ?
  WHERE 
      id = ?`;

    db.query(sql, [
        "ENTREGADO", new Date(), id_order
    ], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Id de la Orden actualizada : ", res.insertId);
            result(null, id_order);
        }
    });
};

module.exports = Order;
