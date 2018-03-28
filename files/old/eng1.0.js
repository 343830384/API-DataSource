(function () {
	var isJsonOrArray = function (x) {
		var t = typeof (x), k;
		if (t == 'string') return 1;    //string
		if (t == 'boolean') return 2;   //boolean
		if (t == 'number') return 3;   //number
		if (x instanceof Array) return 4; //这里返回true 是单纯渲染页面数据的应用 
		if (t == 'object')
			for (k in x) { return 5 }  //json
		if (JSON.stringify(x) == '{}') return 5;
		return 0;
	};

	var getAttrNode = function (o, arr, j, c, f) {
		var n = o.childNodes, L = n.length, i, atr, p, i = 0, a, b = c.n;
		if (f) {
			atr = o.getAttribute('e-for');
			if (atr) { atr = atr.trim(); atr ? (c.n++ , j[atr] = { $_N: c.n, $_P: -1 }, a = j[atr], arr.push([atr, a, o]), j = j[atr], b = 0) : null; };
		};
		while (i < L) {
			if (n[i].nodeType == 1) {
				atr = n[i].getAttribute('e-for'), p = 1;
				if (atr) { atr = atr.trim(); atr ? (c.n++ , j[atr] = { $_N: c.n, $_P: b }, a = j[atr], arr.push([atr, a, n[i]]), getAttrNode(n[i], arr, a, c), p = 0) : null; };
				p ? getAttrNode(n[i], arr, j, c) : null;
			}; i++;
		};
	};

	var getSameNode = function (o, arr) {
		var L = arr.length;
		while (L--) {
			if (o == arr[L]) break;
		};
		return L;
	};
	var $_copy = function (arr, s, e) {
		var a = [], L = arr.length, i = 0;
		e ? null : e = L;
		while (s < e) {
			a[i] = arr[s];
			s++ , i++;
		};
		return a;
	};
	var $_join = function (arr, a, c) {
		var L = arr.length, i = 0, s = '', b = '.';
		c != undefined ? L = c : null;
		while (i < L) {
			//	        a?s+=arr[i]+a:s+=arr[i];
			if (i == L - 1) b = '';
			a ? s += arr[i] : s += (arr[i] + b);
			i++;
		};
		return s;
	};
	var checkString = {
		'$_dataIndex': 1,
		'$_dataString': 1,
		'$_txtObjIndex': 1,
		'$_txtObj': 1,
		'$_atrObj': 1,
		'$_atr': 1,
		'$_atrObjIndex': 1,
		'$_htmlObj': 1,
		'$_htmlObjIndex': 1,
		'$_input': 1,
		'$_inputIndex': 1,
		'$_change': 1,
		'$_changeIndex': 1,
		'$_event': 1,
		'$_eventIndex': 1,
		'$_eventArr': 1
	};
	var cloneJSON = function (o1, o2, arr, evs, eds, items) {
		var k, v;

		for (k in o2) {
			v = o2[k];
			//	      	   debugger;
			if (v instanceof Array) {
				o1[k] = [];
				cloneJSONArray(o1[k], v, arr, evs, eds, items);
			} else if (!checkString[k]) {
				o1[k] = {};
				cloneJSON(o1[k], v, arr, evs, eds, items);
			};
		};
	};
	var cloneJSONArray = function (o1, o2, arr, evs, eds, items) {
		var L = o2.length, k, v, x, y, z;
		while (L--) {
			v = o2[L];
			o1[L] = {};
			o1[L].$_dataIndex = v.$_dataIndex;
			o1[L].$_dataString = v.$_dataString;
			o1[L].$_txtObj = arr[v.$_txtObjIndex];
			o1[L].$_htmlObj = arr[v.$_htmlObjIndex];
			o1[L].$_atrObj = arr[v.$_atrObjIndex];
			o1[L].$_atr = v.$_atr;
			o1[L].$_input = arr[v.$_inputIndex];
			o1[L].$_change = arr[v.$_changeIndex];
			//	        	   o1[L].$_event=arr[v.eventIndex];
			//	        	   o1[L].$_eventArr=v.$_eventArr;

			if (v.$_eventArr) {
				y = v.$_eventArr;
				x = y.length;
				while (x--) {
					z = arr[v.$_eventIndex];
					z.$_eng = items;
					z.$_cache = items.$_cache;
					z.$_gData = items.$_data;
					eds.push(z);
					z[y[x][0]] = evs[y[x][1]]
				};
			}
			for (k in v) {
				if (!checkString[k]) {
					o1[k] = {};
					cloneJSON(o1[k], v, arr)
				};
			};
		};
	};
	var forArrayMatch = function (arr1, arr2) {
		var L, L2 = arr2.length, i, i2, i3, cache = [], c;
		while (L2--) {
			L = arr2[L2].length, i = 0, i2 = 0;
			while (i < L) {
				if (arr1[i] == arr2[L2][i]) { i2++ } else { break };
				i++;
			};
			cache[L2] = i2;
		};

		L = cache.length, i2 = -1, i = 0;
		while (L--) {
			cache[L] ? (cache[L] > i ? (i = cache[L], i2 = L) : null) : null;
		};
		if (i2 == -1) return;
		arr2 = $_copy(arr1, cache[i2] - 1), i = 0, L = arr2.length, cache = [], i3 = -1;
		while (i < L) {
			c = arr2[i];
			if (c) {
				arr2[i + 1] != undefined ? cache.push(arr2[i + 1]) : null;
				i3++;
			} else { break };
			i += 2;
		};
		if (i3 != -1) return { n: i3, fn: i2, pos: cache };
	};

	// 解构  build start
	var getAttrArray = function (atr) {
		if (!atr) return;
		var L = atr.length, arr = [], name;
		if (L) {
			while (L--) {
				name = atr[L].name;
				if (!regALL[3].test(name)) {
					arr.push([atr[L].name, atr[L].value]);
				};
			};
			return arr;
		}
		//	       else{
		//	       	 return null;
		//	       };
		return null;
	};

	var resolveNode = function (obj, data, arr) {
		var nodes, name, atr, type, txt, L, i = 0, i2 = 0;
		data ? null : (data = {}, arr = []);
		name = obj.nodeName;
		data.main = {};
		data.main.name = name;
		data.main.atr = getAttrArray(obj.attributes);
		arr.push(obj);
		nodes = obj.childNodes;
		if (nodes) { L = nodes.length } else { return };
		data.child = [];
		while (i < L) {
			type = nodes[i].nodeType;
			type === 1 ? (data.child[i2] = {}, resolveNode(nodes[i], data.child[i2], arr), i2++) : null;
			type === 3 ? (txt = nodes[i].textContent.trim(), txt ? (txt = txt.replace(regALL[1], ''), data.child[i2] = txt, i2++ , arr.push(nodes[i])) : null) : null;
			i++;
		};
		return [data, arr];
	};
	var buildNode = function (data, parent, arr, flag) {
		var name, atr, child = data.child, obj, type, txt, obj2, i, L;
		name = data.main.name;
		obj = document.createElement(name);
		atr = data.main.atr;
		if (atr) {
			L = atr.length;
			while (L--) {
				obj.setAttribute(atr[L][0], atr[L][1]);
			};
		};
		flag ? parent.appendChild(obj) : arr = [];
		arr.push(obj);

		if (!child) return;
		L = child.length, i = 0;
		while (i < L) {
			txt = child[i];
			if (isJsonOrArray(txt) == 1) {
				obj2 = document.createTextNode(txt);
				arr.push(obj2);
				obj.appendChild(obj2);
			} else {
				buildNode(txt, obj, arr, true)
			}; i++;
		};
		return [obj, arr];
	};
	// 解构  build end
	//解析 e-attr start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var regALL = [
		/(\{\{[^{}]+\}\})/,
		/(\{\{[^{}]+\}\})/g,
		/({{|}})/g,
		/^(e\-)/, //故意遗留 所有e- ,其它e-指令不兼容 
		/(\>\=|\<\=|\>|\<|\=\=\=|\=\=|\=)/,
	];

	var reg77 = function (s) {
		var a = [], L = s.length, i = 0, c, t = '', f = 1, k, g, o, b;
		while (i < L) {
			c = s[i];
			if (f && c == '=') { a.push(t), a.push(c), t = '', f = 0, k = 1, i++; continue; };
			if (k && c == '?') { t = t.split(regALL[4]), o = t.length, b = 0; while (b < o) { a.push(t[b]), b++ }; t = '', k = 0, a.push(c), g = 1, i++ , o = i; continue };
			if (g && c == ')' && s[i + 1] == ':') { a.push(s.slice(o + 1, i)), a.push(':'), a.push(s.slice(i + 3, -1)); break }; t += c, i++;
			if (i == L) { a.push(t) };
		};
		return a;
	};
	var typePanDuanJson = {
		'=': 0, '==': 0, '===': 0, '>=': 1, '<=': 2, '>': 3, '<': 4,
	};
	var typePanDuan = function (s) {
		var v = typePanDuanJson[s];
		return v;
	};

	var forMatStr = function (str) {
		var arr = reg77(str), L = arr.length, i = 0, arr2 = [];
		if (L > 2) {
			L = arr.length;
			arr2.push(arr[2].replace(regALL[2], '').trim());
			if (L == 9) arr2.push(typePanDuan(arr[3]));
			while (i < L) {
				i % 2 || i == 2 ? null : arr2.push(arr[i].trim());
				i++;
			};

			return arr2;
		};
		return;
	};
	var forMatAttr = function (atr) {
		var arr, L, data = [], v;
		arr = atr.split(';');
		L = arr.length;
		while (L--) {
			v = forMatStr(arr[L]);
			if (v) data.push(v);
		};
		if (data.length) return data;
		return;
	};
	var attrFun = function (dom, pJson, doms) {
		var atr = dom.getAttribute('e-attr'), L;
		if (atr) {
			atr = atr.trim();
			dom.removeAttribute('e-attr');
			if (atr) {
				atr = forMatAttr(atr);
				if (atr) {
					L = atr.length;
					while (L--) {
						if (!pJson[atr[L][0]]) pJson[atr[L][0]] = [];
						pJson[atr[L][0]].push({
							$_atrObj: doms ? null : dom,
							$_atrObjIndex: doms ? getSameNode(dom, doms) : null,
							$_atr: $_copy(atr[L], 0)
						});
					};
				};
			};
		};
		return;
	};
	//解析 e-attr  END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//setHtml  start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var setHtml = function (dom, pJson, doms) {
		var e_html = dom.getAttribute('e-html'), atr;
		if (e_html) {
			atr = e_html.trim();
			dom.removeAttribute('e-html');
			if (atr) {
				if (!pJson[atr]) pJson[atr] = [];
				pJson[atr].push({
					$_htmlObj: doms ? null : dom,
					$_htmlObjIndex: doms ? getSameNode(dom, doms) : null
				});
				return false;
			};
		};
		return true;
	};
	//setHtml  end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var setDATA = {
		'e-input': '$_input',
		'e-change': '$_change',

		'$_input': '$_inputIndex',
		'$_change': '$_changeIndex',
		'e-event': '$_event',
		'$_event': '$_eventIndex'
	};
	var setDATA2 = ['e-id', 'e-base', 'e-html', 'e-attr', 'e-for']
	var setALL = function (dom, pJson, doms, flag, even, all, evs) {
		var attribute = dom.attributes, i = attribute.length, n, s, v, h, j, w, x, y, z;
		while (i--) {
			n = attribute[i], s = n.name, h = setDATA[s], w = 0;
			if (h) {
				v = n.value.trim();
				dom.removeAttribute(s);
				if (v) {
					if (h == '$_event') {
						//	       	  	    	   	 debugger
						if (flag == 1) continue;
						y = [];
						w = 1;
						z = v.split(';');
						x = z.length;
						while (x--) {
							y[x] = z[x].split(':')
						}
					};
					if ((w && doms) || !w) {

						if (!pJson[v]) pJson[v] = [];
						j = {},
							j[h] = doms ? null : dom,
							j[setDATA[h]] = doms ? getSameNode(dom, doms) : null;
						w ? j['$_eventArr'] = y : null;
						pJson[v].push(j);
					} else {
						dom.$_data = even;
						dom.$_cache = all.$_cache;
						dom.$_gData = all.$_data;
						dom.$_eng = all;
						x = y.length;
						while (x--) {
							dom[y[x][0]] = evs[y[x][1]]
						}
					};

				};
			};
		};
	};
	//say('chrome 特性???')
	var returnEl = function (s) {
		// var o = document.createDocumentFragment();
		var d = document.createElement('div');
		d.innerHTML = s.trim();
		var c = d.childNodes, L = c.length, i = 0;
		console.warn('modify=>',' 注释部分')
		// while (i < L) {
		// 	o.appendChild(c[0]);
		// 	i++;
		// };
		// return o;
		return c[0]
	};

	var delCacheChild = function (o, o2) {
		var i, c;
		if (o) {
			i = o.length;
			while (i--) {
				c = o2[o[i][0]].child;
				delCacheChild(c, o2);
				delete o2[o[i][0]];
			};
		};
		return;
	};
	//
