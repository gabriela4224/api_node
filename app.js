const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
var mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Ejecutando api')

})


var connection = mysql.createConnection({
    host     : 'database1.cdlina0kna5z.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'gabriela',
    database : 'usuarios'
  });
   
connection.connect(error =>{
    if(error) throw error;
    console.log('Database server running!')
});

app.listen(3000, function () {
    console.log('La Aplicación está funcionando en el puerto 3000');
});

app.post('/usuariosIn',(req,res)=>{
    const sql = 'INSERT INTO Usuarios SET ?';
    const usuarios_obj = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        direccion_residencia: req.body.direccion_residencia

    };
    connection.query(sql,usuarios_obj,error =>{
        if(error) throw error;
        res.send('Customer created!')
    })

});

app.get('/UsuariosAll',(req,res)=>{
    const sql = 'SELECT * FROM Usuarios'
    connection.query(sql,(error,resuls)=>{
        if (error) throw error;
        if (resuls.length > 0){
            res.json(resuls)
        }else{
            res.send('NO')
        }
    })
      

});

app.put('/update/:idUsuario' , (req,res)=>{
const {idUsuario} = req.params;
const {nombre,apellido,edad,direccion_residencia} = req.body;
const sql = `UPDATE Usuarios SET nombre = '${nombre}', apellido='${apellido}', edad=${edad} , direccion_residencia= '${direccion_residencia}' WHERE idUsuario=${idUsuario}`
connection.query(sql,error =>{
    if(error) throw error;
    res.send('update!')
})
});

app.delete('/eliminar/:idUsuario',(req,res)=>{
    const {idUsuario} = req.params;
    const sql = `Delete from Usuarios where idUsuario=${idUsuario}`
    connection.query(sql,error =>{
        if(error) throw error;
        res.send('delete!')
    })
});