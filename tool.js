var fs=require('fs');
var readFile=function(path,sign){
     console.log('path  ==  '+path);
     fs.readFile('./files'+path,function(err,data){
              if(err){
                  if(o[sign])o[sign]('err',err,sign);
              }else{
                  if(o[sign])o[sign]('ok',data,sign); 
              };       
     });
};
var o={
      clear:function(s){
        var k;
          if(s){ delete o[s];return;};
          for(k in o){
              if(k!='clear') delete o[k];
            };
         
      }
};
var head={
    "html":"text/html",
    "htm":"text/html",
   "css": "text/css",
   "gif": "image/gif",
   "ico": "image/x-icon",
   "jpeg": "image/jpeg",
   "jpg": "image/jpeg",
   "js": "text/javascript",
   'bmp':"image/bmp",
   'webp':"image/webp",
   "json": "application/json",
   "pdf": "application/pdf",
   "png": "image/png",
   "svg": "image/svg+xml",
   "swf": "application/x-shockwave-flash",
   "tiff": "image/tiff",
   "txt": "text/plain",
   "wav": "audio/x-wav",
   "wma": "audio/x-ms-wma",
   "wmv": "video/x-ms-wmv",
   "xml": "text/xml",
}; 

exports.readF=readFile;
exports.o=o;
exports.head=head;
