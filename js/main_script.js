"use strict"; // Usa o modo strict do ECMAScript 5.

// Define uma função de utilidade que será usada neste programa.
// O objetivo dela é esvaziar um elemento, ou seja, retirar todos
// os "child nodes" de dentro dele.
function emptyElement(elem){
    
	var len = elem.children.length;
	
	// Itera através dos filhos desse elemento, deletando cada um
	// deles.
	var child;
	for(var a=0; a < len; a++){
	    
		child = elem.children[a];
	    elem.removeChild(child);
		
	}
	
}

window.onload = function(){

	// Quando o programa é iniciado, recupera os antigos valores, ou 
	// então apenas inicializa o array.
	var ls = window.localStorage;
	if(ls.table_columns){
	    var table_columns = JSON.parse(ls.table_columns);
	}
	if(ls.table_products){
	    var table_products = JSON.parse(ls.table_products);
	}
	
	if(!table_columns){
	    var table_columns = [];
	}
	if(!table_products){
	    var table_products = [];
	}

	// Essa função cria a tabela com os dados que o programa já
	// possui. Tanto dos produtos, como os dados do formato da tabela.
	function generateTable(){
	    
		// Recupera o elemento em que as "THs" serão embutidas.
		// Em seguida, esvazia esse elemento, para criar uma nova tabela
		// se ela já existe.
		var tr_head = document.getElementById("cabecalho_da_tabela")
		tr_head.innerHTML = "";
		
		// Recupera o elemento "tbody" para inserir os elementos
		// "tr"s que serão criados.Em seguida, esvazia esse 
		// elemento, para criar uma nova tabela se ela já existe.
		var table_body = document.getElementById("corpo_da_tabela");
		table_body.innerHTML = "";
		
		// O "_head" no fim, significa que essas variáveis
		// dizem à respeito do cabeçalho da tabela.
        var td_head, tdElem_head; 

		// Esse loop serve para construir o cabeçalho da tabela.
		for(var a=0; a < table_columns.length; a++){
		    td_head = table_columns[a];
			tdElem_head = document.createElement("td");
			tdElem_head.innerHTML = td_head;
			tr_head.appendChild(tdElem_head);
		}
		
		// O "_body" no fim, significa que essas variáveis
		// dizem à respeito do corpo da tabela.
		var td_body, tdElem_body, trElem_body, product_data;
		
		// Esse loop constroi os dados da tabela, baseado no 
		// cabeçalho.
		for(var b=0; b < table_products.length; b++){
		    
			// Para cada produto, cria um elemento "tr" na tabela.
			trElem_body = document.createElement("tr");
			
			// Essa variável guarda um array com os dados do
			// produto.
			product_data = table_products[b];
			
		    // Esse loop itera através do cabeçalho da tabela,
			// para saber a ordem dos dados à serem inseridos.
		    for(var c=0; c < table_columns.length; c++){
			    
				// Cria o elemento td com o dado correspondente no 
				// array de dados: "table_products".
				td_body = product_data[c];
				
				// Verifica se a variável "td_body" possui um valor 
				// verdadeiro e válido.
				if(!td_body){
				    td_body = "";
				}
				
				// Cria um elemento "td" e insere o dado do produto nele.
				tdElem_body = document.createElement("td");
				tdElem_body.innerHTML = td_body;
                
                // Anexa o elemento "td" dentro do "tr".
                trElem_body.appendChild(tdElem_body);				    
				
			}
            
			// Anexa o elemento "tr" que foi formado ao 
			// fim da tabela.
			table_body.appendChild(trElem_body);
		
		}
		
	}
	
	// Define a função que serve como gerenciamento da tabela.
	function manageTable(){
	    
		// Pra começar, nós criamos o lightbox e 
		// damos uma classe para o estilo.
		var lightbox = document.createElement("div");
		lightbox.classList.add("lightbox");
		
		// Aqui, nós recuperamos o elemento em que está "hospedado"
		// todos os conteúdos necessários para o lightbox.
		var host_lightbox = document.getElementById("host_lightbox");
		
		// Em seguida, nós aplicamos os elementos necessários para
		// o lightbox.
		var _lightbox1 = document.getElementById("_lightbox1")
		lightbox.appendChild(_lightbox1);
		
		// Então, nós apenas anexamos no documento o lightbox com 
		// o seu conteúdo.
		document.body.appendChild(lightbox);
		
		// Recupera os botões das opções de gerenciamento para
		// anexar os manipuladores mais tarde.
		var buttonsForManagement = _lightbox1.getElementsByTagName("input");
		
		// A partir de agora, teremos 4 funções que dão o funcionamento
		// de cada botão do lighbox com o id "_lightbox1". Três deles
		// apenas trocam o conteúdo do lightbox, enquanto o último
		// cancela as operações de gerenciamento da tabela.
		
		// A primeira função será o manipulador para o evento "click"
		// do botão "Adicionar Colunas". Ela troca o conteúdo do lightbox
		// fornecendo as novas opções de gerenciamento da tabela.
		function addColumns(){
		    
			// Recupera o conteúdo que será colocado no lightbox.
			var contentLightbox = document.getElementById("_lightbox1_1");
			
			host_lightbox.appendChild(_lightbox1);
			
			// Então, insere esse conteúdo no lightbox.
			lightbox.appendChild(contentLightbox);
			
		}
		
		// Depois de definida, nós anexamos essa função 
		// ao botão correspondente.
		if(buttonsForManagement[0].addEventListener){
		    buttonsForManagement[0].addEventListener("click", addColumns, false);
	    }
		else{
		    buttonsForManagement[0].attachEvent("onclick", addColumns);
		}
		
	}
	
	// Em seguida, anexa manipuladores ao evento "click", do 
	// elemento button, "gerenciar formato da tabela".
	var manageTableButton = document.getElementById("modifytable");
	
	if(manageTableButton.addEventListener){
	    manageTableButton.addEventListener("click", manageTable, false);
	}
	else{
	    manageTableButton.attachEvent("onclick", manageTable);
	}

    // Quando o programa é finalizado, salva os dados
	// fornecidos ao programa durante o uso.
	window.beforeunload = function(){
	    window.localStorage.table_columns = JSON.stringify(table_columns);
	    window.localStorage.table_products = JSON.stringify(table_columns);
	}
	
}