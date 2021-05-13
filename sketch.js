let robox = 100
let roboy = 100
let forceX = 0;
let forceY = 0;
let teste = 1;
let teste1 = 0;
let movimentos = {}
let socket
let size
let robo1 = {}
let robos = {}
let destinorobo1 = {}
let verdfalse = {}
let velocidade = 1
let qtdrobo = 10
let tamanhorobo = 50
let clientx = 50;
let clienty = 50;
let angulo=0;
let seilax
let seilay
let rgb = {}
let pessoas
let xcel = 50
let ycel = 50


let permissionGranted = false

function preload() {
  img = loadImage('robo.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //Conexão com o servidor
  socket = io.connect('https://back-2.mateusvgarcia.repl.co')
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
  rgb = {
    r: parseInt(random(1,255)),
    g: parseInt(random(1,255)),
    b: parseInt(random(1,255)),
  }


}

function robo(pessoas){
  movimentos = pessoas  
  delete pessoas[socket.id]
  size = Object.keys(pessoas).length;
}








function draw() { 
  if(forceX === 0 && forceY === 0){
    rectMode(RADIUS);
    imageMode(CENTER);
    background(220);
    tint(rgb.r,rgb.g,rgb.b)
    image(img,clientx,clienty,tamanhorobo,tamanhorobo)
    noTint()
    total = {
      x: clientx,
      y: clienty,
      corr: rgb.r,
      corg: rgb.g,  
      corb: rgb.b
    }
    socket.emit('coordenadas', total)
    if (keyIsPressed === true) {
      if (keyCode === UP_ARROW) {
        clienty= clienty - velocidade
      }else if (keyCode === DOWN_ARROW) {
        clienty= clienty + velocidade
      }else if (keyCode === LEFT_ARROW) {
        clientx= clientx - velocidade
      }else if (keyCode === RIGHT_ARROW) {
        clientx= clientx + velocidade
      }
    }
    
    for(let i=0;i<size;i++){
      variavel = movimentos[Object.keys(movimentos)[i]]
      tint(variavel.r,variavel.g,variavel.b)
      image(img,variavel.x,variavel.y,tamanhorobo,tamanhorobo)
      noTint()
      console.log(variavel)
      
      for(j=0;j<qtdrobo;j++){
        distancia1 = dist(robos[j].x,robos[j].y,total.x,total.y)
        if(distancia1 == 0 || distancia1 == 1){          
        }else if (distancia1 < 35){
          destinorobos[j].x = random(0,windowWidth)
          destinorobos[j].y = random(0,windowHeight-60)
        }
        
      }

    } 
    
  
    
    
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
          destinorobos[m].x = random(0,windowWidth)
          destinorobos[m].y = random(0,windowHeight-60)
        }
      }
    }
  
      
  //TELEFONE  
  }else{
    velox = parseFloat(forceX.toFixed(2))
    veloy = parseFloat(forceY.toFixed(2))
    if(veloy > 0.04){
      ycel++
    }else if(veloy < 0.03){
      ycel--
    }else{
    }
    
    if(velox > 0.04){ 
      xcel++
    }else if(velox < 0.03){
      xcel--
    }else{}

    background(255)
    fill(200)
    circle(windowWidth/2,windowHeight/2,200)      
    fill(150)
    circle(windowWidth/2,windowHeight/2,100)
    fill(0)
    circle(windowWidth/2+velox*100,windowHeight/2+veloy*100,100)

 

    total = {
      x: xcel,
      y: ycel,
      corr: rgb.r,
      corg: rgb.g,  
      corb: rgb.b
    }
    socket.emit('coordenadas', total)
  }
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
