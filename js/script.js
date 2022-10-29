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

function validaCadastro(event){
  event.preventDefault();
  let msgErro = '';
  if(erroAtivo){
    err.innerText = '';
    err.hidden = true;
  }
  console.log(usuarios)

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
    senha}

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

formCad.addEventListener('submit',validaCadastro);
formOpr.addEventListener('submit',validaOperacao);
buttonCad.addEventListener('click',apresentaFormCad);
buttonOpr.addEventListener('click',apresentaFormOpr);
operacao.addEventListener('change',validaOperacao);