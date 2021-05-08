let robox = 100
let roboy = 100
var forceX = 0;
var forceY = 0;
let teste = 1;
let teste1 = 0;
let movimentos = {}
let socket
let size
let robo1 = {}
let robos = {}
let destinorobo1 = {}
let verdfalse = {}
let velocidade = 2
let qtdrobo = 10
let tamanhorobo = 50
let x = 0;
let y = 0;
let angulo=0;
let seilax
let seilay


function preload() {
   img = loadImage('robo.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //Conexão com o servidor
  socket = io.connect('https://accessible-pickle-lumber.glitch.me')
  socket.on('coordenadas', robo);
  //giroscopio
  gyro.frequency = 10; 
  gyro.startTracking(function(o) {
        forceX = o.gamma/50;
        forceY = o.beta/50;
    });




  verdfalse = [
    robo1 = {
      x: false,
      y: false
    },
    robo2 = {
      x: false,
      y: false
    },
    robo3 = {
      x: false,
      y: false
    },
    robo4 = {
      x: false,
      y: false
    },
    robo5 = {
      x: false,
      y: false
    },
    robo6 = {
      x: false,
      y: false
    },
    robo7 = {
      x: false,
      y: false
    },
    robo8 = {
      x: false,
      y: false
    },
    robo9 = {
      x: false,
      y: false
    },
    robo10 = {
      x: false,
      y: false
    },
  ]

  destinorobos = [
    robo1 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo2 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo3 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo4 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo5 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo6 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo7 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo8 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo9 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo10 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    }
  

  ]

  robos =  [
    robo1 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo2 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo3 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo4 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo5 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo6 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo7 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo8 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo9 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    },
    robo10 = {
      x: random(0,windowWidth-40),
      y: random(0,windowHeight-40)
    }
  ]


}


function robo(total){
  movimentos = total
  size = Object.keys(total).length;
}




function draw() { 
  if(forceX === 0 && forceY === 0){
  rectMode(RADIUS);
  imageMode(CENTER);
  //translate(x,y);
  background(220);
  //rotate(angulo);
  

    


  for(let j=0;j<qtdrobo;j++){
    image(img,robos[j].x,robos[j].y,tamanhorobo,tamanhorobo);
  }


  for(let k = 0;k<qtdrobo;k++){
    if(robos[k].x + 1<destinorobos[k].x){
      robos[k].x = robos[k].x + 1
    }else if(robos[k].x-1>destinorobos[k].x){
      robos[k].x = robos[k].x - 1
    }else{
      verdfalse[k].x = true
    }

    if(robos[k].y + 1<destinorobos[k].y){
      robos[k].y = robos[k].y + 1
    }else if(robos[k].y>destinorobos[k].y){
      robos[k].y = robos[k].y - 1
    }else{
      verdfalse[k].y = true
    }
    if(verdfalse[k].x == true && verdfalse[k].y == true){
      destinorobos[k].x = random(0,windowWidth-40)
      destinorobos[k].y = random(0,windowHeight-40)
      verdfalse[k].x = false
      verdfalse[k].y = false
    }

    for(let m=0;m<qtdrobo;m++){
      distancia = dist(robos[k].x,robos[k].y,robos[m].x,robos[m].y)
      if(distancia < 35 && distancia != 0){
        //destinorobos[k].x = random(0,windowWidth-40)
        //destinorobos[k].y = random(0,windowHeight-40)
        console.log(distancia)
        console.log("bateu")
      
      
        destinorobos[m].x = random(0,windowWidth-40)
        destinorobos[m].y = random(0,windowHeight-40)
        //destinorobos[k].x = random(0,windowWidth-40)
        //destinorobos[k].y = random(0,windowHeight-40)
      }
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
 
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


  
  
  
  
  
  





 
    

  }else{   
    total = {
      x: forceX,
      y: forceY    
    } 
    socket.emit('coordenadas', total)
  }

}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
