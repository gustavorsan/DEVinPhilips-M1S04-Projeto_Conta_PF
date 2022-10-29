let form = document.getElementById('form_cadastro');
let err = document.getElementById('erro');
let isError = false;
let usuarios = [];

function validaString(str){
  return !!str.trim();
}

function apresentaErro(msg){
    err.hidden = false;
    isError = true;
    err.innerText = msg;
}

function geraId(){
  return Date.now() + Math.floor(1000 + Math.random() * 90000);
}

function validaCadastro(event){
  event.preventDefault();
  let msgErro = '';
  if(isError){
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

form.addEventListener('submit',validaCadastro)