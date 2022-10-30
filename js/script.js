let formCad = document.getElementById('form_cadastro');
let formOpr = document.getElementById('form_operacao');
let buttonCad = document.getElementById('bt_cad');
let buttonOpr = document.getElementById('bt_opr');
let err = document.getElementById('erro');
let dadosConta = document.getElementById('dados-conta');
let operacao = document.getElementById('operacao');
let valor = document.getElementById('valor');
let operacaoAtual = 'consulta';
let erroAtivo = false;
let dadosContaAtivo = false;
let usuarios = [];
let cadAtivo = false;
let oprAtivo = false;
 


function apresentaFormCad(){
  limparFormOpr();
  if(dadosContaAtivo){
    apagaDadosConta();
  }
  if(erroAtivo){
    apagaErro();
  }
  if(oprAtivo){
    formOpr.style.display = 'none';
    oprAtivo = false;
  }
  if(!cadAtivo){
    formCad.style.display = 'flex';
    cadAtivo = true;
  }
}

function apresentaFormOpr(){
  limparFormCad()
  if(dadosContaAtivo){
    apagaDadosConta();
  }
  if(erroAtivo){
    apagaErro();
  }
  if(cadAtivo){
    formCad.style.display = 'none';
    cadAtivo = false;
  }
  if(!oprAtivo){
    formOpr.style.display = 'flex';
    oprAtivo = true;
  }
}

function validaString(str){
  return !!str.trim();
}

function apresentaErro(msg){
    err.hidden = false;
    erroAtivo = true;
    err.innerText = msg;
}

function apresentaDadosConta(msg){
  dadosConta.hidden = false;
  dadosContaAtivo = true;
  dadosConta.innerText = msg;
}

function geraId(){
  return Date.now() + Math.floor(1000 + Math.random() * 90000);
}

function apagaErro(){
  err.innerText = '';
  err.hidden = true;
  erroAtivo = false;
}

function apagaDadosConta(){
  dadosConta.hidden = true;
  dadosContaAtivo = false;
  dadosConta.innerText = '';
}

function validaCadastro(event){
  event.preventDefault();
  let msgErro = '';
  if(erroAtivo){
    apagaErro();
  }
  
 

  let nome = event.target.nome.value;
  let cpf = event.target.cpf.value;
  let celular = event.target.celular.value;
  let senha = event.target.senha.value;
  let confirmaSenha = event.target.confirmaSenha.value;

  if(!validaString(nome)){
    msgErro += 'Nome deve ser preenchido \n';
  }
  if(!validaString(cpf)){
    msgErro += 'Cpf deve ser preenchido \n';
  }
  if(!validaString(celular)){
    msgErro += 'Celular deve ser preenchido \n';
  }
  if(!validaString(senha)){
    msgErro += 'Senha deve ser preenchido \n';
  }
  if(senha !== confirmaSenha){
    msgErro += 'A senha deve conferir \n';
  }

  if(msgErro){
    apresentaErro(msgErro);
    return
  }

  let usuario = {
    id: geraId(),
    cpf,
    nome,
    celular,
    senha,
    saldo: 0
  }

  cadastraUsuario(usuario);
  limparFormCad();
}

function cadastraUsuario(usuario){
  usuarios.push(usuario);
}




function validaOperacao(event){
  let opr = event.target.value;

  opr === 'consulta' ? valor.disabled = true : valor.disabled = false;

  operacaoAtual = event.target.value;
}

function limparFormCad(){
  formCad.reset();
}

function limparFormOpr(){
  formOpr.reset();
}

function validarConta(event){
  event.preventDefault();
  console.log(usuarios)
  if(erroAtivo){
    apagaErro();
  }
  if(dadosContaAtivo){
    apagaDadosConta();
  }
  let conta = event.target.conta.value;
  let senha = event.target.senhaConta.value;


  if(!validaString(conta)){
    apresentaErro('Preencha o campo: Conta');
    return
  }
  if(!validaString(senha)){
    apresentaErro('Preencha o campo: Senha');
    return
  }
  
  let indexConta = usuarios.findIndex(usr => usr.id == conta)//.indexOf(conta);
  

  if(indexConta === -1 ){
    apresentaErro('usuario ou conta invalido');
    return
  }


  if(usuarios[indexConta].senha !== senha){
    apresentaErro('usuario ou conta invalido');
    return
  }

  processarOperacao(operacaoAtual,indexConta,conta)
}

function processarOperacao(opr,indexConta,conta){
  switch(opr){
    case 'saque'   : sacarConta(indexConta,valor.value);
                     break;
    case 'deposito': depositarConta(indexConta,valor.value);
                     break;
    case 'consulta': consultaConta(indexConta,conta);
                     break;
  }
}


function sacarConta(conta,valor){
  if (valor <=0){
    apresentaErro('O valor deve ser maior que 0');
    return;
  }
  if(valor > usuarios[conta].saldo ){
    apresentaErro('Saldo insuficiente para o saque');
    return;
  }
  usuarios[conta].saldo  -= valor;
  limparFormOpr();
  apresentaDadosConta(`Saque realizado com sucesso! saldo: ${usuarios[conta].saldo}`);
}

function depositarConta(conta,valor){
  if (valor <=0){
    apresentaErro('O valor deve ser maior que 0');
    return;
  }
  usuarios[conta].saldo  += valor;
  limparFormOpr();
  apresentaDadosConta(`Deposito realizado com sucesso! saldo: ${usuarios[conta].saldo}`);
}

function consultaConta(conta,indexConta){
  let msg = `O saldo atual da conta : ${conta} é R$ ${usuarios[indexConta].saldo}`;
  apresentaDadosConta(msg);
  limparFormOpr();
}

formCad.addEventListener('submit',validaCadastro);
formOpr.addEventListener('submit',validarConta);
buttonCad.addEventListener('click',apresentaFormCad);
buttonOpr.addEventListener('click',apresentaFormOpr);
operacao.addEventListener('change',validaOperacao);