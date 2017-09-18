// JavaScript Document
var fs=require('fs');
var server=require('./server.js');
var zlib = require('zlib');
var path=[
          './files/html',
          './files/js',
          // './files/css',
          './files/img',
          // './files/data',
         ];
var path2=[];         
var L=path.length;
var allFiles={};
var check ,readS; 
var readDir=function(path,index){
	     fs.readdir(path,function(err,files){
			   if(err)throw err;
				   var i=files.length,flag;
				       if(i){
						   while(i--){
						    if(!index&&!i)flag=true;
							check=files[i].trim().toLowerCase();
							 if(check.indexOf('.ico')>-1){
								readS='binary';
							 }else{
								readS='utf8';
							 }
                            readFile(path,check,flag,readS);
						  };
						};		     		  
		 });
};

while(L--){
     path2[L]=[];
	 readDir(path[L],L);
};

var readFile=function(path,files,flag,readS){
	
			      fs.readFile(path+'/'+files,readS,function(err, data){
			      	var str='';
					    if(err)throw err;
				     	str+=data;
				        
					  if(readS=='utf8'){
						 allFiles[files]=zlib.gzipSync(str);
					  }else{
						 allFiles[files]=str;
					  };
					    if(flag)server.startService(allFiles);
			      });
		  

	};
