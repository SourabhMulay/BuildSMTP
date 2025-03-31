const http=require('http');

const port=3000;

const server=http.createServer(function listener(){
    console.log('request received');
})

server.listen(port,function callback(){
    console.log('server stared at port', port)
})