const http = require ('http');
const fs = require ('fs');
const port = 3000;

http.createServer((req,res) => { 
   const url = req.url;
   const renderHTML = (path,res) => { 
    fs.readFile(path, 'utf-8', (err,data) => {
        if (err) {
            console.log(err);
            res.write('error');
        } else { 
            res.writeHead(200, { "Content-type": "text/html"})
            res.write(data);
            res.end();  
        }
    }) 
   }
    if (url === "/about") {
        renderHTML('./views/about.html',res);
    } else if (url === "/contact") {  
        renderHTML('./views/about.html',res);
       
    } else if (url === '/') { 
       renderHTML('./views/index.html',res);
    } else {
        res.writeHead(404, { "Content-type": "text/html"})
        res.write('404: Page Not Found')
        res.end()
    }

}).listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
});