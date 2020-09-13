const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "newdb"
});

app.get('/', function(req,res){

    console.log('root')
    res.sendFile(__dirname+'/sample.html');
})

app.get('/read', function(req, res){
    var query = "SELECT * FROM users";
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else{
            console.log("Read succesful!");
            res.send(results);
        }
    })
})

app.post('/create', (req, res) =>{
    var name = req.body.name;
    var regno = req.body.regno;
    var age = req.body.age;
    var query = 'INSERT INTO USERS (name,regno,age) VALUES ("' + name + '","' + regno + '","' + age + '")';
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else {
            console.log("Created");
            res.send("User created");
        }  
    })
})

app.post('/delete', (req, res) => {
    var id = req.body.id;
    var query = 'DELETE FROM users WHERE id =  ("' + id + '")';
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else {
            console.log("Deleted");
            res.send("User deleted");
        }
        
    })
})

app.post('/update', (req, res) =>{
    var name = req.body.name;
    var regno = req.body.regno;
    var age = req.body.age;
    var id = req.body.id;
    var query = 'UPDATE users SET name = ("' + name + '"), regno = ("' + regno + '"), age = ("' + age + '") WHERE id = ("' + id + '")';
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else{
            console.log("Update succesful!");
        }
    })
})

const port = 3000;

app.listen(port, () =>{
    console.log("App listening on 3000");
});