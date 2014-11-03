/* P0liped FF Detection | GNU GPLv3 */
var p0FF = (function(document, window, undefined){
  "use strict";
  if(document.documentElement.style.MozAppearance === undefined) // CSS Appearance with "moz" prefix is available in all version starting from 2 (probably in lower than 2 aswell) to 36 (the latest release as of 03.11.2014)
	return;

  var 
	onlyLetters = /[^A-z]/, // regular expression matching all non-letter signs (it will be always true when something else than a letter occurs in the string)
	createHTMLElement = function(tag){ // function creating a HTML Element
	  if(typeof tag == "string" && !onlyLetters.test(tag))
		return document.createElement(tag); // returns created element you may work with using JavaScript
	},
	isHTMLElementSupported = function(tag){  // function checking whether a HTML Element with the given tag is recognized by the browser or not.
	  if(typeof tag == "string" && !onlyLetters.test(tag))
		return Object.prototype.toString.call(createHTMLElement(tag)) !== "[object HTMLUnknownElement]"; // if the browser doesn't recognize the tag, the element created is equal to HTMLUnknownElement 
	},
	isFunctionNative = function(){ // function checking if the function passed as an argument is native or not
	  var stripFunction = /.+ /; // regular expression which removes all signs until { occurs. I don't use Funcion.prototype.bind (it would be a better solution), because it's not supported in lower versions and a workaround would take 5-6 lines. If it's ok for you, let me know and I'll write a one with bind instead of this regular expression
	  return function(func){
		return func !== undefined && Function.prototype.toString.call(func).replace(stripFunction, "") === "{\n    [native code]\n}"; 
	  };
	}(),
	isCSSFeatureSupported = window.CSS && isFunctionNative(window.CSS.supports) ? function(){ // checks whether a given CSS feature is supported or not
	  return window.CSS.supports.apply(window.CSS, arguments); // using native method available in FF >= 22
	} : function(){ // fallback method used in FF < 22
	  var HTMLElement = document.createDocumentFragment().appendChild(createHTMLElement("div"));
	  return function(){
		HTMLElement.style.cssText = [].join.call(arguments, ":");
		return HTMLElement.style.cssText !== undefined && HTMLElement.style.cssText !== "";
	  };
	}(),
	allTests = {
	  35: function(){ 
		  try {
			String(Symbol("P0lip")) === "(\"Symbol(P0lip)\")"; 
			return true; 
		  } catch(e){
			return false;
		  }
		},
	  34: function(){
		  return isFunctionNative(Object.prototype.assign);
	  },
	  33: function(){
		return isCSSFeatureSupported("color", "rebeccapurple");
	  },
	  32: function(){
		return isCSSFeatureSupported("box-decoration-break", "clone");
	  },
	  31: function(){
		return isCSSFeatureSupported("--P0lip", "P0lip");
	  },
	  30: function(){ 
		try {
		  new Function('throw new Error()')();
		} catch (e) {
		  return /> Function:\d:\d/.test(e.stack);
		}
	  },
	  29: function(){
		return isCSSFeatureSupported("font-size", "4e3px"); 
	  },
	  28: function(){
		return isCSSFeatureSupported("flex-flow", "column wrap");
	  },
	  27: function(){
		return isCSSFeatureSupported("text-align", "unset"); 
	  },
	  26: function(){   
		return isCSSFeatureSupported("-moz-text-decoration-line", "blink");
	  },
	  25: function(){
		return isCSSFeatureSupported("background-attachment", "local");
	  },
	  24: function(){
		return isFunctionNative(String.prototype.repeat);
	  },
	  23: function (){
		  try{
			document.implementation.createHTMLDocument(); // JS: in 23 (and higher) the title argument is optional
			return true;
		  } catch(e){
			return false;
		  }
	  },
	  22: function(){ 
		return isHTMLElementSupported("data") && isHTMLElementSupported("time");
	  },
	  21: function(){
		return isCSSFeatureSupported("-moz-orient", "auto");
	  },
	  20: function(){ 
		return "download" in createHTMLElement("a") && "download" in createHTMLElement("area"); // HTML: Added support for "download" attribute in area and a elements.
	  },
	  19: function(){
		try{
		  document.createElement(null) === document.createElement("null"); // JS: When calling document.createElement(null), null will now be stringified and works like document.createElement("null").
		  return true;
		} catch(e){
		  return false;
		}
	  },
	  18: function(){
		return "reversed" in createHTMLElement("ol");
	  },
	  17: function(){
		return "sandbox" in createHTMLElement("iframe"); 
	  },
	  16: function(){ 
		return isHTMLElementSupported("meter");
	  },
	  15: function(){ 
		return "media" in createHTMLElement("source");
	  },
	  14: function(){
		try { // try, catch for FF 2
		  if(localStorage && localStorage.P0lip)
			localStorage.removeItem("P0lip"); // Remove P0lip key in case it already exists
		  return localStorage && localStorage.P0lip === undefined; // JS: It returns undefined instead of null like before.
		} catch(e){
		  return false;
		}
		
	  },
	  13: function(){
		try{
		  createHTMLElement("div").cloneNode();
		  return true;
		} catch(e){
		  return false;
		}
	  },
	  12: function(){
		return typeof ArrayBuffer !== "undefined" && isFunctionNative(ArrayBuffer.prototype.slice);
	  },
	  11: function(){
		return "muted" in createHTMLElement("audio") && "loop" in createHTMLElement("audio");
	  },
	  10: function(){
		return typeof document.mozHidden == "boolean" && typeof document.mozVisibilityState == "string" && typeof document.mozFullScreenEnabled == "boolean";
	  },
	  9: function(){
		return isCSSFeatureSupported("text-overflow", "clip clip");
	  },
	  8: function(){
		return window.getSelection() === document.getSelection();
	  },
	  7: function(){
		return isCSSFeatureSupported("text-overflow", "clip");
	  },
	  6: function(){ 
		return isHTMLElementSupported("progress"); // HTML: Added support for progress element.
	  },
	  5: function(){ 
		return typeof XMLHttpRequest != 'undefined' && "onloadend" in new XMLHttpRequest();
	  },
	  4: function(){ 
		return isHTMLElementSupported("article") && isHTMLElementSupported("section"); // HTML: new elements are supported <article>, <section>, <nav>, <aside>, <hgroup>, <header> and <footer>.
	  },
	  3.6: function(){
		return isCSSFeatureSupported("font-size", "1rem"); // CSS: Added support for rem units
	  },
	  3.5: function(){
		return typeof localStorage != "undefined" && Object.prototype.toString.call(localStorage) === "[object Storage]"; // JS: Added support for localStorage
	  },
	  3: function(){
		return isFunctionNative(document.hasFocus);
	  },
	  2: function(){ // isFunctionNative
		return typeof window.sidebar == "object" && typeof window.sidebar.addMicrosummaryGenerator == "function"; // JS: Added support for microsummary generator. (Microsummary support was removed in Gecko 6.0)
	  }
	};
	
	var order = function(){
	  function sortNumbers(a, b){
		return b - a;
	  }
	  if(isFunctionNative(Object.keys)) // it's available in FF >= 4, 
		return Object.keys(allTests).sort(sortNumbers);
	  else { // we could assume the version number isn't higher than 4, but that might be tricky, as someone might have overwritten Object.keys and the statement above could be false.
		var result = [], prop;
		for(prop in allTests)
		  result.push(prop);
		return result.sort(sortNumbers);
	  }
	}();
	var result = false;
	order.forEach(function(number, n){
	  if(result)
		return false;
	  if(allTests[number]() && (n !== 0 ? !allTests[order[n-1]]() : true))
		result = number;
	});
	return result;

})(document, window);
