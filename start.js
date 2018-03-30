var http=require('http');
var _url = require('url');
var zlib = require('zlib');
var tool =require('./tool.js');
var readF=tool.readF,o=tool.o,head=tool.head;
var i=0;
var cache={};
var noAllow=['jpg','png','ico','gif'];

var srver= http.createServer(function(req,res){
          var url=decodeURI(req.url);
              url=_url.parse(url);
          var  pathName=url.pathname;
               if(pathName=='/')pathName='/index.html';		  
          var  query=url.query;           
          var  f= pathName.split('/').pop().split('.').pop();  
          var  type=head[f];
         
            if(type){
                if(cache[pathName]){
                      if(noAllow.indexOf(f)>-1){
                        res.writeHead(200,{'Content-Type':type,'Cache-control':'public,max-age=113600'})
                      }else{
                        // res.writeHead(200,{'Content-Type':type,"content-encoding": "gzip",'Cache-control':'public,max-age=3600'});
						res.writeHead(200,{'Content-Type':type,"content-encoding": "gzip",'Cache-control':'no-cache'});
                      };  
                      res.write(cache[pathName]);
                      res.end(); 
                }else{
                      i++;
                      readF(pathName,'q'+i,f);
                      o['q'+i]=function(k,d,n){
                      
                          if(k=='ok'){
                              if(noAllow.indexOf(f)>-1){
                                cache[pathName]=d;
                                // res.writeHead(200,{'Content-Type':type});
								res.writeHead(200,{'Content-Type':type,'Cache-control':'public,max-age=113600'})
                              }else{
                                cache[pathName]=zlib.gzipSync(d);
                                // res.writeHead(200,{'Content-Type':type,"content-encoding": "gzip",'Cache-control':'public,max-age=3600'});
								res.writeHead(200,{'Content-Type':type,"content-encoding": "gzip",'Cache-Control':'no-cache'});
                              };
                              res.write(cache[pathName]); 

                              // res.writeHead(200,{'Content-Type':type});
                              // res.write(d);
                          }else{
                            res.writeHead(404,{'Content-Type':'text/html'});
                          }
                          res.end();
                          o.clear(n);
                      };
                }; 
            }else{
              res.writeHead(404);
              res.end();
          };
          
            
});
srver.on('error',function(err){
    throw err;
})
srver.listen(80,'0.0.0.0');
