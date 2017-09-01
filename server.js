// JavaScript Document
var http=require('http');
var _url=require('url');
var getHead=require('./get_head.js');
var fs=require('fs');
var startService=function(files){	
		var server=http.createServer();  
			server.listen(80,'0.0.0.0');
			   server.on('request',function(req,res){
	//			       res.setTimeout(10000);
				   var url=_url.parse(req.url);
				   var pathName=url.pathname.trim().toLowerCase();
				   var query=url.query;
				   var p=pathName.split('/').pop();
				       p?null:p='index.html';
					   p=files[p];
					  if(p){ 
					   var contentType=getHead.getContentType(pathName);	       	    
						   res.writeHead(200,{'Content-type':contentType});
						   res.write(p,"binary");
					  }else{
						   res.writeHead(404, {'Content-Type': 'text/html'});
					  };
					   res.end();
							
				});
};			

exports.startService=startService;
	
