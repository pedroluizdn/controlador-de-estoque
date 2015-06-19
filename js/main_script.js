"use strict"; // Usa o modo strict do ECMAScript 5.

window.onload = function(){

	// Quando o programa é iniciado, recupera os antigos valores, ou 
	// então apenas inicializa o array.
	var ls = window.localStorage;
	if(ls.table_columns){
	    var table_columns = JSON.parse(ls.table_columns);
	}
	if(ls.table_data){
	    var table_data = JSON.parse(ls.table_data);
	}
	
	if(!table_columns){
	    var table_columns = ["pedro", "paulo"];
	}
	if(!table_data){
	    var table_data = {};
	}

	// Essa função cria a tabela com os dados que o programa já
	// possui. Tanto dos produtos, como os dados do formato da tabela.
	function generateTable(){
	    
		// Recupera o elemento em que as "THs" serão embutidas.
		var tr = document.getElementById("tabela_de_produtos")
		                 .firstElementChild
		                 .firstElementChild
		                 .firstElementChild;
		
        var td, tdElem;

		// Esse loop serve para construir a
		for(var a=0; a < table_columns.length; a++){
		    td = table_columns[a];
			tdElem = document.createElement("td");
			tdElem.innerHTML = td;
			tr.appendChild(tdElem);
		}
		
	}
	
	generateTable();
	
	// Quando o programa é finalizado, salva os dados fornecidos ao programa
	// durante o uso.
	window.beforeunload = function(){
	    window.localStorage.table_columns = JSON.stringify(table_columns);
	}
	
}