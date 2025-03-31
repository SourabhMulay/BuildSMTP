import e from "express";
import f from 'fs';
import https from 'https';


const options={
    key:f.readFileSync(import.meta.dirname+'/key.pem'),
    cert:f.readFileSync(import.meta.dirname+'/cert.pem')
}

console.log(import.meta.dirname)

const app= new e();

app.get('/', (req,res,next)=>{
    res.setHeader("Content-Security-Policy", "default-src *; script-src *; style-src *; img-src *; connect-src *; font-src *; object-src *; media-src *; frame-src *;");
    res.send('ssl secure http server');
    next();
})

const server=https.createServer(options, app);


app.post('/data', function(req,res){
    res.status(200).send('Sucess');
    console.log('Hiting the API');
});
 



server.listen(3000, function(){
    console.log('Server started on Port 3000')
})

