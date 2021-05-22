let forceX = 0;
let forceY = 0;
let teste = 1;
let movimentos = {}
let socket
let size
let robo1 = {}
let robos = {}
let verdfalse = {}
let velocidade = 1
let qtdrobo = 10
let tamanhorobo = 50
let clientx = 50;
let clienty = 50;
let seilax
let seilay
let rgb = {}
let xcel = 50
let ycel = 50
let batida
let start = false
let robotstart
let robostartplay = true
let menu = false

let message
let messagebutton
let messageurl
let messagetitle

let flagsizex = 40
let flagsizey = 30
let trigger = true
let trigger1 = false

function preload() {
  img = loadImage('robo.png');
  batida = createAudio('batida.wav')
  robotstart = createAudio('robotstart.wav')
  robotstart.onended(sayDone);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  brasil = createImg('brasil.png')
  brasil.position(windowWidth/2 - 180, windowHeight/2)
  brasil.size(flagsizex,flagsizey)
  brasil.mousePressed(messagebr);

  espanha = createImg('espanha.jpg')
  espanha.position(windowWidth/2-30, windowHeight/2)
  espanha.size(flagsizex,flagsizey)
  espanha.mousePressed(messagees);

  franca = createImg('franca.png')
  franca.position(windowWidth/2 + 120, windowHeight/2)
  franca.size(flagsizex,flagsizey)
  franca.mousePressed(messagefr);







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
  if(menu) {
    if(trigger) {
      Swal.fire({
        title: messagetitle,
        text: message,
        imageUrl: messageurl,
        imageWidth:`130`,
        imageHeight:`130`,
        background: `#a5f3e5`,
        confirmButtonText: messagebutton
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          trigger1 = true
        }
      })
      trigger = false
    }

    if(trigger1) {
      if (forceX === 0 && forceY === 0) {
        if (robostartplay) {
          robotstart.play()
          robotstart.volume(0.15)
          robostartplay = false
        }
        rectMode(RADIUS);
        imageMode(CENTER);
        background(220);
        tint(rgb.r, rgb.g, rgb.b)
        image(img, clientx, clienty, tamanhorobo, tamanhorobo)
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
            clienty = clienty - velocidade
          } else if (keyCode === DOWN_ARROW) {
            clienty = clienty + velocidade
          } else if (keyCode === LEFT_ARROW) {
            clientx = clientx - velocidade
          } else if (keyCode === RIGHT_ARROW) {
            clientx = clientx + velocidade
          }
        }

        for (let i = 0; i < size; i++) {
          variavel = movimentos[Object.keys(movimentos)[i]]
          fill(variavel.r, variavel.g, variavel.b)
          image(img, variavel.x, variavel.y, tamanhorobo, tamanhorobo)
          noTint()

          for (j = 0; j < qtdrobo; j++) {
            distancia1 = dist(robos[j].x, robos[j].y, total.x, total.y)
            if (distancia1 == 0 || distancia1 == 1) {
            } else if (distancia1 < 35) {
              destinorobos[j].x = random(0, windowWidth)
              destinorobos[j].y = random(0, windowHeight - 60)
            }

          }
        }


        for (let j = 0; j < qtdrobo; j++) {
          image(img, robos[j].x, robos[j].y, tamanhorobo, tamanhorobo);
        }

        if (start == true) {
          for (let k = 0; k < qtdrobo; k++) {
            if (robos[k].x + 1 < destinorobos[k].x) {
              robos[k].x = robos[k].x + 1
            } else if (robos[k].x - 1 > destinorobos[k].x) {
              robos[k].x = robos[k].x - 1
            } else {
              verdfalse[k].x = true
            }

            if (robos[k].y + 1 < destinorobos[k].y) {
              robos[k].y = robos[k].y + 1
            } else if (robos[k].y > destinorobos[k].y) {
              robos[k].y = robos[k].y - 1
            } else {
              verdfalse[k].y = true
            }


            if (verdfalse[k].x == true && verdfalse[k].y == true) {
              destinorobos[k].x = random(0, windowWidth - 40)
              destinorobos[k].y = random(0, windowHeight - 40)
              verdfalse[k].x = false
              verdfalse[k].y = false
            }

            for (let m = 0; m < qtdrobo; m++) {
              distancia = dist(robos[k].x, robos[k].y, robos[m].x, robos[m].y)
              if (distancia < 35 && distancia != 0) {
                destinorobos[m].x = random(0, windowWidth)
                batida.play()
                batida.volume(0.15)
                destinorobos[m].y = random(0, windowHeight - 60)
                destinorobos[k].y = random(0, windowHeight - 60)
              }
            }
          }
        }

        //TELEFONE
      } else {
        velox = parseFloat(forceX.toFixed(2))
        veloy = parseFloat(forceY.toFixed(2))
        if (veloy > 0.04) {
          ycel++
        } else if (veloy < 0.03) {
          ycel--
        } else {
        }

        if (velox > 0.04) {
          xcel++
        } else if (velox < 0.03) {
          xcel--
        } else {
        }

        background(255)
        fill(200)
        circle(windowWidth / 2, windowHeight / 2, 200)
        fill(150)
        circle(windowWidth / 2, windowHeight / 2, 100)
        fill(0)
        circle(windowWidth / 2 + velox * 100, windowHeight / 2 + veloy * 100, 100)


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

  }else{
    background(50,70,90)
    textSize(50)
    textFont('Anton');
    textAlign(CENTER)
    text("Baile de robos",windowWidth/2,windowHeight/2-200)
    textSize(25)
    text("10 Dimensões",windowWidth/2,windowHeight/2-160)

    textSize(20)
    text("Portuguese",windowWidth/2 - 160, windowHeight/2-10)
    text("Spanish",windowWidth/2-10, windowHeight/2-10)
    text("French",windowWidth/2 + 140, windowHeight/2-10)

  }





}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sayDone(robotstart) {
  start = true
}

function messagefr() {
  messagetitle = "instructions"
  messagebutton = "d'accord"
  message = `Utilisez les touches fléchées pour déplacer les robots. Ce travail a un contrôle via un téléphone portable, accédez simplement à ce même lien sur le téléphone portable et utilisez-le comme contrôle et observez à partir de cet écran`
  messageurl  = ``
  menu = true
  brasil.hide()
  franca.hide()
  espanha.hide()
}

function messagees() {
  messagetitle = "instrucciones"
  messagebutton = "Ok"
  message = `Utilice las teclas de flecha para mover los robots. Este trabajo tiene control vía celular, solo acceda a este mismo enlace en el celular y utilícelo como control y observe desde esta pantalla`
  messageurl  = `https://i.ibb.co/p4JXRcp/Whats-App-Image-2021-05-14-at-09-30-58-1-removebg-preview.png`
  menu = true
  brasil.hide()
  franca.hide()
  espanha.hide()
}

function messagebr() {
  messagetitle = "instruções"
  messagebutton = "Ok"
  message = `Utilize as setas do teclado para mexer os robôs. Está obra possui controle via celular, basta acessar este mesmo link no celular e utilizar lá como controle e observar por está tela`
  messageurl  = `https://i.ibb.co/GJ0M4cB/logo-removebg-preview.png`
  menu = true
  brasil.hide()
  franca.hide()
  espanha.hide()
}