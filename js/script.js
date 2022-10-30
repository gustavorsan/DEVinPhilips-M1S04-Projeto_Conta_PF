let formCad = document.getElementById('form_cadastro');
let formOpr = document.getElementById('form_operacao');
let buttonCad = document.getElementById('bt_cad');
let buttonOpr = document.getElementById('bt_opr');
let err = document.getElementById('erro');
let operacao = document.getElementById('operacao');
let valor = document.getElementById('valor');
let erroAtivo = false;
let usuarios = [];
let cadAtivo = false;
let oprAtivo = false;


function apresentaFormCad(){
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

function geraId(){
  return Date.now() + Math.floor(1000 + Math.random() * 90000);
}

function apagaErro(){
  err.innerText = '';
  err.hidden = true;
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
}

function cadastraUsuario(usuario){
  usuarios.push(usuario);
}


function validaOperacao(event){
  event.preventDefault();
  console.log(event.target.operacao.value)
}

function validaOperacao(event){
  let opr = event.target.value;

  opr === 'consulta' ? valor.disabled = true : valor.disabled = false;
}

function validarConta(event){
  event.preventDefault();
  if(erroAtivo){
    apagaErro();
  }
  let conta = event.target.conta.value;
  let senha = event.target.conta.value;
  let operacao = operacao.value;
  
  let indexConta = usuarios.map(usr => usr.id).indexOf(conta);

  if(indexConta === -1 ){
    apresentaErro('usuario ou conta invalido');
    return
  }
  if(usuarios[indexConta].senha !== senha){
    apresentaErro('usuario ou conta invalido');
    return
  }

  processarOperacao(opr,indexConta)
}

function processarOperacao(opr,indexConta){
  switch(opr){
    case 'saque'   : sacarConta(indexConta,valor.value);
                     break;
    case 'deposito': depositarConta(indexConta,valor.value);
                     break;
    case 'consulta': consultaConta(indexConta);
                     break;
  }
}


function sacarConta(conta,valor){

}

function depositarConta(conta,valor){

}

function consultaConta(conta){

}

formCad.addEventListener('submit',validaCadastro);
formOpr.addEventListener('submit',validarConta);
buttonCad.addEventListener('click',apresentaFormCad);
buttonOpr.addEventListener('click',apresentaFormOpr);
operacao.addEventListener('change',validaOperacao);