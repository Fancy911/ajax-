//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO AJAX');
});

app.post('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO AJAX POST');
});

// //可以接收任意类型的请求 
// app.all('/server', (request, response) => {
//     //设置响应头  设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     //响应头
//     response.setHeader('Access-Control-Allow-Headers', '*');
//     //设置响应体
//     response.send('HELLO AJAX POST');
// });

//JSON 响应
app.all('/json-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，允许所有类型的头部信息（比如自定义类型的头）
    response.setHeader('Access-Control-Allow-Headers', '*');
    //响应一个数据
    const data = {
        name: 'lizhiwei'
    };
    //必须对对象进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);
});

//针对 IE 缓存
app.get('/ie', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO IE - 5');
});

//延时响应
app.all('/delay', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        //设置响应体
        response.send('延时响应');
    }, 3000)
});

//jQuery 服务
app.all('/jquery-server', (request, response) => {
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，允许所有类型的头部信息（比如自定义类型的头）
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name:'lizhiwei'
    };
    response.send(JSON.stringify(data));
});

//axios 服务
app.all('/axios-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name:'lizhiwei'};
    response.send(JSON.stringify(data));
});

//fetch 服务
app.all('/fetch-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name:'Lizhiwei'};
    response.send(JSON.stringify(data));
});

//jsonp服务
app.all('/jsonp-server',(request, response) => {
    // 这样写是不行的，因为这样写的话，浏览器会当做普通的字符串来处理，而不是当做js代码来处理
    // response.send("hello jsonp");
    // 而我们jsonp解决跨域的原理是，客户端会先动态的创建一个script标签，然后将这个script标签插入到页面中
    // 这个script标签的src属性就是我们要请求的地址
    // 服务端返回的内容就是这个script标签的内容
    // 所以我们要返回的内容必须是一个js代码
    // 但是我们不能直接返回一个js代码，因为这样的话，浏览器会当做普通的字符串来处理，而不是当做js代码来处理
    // 所以我们要将js代码包裹在一个函数中，然后返回这个函数的调用
    // response.send('console.log("hello jsonp")');  // 这样写就是ok的
    const data = {
        name: 'lizhiwei哈哈哈哈'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    // 返回结果
    // 服务端的返回结果是一个函数调用
    // 而函数的参数就是我们要给客户端返回的数据
    // 注意：这个函数，客户端要提前定义好，否则会报错
    response.end(`handle(${str})`);
});

// 原生jsonp案例接口：用户名检测是否存在
app.all('/check-username',(request, response) => {
    const data = {
        exist: 1,
        msg: '用户名已经存在'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果
    response.end(`handle(${str})`);
});

// jQuery-jsonp服务
app.all('/jquery-jsonp-server',(request, response) => {
    const data = {
        name:'中国的城市',
        city: ['北京','上海','深圳']
    };
    // 将数据转化为字符串
    let str = JSON.stringify(data);
    // 接收 callback 参数
    let cb = request.query.callback; 
    // request.query 是一个对象，里面包含了所有的查询字符串参数，这里的callback就是查询字符串参数
    // 就可以把这个callback参数拿到，然后通过这个cb函数来调用
    response.end(`${cb}(${str})`); 
});

app.all('/cors-server', (request, response)=>{
    //设置响应头
    response.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有的域名访问
    response.setHeader("Access-Control-Allow-Headers", '*'); // 允许所有的头部信息
    response.setHeader("Access-Control-Allow-Method", '*'); // 允许所有的方法
    // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // 只允许这个域名访问
    response.send('hello CORS');
});

//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});