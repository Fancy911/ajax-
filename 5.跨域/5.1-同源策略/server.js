const express = require('express');

const app = express();

// 打开localhost:9000/home，可以看到index.html页面
// 此时，页面和服务器是同源的，可以正常访问，都是localhost:9000
app.get('/home', (request, response)=>{
    //响应一个页面
    response.sendFile(__dirname + '/index.html');
});

app.get('/data', (request, response)=>{
    response.send('用户数据');
});

app.listen(9000, ()=>{
    console.log("服务已经启动...");
});