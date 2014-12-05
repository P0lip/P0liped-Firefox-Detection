/* P0liped Firefox Detection 1.0 | GNU GPLv3 */

/* I'd like to thank @Ginden (you can find him on GitHub) for his function, detecting the native of function (my function "isFunctioNative" was forked from his amazing project https://github.com/Ginden/reflect-helpers/blob/master/reflect-helpers.js). */

/**
 * @return {Number} The version of Firefox or {Undefined}.
 */
window.p0FFx = (function(document, window, undefined){ 
  "use strict"; // Strict pragma.
 
  // CSS' Appearance with "moz" prefix is available in all version starting from 1 -> https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance#Browser_compatibility
  if(document.documentElement.style.MozAppearance === undefined) // True when the browse isn't Firefox.
    return; 
  
  var  
    /** Function creating a HTML Element
     * @param {String} A HTML tag
     * @return {HTML(?:XYZ)*Element} where XYZ is the proper HTMLElement for given tag (when recognized by the browser), e.g HTMLDivElement or HTMLElement , otherwise HTMLUnknownElement.
     */
    createHTMLElement = function(){ 
      var onlyLetters = /[^A-z]/; // Regular expression matching all non-letter signs (always true when something else than a letter occurs in the string).
      return function(tag){
        return document.createElement(typeof tag == "string" && !onlyLetters.test(tag) ? tag : "p0lip");
      };
    }(),
                
    /** Function that checks whether a HTML Element with the given tag is recognized by the browser.
     *  When the browser doesn't recognize the element, the result of Object.prototype.toString call is always a {String} "HTMLUnknownElement".
     * @param {String} A HTML tag.
     * @return {Boolean} True when supported, otherwise false.
     */
    isHTMLElementSupported = function(){  
      var toString = Object.prototype.toString; // We cache this function as a local variable for futher use.
      return function(tag){
        return toString.call(createHTMLElement(tag)) !== "[object HTMLUnknownElement]"; 
      };
    }(),
   
    /** Function checking if the function passed as an argument is native or not. 
     * @param {Function} We pass a function as an argument.
     * @return {Boolean} True when native.
     */
    isFunctionNative = function(){ 
      var toString = Function.prototype.toString, // We cache this function as a local variable for further use.
      bind = Function.prototype.bind && function(){
        try { 
          new Function("return (" + Function.prototype.bind + ")");
          return false;
        } catch (e) {
          return true;
      }}();
      return function isNative(func){
        if(func === undefined)
          return false;
        var sourceCode = toString.call(func);
        if(bind && sourceCode === toString.call(func.bind(null)))
          return true;
        try { 
          new Function("return (" + sourceCode + ")");
          return false;
        } catch (e) {
          return true;
        }
      };
    }(),

    /** Checks whether a given CSS feature is supported or not. 
     * @param {String} CSS property
     * @param {String} CSS value
     * @return {Boolean} True when supported, otherwise false.
     */ 
    isCSSFeatureSupported = window.CSS && isFunctionNative(window.CSS.supports) ? function(){ 
      var cssSupports = window.CSS.supports, thisArg = window.CSS;
      return function(){
        return cssSupports.apply(thisArg, arguments); // Using the native method which is available in FF >= 22
      };
    }() : function(){ // Fallback method used for FF < 22. If you consider using it in your code, you should notice it may not work properly in Internet Explorer. My tip: you'd better try - HTMLElement.style[type] = value - instead of cssText.
      var HTMLElement = document.createDocumentFragment().appendChild(createHTMLElement("div")), // We create a document fragment and then append a DIV element. It's optional, but I do it for sanitization reasons.
      join = [].join;
      return function(){
        HTMLElement.style.cssText = join.apply(arguments, [":"]);
        return HTMLElement.style.cssText !== undefined && HTMLElement.style.cssText !== "";
      };
    }(),
                
    /**
     * @return {Boolean} Each test returns a boolean.
     */
    allTests = {
      /*
       * Most of features/bugs (also other added features) may be found here https://developer.mozilla.org/en-US/Firefox/Releases/XX -> XX stands for version number.
       * To each test I added (or will add) some extra tests you may use, but remember to test them on your own. 
       */
      
      34: function(){ return isFunctionNative(Object.assign) },
      33: function(){ return isCSSFeatureSupported("color", "rebeccapurple"); }, // Added support for rebeccapurple, a new <color> name defined in CSS Colors level 4 https://bugzilla.mozilla.org/show_bug.cgi?id=1024642
       /* Additional tests for 33:
        * isFunctionNative(window.CSSCounterStyleRule) -> Implemented @counter-style rule https://bugzilla.mozilla.org/show_bug.cgi?id=966166 
        * isCSSFeatureSupported("list-type-style", "mongolian") -> Added support for mongolian, disclosure-open and disclosure-closed counter styles in list-style-type https://bugzilla.mozilla.org/show_bug.cgi?id=982355
        * isFunctionNative(window.DOMMatrix) -> The DOMMatrix has been added -> https://bugzilla.mozilla.org/show_bug.cgi?id=1018497 
        */

      32: function(){ return isCSSFeatureSupported("box-decoration-break", "clone"); },
      31: function(){ return isCSSFeatureSupported("--P0lip", "P0lip"); },
      30: function(){ 
        try {
          new Function('throw new Error()')();
        } catch (e) {
          return /> Function:\d:\d/.test(e.stack);
        }
      },
      29: function(){ return isCSSFeatureSupported("font-size", "4e3px"); },
      28: function(){ return isCSSFeatureSupported("flex-flow", "column wrap"); },
      27: function(){ return isCSSFeatureSupported("text-align", "unset"); },
      26: function(){ return isCSSFeatureSupported("-moz-text-decoration-line", "blink"); },
      25: function(){ return isCSSFeatureSupported("background-attachment", "local"); },
      24: function(){ return isFunctionNative(String.prototype.repeat); },
      23: function (){
        try{
          document.implementation.createHTMLDocument(); // JS: in 23 (and higher) the title argument is optional
          return true;
        } catch(e){
          return false;
        }
      },
      22: function(){ return isHTMLElementSupported("data") && isHTMLElementSupported("time"); },
      21: function(){ return isCSSFeatureSupported("-moz-orient", "auto"); },
      20: function(){ return "download" in createHTMLElement("a") && "download" in createHTMLElement("area"); },  // HTML: Added support for "download" attribute in area and a elements.
      19: function(){
        try{
          if(document.createElement(null) === document.createElement("null")) // JS: When calling document.createElement(null), null will now be stringified and works like document.createElement("null").
            return true;
        } catch(e){
          return false;
        }
      },
      18: function(){ return "reversed" in createHTMLElement("ol"); },
      17: function(){ return "sandbox" in createHTMLElement("iframe"); },
      16: function(){ return isHTMLElementSupported("meter"); },
      15: function(){ return "media" in createHTMLElement("source"); },
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
      12: function(){ return typeof window.ArrayBuffer !== "undefined" && isFunctionNative(window.ArrayBuffer.prototype.slice); },
      11: function(){ return "muted" in createHTMLElement("audio") && "loop" in createHTMLElement("audio"); },
      10: function(){ return typeof document.mozHidden == "boolean" && typeof document.mozVisibilityState == "string" && typeof document.mozFullScreenEnabled == "boolean"; },
      9: function(){ return isCSSFeatureSupported("text-overflow", "clip clip"); },
      8: function(){ return window.getSelection() === document.getSelection(); },
      7: function(){ return isCSSFeatureSupported("text-overflow", "clip"); },
      6: function(){ return isHTMLElementSupported("progress"); }, // HTML: Added support for progress element.
      5: function(){ return typeof window.XMLHttpRequest != 'undefined' && "onloadend" in new window.XMLHttpRequest(); },
      4: function(){ return isHTMLElementSupported("section"); },
      3.6: function(){ return isCSSFeatureSupported("font-size", "1rem"); },
      3.5: function(){ return typeof window.localStorage != "undefined" && Object.prototype.toString.call(window.localStorage) === "[object Storage]"; }, // JS: Added support for localStorage
      3: function(){ return isFunctionNative(document.hasFocus); },
      2: function(){
        return typeof window.sidebar == "object" && typeof window.sidebar.addMicrosummaryGenerator == "function"; // JS: Added support for microsummary generator. (Microsummary support was removed in Gecko 6.0)
      }
    };
  
  // The Object.keys method is available in FF >= 4.
  var order = isFunctionNative(Object.keys) ? Object.keys : function(tests){
    var keys = [], prop;
    for(prop in tests)
      keys.push(prop);
    return keys;
  },
  version;

  order(allTests).sort(function (a, b){ return b - a; }).forEach(function(number, i, order){
    if(version)
      return false;
    if(allTests[number]() && (i !== 0 ? !allTests[order[i-1]]() : true))
      version = number;
    
  });
  
  return +version; // We make sure the result will be a number.
            
})(document, window);
