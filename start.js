// JavaScript Document
var fs=require('fs');
var server=require('./server.js');
var zlib = require('zlib');
var path=[
          './files/html',
          './files/js',
          './files/css',
          './files/img',
          './files/data',
         ];
var path2=[];         
var L=path.length;
var allFiles={};

var readDir=function(path,index){
	     fs.readdir(path,function(err,files){
			   if(err)throw err;
				   var i=files.length,flag;
				       if(i){
						   while(i--){
						    if(!index&&!i)flag=true;
                            readFile(path,files[i],flag);
						  };
						};		     		  
		 });
};

while(L--){
     path2[L]=[];
	 readDir(path[L],L);
};

var readFile=function(path,files,flag){
	
			      fs.readFile(path+'/'+files,"binary",function(err, data){
			      	var str='';
					    if(err)throw err;
				     	str+=data;
				        allFiles[files.trim().toLowerCase()]=str;
					    if(flag)server.startService(allFiles);
			      });
		  

	};
