"use strict"; // Usa o modo strict do ECMAScript 5.

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
		var tr = document.getElementById("tabela_de_produtos")
		                 .firstElementChild
		                 .firstElementChild
		                 .firstElementChild;
		
		// O "_head" no fim, significa que essas variáveis
		// dizem à respeito do cabeçalho da tabela.
        var td_head, tdElem_head; 

		// Esse loop serve para construir o cabeçalho da tabela.
		for(var a=0; a < table_columns.length; a++){
		    td_head = table_columns[a];
			tdElem_head = document.createElement("td");
			tdElem_head.innerHTML = td_head;
			tr.appendChild(tdElem);
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
				tdElem_body = document.createElement("td");
				tdElem_body.innerHTML = td_body;
				
				
				
			}
			
		}
		
	}
	
	generateTable();
	
	// Quando o programa é finalizado, salva os dados
	// fornecidos ao programa durante o uso.
	window.beforeunload = function(){
	    window.localStorage.table_columns = JSON.stringify(table_columns);
	    window.localStorage.table_products = JSON.stringify(table_columns);
	}
	
}