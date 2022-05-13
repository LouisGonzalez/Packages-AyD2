/**
 * Obtener destinos segun el parametro name
 */
exports.searchByName = (req, res) => {
    let name = req.query.name;
    req.getConnection((error, conn) => {
        if(error) return res.send(error);
        conn.query('SELECT * FROM DESTINATION WHERE name LIKE "' + name +'%"',(error, rows) => {
            if(error) return res.send(error);
            res.json(rows);
        })
    })
}; 
