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
		var lightbox = document.getElementById("main_lightbox");
		lightbox.style.display = "block";
		
		// Aqui, nós recuperamos o elemento em que está "hospedado"
		// todos os conteúdos necessários para o lightbox.
		var host_lightbox = document.getElementById("host_lightbox");
		
		// Em seguida, nós aplicamos os elementos necessários para
		// o lightbox.
		var _lightbox1 = document.getElementById("_lightbox1");
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
		    
			// Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
			// Recupera o conteúdo que será colocado no lightbox. 
			var _lightbox1_1 = document.getElementById("_lightbox1_1");
			
			host_lightbox.appendChild(_lightbox1);
			
			// Então, insere esse conteúdo no lightbox.
			lightbox.appendChild(_lightbox1_1);
			
			// Define a função que processará as informações inseridas
            // e cria a novas coluna com o nome fornecido. O "2" no fim
			// do nome da função serve para evitar confusões com a cadeia
			// de escopo, já que existe uma função externa chamada "addColumns".
            function addColumns2(){
			    
				// Essa variável é criada fora da função, antes de anexarmos
				// essa função como manipuladora de evento do 1 elemento input 
				// do _lightbox1_1;
				var newColumn = _buttons[0].value.trim();
				
				// Define uma função para a verificar se a string já não
				// existe em algum elemento do array.
				function _verifyArray(newValue){
				    
					for(var a=0; a < table_columns.length; a++){
					    
						if(table_columns[a] == newValue){
						    return true;
						}
						
					}
					
					// Caso esse valor não exista no array, retorna o valor "false".
					return false;
					
				}
				
				// Aqui, nós fazemos algumas verificações no valor de newColumn
				// para saber se ele é válido e se não é um valor repetido.				
				if(!newColumn || _verifyArray(newColumn)){
				    return;
				    
					// #######################################
					// Agora preciso criar uma forma de avisar 
					// o usuário de que a inserção está errada
					// #######################################
					
				}
				
				// Adiciona o nome da nova coluna no array "table_columns".
				// Em seguida, invoca a função "generateTable".
				table_columns.push(newColumn);
				generateTable();
			    
				// Remove os manipuladores de evento.
								
				// E então fecha o lightbox e devolve o conteúdo à
				// área de hopedagem.
				host_lightbox.appendChild(_lightbox1_1);
				lightbox.style.display = "none";
				
			}
			
			// Define a função que cancelará o gerenciamento da tabela,
			// fechando o lightbox e devolvendo o conteúdo à nossa
			// área de hospedagem no html. Não confunda essa função,
			// com a da cadeia de escopo que já existe com o mesmo nome.
			// Lembre-se: essa é uma função que sobrepõe a superior na
			// cadeia!!!
			function cancelManagement(){
	          
			    // E então fecha o lightbox e devolve o conteúdo à
				// área de hopedagem.
				host_lightbox.appendChild(_lightbox1_1);
				lightbox.style.display = "none";
			  
			}
			
			// Agora nós anexamos os manipuladores ao evento "click" de
			// cada elemento input no lightbox. Lembrando que nós iniciamos
			// no índice 1, pois o índice 0 é um elemento input type="text".
			var _buttons = _lightbox1_1.getElementsByTagName("input");
			if(_buttons[1].addEventListener){
			    _buttons[1].addEventListener("click", addColumns2, false);
			    _buttons[2].addEventListener("click", cancelManagement, false);
			}
			else{
			    _buttons[1].attachEvent("onclick", addColumns2);
			    _buttons[2].attachEvent("onclick", cancelManagement);
			}
			
			// Aqui, nós definimos uma função de utilidade para facilitar o 
			// trabalho nas funções definidas acima. Ela serve para desanexar
			// os manipuladores de eventos aos botões do conteúdo que será 
			// colocado de volta na área de hospedagem.
			function _removeHandlers2(){
			    
				var _buttons = _lightbox1_1.getElementsByTagName("input");
				if(_buttons[1].removeEventListener){
			        _buttons[1].removeEventListener("click", addColumns2, false);
			        _buttons[2].removeEventListener("click", cancelManagement, false);
			    }
			    else{
			        _buttons[1].detachEvent("onclick", addColumns2);
			        _buttons[2].detachEvent("onclick", cancelManagement);
			    }
				
			}
			
		}
		
		// A segunda função será o manipulador para o evento "click"
		// do botão "Remover Colunas". Ela troca o conteúdo do lightbox
		// fornecendo as novas opções de gerenciamento da tabela.
		function removeColumns(){
            
			// Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
        }		
		
		// A terceira função será o manipulador para o evento "click"
		// do botão "Editar Colunas". Ela troca o conteúdo do lightbox
		// fornecendo as novas opções de gerenciamento da tabela.
		function editColumns(){
		    
			// Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
		}
		
		// A quarta função será o manipulador para o evento "click"
		// do botão "Cancelar Gerenciamento". Ela simplesmente apaga 
		// o lightbox, devolvendo o conteúdo dele à área de hospedagem
        // (div com o id "host_lightbox").		
		function cancelManagement(){
		
		    // Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
		}
		
		// Depois de definidas, nós anexamos essas funções 
		// aos botões correspondentes.
		if(buttonsForManagement[0].addEventListener){
		    buttonsForManagement[0].addEventListener("click", addColumns, false);
		    buttonsForManagement[1].addEventListener("click", removeColumns, false);
		    buttonsForManagement[2].addEventListener("click", editColumns, false);
		    buttonsForManagement[3].addEventListener("click", cancelManagement, false);
	    }
		else{
		    buttonsForManagement[0].attachEvent("onclick", addColumns);
		    buttonsForManagement[0].attachEvent("onclick", removeColumns);
		    buttonsForManagement[0].attachEvent("onclick", editColumns);
		    buttonsForManagement[0].attachEvent("onclick", cancelManagement);
		}
		
		// Aqui, nós definimos uma pequena função de utilidade para
		// diminuir o trabalho nas funções anexadas à cada manipulador
		// desses acima. Ela serve para desanexar os manipuladores
		// de eventos dos elementos inputs quando o conteúdo do 
		// lightbox é trocado.
		function _removeHandlers(){
		    
			if(buttonsForManagement[0].removeEventListener){
		        buttonsForManagement[0].removeEventListener("click", addColumns, false);
		        buttonsForManagement[1].removeEventListener("click", removeColumns, false);
		        buttonsForManagement[2].removeEventListener("click", editColumns, false);
		        buttonsForManagement[3].removeEventListener("click", cancelManagement, false);
	        }
		    else{
		        buttonsForManagement[0].detachEvent("onclick", addColumns);
		        buttonsForManagement[0].detachEvent("onclick", removeColumns);
		        buttonsForManagement[0].detachEvent("onclick", editColumns);
		        buttonsForManagement[0].detachEvent("onclick", cancelManagement);
		}
			
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