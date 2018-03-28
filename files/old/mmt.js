var init=function(o){
    var a,b,c,d,e,f,g;
     for(a in o){
         if(a=='$_sharedData')continue;
         b=window['$_'+a];
         c=o[a];
         if(b&&c)b(c);
     };
     d=o.$_sharedData;
     if(d)Eng.mt(d); 
};