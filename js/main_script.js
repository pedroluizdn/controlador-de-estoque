"use strict"; // Usa o modo strict do ECMAScript 5.

// Define uma função de utilidade que será usada neste programa.
// O objetivo dela é esvaziar um elemento, ou seja, retirar todos
// os "child nodes" de dentro dele.
function emptyElement(elem){
    
	var len = elem.children.length;
	
	// Itera através dos filhos desse elemento, deletando cada um
	// deles.
	var child;
	for(var a=elem.firstElementChild; a != null; a=elem.firstElementChild){
	    
		elem.removeChild(a);
		
	}
	
}

window.onload = function(){
	
	// Quando o programa é iniciado, recupera os antigos valores, ou 
	// então apenas inicializa o array.
	var ls = window.localStorage;
	if(ls && ls.table_columns){
	    var table_columns = JSON.parse(ls.table_columns);
	}
	if(ls && ls.table_products){
	    var table_products = JSON.parse(ls.table_products);
	}
	
	if(!table_columns){
	    var table_columns = [];
	}
	if(!table_products){
	    var table_products = [];
	}
    
	// Cria a tabela com os dados armazenados no localStorage.
	generateTable();
	
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
		
		// Esconde o conteúdo para evitar clicks recursivos nos botões.
		document.getElementById("content").style.display = "none";
		
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
				// do _lightbox1_1. Também, apesar desse array se chamar 
				// _buttons, ele guarda o elemento input type="text".
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
				
				// Elemento span que avisa o usuário sobre a inserção invélida.
				var infoElem = document.getElementById("alert1");
				
				// Aqui, nós fazemos algumas verificações no valor de newColumn
				// para saber se ele é válido e se não é um valor repetido.			
				if(!newColumn || _verifyArray(newColumn)){
				    
					// Se houver algo errado no valor de newColumn, avisa o
					// usuário através de um elemento "<span>" com a informação
					// de que há algo errado na inserção.
					infoElem.style.visibility = "visible";
					
					return;
				 					
				}
				
				// Caso não tenha erros na validação, nós escondemos o 
				// elemento "span".
				infoElem.style.visibility = "hidden";
				
				// Adiciona o nome da nova coluna no array "table_columns".
				// Em seguida, invoca a função "generateTable".
				table_columns.push(newColumn);
				generateTable();
			    
				// Remove os manipuladores de evento.
				_removeHandlers2();
				
				// Limpa o input.
				_buttons[0].value = "";
				
				// E então fecha o lightbox e devolve o conteúdo à
				// área de hopedagem.
				host_lightbox.appendChild(_lightbox1_1);
				lightbox.style.display = "none";
				
				// Volta a área de conteúdo, deixando-a à mostra.
		        document.getElementById("content").style.display = "block";
				
			}
			
			// Define a função que cancelará o gerenciamento da tabela,
			// fechando o lightbox e devolvendo o conteúdo à nossa
			// área de hospedagem no html. Não confunda essa função,
			// com a da cadeia de escopo que já existe com o mesmo nome.
			// Lembre-se: essa é uma função que sobrepõe a superior na
			// cadeia!!!
			function cancelManagement(){
	            
				// Elemento span que avisa o usuário sobre a inserção invélida.
				var infoElem = document.getElementById("alert1");
				
				// Limpa o campo de inserção.
				infoElem.style.visibility = "hidden";
				
			    // E então fecha o lightbox e devolve o conteúdo à
				// área de hopedagem.
				host_lightbox.appendChild(_lightbox1_1);
				lightbox.style.display = "none";
			    
				// Volta a área de conteúdo, deixando-a à mostra.
		        document.getElementById("content").style.display = "block";
				
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
            
			 
			// Verifica se há colunas para retirar.
			if(!table_columns.length){
				    
				alert("Não há colunas para retirar!!!");
				return;
					
			}
			
			// Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
			// Retira a div id="_lightbox1", colocando-a na área de 
			// hospedagem.
			host_lightbox.appendChild(_lightbox1);
			
			// Insere o conteúdo da div com o id="_lightbox1_2" no lighbox.
			var _lightbox1_2 = document.getElementById("_lightbox1_2");
			lightbox.appendChild(_lightbox1_2);
			
			// Esvazia o elemento
		    var sel_elem = document.getElementById("select_column");
			emptyElement(sel_elem);
			
			// Aqui nós criamos os elementos <option>, necessários para
			// a escolha da coluna que o usuário vai remover.
			var optElem;
			for(var a=0; a < table_columns.length; a++){
			    
				optElem = document.createElement("option");
				optElem.value = table_columns[a];
				optElem.innerHTML = table_columns[a];
				
				// Insere o novo <option> no elemento <select>.
				sel_elem.appendChild(optElem);
				
			}
			
			// Define a função que será o manipulador para o evento "click"
			// do botão "Remover Coluna". Ela possui a sutíl diferença no
			// nome em relação à função "removeColumns", ou seja, sem o "s"
			// no final.
			function removeColumn(){
				
				// Recupera o nome da coluna a ser removida.
				var selectVal = sel_elem.value;
				
				// Confirma a remoção através de uma caixa de diálogo.
				var remove = confirm("Você deseja realmente remover a coluna " + 
				             selectVal + "?" +
				             "\n Lembre-se: Quando remover a coluna, " +
						     "automaticamente todos os valores daquela " +
						     "coluna serão apagados.");
				
				// Caso o usuário não confirme a remoção, apenas retorna a 
				// função.
				if(!remove){
				    return;
				}
				
				// Remove os manipuladores de evento.
				removeHandlers();
				
				// Remove a coluna do array de colunas. Em seguida 
				// atualiza a tabela.
				table_columns.splice(sel_elem.selectedIndex,1);
				table_products.splice(sel_elem.selectedIndex,1);
				generateTable();
				
				// Fecha o lightbox.
			    host_lightbox.appendChild(_lightbox1_2);
				lightbox.style.display = "none";
				
				// Faz o conteúdo ficar visível.
				document.getElementById("content").style.display = "block";
				
			}
			
			// Define a função que cancela a remoção da coluna.
			function cancelRemove(){
			    
				// Remove os manipuladores de evento.
				removeHandlers();
				
				// Fecha o lightbox.
			    host_lightbox.appendChild(_lightbox1_2);
				lightbox.style.display = "none";
				
				// Faz o conteúdo ficar visível.
				document.getElementById("content").style.display = "block";
				
			}
			
			// Depois de definir as funções, nós anexamos elas como
			// manipuladores para os eventos click dos botões.
			var _buttons = _lightbox1_2.getElementsByTagName("input");
			if(_buttons[0].addEventListener){
			    _buttons[0].addEventListener("click", removeColumn, false);
			    _buttons[1].addEventListener("click", cancelRemove, false);
			}
			else{
			    _buttons[0].attachEvent("onclick", removeColumn);
			    _buttons[1].attachEvent("onclick", cancelColumn);
			}
			
			function removeHandlers(){
			    
				if(_buttons[0].removeEventListener){
			        _buttons[0].removeEventListener("click", removeColumn, false);
			        _buttons[1].removeEventListener("click", cancelRemove, false);
			    }
			    else{
			        _buttons[0].detachEvent("onclick", removeColumn);
			        _buttons[1].detachEvent("onclick", cancelColumn);
			    }
				
			}
			
        }		
		
		// A terceira função será o manipulador para o evento "click"
		// do botão "Editar Colunas". Ela troca o conteúdo do lightbox
		// fornecendo as novas opções de gerenciamento da tabela.
		function editColumns(){
		    
			var doc = document;
			
			// Se não houver colunas para a edição, avisa o usuário e
			// não faz mais nada.
			if(table_columns.length === 0){
			    alert("Não há colunas para editar!!!");
				return;
			}
			
			// Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
			// Muda o conteúdo do lightbox.
			host_lightbox.appendChild(_lightbox1);
			lightbox.appendChild(_lightbox1_3);
			
			// Esvazia o elemento select e preenche com os novos <option>s
			// que representam as colunas da tabela.
			var sel_elem = doc.getElementById("select_column2");
			emptyElement(sel_elem);
			var tab_col = table_columns,
			    opt,
				optElem;
			for(var a=0; a < tab_col.length; a++){
			    
				optElem = doc.createElement("option");
				opt = tab_col[a];
				optElem.innerHTML = opt;
				sel_elem.appendChild(optElem);
				
			}
			
			// Define uma função como manipulador do evento "click" do
			// botão "Renomear".
			function renameColumn(){
			    
				var tab_col = table_columns;
				var doc = document;
				
				// Pede para o usuário confirmar.
				var rename = confirm("Você quer realmente renomear essa coluna?");
				if(!rename){
				    return;
				}
				
				// Remove os manipuladores de evento.
				_removeHandlers2();
				
				// Renomeia o índice específico no array e atualiza a tabela.
                var newValue = doc.getElementById("column_name");
				tab_col[sel_elem.selectedIndex] = newValue.value;
				newValue.value = "";
				generateTable();
				
				// Devolve o conteúdo à área de hospedagem, esconde o lightbox
				// e torna o corpo da página visível novamente.
				host_lightbox.appendChild(_lightbox1_3);
				lightbox.style.display = "none";
				doc.getElementById("content").style.display = "block";
				
				
			}
			
			function cancelEdit(){
			
			    // Apenas esvazia o input, devolve o conteúdo à área de 
				// hospedagem, esconde o lightbox e torna o corpo da 
				// página visível novamente.  
			    doc.getElementById("column_name").value = "";
				host_lightbox.appendChild(_lightbox1_3);
				lightbox.style.display = "none";
				doc.getElementById("content").style.display = "block";
				
			}
			
			// Anexa os manipuladores de evento.
			var buttonsForEdit = _lightbox1_3.getElementsByTagName("input");
			if(buttonsForEdit[1].addEventListener){
			    buttonsForEdit[1].addEventListener("click", renameColumn, false);
				buttonsForEdit[2].addEventListener("click", cancelEdit, false);
			}
			else{
			    buttonsForEdit[1].attachEvent("onclick", renameColumn);
			    buttonsForEdit[2].attachEvent("onclick", cancelEdit);
			}
			
			function _removeHandlers2(){
			    
				if(buttonsForEdit[1].removeEventListener){
			        buttonsForEdit[1].removeEventListener("click", renameColumn, false);
				    buttonsForEdit[2].removeEventListener("click", cancelEdit, false);
			    }
			    else{
			        buttonsForEdit[1].detachEvent("onclick", renameColumn);
			        buttonsForEdit[2].detachEvent("onclick", cancelEdit);
			    }
				
			}
			
		}
		
		// A quarta função será o manipulador para o evento "click"
		// do botão "Cancelar Gerenciamento". Ela simplesmente apaga 
		// o lightbox, devolvendo o conteúdo dele à área de hospedagem
        // (div com o id "host_lightbox").		
		function cancelManagement(){
		
		    // Nós desanexamos os manipuladores de evento dos antigos 
            // botões.
            _removeHandlers();
			
			// Devolve o conteúdo à área de hospedagem, esconde o lightbox
			// e torna o corpo da página visível novamente.
			host_lightbox.appendChild(_lightbox1);
			lightbox.style.display = "none";
			document.getElementById("content").style.display = "block";		
			
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
    
	// Define uma função como manipulador para o evento "click" do botão
	// "Adicionar Produto". 
	function addProduct(){
	    
		var doc = document;
		
		// Esconde o conteúdo para evitar recursões.
		doc.getElementById("content").style.display = "none";
		
		// Cria o lightbox.
		var lightbox = doc.getElementById("main_lightbox"),
		    _lightbox2 = doc.getElementById("_lightbox2");
		lightbox.style.display = "block";
		lightbox.appendChild(_lightbox2);
		
		// Cria os elementos <input> que recuperarão as informações inseridas.
		var div, h3, input;
		var _lightbox2_inputs = doc.getElementById("_lightbox2_inputs");
		for(var a=0; a < table_columns.length; a++){
		    
			var col = table_columns[a];
			
			// Cria os elementos...
			div = doc.createElement("div");
			h3 = doc.createElement("h3");
			input = doc.createElement("input");
			
			// ... define os atributos e valores de cada elemento...
			div.classList.add("inputs_add");
			input.type = "text";
			input.name = col;
			h3.innerHTML = col + ":";
			
			// Insere os elementos no HTML.
			div.appendChild(h3);
			div.appendChild(input);
			_lightbox2_inputs.appendChild(div);
			
		}
		
		// Essa função serve como manipulador do evento "click" para o botão
		// "Adicionar Produto" do lightbox.
		function confirmAdd(){
		    
			// ###############################
			// CONTINUAR A DEFINIÇÃO DESSA FUNÇÃO !!!
			// ###############################
			
		}
		
	}
	
	// Agora anexa a função como manipulador do evento "click" do botão 
	// "Adicionar Produto".
	var buttonAddProduct = document.getElementById("add_product");
	if(buttonAddProduct.addEventListener){
	    buttonAddProduct.addEventListener("click", addProduct, false);
	}
	else{
	    buttonAddProduct.attachEvent("onclick", addProduct);
	}
    // Usa essa função como manipulador para o evento click do elemento com
	// o id "save_table". Ela serve para salvar as alterações feitas na tabela.
	var save_button = document.getElementById("save_table");
	save_button.onclick = function(){
	    window.localStorage.table_columns = JSON.stringify(table_columns);
	    window.localStorage.table_products = JSON.stringify(table_products);
	}
	
	
}