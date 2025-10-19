// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Descubra o número secreto entre 1 e 10!';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function atualizarTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {
    rate: 1.2,
  });
}

function mensagemInicial() {
  atualizarTexto("h1", "Jogo do número secreto");
  atualizarTexto("p", "Descubra o número secreto entre 1 e 10!");
}

mensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    atualizarTexto("h1", "Parabéns! 🎉");
    let palavraTentativa = tentativas === 1 ? "tentativa" : "tentativas";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! 🎯`;
    atualizarTexto("p", mensagemTentativas);
    document.getElementById("reiniciar").disabled = false;
  } else {
    if (chute < 1 || chute > 10) {
      atualizarTexto("h1", "Número inválido! 🚫");
      atualizarTexto("p", "Por favor, escolha um número entre 1 e 10.");
      return;
    }

    if (chute < numeroSecreto) {
      atualizarTexto("h1", "Quase lá! ❌");
      atualizarTexto("p", "Tente um número maior! ⬆️");
    } else {
      atualizarTexto("h1", "Quase lá! ❌");
      atualizarTexto("p", "Tente um número menor! ⬇️");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroSecreto() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
  let quantidadeMaximaDeNumerosSorteados = listaDeNumerosSorteados.length;

  if (quantidadeMaximaDeNumerosSorteados == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroSecreto();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log("Números sorteados até agora: " + listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroSecreto();
  tentativas = 1;
  limparCampo();
  document.getElementById("reiniciar").disabled = true;
  mensagemInicial();
}
