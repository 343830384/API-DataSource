// JavaScript Document
var http=require('http');
var _url=require('url');
//var fileServer=require('./cache_files.js');
var getHead=require('./get_head.js');
var fs=require('fs');

var redirection=function(res,url){
	    // 重定向
				console.log('进入重定向')
				res.writeHead(301,{
				 'location':url	
					
				});
 }

var startService=function(files){	
								var server=http.createServer();  
								    server.listen(8081);
									   server.on('request',function(req,res){
							//			       res.setTimeout(10000);
										   var str='';
										   var url=_url.parse(req.url);
							     		   var pathName=url.pathname.trim().toLowerCase(); //请求路径
							     		   var query=url.query;//   查询 参数  
							     		      //"text/html"  ,  "text/plain",
//							     		     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//							     		         console.log(pathName);
//							     		         console.log(url);
//							     		         console.log(query);
							     		   var p=pathName.split('/').pop();
//							     		       console.log(p)
//							     		       console.log(files);
							     		       p=files[p];
							     		      if(p){ 
											     		   var contentType=getHead.getContentType(pathName);
//											     		        console.log('contentType='+contentType);
														       	    res.writeHead(200, {'Content-type' :contentType+';charset=utf-8'});
															           res.write(p);
											         }else{
											         	    res.writeHead(404, {'Content-Type': 'text/html'});
											         };
											           res.end();
										    
										       	   
										       	     
							//			       	       	    res.writeHead(404, {'Content-type':'text/plain;charset=utf-8'});
							//			       	       	 	  redirection(res,'/error.html');
										       	    
										});
									server.on('connection',function(){
										
										      console.log('connection 连接状态');
										      
										});	
};			

exports.startService=startService
	
