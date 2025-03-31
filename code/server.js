import e from "express";

const app= new e();

app.use(csp);

function csp(req,res,next){
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';"+"script-src 'self' 'unsafe-inline' 'nonce-RandomKey' http://unsecure.com;"
    )
    next();
}

app.get('/', function(req,res){
    console.log(res);
   res.sendFile(import.meta.dirname+'/index.html');
})


app.listen(3000, function(){
    console.log('server started');
})