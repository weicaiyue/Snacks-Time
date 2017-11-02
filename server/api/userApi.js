var express =require('express');
var router = express.Router();
var mysql = require('mysql');
var models = require('../db');
let pool = mysql.createPool(models);

router.post('/addData',(req,res)=>{
	var params = req.body;
	pool.getConnection((err,conn)=>{
		conn.query('insert into ??(code,p_info,amounts) values(?,?,?)',[params.room,params.order,params.p_info,params.total],(err,rows)=>{
			if (err) throw err;
			res.send(rows);
			conn.release();
		})
	})
});
router.get('/getData',(req,res)=>{
	pool.getConnection((err,conn)=>{
		conn.query('select * from productList',(err,rows)=>{
			if (err) throw err;
			res.json(rows);
			conn.release();
		})
	})
})


module.exports = router;;