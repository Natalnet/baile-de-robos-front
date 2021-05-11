var express = require('express');
var app = express();
var porta = 3000
var server = app.listen(porta);
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);
var pessoas = {}
console.log('servidor rodando na porta ' + porta)

function newConnection(socket){
  console.log('Nova conexão ' + socket.id); 
  socket.on('coordenadas', cordenada);    
  
    socket.on('disconnect', () => {      
      delete pessoas[socket.id]
       console.log(pessoas)
    });    
  
    function cordenada(total){      
      pessoas[socket.id]={
        x:total.x,
        y:total.y
      }        
      console.log(pessoas)
      socket.emit("coordenadas", pessoas); 
    }  
}
