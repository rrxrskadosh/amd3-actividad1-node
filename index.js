let http = require('http');
let fs = require("fs"); //FilrSystem me ayuda a leer la extensión del ARCHIVO
// let path = require("path");
let mime = require("mime");

const readFile = (url, response) => {
	let urlF = __dirname + url;
	fs.readFile(urlF, (error, content) => {// Error y Contenido
		if(!error){
			response.setHeader("Content-Type", mime.getType(urlF));
			response.end(content);
		}else{
			response.writeHead(404);
			response.end("<h1>404</h1>")
		}
	})
}

//Cuando creamos una función para saber la extensión del Archivo de forma manual
// const setContentType = (ext, response) =>{
// 	if(ext === ".css"){
// 		response.setHeader("Content-Type", "text/css");
// 	}else if(ext === ".html"){
// 		response.setHeader("Content-Type", "text/html");
// 	}
// } 



//Creando RUTAS con NodeJs y FileSystem
http.createServer((request, response) =>{
	response.setHeader("Content-Type", "text/html", "charset=utf-8");
	if(request.method === "GET"){
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
			readFile(request.url, response);
			break;
	}

		}else if(request.method === "POST"){
        let data = '';

        //Cuando se estén recibiendo datos
        request.on('data', chunk => {
            data += chunk;
        });
        
        //Cuando se terminen de procesar los datos
        request.on('end', () => {
            console.log(data.toString());
            console.log("Fin del stream");
            //fs.writeFile
            //1° argumento -> la ruta del archivo en el que queremos escribir 
            //Se creará el archivo si no existe en la ruta especificada 
            //2° argumento -> El contenido que queremos escribir
            //3° argumento -> función de callback que nos "notificará" en caso de que haya
            // un error al escribir en el archivo
            fs.writeFile("usuarios2.txt", "Hola mundo", (error) => {
                if(error){
                    console.log(error);
                }
            });
        });

        request.on('error', error => {
            console.log(error);
        })


	}

}).listen(801);

