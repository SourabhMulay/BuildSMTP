import e from "express";

const app= new e();

app.get('/server2', function(req,res){
    console.log(res);
   res.sendFile(import.meta.dirname+'/index.html');
})


app.listen(3002, function(){
    console.log('server started');
})