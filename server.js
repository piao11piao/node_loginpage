var http = require('http');
var fs = require('fs')
var url = require('url')




var server = http.createServer((req,res) => {
    
    const myURL = url.parse(req.url,true)
    var query = myURL.query;
    var pathname = myURL.pathname;
    
    var method = req.method;
    if (pathname == '/login' && method =='GET'){
        fs.readFile('html/login.html','utf-8',(err, data) => {
             if (err) {
                console.log('33333')
                
             }
             if (data) { 
   
                res.writeHead(200,{"Content-Type":"text/html"})
                res.write(data, (err) => {
                    if (err){
                        console.log('can not find file ')
                        return
                    }
                    
                });
                res.end();
                return;
             }
    
        });
        return
    }
    if (pathname == '/process-login' && method =='POST'){
        let body=[];
        req.on('data', (chunk) => {
            body = body + chunk;
        })
        req.on('end',() => {
            
            let fname = new URLSearchParams(body).get('fname')
            let lname = new URLSearchParams(body).get('lname')

            if (fname == 'ling' && lname == 'pan'){
                res.writeHead(200,{"Content-Type":"text/html"})
                res.end("login successfull")
                return
                
            }
            else {
                res.writeHead(200,{"Content-Type":"text/html"})
                res.end("you are no user")
                return
            }
          
            
        })
        return
    }    
  
    res.writeHead(404)
    res.end("404 page not found")

   
})

server.listen(9999)