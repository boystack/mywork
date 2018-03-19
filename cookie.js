(function($){
	function encode(s) {
		return encodeURIComponent(s);
	}

	function decode(s) {
		return decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		//如果不是字符串就认为json并转换成字符串
		return encode(typeof value !== 'string' ? JSON.stringify(value) : String(value));
	}
	//设置cookie值内容
	expiredays = 2 //cookie时间默认2小时，以小时为单位
	$.setCookie=function(c_name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getTime()+expiredays*60*60*1000)
		document.cookie=c_name+ "=" +stringifyCookieValue(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	};
	
	//获取cookie值内容
	$.getCookie=function(c_name){
//		return unescape(document.cookie);
		if (document.cookie.length>0){
			if(c_name === undefined){
				return decode(document.cookie)
			}
		    c_start=document.cookie.indexOf(c_name + "=")
		    if (c_start!=-1){ 
		        c_start=c_start + c_name.length+1 
		        c_end=document.cookie.indexOf(";",c_start)
			    if (c_end==-1) c_end=document.cookie.length
			    return decode(document.cookie.substring(c_start,c_end))
			} 
		  }
		return undefined
	};
	//删除cookie
	$.removeCookie=function(c_name){
		if ($.getCookie(c_name) === undefined) {
			return false;
		}
		$.setCookie(c_name, "", -1); 
	};
})(jQuery)