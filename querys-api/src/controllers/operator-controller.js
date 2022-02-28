 
/**
 * Obtener destinos segun el parametro name
 */
 exports.searchByCUI = (req, res) => {
    let cui = req.query.cui;
    req.getConnection((error, conn) => {
        if(error) return res.send(error);
        conn.query('SELECT * FROM OPERATOR WHERE cui LIKE "' + cui +'%"',(error, rows) => {
            if(error) return res.send(error);
            res.json(rows);
        })
    })
};