//main Start##############################################################################################
	Eng = function (obj) {
		var c;
		this.goOnFlag = true;
		this.arrayCounts = -1;
		this.json = {};
		this.cacheForDoms = [];
		this.exclude = [0, 1, 2, 3];
		this.forArryTree = [];
		this.forCache = obj.cache||{}; //forCache实际上是 //  1.0 ADD ########
		this.forCheckArray = [[]];
		this.data = obj.data||{}; //  1.0 ADD ########
		this.relate = obj.relate;
		this.event =obj.event||{}; //  1.0 ADD ########
		// this.data ? null : this.data = {}; //  1.0 ADD ########
		this.setToSelfOrGlobal();
		// this.tool={            //  1.0 ADD ########
		// 	 ajax:Eng.ajax,
		// 	 require:Eng.require
		// },
		// this.addData();
		this.items = {
			$_id: obj.id,
			$_gData: this.data,
			$_ajax:this.ajax,    //  1.0 ADD ########
			$_require:Eng.require,  //  1.0 ADD ######## 
			$_newData:Eng.newValue, //  1.0 ADD ########
			$_addData:this.addData, //  1.0 ADD ########
			$_relate: [],
			$_caller: false,
			$_setToSelf: this.$_setToSelf,
			$_setToGlobal: this.$_setToGlobal,
			$_watcher: this.$_watcher,
			$_event: this.event,
			$_watcherFor: this.$_watcherFor,
			$_cache: this.forCache
		};
		Eng.b(this.items);
		Eng.widgets.push(this.data, this, obj.id);
		this.seekFlag = true;
		this.seek();
		this.watcherForList = {};// 下个版本用的
	    var tempFlag=0;	
		if(obj.template){                       // 1.0 ADD ##########
			tempFlag=1;
			this.items.$_el = returnEl(obj.template);
			this.xunHuanDom(this.items.$_el, this.json, '', 0, this.data);
		}
		if (obj.el) {                           // 1.0 ADD ##########
			if (isJsonOrArray(obj.el) == 1){
				// if(tempFlag)document.getElementById(obj.el).appendChild(this.items.$_el);
				obj.el=document.getElementById(obj.el);
				if(tempFlag){
					if(!obj.require||!obj.require.css)obj.el.appendChild(this.items.$_el); //判断 表达冗余 min版应解决
				}else{
					this.items.$_el = obj.el,
					this.xunHuanDom(obj.el, null, '', 0, this.data)
				};;
			}else{
				// tempFlag?obj.el.appendChild(this.items.$_el):(this.items.$_el = obj.el,this.xunHuanDom(obj.el, null, '', 0, this.data));
				tempFlag?obj.el.appendChild(this.items.$_el):(this.items.$_el = obj.el,this.xunHuanDom(obj.el, null, '', 0, this.data));

			};
			// if (isJsonOrArray(obj.el) == 1) {
			// 	this.items.$_el = returnEl(obj.el);
			// 	this.xunHuanDom(this.items.$_el, this.json, '', 0, this.data);
			// }else{
			// 	this.items.$_el = obj.el;
			// 	this.xunHuanDom(obj.el, null, '', 0, this.data);
			// }
		};
		if (obj.watcher) this.watch(obj.watcher);
		if (obj.watcherFor) this.watchFor(obj.watcherFor);
		var forARR = [];
        
		if(this.data)this.forJson(this.data, forARR, 1);
		this.flag={};                              // 1.0 ADD ##########
		this.flag.created=obj.created;             // 1.0 ADD ##########
		this.flag.ajaxFlag=1;                            // 1.0 ADD ##########
	    if(!obj.data&&obj.ajax){                    // 1.0 ADD ##########
			this.flag.ajaxFlag=0;
			this.ajax(obj.ajax,this.items);		// 1.0 ADD ##########
		};
		forARR = null;
		this.seekFlag = false;
		var show=obj.showStage, created=obj.created, cjs=obj.require,t=this ; // 1.0 ADD ##########
		this.flag.createFlag=1;
		if(cjs){                                                                     // 1.0 ADD ##########
            if(cjs.css){
				new Eng.require(cjs.css,0,function(){
					console.log('css');
					obj.el.appendChild(t.items.$_el)
                    if(show)show(t.items,t.forCache);
				})
			};
			if(cjs.js){
				this.flag.createFlag=0;
				  new Eng.require(cjs.js,'js',function(){
					console.log('js');
					t.flag.createFlag=1;
					if (t.flag.ajaxFlag&&created)created(t.items,t.forCache); 
					 
				})
			};    
		};
		if (this.flag.createFlag&&this.flag.ajaxFlag&&created)created(t.items,t.forCache);  // 1.0 ADD ##########

	
		//	console.log(this.json);
		//	console.log(this.forArryTree)

		return this.data;
	};
	Eng.widgets = [];
	Eng.$_caller = true;
	Eng.b = function (o, v) {
		v = o.$_caller
		Object.defineProperty(o, '$_caller', {
			set:function(s) {
				v = s;
				Eng.$_caller = v ? false : true;
			},
			get:function() {
				return v
			}
		});
	};
