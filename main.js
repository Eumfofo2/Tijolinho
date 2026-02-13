// cartas
const carta_1 = document.getElementById("carta-1-p")
const carta_2 = document.getElementById("carta-2-p")
const carta_3 = document.getElementById("carta-3-p")

let bonus = document.getElementById("bonus")
// saldo
const saldo = document.getElementById("saldo")
let saldo_total = 10.00
const aposta = document.getElementById("aposta")
let aposta_total = 0.00
const ganho = document.getElementById("ganho")
let ganho_total = 0.00
let rodada = 0

// botoes
let aviso = document.getElementById("aviso")
const rodadas_input = document.getElementById("rodada-b")
const aposta_input = document.getElementById("aposta-b")
const comecar = document.getElementById("comecar")
// pack inicial
saldo_total = 100.00
saldo.innerHTML = "💰 R$:" + saldo_total
// evento
comecar.addEventListener("click", iniciar)
// tijolos
let tijolos = [
"💴", //1
"💵", //2
"💶", //3
"💷", //4
"💳", //5
"🎁", //6
"🎫", //7
"💰", //8
"🪙", //9
"👑",//10
"🧱"]
// combos
let com = 0
const combos = document.getElementById("contagen")
// bonus 
function iniciar() {
  if (rodadas_input.value == 0) {
    comecar.innerHTML = "start"
  } else {
    comecar.innerHTML = "skip"
  }
  rodada = rodadas_input.value
  aposta_total = aposta_input.value
  console.log(aposta_total, rodada)
  if (saldo_total < aposta_input.value * rodadas_input.value) {
    aviso.innerHTML = "erro: os valores estao muito alto comparado ao seu saldo!"
  } else if (rodadas_input.value == "" || aposta_input.value == ""
  ) {
    aviso.innerHTML = "preencha tudo!"
  } else if (rodadas_input.value == "" && aposta_input.value == "") {
    aviso.innerHTML = "preencha tudo!"
    comecar.innerHTML = "start"
  } else {
    if (saldo_total > aposta_total * rodada) {
    aviso.innerHTML = "erro"
      if (rodada > 0) {
        jogando()
      }
    }
  }
  function jogando() {
    if (rodada < 0) {
      console.log("parou")
    } else {
      aposta.innerHTML = "🪙 R$: " + aposta_input.value
      // funcao jogando
      function carta_1_f(min, max) {
        // carta 1
        min = Math.ceil(1)
        max = Math.floor(10)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      function carta_2_f(min, max) {
        // carta 2
        min = Math.ceil(1)
        max = Math.floor(10)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      function carta_3_f(min, max) {
        // carta 1
        min = Math.ceil(1)
        max = Math.floor(10)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      const cart = [
        carta_1_f(1, 10),
        carta_2_f(1, 10),
        carta_3_f(1, 10),
      ]
      if (cart[0] === cart[1] || cart[1] === cart[2] || cart[0] === cart[2]) {
        // caso caia 2 iguais
        aviso.innerHTML = "bonus de 2x!"
        cartas_2_t()
        aviso.innerHTML = "bonus de 2x! (2 × " + aposta_total + ")"
        // animator
      } else if (cart[0] === cart[1] === cart[2]) {
        // caso 3 caiem igual
        cartas_b_t()
        aviso.innerHTML = "bonus de 3x!!! (3 × " + aposta_total + ")"
      } else {
        // caso nao deu certo
        console.log("perdeu")
        bonus.innerHTML = "nada"
        saldo_total -= aposta_total
        saldo.innerHTML = "💰 R$: " + saldo_total
        aviso.innerHTML = "perdeu -" + aposta_total
        // anim
        saldo.style.fontSize = "92%"
        saldo.style.color = "red"
        saldo.style.textShadow = "0 0 20px red"
        // combos
        com = 0
        combos.innerHTML = "combos: ×" + com
        
      }
      console.log(cart)
      function painelando() {
        // conteudo no painel
        carta_1.innerHTML = tijolos[cart[0]]
        carta_2.innerHTML = tijolos[cart[1]]
        carta_3.innerHTML = tijolos[cart[2]]
      }
      function cartas_2_t() {
        // igual a 2
        bonus.innerHTML = "bonus de 2x"
        saldo_total = (aposta_total * 2) + saldo_total
        saldo.innerHTML = "💰 R$: " + saldo_total
        // animator
        saldo.style.color = "greenyellow"
        saldo.style.webkitTextStrokeColor = "0.1px white"
        saldo.style.textShadow = "0 0 20px green"
        saldo.style.fontSize = "100%"      
        // comnos
        com += 1
        combos.innerHTML = "combos: ×" + com
      }
      function cartas_b_t() {
        // igual a bonus
        bonus.innerHTML = "bonus de 3x!!"
        saldo_total = (aposta_total * 3) + saldo_total
        saldo.innerHTML = "💰 R: " + saldo_total
        // animator
        saldo.style.color = "greenyellow"
        saldo.style.webkitTextStrokeColor = "0.1px white"
        saldo.style.textShadow = "0 0 20px green"
        saldo.style.fontSize = "100%" 
        /* parte do ganhos
        */
        com += 1
        combos.innerHTML = "combo: ×" + com
        
      }
      rodada -= 1
      if (com >= 5) {
        saldo_total += aposta_total * 2 
        saldo.innerHTML = "💰 R$: " + saldo_total
        // ganho p. com
        ganho_total = aposta_total
        ganho.innerHTML = "🎁 R$: " + ganho_total
      } else if (com >= 2) {
        saldo_total += aposta_total
        saldo.innerHTML = "💰 R$: " + saldo_total
        // ganho p. com
        ganho_total = aposta_total
        ganho.innerHTML = "🎁 R$: " + ganho_total
      } else if (com == 0) {
        console.log(":p")
        ganho_total = 00,00
        ganho.innerHTML = "🎁 R$: " + ganho_total
      }
      if (rodada < 0) {
        console.log("cabou")
        aviso.innerHTML = "renicie"
        comecar.innerHTML = "start"
        saldo.style.fontSize = "85%"
        saldo.style.color = "white"
        saldo.style.textShadow = "0 0 10px black"
      } else {
        rodadas_input.value = rodada
        setTimeout(() => {
          jogando()
          painelando()
        }, 700)
        if (saldo_total < 0 || saldo_total == 0) {
          reset()
          function reset() {
            aviso.innerHTML = "erro mortal: seu saldo chegou a valor negativo entao foi reniciado tudo"
            saldo_total = 100
            saldo.innerHTML = "💰 R$: " + saldo_total
            rodada = 0
            rodadas_input.value = 0
            aposta_total = 0
            aposta_input.value = 0
            aposta.innerHTML = "🪙 R$: " + aposta_total
          }
        }
        // conteudo
        // jogando
      }
    }
  }
// click
}