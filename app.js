var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var s = getComputedStyle(canvas);
const input = document.querySelector('input');
var x=(canvas.width/2)+60;
var y=canvas.height/2;
var w = s.width;
var h = s.height;
canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];


const nuevojuego = document.getElementById("novojogo");
nuevojuego.addEventListener("click", Palabras, {once:true});

function dibHorca(ctx) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#0A3871";  
  ctx.moveTo(x-140,19);
  ctx.lineTo(x-139,325);
  ctx.moveTo(x-140,20);
  ctx.lineTo(x,20);
  ctx.lineTo(x,55);
  ctx.moveTo(x-200,325);
  ctx.lineTo(x+70,325);
  ctx.moveTo(x-200,325);
  ctx.stroke();
} 
dibHorca(ctx);

function dibAhoracado(ctx) {

    ctx.beginPath(); 
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";    
    ctx.arc(x,80,25,0,Math.PI*2,true); 
    ctx.moveTo(x+35,75);

   
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";    
    ctx.moveTo(x,105);
    ctx.lineTo(x,225);



    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";  
    ctx.moveTo(x,115);
    ctx.lineTo(x+30,160)
   
  

  
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";  
    ctx.moveTo(x,115);
    ctx.lineTo(x-30,160) 
    
  


    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";  
    ctx.moveTo(x,225)
    ctx.lineTo(x-30,290)   
    
    

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0A3871";  
    ctx.moveTo(x,225); 
    ctx.lineTo(x+30,290)
    ctx.stroke();
  
}  

// document.addEventListener('keydown', Ahoracado);

// function Ahoracado(event) {
//   const letraElejida = event.key;
//   let colgado = [h1,h2,h3,h4,h5,h6]
//   var letras = document.querySelectorAll('.letras');
//   for(let x=0;x<letras.length;x++) {
    
//   }
// }

let xas=new Promise(resolve => {
  fetch("https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=8") 
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      resolve(setPalabras=xml.childNodes[1].childNodes[1].firstChild.textContent);
    })
  }).then(Palabras(value));

function Palabras(value) {  
  var specialChars = '!"@#$^&%*()+=-[]\/{}|:\r\n|\n|\r<>?.';
  for (var i = 0; i < specialChars.length; i++) {
      setPalabras = setPalabras.replace(new RegExp("\\" + specialChars[i], "gi"), "");
  }
  let words = setPalabras.split(",");
  let word = words[0]
  return JuegoNuevo(word);  
}

function JuegoNuevo(word) {   
  for (let i=0;i<word.length;i++) {
  document.getElementById('casilleros').innerHTML += `<div class="letras" id="${word[i]}"></div>`;  
  } 
  
  console.log(word)
  var letras = document.querySelectorAll('.letras');

  var x = 0;
  document.addEventListener('keydown',(e) => {
  const letraElejida = e.key;
  
    while (x < letras.length) {     
      if (letras[x].id !== letraElejida) {
        dibAhoracado(ctx);
      }
      if (letras[x].id !== letraElejida) {
        break;
      }  
      letras[x].innerHTML=letras[x].id   
      x++; 
    }
  })
}

  // for (let i=0;i<word.length;i++) {
  //   document.getElementById('casilleros').innerHTML += `<div class="letras" id="${word[i]}"></div>`;
    
  //   var letras = document.querySelectorAll('.letras');

    // document.addEventListener('keydown', (e) => {
    //   const letraElejida = e.key;
    //   if(letras[i].id === letraElejida) {
    //     letras[i].innerHTML=letras[i].id
    //   } else {
    //     console.log(dibRostro(ctx))
       
    //   }
    //   })  
  //   // var desistir = document.getElementById("desistir");
  //   // desistir.addEventListener("click", function () {
  //   // letras[i].innerHTML=letras[i].id
  //   // })
   
  // } 


// new Promise(resolve => {
//   document.addEventListener('keydown', (e) => {
//     const letraElejida = e.key;
//     if(letras[i].id !== letraElejida) {
//       dibRostro(ctx)
//       }
//     })
//     resolve(JuegoNuevo)  
//   })


 
  

// new Promise(resolve => {
//   fetch('https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=8')
//   .then(res => res.json())
//   .then(data => {
//   let word=data.response
//   resolve(letras=word.split(""))
//   })
// })
// .then(
//     function(value) {Juego(value);}
// ).catch(console.log("Hubo un Error"))

