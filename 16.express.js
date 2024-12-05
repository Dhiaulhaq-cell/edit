const express = require('express')
const app = express()
const path = require('path');



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
})


app.use((req,res)=> { 
    res.status(404).send("404 : Not found")
})

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})