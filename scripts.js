const URL = 'http://localhost:3000/series'; //Variavel da API 
const filmeContent = document.querySelector('#titulos'); //Recebe o id titulos 
let valorInicial = 10;
async function GetApi(pagina, limit) { //Cria a função assincrona para executar a API
  const data = await fetch(`${URL}?pagina=${pagina}&limite=${limit}`) //Criar a const para alterar os valores da api
  const dados = await data.json() // muda o recebimento de promise para json
  return dados; //Retorna o json 
}

async function renderFilmes(pagina, limit) { //Funçao para carregar a lista de filmes
  filmeContent.innerHTML = ""; //Muda o coteudo da const filmes para vazio
  const dados = await GetApi(pagina, limit) //Consome a função para receber a api
  console.log(dados) //Mostra todo o array de todos os filmes
  dados.data.forEach(element => { //O objeto dados e quebrado em elementos por cada filme
    let div = document.createElement('div') //cria a div para inserir os filmes
    div.className = 'divFilmes' //cria a classe divFilmes na div recem criada
    let titulo = document.createElement('p')   //cria uma paragrafo chamado titulo
    titulo.textContent = element.titulo //recebe o titulo do elemento o recebimeto do paragrafo
    let img = document.createElement('img') //Cria o elemento paragrafo
    img.src = element.imagem; //modifica o src rebendo do elemento o link da imagem do filme

    div.appendChild(titulo) //determina que titulo e filho de div
    div.appendChild(img) //determina que img e filho de div
    filmeContent.appendChild(div) //determina que div e filho da filmeContent
  });
  {
    if (pagina - 1 >= 1) { //Inicia a condiçao se a pagina for maior ou igual a 1 
      let btn = document.createElement('button') //cria o elemento botao 
      btn.textContent = "page anterior"; //nomeia ele como pagina anterior
      filmeContent.appendChild(btn); //denomina botao como filho de filmContent
      btn.addEventListener("click", () => { //arrow function se o botao pagina anterior receber um clique ele voltara a pagina anterior através da função render filmes reduzindo o primeiro parametro a -1
        renderFilmes(pagina - 1, limit);
      })
    }
    if (pagina + 1 <= dados.total / limit) { //Inicia a condiçao se a pagina for menor ou igual a 1
      let btnProx = document.createElement('button') //cria o elemento botao 
      btnProx.textContent = "page prox"; //nomeia ele como pagina proxima
      filmeContent.appendChild(btnProx); //denomina botao proximo como filho de filmContent
      btnProx.addEventListener("click", () => {
        renderFilmes(pagina + 1, limit); //arrow function se o botao pagina anterior receber um clique ele ira a pagina seguinte através da função render filmes aumentando o primeiro parametro a +1
      })
    }

  }
}

async function buscar() {
  const buscar = document.querySelector('#buscar'); //Recebe o id buscar do input
  const search = document.querySelector('#search');
  const pesquisa = search.value
  const dados = await GetApi(1,240);
  dados.data.forEach(element => {
    if(pesquisa.toLowerCase() === element.titulo.toLowerCase()){
      filmeContent.innerHTML = ""
      let div = document.createElement('div') //cria a div para inserir os filmes
      div.className = 'divFilmes' //cria a classe divFilmes na div recem criada
      let titulo = document.createElement('p')   //cria uma paragrafo chamado titulo
      titulo.textContent = element.titulo //recebe o titulo do elemento o recebimeto do paragrafo
      let img = document.createElement('img') //Cria o elemento paragrafo
      img.src = element.imagem; //modifica o src rebendo do elemento o link da imagem do filme

      div.appendChild(titulo) //determina que titulo e filho de div
      div.appendChild(img) //determina que img e filho de div
      filmeContent.appendChild(div) //determina que div e filho da filmeContent
    }
  });
}

function alterarValor() {
  const selectElement = document.getElementById('meuSelect');
  valorInicial = selectElement.value;
  console.log(`${valorInicial}`);
  renderFilmes(1,valorInicial);
}

renderFilmes(1, valorInicial);

