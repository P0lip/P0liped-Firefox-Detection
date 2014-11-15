/* P0liped FF Detection 1.0 | GNU GPLv3 
Last update: 10.11.2014 
I'd like to thank @Ginden (you can find him on GitHub) for his help with detecting native functions (isFunctioNative was forked from his amazing project). */
var p0FF = (function(document, window, undefined){ // It returns a number with proper version of Firefox.
  "use strict";
  if(document.documentElement.style.MozAppearance === undefined) // CSS Appearance with "moz" prefix is available in all version starting from 2 (probably in lower than 2 aswell) to 36 (the latest release as of 10.11.2014)
	return;

  var 
	onlyLetters = /[^A-z]/, // Regular expression matching all non-letter signs (always true when something else than a letter occurs in the string).
	createHTMLElement = function(tag){ // Function creating a HTML Element
	  return document.createElement(typeof tag == "string" && !onlyLetters.test(tag) ? tag : "p0lip"); // Returns the created element you may work with using JavaScript
	},
	isHTMLElementSupported = function(){  // Function that checks whether a HTML Element with the given tag is recognized by the browser or not. Returns a boolean.
	  var toString = Object.prototype.toString; // We cache this function as a local variable for futher use.
	  return function(tag){
		toString.call(createHTMLElement(tag)) !== "[object HTMLUnknownElement]"; // When the browser doesn't recognize the element, it's always treated as HTMLUnknownElement.
	  };
	}(),
	isFunctionNative = function(){ // Function checking if the function passed as an argument is native or not. Returns a boolean.
	  var toString = Function.prototype.toString; // We cache this function as a local variable for further use.
	  return function(func){ // Forked from https://github.com/Ginden/reflect-helpers/blob/master/reflect-helpers.js. All rights belong to the author - Michał Wada aka @Ginden. I advise you to watch his outstanding stuff.
		if(func === undefined)
		  return false;
		try { 
		  Function("return (" + toString.call(func) + ")");
		  return false;
		} catch (e) {
		  return true;
		}
	  };
	}(),
	isCSSFeatureSupported = window.CSS && isFunctionNative(window.CSS.supports) ? function(){ // Checks whether a given CSS feature is supported or not. Returns a boolean.
	  return window.CSS.supports.apply(window.CSS, arguments); // Using native method which is available in FF >= 22
	} : function(){ // Fallback method used by me for FF < 22. If you consider using it as in your feature detection code, notice it may not work properly in Internet Explorer. My tip: you'd better try HTMLElement.style[type] = value instead of cssText.
	  var HTMLElement = document.createDocumentFragment().appendChild(createHTMLElement("div")); // We create a document fragment and then append a DIV element. It's optional, but I do it for sanitization reasons.
	  return function(){
		HTMLElement.style.cssText = [].join.call(arguments, ":");
		return HTMLElement.style.cssText !== undefined && HTMLElement.style.cssText !== "";
	  };
	}(),
	allTests = { // Each test returns a boolean. 
	  // Notice that 34, 35, 36 are currently in Beta, Aurora (which was actually renamed to Dev), Nightly stage, so you should assume that the result may be false. Just uncomment these 3 tests when you don't need them.
	  /*36: function(){ // In 36 version the method of DOMMatrix object returns the proper CSS value for transforms instead of "[object DOMMatrix]".
		try {
		  return new window.DOMMatrix().toString() === "matrix(1, 0, 0, 1, 0, 0)";
		} catch (e){
		  return false;
		}
	  },
	  35: function(){ 
		return isFunctionNative(Element.prototype.closest);
	  },
	  34: function(){
		  return isFunctionNative(String.prototype.raw) || isFunctionNative(String.raw);
	  },*/
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
	  function sortNumbers(a, b){ // Function that sorts number from highest to lowest.
		return b - a;
	  }
	  if(isFunctionNative(Object.keys)) // It's available in FF >= 4, 
		return Object.keys(allTests).sort(sortNumbers);
	  else { // We could assume the version number isn't higher than 4 (and iterate only last 4 tests), but that might be tricky, as someone might have overwritten Object.keys and the statement above could be false.
		var result = [], prop;
		for(prop in allTests)
		  result.push(prop);
		return result.sort(sortNumbers);
	  }
	}();
	var result;
	order.forEach(function(number, i){
	  if(result)
		return false;
	  if(allTests[number]() && (i !== 0 ? !allTests[order[i-1]]() : true))
		result = number;
	});
	return +result;

})(document, window);
