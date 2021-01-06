let http = require('http');
let fs = require("fs"); //FilSystem me ayuda a leer la extensión del ARCHIVO

const readFile = (path, response) => {
	fs.readFile(path, (error, content) => {// Error y Contenido
		if(!error){
			response.write(content);
			response.end();
		}
	});
}

//Creando RUTAS con NodeJs y FileSystem
http.createServer((request, response) =>{
	response.setHeader("Content-Type", "text/html", "charset=utf-8");
	//Usamos SWITCH
	switch(request.url) {
		case "/about":
			readFile("./about.html", response);
			break;
		case "/":
			readFile("./index.html", response);
			break;
		case "/contact":
			readFile("./contact.html", response);
			break;
		case "/projects":
			readFile("./projects.html", response);
			break;
		case "/favicon.ico":
			response.setHeader("Content-Type", "image/x-icon");
			readFile("./favicon.ico, response");
			break;
		default:
			response.statusCode = 404;
			readFile("./404.html", response);
			break;
	}

}).listen(801);