// 1.0 ADD  start####################################################################################################
Eng.prototype.ajax=function(a,b){
	Eng.ajax(a,b);
};
Eng.init=function(o){
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

Eng.addStyle=function(a,b){
	if(!a)return;
	b=document.createElement('style'),b.innerText=a,
	document.head.appendChild(b); 
};
Eng.newValue=function(a){
   return JSON.parse(JSON.stringify(a))
};
Eng.mt=function(cfg){ //Eng.mt  START~~~~~~~~~~~~~~
    $_mmt={
        m:localStorage,
        a:{},   //css js
        b:{},   //data
        init:function(){
            var t=this,a=t.m.$_eng_cj_cache,b=t.m.$_eng_d_cache,c=[a,b],e,l=2;
            while(l--){
                    e=c[l];
                    if(e){
                        try{
                        e=JSON.parse(e);
                        l?t.b=e:t.a=e; 
                        }catch(e){};
                    };
            }; 
        },
        wf:function(){
            var t=this;
            t.m.$_eng_cj_cache=JSON.stringify(t.a);
            t.m.$_eng_d_cache=JSON.stringify(t.b);
        },
        clear:function(){
            this.a={},this.b={}
        },
        get:function(a,b){
            var t=this; 
            if(b=='data'){
                return t.b[a];
            }else{
                return t.a[a];
            };
        },
        set:function(a,b,c){
            var t=this;
                if(c=='data'){
                    t.b[a]=b;
                }else{
                    t.a[a]=b;
                }
        }
    };//$_mmt End
 //~~~~~~   
 var mart=function(e,flag){  // blue  ==> flag=1
    // debugger;
    if(!e)return;
var arr=e.split('='),arr2,i=1,l,f=1,obj,obj2,v,g;
   arr2=arr[0].split('.'),l=arr2.length;
	e=arr2[0];
	g=Eng.widgets.indexOf(e);
	g>0?obj=Eng.widgets[g-1].items.$_gData:obj=0;
    // obj=window[e];
    if(!obj)return;
    if(!flag)l-=1;
    while(i<l){
         obj=obj[arr2[i]];
         if(!obj){
             if(flag){ 
                f=0;
                break;
             }else{
                obj[arr2[i]]={},obj=obj[arr2[i]]
             };
         };
        i++;
    };
    if(f){
        if(flag){
            // debugger;
            $_mmt.b['$'+e]?0:$_mmt.b['$'+e]={};
            obj2=$_mmt.b['$'+e];
            obj2[arr[0]]=obj;
        }else{
            //  debugger;
            obj2=arr[1].split('.')[0];
            v=$_mmt.b['$'+obj2];
            if(v){
              obj[arr2[l]]=v[arr[1]];
            };
        };
    };
};// mart  END  ~~~~~~~~~~~~~~
var blurOrFocus=function(order){
var arr=['<=>','=>','<?>','?>'],b=4,c,d,e,f,g,h;
    if(order=='focus'){
        arr[1]='='; 
        arr[3]='?='
        $_mmt.init();
    };
    while(b--){
        c=cfg[arr[b]];
        if(c){
            c instanceof Array?0:c=[c];
            d=c.length;
            while(d--){
				e=c[d];
				if(b<2){
					g=Eng.widgets.indexOf(e);
					g>0?h=Eng.widgets[g-1].items.$_gData:h=0;
				}

                if(order=='blur'){
                    if(b>1){
                        // debugger
                        mart(e,1);
                    }else{
						$_mmt.set(e,h,'data');
                    //    $_mmt.set(e,window[e],'data');
                    //  if(!b)$_mmt.wf();
                   }; 
                }else{
                    if(b>1){
                        mart(e);
                    }else{
                       f=$_mmt.get(e,'data');
					   // 改成 Eng 对象  要
					     if(f){
							//  g=Eng.widgets.indexOf(e);
							 if(h){
								//  h=Eng.widgets[g-1];
								 for(g in f){
									 h[g]=f[g];
								 };
							 }
						 }
                    //    if(f)window[e]=f;
                    };
                };// if (order  )   END
             };//while   END
        }
    };//while END
   if(order!='focus')$_mmt.wf();
};//blurOrFocus  End~~~~~~~~~~~~~~~~~~~~~
$_mmt.clear();
blurOrFocus('focus');
window.addEventListener('focus',function(){
    // console.log('获得焦点');
    blurOrFocus('focus');
}); 
window.addEventListener('blur',function(){
    // console.log('失去焦点')
    $_mmt.clear();
    blurOrFocus('blur');
}); 

};//Eng.mt  END ######################################
Eng.ajax=function(o,z){
		var $=new XMLHttpRequest(),t,d,u,a,s,y;
			t=o.type||'get';
			t=t.toLowerCase();
			d=o.dataType||'json';
			d=d.toLowerCase();
			u=o.url||'/eng-data';
			a=o.async||true;
			s=o.data;
			$.open(t ,u+(t!='post'?(s?('?'+JSON.stringify(s)):''):''),a);
			$.setRequestHeader("Content-type","application/"+d);
			$.send(t=='post'?s:'');
			$.onreadystatechange=function(){
				if($.readyState==4){
					var status= $.status;
					if(status==200||status==304){
						y=$.responseText;
						if(o.success)
						 o.success(d=='json'?JSON.parse(y):y,z);

					}else{
						if(o.error)
						o.error(status,z);
					}
				}
         };
};
Eng.require=function(h,j,i){
	var t=this,a=h instanceof Array , b , s=t.constructor , e;
		if(!h)return;
		t.i=i,
		a?t.b=h:(t.b=[],t.b.push(h)),
		t.c=t.b.length,t.g=0,
		t.k= document.getElementsByTagName('head')[0],
		j=='js'?(t.l='script',t.o='text/javascript', t.m='type',t.n='src'):(t.l='link',t.o='stylesheet',t.m='rel',t.n='href');
	   if(!s.a)s.a=[];
	   t.e=s.a,e=t.e,e.push(t);
	  if(e.length==1)t.p();                 
};
Eng.require.prototype.p=function(){
	var t=this,f;
		  f=document.createElement(t.l),
		  f[t.m]=t.o,
		  f[t.n]=t.b[t.g],
		  t.k.appendChild(f);
		  f.onload=function(){
			t.g++;
			if(t.g==t.c&&t.i){
			  t.i(),
			  t.e.splice(0,1);
			  if(t.e[0])t.e[0].p()
			}else{
			  t.p()
			}
		  };
		  f.onerror=function(){
			t.g++;
			if(t.g!=t.c){
			  t.p()
			}else{
			  t.i(),
			  t.e.splice(0,1);
			  if(t.e[0])t.e[0].p()
			}
		  }
		  f=null;
  };
// 1.0 ADD  End####################################################################################################  
  
	Eng.prototype.seek = function () {
		var t = this, re = t.relate, v;
		var o = Eng.widgets, l;
		//    debugger;
		if (re) {
			var l = re.length;
			while (l--) {
				v = re[l];
				var i = o.indexOf(v);
				if (i > -1) {
					re.splice(re.indexOf(v), 1);
					if (!re.length) t.relate = 0;
					var ite = t.items;
					var id = ite.$_id;
					var ite2 = o[i - 1].items;
					ite['$id_' + v] = ite2
					ite2['$id_' + id] = ite;
					i = ite.$_relate.indexOf(v);
					if (i < 0) ite.$_relate.push(v);
					i = ite2.$_relate.indexOf(id);
					if (i < 0) ite2.$_relate.push(id);
				}
			}
		};
		if (!t.seekFlag) return;
		l = o.length;
		while (l--) {
			l--;
			v = o[l]
			if (v != t) v.seek();
			l--;
		}
	};
	Eng.prototype.setToSelfOrGlobal = function () {
		var th = this;
		th.$_setToSelf = function (data, str) {
			var d = {}, dom;
			dom = isJsonOrArray(str) == 1 ? returnEl(str) : str;
			th.xunHuanDom(dom, d, '', 1);
			th.forJson(data, [], 0, d, data);
			d = null;
			return dom;
		};
		th.$_setToGlobal = function (v) {
			//											say('setToGlobal  内部 start~~~~~~~~~~~~~~~')
			var d = th.json, f = true, data = th.data, t, arr, base, i, L;;
			//										      data=th.data;
			t = isJsonOrArray(v.el);
			v.base ? base = v.base.trim() : base = '';
			if (t == 1) v.el = returnEl(v.el);
			if (base) {
				i = 0, arr = base.split('.'), L = arr.length;
				while (i < L) {
					d = d[arr[i]];
					data = data[arr[i]];
					i++
				};
				t = isJsonOrArray(v.data);
				if (!th.exclude[t]) {
					d[v.key] = {}, d = d[v.key];
					base += '.' + v.key;
				};
				arr.push(v.key);
			} else {
				arr = [v.key], base = v.key;
				d[v.key] = {};
				d = d[v.key];
			};
			data[v.key] = v.data;
			//debugger;
			th.xunHuanDom(v.el, d, base, 2, v.data);
			th.bindKey(data, v.key, $_copy(arr, 0), base, 5);
			th.forJson(data[v.key], arr, 2);
			d = null, data = null;
			return v.el;
		};
		th.addData=function(d){  // 1.0 ADD ########################################
			var forARR=[];
			 th.data=d;
			 th.items.$_gData=d;
			 th.flag.ajaxFlag=1;
			 th.forJson(d, forARR, 1);
			 if(th.flag.createFlag&&th.flag.created)th.flag.created(th.items,th.forCache);
			 forARR=null;
		};
		th.$_watcher = function (o) {
			th.watch(o);
		};
		th.$_watcherFor = function (o) {
			th.watchFor(o)
		};
	};
	Eng.prototype.watch = function (c) {
		var a, v, k;
		this.watchMap ? null : this.watchMap = {};
		for (a in c) {
			v = c[a];
			if (v !== k) this.watchMap[a.trim()] = v;
		};
	};
	Eng.prototype.watchFor = function (c) {
		var a, v, k;
		this.watcherFor ? null : this.watcherFor = {};
		for (a in c) {
			v = c[a];
			if (v !== k) this.watcherFor[a.trim()] = v;
		};
		c = null;
	};
	Eng.prototype.xunHuanDom = function (obj, pObj, fCounts, setFlag, even) {
		if (!obj) return;

		var child = obj.childNodes, L;

		L = child.length;
		// 	       debugger;

		!pObj ? (pObj = this.xunHuanDom_Case(obj, this.json, fCounts, setFlag, even), fCounts = pObj[1], even = pObj[2], pObj = pObj[0]) : null;


		if (!L) return;

		var v, name, i = 0, arr, str, L2, i2, arr2, arr3, cpObj = pObj;
		while (i < L) {
			//           debugger;
			child[i] ? name = child[i].nodeType : name = -1;
			if (name == 3) {
				v = child[i].nodeValue.trim();
				arr = v.split(regALL[1]);
				L2 = arr.length;
				if (L2 > 1) {
					var arr1 = $_copy(arr, 0);
					i2 = 0, arr2 = [], arr3 = [];
					while (i2 < L2) {
						if (regALL[1].test(arr[i2])) {
							arr2.push(i2);// index array 
							str = arr[i2].replace(regALL[2], '');
							arr[i2] = str;  // 将 arr 中 {{|}} 的值 删除 {{|}}
							arr1[i2] = '';
							//				   	      	      	       say('str='+str);
							//                            debugger;
							arr3.push(str);// index array 对应的String
						};
						i2++;
					};
					child[i].nodeValue = $_join(arr1, 1);
					L2 = arr3.length, i2 = 0;
					while (i2 < L2) {
						if (!cpObj[arr3[i2]]) cpObj[arr3[i2]] = [];
						cpObj[arr3[i2]].push({
							$_txtObj: !this.cloneFlag ? child[i] : null,
							$_txtObjIndex: this.cloneFlag ? getSameNode(child[i], this.allNodes) : null,
							$_dataIndex: arr2,
							$_dataString: arr
						});
						//				   	      	      	       child[i].setAttribute('$_cc',)
						i2++;
					};
				};
			} else {
				if (name == 1) {
					//		   	      	  	       debugger;
					pObj = this.xunHuanDom_Case(child[i], cpObj, fCounts, setFlag, even);
					//		   	      	 	        debugger;

					this.goOnFlag ? this.xunHuanDom(child[i], pObj[0], pObj[1], setFlag, pObj[2]) : null;
				};
			};
			i++;
		};//while--end
	};
	Eng.prototype.xunHuanDom_Case = function (dom, pJson, fCounts, setFlag, even) {


		var atr, flag = true, L, i, cloned = true;

		this.goOnFlag = true;// this.goOnFlag 作用于循环对象中,如果存在 this.goOnFlag=false,则禁止再解析循环对象下的{{}}对象

		atr = dom.getAttribute('e-base');
		if (atr) {
			atr = atr.trim();
			dom.removeAttribute('e-base');
			if (atr) {
				// 	      	   	debugger;
				// 	      	   	if(!this.cloneFlag)even=this.getKeyArrayValue(fCounts.split('.'),atr,0,0,setFlag);
				if (even) even = this.getKeyArrayValue(fCounts.split('.'), atr, 0, 0, setFlag);
				fCounts ? (fCounts += '.' + atr) : fCounts += atr;
				pJson[atr] = {};
				pJson = pJson[atr];
				flag = false;


			};
		};

		if (!setFlag) {
			atr = dom.getAttribute('e-for');

			if (atr && flag) {
				atr = atr.trim();
				// 	      	   dom.removeAttribute('e-for'); ????????????????????????????????????????????????????????????????????????????????
				if (atr) {
					this.cloneFlag = true;
					cloned = false;
					this.arrayCounts++;
					this.forCheckArray[this.arrayCounts] = [];
					this.cacheForDoms[this.arrayCounts] = [];
					if (fCounts) this.forCheckArray[this.arrayCounts] = fCounts.split('.');
					var forJsonTree = {}, forArryTree = [], forC = { n: -1 }, forData = getAttrNode(dom, forArryTree, forJsonTree, forC, 1);
					L = forArryTree.length, i = 0;
					//		   	      	        debugger;
					var forJ, forS, forN, forP, forD, i2, i3, forCP, forCN, forCheck = this.forCheckArray[this.arrayCounts];
					var build, cP;
					while (i < L) {
						forC = {}, forCP = [], forCN = [], i2 = i, i3 = 0;
						forJ = forArryTree[i][1];
						forS = forArryTree[i][0];
						forD = forArryTree[i][2];
						forN = forJ.$_N;
						forP = forJ.$_P;  //这个循环体系里里不会出现两次子元素 的父元素 都为-1的情况
						if (i == 0) {
							forJ.$_PP = forD.parentNode; //		 forD.removeAttribute('e-for');
							forJ.$_PP.removeChild(forD);
						};
						i2++;
						while (i2 < L) {
							forArryTree[i2][1].$_P == forN ? (forArryTree[i2][1].$_PN = i3, i3++ , forCN.push(i2)) : null; //$_PN  该for循环在 父循环的自循环中的index
							i2++;
						};
						i2 = i3;
						while (i2--) {
							cP = forArryTree[forCN[i2]][2].parentNode;
							cP.removeChild(forArryTree[forCN[i2]][2]);
							forCP.push(cP);
						};
						build = resolveNode(forD);
						this.allNodes = build[1];
						attrFun(forD, forC, this.allNodes);
						this.goOnFlag = setHtml(forD, forC, this.allNodes);
						//		   	      	      	  	 debugger;
						//		   	      	      	  	if(this.goOnFlag)this.xunHuanDom(forD,forC,this.allNodes);
						if (this.goOnFlag) this.xunHuanDom(forD, forC, '');
						i3 ? forJ.$_CPN = [] : null; //forJ.$_CPN 子for循环的父元素位置信息;
						while (i3--) {
							forJ.$_CPN.push(getSameNode(forCP[i3], this.allNodes));// 这里用push 不用unshift  下面 domClone 里while 会颠倒反过来
						};
						forJ.$_DD = build[0];
						forJ.$_FD = forC;
						//		   	      	      	  	debugger;
						forCheck.push(forS);
						i++;
					};
					this.watcherForList[this.arrayCounts] = {};
					forC = null, forCP = null, forCN = null;
					this.forArryTree[this.arrayCounts] = forArryTree, forArryTree = null;
					this.cloneFlag = false;
				};

			};

			this.cloneFlag ? (attrFun(dom, pJson, this.allNodes), this.goOnFlag = setHtml(dom, pJson, this.allNodes)) : (attrFun(dom, pJson), this.goOnFlag = setHtml(dom, pJson));

		} else {

			attrFun(dom, pJson);
			this.goOnFlag = setHtml(dom, pJson);
		};
		this.cloneFlag ? setALL(dom, pJson, this.allNodes, setFlag, even, this.items, this.event, this.data) : setALL(dom, pJson, 0, setFlag, even, this.items, this.event, this.data);
		atr = dom.getAttribute('e-id');
		if (atr && cloned && !this.cloneFlag) {
			atr = atr.trim();
			dom.removeAttribute('e-id');
			if (atr) {  //this.reg.value.test(atr)
				this.items[atr] = dom;
			};
		};
		//			   	     debugger;
		return [pJson, fCounts, even];
	};
	Eng.prototype.forDomClone = function (arr) {
		var th = this, mD = forArrayMatch(arr, th.forCheckArray);//,th.forJsonTree //this.forNameData
		if (!mD) return;

		var data = th.json, json = th.data, i = 0, L = arr.length, cL, data2, wCDL = L - 1;
		L == 1 ? data2 = data : null;
		while (i < L) {
			data[arr[i]] ? data = data[arr[i]] : (data[arr[i]] = {}, data = data[arr[i]]);
			json = json[arr[i]];
			i == L - 2 ? data2 = data : null;
			i++;
		};
		L = json.length;
		//     0.9.3 中取消       
		//     if(isJsonOrArray(L)!=3)return;
		//     if(!L){
		//     	
		//     	return
		//     }
		var forN, forCN, forPN, forO, forA, forD, forDD, forCPN, wAA;
		forN = mD.n;
		forCN = mD.fn;
		if (th.forCheckArray[forCN].indexOf(arr[arr.length - 1]) == -1) return;
		forA = mD.pos;
		forO = th.forArryTree[forCN][forN][1];
		forD = forO.$_FD;
		forDD = forO.$_DD;
		forCPN = forO.$_CPN;
		forPN = forO.$_PN;
		if (forN) {
			L = forN;
			while (L--) {
				wAA = th.cacheForDoms[forCN][L];
				if (wAA) forA[L] = wAA.indexOf(Number(forA[L]));
			};
		};

		var wN = th.forArryTree[forCN][forN][0], wD, wF, wA, wCD, wNP, wAP, wStr = '$_' + forCN + forN + wN + $_join(forA, 1);

		if (th.watcherFor && th.watcherFor[wN]) {
			var wF = th.watcherFor[wN], wA = [], wAP, wD, W, X = arr.join('.') + '.' + (forA.length ? forA.join('.') + '.' : ''), Y, Z, rD;

			i = 0, L = json.length;
			while (i < L) {
				rD = null;
				wD = { $_allow: 1, $_data: json[i], $_forData: json, $_index: i, $_watcher: function (a) { rD = a }, $_pos: forA.concat(i), $_gIndex: forCN, $_gData: th.data, $_gWatcher: th.$_watcher, $_eng: th.items };
				wF(wD, this.forCache);
				if (rD) {
					for (wAP in rD) {
						Y = X + i + '.' + wAP, Z = rD[wAP], W = {}, W[Y] = Z;
						th.$_watcher(W);
					}
				};
				wD.$_allow ? wA.push(i) : null;
				i++;
			};
		};
		th.cacheForDoms[forCN][forN] = wA;
		var parent, pDoms, cDoms, pName, eDoms, childD;

		if (!th.watcherForList[forCN][wStr]) th.watcherForList[forCN][wStr] = { arrJ: [], cDoms: [], pDoms: [], eDoms: [] };  //arr:null
		wCD = th.watcherForList[forCN][wStr].arrJ;

		cDoms = th.watcherForList[forCN][wStr].cDoms;
		pDoms = th.watcherForList[forCN][wStr].pDoms;
		eDoms = th.watcherForList[forCN][wStr].eDoms
		childD = th.watcherForList[forCN][wStr].child;
		if (childD) {
			L = childD.length;
			wA ? (i = wA.length) : i = json.length;
			if (i < L) {
				delCacheChild(childD, th.watcherForList[forCN]);
			}

		};
		th.watcherForList[forCN][wStr].child = [];
		data2[arr[wCDL]] = {};
		data = data2[arr[wCDL]];
		if (forN) {
			i = forA.length;
			pName = '$_' + forCN + (forN - 1) + th.forArryTree[forCN][forN - 1][0] + $_join(forA, 1, i - 1);
			parent = th.watcherForList[forCN][pName].pDoms[forA[i - 1]][forPN];
			th.watcherForList[forCN][pName].child.push([wStr, forPN]);
		} else {
			parent = forO.$_PP;
		};


		var L2 = forCPN ? forCPN.length : 0, i2, forB, forJ, forCA, forF = 1;
		i = 0, L = wA ? wA.length : json.length, cL = cDoms.length;
		L >= cL ? i = cL : null;
		cL >= L ? (forF = 0, i = L, L = cL) : null;
		var eDCache;  ///////
		while (i < L) {
			if (forF) {
				forB = buildNode(forDD);
				cDoms.push(forB[0]);
				if (L2) {
					i2 = L2, forCA = [];
					while (i2--) {
						forCA.push(forB[1][forCPN[i2]]);
					};
					pDoms.push(forCA);
				};
				forJ = {};
				eDCache = [];
				eDoms.push(eDCache);
				cloneJSON(forJ, forD, forB[1], this.event, eDCache, this.items, this.data);
				wCD.push(forJ);
				parent.appendChild(forB[0]);
			} else {
				wCD.pop();
				eDoms.pop();
				parent.removeChild(cDoms.pop());
				pDoms.pop();
			};
			i++;
		};
		wA ? L = wA.length : L = wCD.length;
		while (L--) {
			cL = eDoms[L];
			i2 = cL.length;
			while (i2--) {
				cL[i2].$_data = json[wA ? wA[L] : L];
			};
			data[wA ? wA[L] : L] = wCD[L];
		}
		/* if(wA){
				 L=wA.length;
				 while(L--){
						cL=eDoms[L];
						i2=cL.length;
						while(i2--){
							  cL[i2].$_data=json[wA[L]];
						};
						 data[wA[L]]=wCD[L];
					   };
		 }else{
				 L=wCD.length;
				 
				 while(L--){	
						cL=eDoms[L];
						i2=cL.length;
						while(i2--){
							  cL[i2].$_data=json[L];
						};
						data[L]=wCD[L]
					   };
		 };*/
		//        say('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
		//        say(th.watcherForList);
		//        say(th.json);
		return wA;
	};
	//th.forJson(this.data , [] , 1);        正常的
	//th.forJson(data , [] , false , d , data); $_setToSelf();
	/*
												$_setToGlobal();
	 th.forJson(v.key , arr , false , null , null , data); //数据为 string,number或boolean
	 th.forJson(data[v.key] , arr , true);          //数据为json
	 * */
	//
	Eng.prototype.forJson = function (obj, kArr, setFlag, setData, setJson, filter, index, ix1, ix2) { // 逻辑 判断类型 存在冗余  以后改进 //passFlag
		var type = isJsonOrArray(obj), k, v, base = kArr, str, wA, i = 0, i2 = -1, iFlag, x1 = ix1, x2 = ix2;        //filter 过滤array;
		for (k in obj) {
			v = obj[k], wA = null, iFlag = 0;
			//					     		    if(filter)debugger;
			if (filter && k != filter[i]) continue;      //filter==wA
			if (index) { i2++ , x1 = i2, x2 = filter ? filter[i] : i };

			if (setFlag) type = isJsonOrArray(v, '44');
			kArr = $_copy(base, 0);
			kArr.push(k);
			str = $_join(kArr);
			if (type == 4 && setFlag == 1) {
				wA = this.forDomClone(kArr);
				iFlag = 1;
			};
			// debugger;
			setFlag ? this.bindKey(obj, k, $_copy(kArr, 0), str, type, x1, x2) : this.domCZ(kArr, setData, setJson);
			//filter,index 
			this.exclude[type] ? null : this.forJson(v, kArr, setFlag, setData, setJson, wA, iFlag, x1, x2);
			i++;
		};
		base = null, $i = null, kArr = null;
		return;
	};
	Eng.prototype.delteJson = function (o, o2) {
		var k, v, t;
		for (k in o) {
			v = o[k], t = isJsonOrArray(v);
			if (o2 && o2[k]) {
				o[k] = o2[k];
			} else {
				t == 5 ? this.delteJson(v) : o[k] = '';
			};
		};
		// 	    return o;
	};
	Eng.prototype.delteJson2 = function (o) { //??? 暂时未用
		var k, v, t;
		for (k in o) {
			v = o[k], t = isJsonOrArray(v);
			if (t == 5 || t == 4) {
				this.delteJson2(v);    // if(t=='json')t={};if(t=='array')t=[];
			} else {
				o[k] = '';
			};
			delete o[k];
		};
	};
	Eng.prototype.bindKey = function (obj, key, kArr, str, oType, x3, x4) {
		var v = obj[key], th = this, thType = oType, cache, fun, d = th.items, f, h;//j,p;
		var x1 = x3, x2 = x4;
		// 	    debugger;
		if (Eng.$_caller && th.watchMap && th.watchMap[str]) {
			fun = th.watchMap[str];
			delete th.watchMap[str];
			d.$_value = undefined, d.$_destroy = false;
			fun(undefined, v, d, th.forCache);
			d.$_value == undefined ? null : v = d.$_value;
			d.$_destroy ? fun = null : null;
		};
		// 	      console.log('var f  f=th.watchMap[str], f?fun=f:0;   和判断条件  这是0.9.2中的改动    其它js文件没有修改' );
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			set:function(s) {
				if (th.watchMap) {
					f = th.watchMap[str];
					if (f !== h) {
						fun = f;
						delete th.watchMap[str]
					}
				};
				if (v != s) {
					thType = isJsonOrArray(s);
					if (Eng.$_caller && fun) {
						d.$_value = undefined, d.$_destroy = false;
						fun(v, s, d, th.forCache);
						d.$_value === h ? null : s = d.$_value;
						d.$_destroy ? fun = h : null;
					};

					if (oType == 5) {
						thType != 5 ?(s=='updata'?s=Eng.newValue(v) :s = {}): 0,//  1.0 ADD ########
						th.delteJson(v, s);
						th.forJson(v, kArr, 1);
					} else if (oType == 4) {
						//	 th.addCache=1;
						thType != 4 ?(s=='updata'?s=Eng.newValue(v) :s = []): 0, //  1.0 ADD ########
							cache = $_copy(kArr, 0);
						th.delteJson2(v);
						v = s;
						// var wA=th.forDomClone(cache);
						th.forJson(v, cache, 1, null, null, th.forDomClone(cache), 1);;
						//	 th.addCache=0;
					} else {

						/*if(thType==5){
								j=Eng.widgets.indexOf(s);
								if(j>-1){
										 v=s,p=Eng.widgets[j+1],
										 d['$id_'+p.$_id]=p,
										 p['$id_'+d.$_id]=d,
										 j=d.$_relate,
										 j.indexOf(p.$_id)==-1?j.push(p.$_id):0
								}
						}*/
						//	 debugger;
						th.exclude[thType] ? (v = s, th.domCZ(kArr, null, null, x1, x2)) : null;

					};
					if (d.$_caller) d.$_caller = false;
				};
			},
			get:function() { return v }
		});
		th.exclude[thType] ? th.domCZ(kArr, null, null, x1, x2) : null;
		if (d.$_caller) d.$_caller = false;
	};
	Eng.prototype.domCZ = function (arr, setData, setJson, x1, x2) {
		// 	  say('domCZ  ==  '+arr);
		var data = this.getObjData(arr, setData, setJson, x1, x2);
		// 	    debugger;
		if (data)
			this.domWrite(data, arr, setJson);
	};
	Eng.prototype.getObjData = function (arr, setData, setJson, x1, x2) {
		if (!arr) return;
		var L = arr.length, i = 0, d, data = setData ? setData : this.json;//a,

		while (i < L) {
			if (!(data && arr)) return false;  //????????????????????????????貌似逻辑冗余
			data = data[arr[i]];
			if (i == L - 2) d = data;
			i++;
		};

		if (data && (data.$_index || data.$_value)) d = data;
		if (d) {
			this.$_index = x1;
			this.$_indexV = x2;
			// 	        	  a=$_copy(arr,0);
			a = arr;
			if (d.$_index) {
				// 	         	 	  a[L-1]='$_index';
				//直接 arr
				this.domWrite(d.$_index, a, setJson);
			};
			if (d.$_value) {
				// 	         	 	  a[L-1]='$_value';
				this.domWrite(d.$_value, a, setJson);
			};
		};
		return data;
	};
	Eng.prototype.domWrite = function (data, arr, setJson) {
		// 	          debugger;
		var L = data.length, obj, v;
		while (L--) {
			obj = data[L];
			// 	       	  debugger;
			if (obj.$_txtObj) obj.$_txtObj.textContent = this.writeString(arr, obj.$_dataIndex, obj.$_dataString, setJson);
			if (obj.$_atrObj) this.setAttr(obj.$_atrObj, arr, obj.$_atr, setJson);
			if (obj.$_htmlObj) obj.$_htmlObj.innerHTML = this.getKeyArrayValue(arr, arr[arr.length - 1], setJson);
			if (obj.$_input) {
				v = this.getKeyArrayValue(arr, arr[arr.length - 1], setJson, true);
				obj.$_input.value = v[0];
				obj.$_input.oninput = function () {
					//	   	       	  		   console.log('死循环');
					v[1][v[2]] = this.value;
				};
			};
			if (obj.$_change) {
				v = this.getKeyArrayValue(arr, arr[arr.length - 1], setJson, true);
				obj.$_change.value = v[0];
				obj.$_change.onchange = function () {
					//	   	       	  		   console.log('死循环');
					v[1][v[2]] = this.value;
				};
			};
		};
	};
	Eng.prototype.setAttr = function (obj, arr, arr2, setJson) {
		// 	debugger;
		var v = this.getKeyArrayValue(arr, arr2[0], setJson), atr = arr2[1], case2, c, c1, L = arr2.length, flag, y;
		switch (L) {
			case 2:
				flag = true, c = v;
				break;
			case 4:
				v ? flag = true : null;
				c = arr2[2], c1 = arr2[3];
				break;
			case 6:
				atr = arr2[2];
				case2 = arr2[1];
				case2 == 0 ? (v == arr2[3] ? flag = true : null) : null;
				case2 == 1 ? (v >= arr2[3] ? flag = true : null) : null;
				case2 == 2 ? (v <= arr2[3] ? flag = true : null) : null;
				case2 == 3 ? (v > arr2[3] ? flag = true : null) : null;
				case2 == 4 ? (v < arr2[3] ? flag = true : null) : null;
				c = arr2[4], c1 = arr2[5];
				break;
			default: return;
		};
		atr ? atr = atr.toLowerCase() : null;
		if (atr == 'class') y = ' ';
		if (atr == 'style') y = ';';
		if (L > 2 && y) {
			v = obj.getAttribute(atr);
			//            v?(v=v.replace(y+(flag?c1:c),'').trim()):null;
			v ? (v = v.replace(y + c1, '').replace(y + c, '').trim()) : null;
			v ? (v = v + y + (flag ? c : c1)) : (v = y + (flag ? c : c1));
			obj.setAttribute(atr, v);
		} else {
			obj.setAttribute(atr, flag ? c : c1);
		};
	};
	Eng.prototype.writeString = function (arr, arr1, arr2, setJson) {
		var L = arr1.length, cache, v, arr3 = $_copy(arr2, 0);
		while (L--) {
			cache = arr2[arr1[L]];
			v = this.getKeyArrayValue(arr, cache, setJson);
			arr3[arr1[L]] = v;
		};
		return $_join(arr3, 1);
	};
	Eng.prototype.getKeyArrayValue = function (arr, v, setJson, inputFlag, even) {
		// 	    say('getKeyArrayValue  arr='+arr+'  v='+v+'   setJson='+setJson)
		var arr = arr, L = arr.length, i = 0, c = setJson ? setJson : this.data, d = c;

		if (even) L++;
		if (v == '$_index') return this.$_index;
		// 	         debugger;
		while (i < L) {
			i != L - 1 ? c = c[arr[i]] : c = c[v];
			if (c == undefined) break;
			if (i == L - 2) d = c;
			i++;
		};

		if (v == '$_value') return d[this.$_indexV];
		c == undefined ? c = '' : null;
		if (inputFlag) return [c, d, v];
		// 	          say('c==='+c);
		return c;
	}

}());