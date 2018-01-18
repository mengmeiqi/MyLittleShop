/**
 *  ����Ԫ�ص�id����Ԫ�ض���
 */
function id(sId){
    return document.getElementById(sId);
}

/**
 *  ����Ԫ�صı�ǩ����Ԫ�ض���
 */
function tag(sTagName, context){
    context = context || document;
    return context.getElementsByTagName(sTagName);
}

/**
 * ����Ԫ�ص�class����Ԫ��
 * @param className ���ҵ��������
 * @param context ���ҵķ�Χ
 * @param tag �޶��ı�ǩ��
 */
function getByClass(className, context, tag){
    var aResult = [];
    context = context || document;//�������context��������ʹ�øò���������Ĭ��document
    if(document.getElementsByClassName && !tag){
        return context.getElementsByClassName(className);
    }

    tag = tag || '*';//�������tag��������ʹ�øò���������Ĭ�������б�ǩ
    var aElem = context.getElementsByTagName(tag);
    for(var i=0; i<aElem.length; i++){
        //if(aElem[i].className == className){
        var re = new RegExp("\\b" + className + "\\b");
        if( re.test(aElem[i].className) ){//ʹ���������жϵ�ǰԪ�ص�className���Ƿ����ָ����className
            aResult.push(aElem[i]);
        }
    }

    return aResult;
}

/**
 * ʹ������jQuery��$������Ϊѡ�����ĺ�����
 */
/*function $(selector, context){
 switch(selector.charAt(0)){
 case '#':
 return [id(selector.substring(1))];
 break;
 case '.':
 return getByClass(selector.substring(1), context);
 break;
 default:
 return tag(selector, context);
 }
 }*/

/**
 * �޸Ļ��ȡһ��Ԫ�ص�����
 * @param elem Ҫ�޸ĵ�Ԫ�ض���
 * @param name ������
 * @param value ����ֵ
 */
function attr(elem, name, value) {
    // Make sure that a valid name was provided
    if ( !name || name.constructor != String ) return '';
    // Figure out if the name is one of the weird naming cases
    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;
    // If the user is setting a value, also
    if ( value != null ) {
        // Set the quick way first
        elem[name] = value;
        // If we can, use setAttribute
        if ( elem.setAttribute )
            elem.setAttribute(name,value);
    }
    // Return the value of the attribute
    return elem[name] || elem.getAttribute(name) || '';
}

/**
 * �޸Ļ��ȡһ��Ԫ�ص�value
 * @param elem Ҫ�޸ĵ�Ԫ�ض���
 * @param value value���Ե�ֵ
 */
function val(elem, value){
    if(!value) return elem.value || "";

    if(typeof value != "string"
        && typeof value != "number"
        && typeof value != "boolean")
        return "";
    elem.value = value;
}

/**
 * �޸Ļ��ȡһ��Ԫ�ص���ʽ
 * @param elem Ҫ�޸ĵ�Ԫ�ض���
 * @param name ������
 * @param value ����ֵ
 */
function css(elem, attr, value){
    if(!elem || typeof elem != "object") return;
    if(arguments.length == 2){
        if(typeof attr == "string"){
            return _getStyle(elem, attr);//elem.style[attr];
        }else if(typeof attr == "object"){
            for(prop in attr){
                setCss(prop, attr[prop]);
                // elem.style[prop] = attr[prop];
            }
        }
    }else if(arguments.length == 3){
        setCss(attr, value);
    }

    function setCss(attr, value){
        switch(attr){
            case 'width':
            case 'height':
            case 'padding':
            case 'paddingLeft':
            case 'paddingRight':
            case 'paddingTop':
            case 'paddingBottom':
                value = /\%/.test(value)?value:Math.max(parseInt(value), 0) + 'px';
                break;
            case 'left':
            case 'top':
            case 'bottom':
            case 'right':
            case 'margin':
            case 'marginLeft':
            case 'marginRight':
            case 'marginTop':
            case 'marginBottom':
                value = /\%/.test(value)?value:parseInt(value) + 'px';
                break;
        }
        elem.style[attr] = value;
    }
}

function _getStyle( elem, name ) {//text-align, textAlign
    // If the property exists in style[],
    //   then it��s been set recently (and is current)
    //�Ƚ�text-align => textAlign
    name = name.replace(/-[a-z]/g, function(word){
        return word.substring(1).toUpperCase();
    });

    if (elem.style[name])
        return elem.style[name];

    // Otherwise, try to use IE��s method
    else if (elem.currentStyle)
        return elem.currentStyle[name];

    // Or the W3C��s method, if it exists
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        // It uses the traditional ��text-align�� style of rule writing,
        //   instead of textAlign
        name = name.replace(/([A-Z])/g, "-$1");// textAlign =>  text-Align
        name = name.toLowerCase(); //text-Align => text-align

        // Get the style object and get the value of the property (if it exists)
        var s = document.defaultView.getComputedStyle(elem,"");
        return s && s.getPropertyValue(name);

        // Otherwise, we��re using some other browser
    } else
        return null;
}

/**
 * ΪԪ�����class
 * @param elem Ҫ�޸ĵ�Ԫ�ض���
 * @param className Ҫ��ӵ�����
 */
function addClass(elem, className){
    if(!elem || typeof className != "string") return;

    if(hasClass(elem, className)) return;

    elem.className = elem.className + " " + className;
}


/**
 * �ж�Ԫ���Ƿ����ָ����class
 * @param elem Ҫ���ҵ�Ԫ�ض���
 * @param className Ҫ�жϵ�����
 */
function hasClass(elem, className){
    var re = new RegExp("\\b" + className + "\\b");
    return re.test(elem.className);
}

/**
 * ΪԪ���Ƴ�class
 * @param elem Ҫ�޸ĵ�Ԫ�ض���
 * @param className Ҫ�Ƴ�������
 */
function removeClass(elem, className){
    if(!elem || typeof className != "string") return;

    // if(!hasClass(elem, className)) return;
    var re = new RegExp("\\b" + className + "\\b");
    elem.className = trim(elem.className.replace(re, ""));
}

/**
 * Ϊָ���ַ���ȥ��β�ո�
 * @param str ��Ҫȥ���ո��ԭ�ַ���
 */
function trim(str){
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * ��ȡָ��Ԫ�صĸ߶�
 * @param elem Ԫ�ض���
 * @return Ԫ�صĸ߶ȣ�������λ
 */
function getHeight(elem){
    return parseInt(_getStyle(elem, 'height'));
}

/**
 * ��ȡָ��Ԫ�صĿ��
 * @param elem Ԫ�ض���
 * @return Ԫ�صĿ�ȣ�������λ
 */
function getWidth(elem){
    return parseInt(_getStyle(elem, 'width'));
}

/**
 * ��ȡָ��Ԫ�ص������ĸ߶�
 * @param elem Ԫ�ض���
 * @return Ԫ�صĸ߶ȣ�������λ
 */
// Find the full, possible, height of an element (not the actual,
// current, height)
function fullHeight( elem ) {
    // If the element is being displayed, then offsetHeight
    // should do the trick, barring that, getHeight() will work
    if ( _getStyle( elem, 'display' ) != 'none' )
        return elem.offsetHeight || getHeight( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    // Figure out what the full height of the element is, using clientHeight
    // and if that doesn't work, use getHeight
    var h = elem.offsetHeight || getHeight( elem );
    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full height of the element
    return h;
}

// Find the full, possible, width of an element (not the actual,
// current, width)
function fullWidth( elem ) {
    // If the element is being displayed, then offsetWidth
    // should do the trick, barring that, getWidth() will work
    if ( _getStyle( elem, 'display' ) != 'none' )
        return elem.offsetWidth || getWidth( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });

    // Figure out what the full width of the element is, using clientWidth
    // and if that doesn't work, use getWidth
    var w = elem.offsetWidth || getWidth( elem );

    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full width of the element
    return w;
}


// A function used for setting a set of CSS properties, which
// can then be restored back again later
function resetCSS( elem, prop ) {
    var old = {};

    // Go through each of the properties
    for ( var i in prop ) { //1.display
        // Remember the old property value
        old[ i ] = elem.style[ i ];

        // And set the new value
        elem.style[ i ] = prop[i];
    }

    // Retun the set of changed values, to be used by restoreCSS
    return old;
}

// A function for restoring the side effects of the resetCSS function
function restoreCSS( elem, prop ) {
    // Reset all the properties back to their original values
    for ( var i in prop )
        elem.style[ i ] = prop[ i ];
}

/**
 * ��ȡ������������߶�
 * @return ������������߶ȣ�������λ
 */
// Find the height of the viewport
function windowHeight() {
    // A shortcut, in case we��re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerHeight of the browser is available, use that
    return self.innerHeight ||

            // Otherwise, try to get the height off of the root node
        ( de && de.clientHeight ) ||

            // Finally, try to get the height off of the body element
        document.body.clientHeight;
}

/**
 * ��ȡ��������������
 * @return �������������ȣ�������λ
 */
function windowWidth() {
    // A shortcut, in case we��re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerWidth of the browser is available, use that
    return self.innerWidth ||

            // Otherwise, try to get the width off of the root node
        ( de && de.clientWidth ) ||

            // Finally, try to get the width off of the body element
        document.body.clientWidth;
}

/**
 * ��ȡҳ���ʵ�ʸ߶�
 * @return ������������߶ȣ�������λ
 */
// Returns the height of the web page
// (could change if new content is added to the page)
function pageHeight() {
    return document.body.scrollHeight;
}

/**
 * ��ȡҳ���ʵ�ʶȿ��
 * @return �������������ȣ�������λ
 */
// Returns the width of the web page
function pageWidth() {
    return document.body.scrollWidth;
}

/**
 * ��ȡԪ��������������ߵľ���
 * @return ������λ
 */
// Find the X (Horizontal, Left) position of an element
function pageX(elem) {
    var p = 0;

    // We need to add up all of the offsets for every parent
    while ( elem.offsetParent ) {
        // Add the offset to the current count
        p += elem.offsetLeft;

        // and continue on to the next parent
        elem = elem.offsetParent;
    }

    return p;
}

// Find the Y (Vertical, Top) position of an element
function pageY(elem) {
    var p = 0;

    // We need to add up all the offsets for every parent
    while ( elem.offsetParent ) {
        // Add the offset to the current count
        p += elem.offsetTop;

        // and continue on to the next parent
        elem = elem.offsetParent;
    }

    return p;
}

/**
 * ��ȡԪ�ص�css���õ�left
 * @return ������λ
 */
// Find the left position of an element
function posX(elem) {
    // Get the computed style and get the number out of the value
    return parseInt( _getStyle( elem, "left" ) );
}

// Find the top position of an element
function posY(elem) {
    // Get the computed style and get the number out of the value
    return parseInt( _getStyle( elem, "top" ) );
}

/**
 * ��ȡԪ������ڸ�Ԫ����ߵľ���
 * @return ������λ
 */
// Find the horizontal positioing of an element within its parent
function parentX(elem) {
    // If the offsetParent is the element��s parent, break early
    return elem.parentNode == elem.offsetParent ?
        elem.offsetLeft :

        // Otherwise, we need to find the position relative to the entire
        // page for both elements, and find the difference
    pageX( elem ) - pageX( elem.parentNode );
}

// Find the vertical positioing of an element within its parent
function parentY(elem) {
    // If the offsetParent is the element��s parent, break early
    return elem.parentNode == elem.offsetParent ?
        elem.offsetTop :

        // Otherwise, we need to find the position relative to the entire
        // page for both elements, and find the difference
    pageY( elem ) - pageY( elem.parentNode );
}

/**
 * ��ȡ��������ҳ����ߵľ���
 * @return ������λ
 */
// Find the horizontal position of the cursor
function getX(e) {
    // Normalize the event object
    e = e || window.event;

    // Check for the non-IE position, then the IE position, and finally return 0
    return e.pageX || e.clientX + scrollX() || 0;
}

// Find the vertical position of the cursor
function getY(e) {
    // Normalize the event object
    e = e || window.event;

    // Check for the non-IE position, then the IE position, and finally return 0
    return e.pageY || e.clientY + scrollY() || 0;
}


// A function for setting the horizontal position of an element
function _setX(elem, pos) {
    // Set the ��left�� CSS property, using pixel units
    elem.style.left = pos + "px";
}

// A function for setting the vertical position of an element
function _setY(elem, pos) {
    // Set the ��left�� CSS property, using pixel units
    elem.style.top = pos + "px";
}

/**
 * Ϊָ����Ԫ�����ָ���ľ���
 */
// A function for adding a number of pixels to the horizontal
// position of an element
function addX(elem,pos) {
    // Get the current horz. position and add the offset to it.
    _setX( posX(elem) + pos );
}

// A function that can be used to add a number of pixels to the
// vertical position of an element
function addY(elem,pos) {
    // Get the current vertical position and add the offset to it
    _setY( posY(elem) + pos );
}

/**
 * ��ȡ�����ˮƽ�������ľ���
 * @return ������λ
 */
// A function for determining how far horizontally the browser is scrolled
function scrollX() {
    // A shortcut, in case we��re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the pageXOffset of the browser is available, use that
    return self.pageXOffset ||

            // Otherwise, try to get the scroll left off of the root node
        ( de && de.scrollLeft ) ||

            // Finally, try to get the scroll left off of the body element
        document.body.scrollLeft;
}

// A function for determining how far vertically the browser is scrolled
function scrollY() {
    // A shortcut, in case we��re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the pageYOffset of the browser is available, use that
    return self.pageYOffset ||

            // Otherwise, try to get the scroll top off of the root node
        ( de && de.scrollTop ) ||

            // Finally, try to get the scroll top off of the body element
        document.body.scrollTop;
}


/**
 * ��ȡ���������¼�Դ����ߵľ���
 * @return ������λ
 */

// Get the X position of the mouse relative to the element target
// used in event object ��e��
function getElementX( e ) {
    // Find the appropriate element offset
    return ( e && e.layerX ) || window.event.offsetX;
}

// Get the Y position of the mouse relative to the element target
// used in event object ��e��
function getElementY( e ) {
    // Find the appropriate element offset
    return ( e && e.layerY ) || window.event.offsetY;
}


/**
 * ��ָ���ĸ�Ԫ���������Ԫ�أ���Ԫ�ؿ����Ǵ��ı�
 */
function append( parent, elem ) {
    // Get the array of elements
    var elems = checkElem( elem );

    // Append them all to the element
    for ( var i = 0; i < elems.length; i++ ) {
        parent.appendChild( elems[i] );
    }
}


/**
 * ��ָ����Ԫ��ǰ�������Ԫ�أ���Ԫ�ؿ����Ǵ��ı�
 * @param parent ��Ԫ��
 * @param before �Ѵ��ڵ�Ԫ��
 * @param elem ����ӵ�Ԫ��
 */
function before( parent, before, elem ) {
    // Check to see if no parent node was provided
    if ( elem == null ) {
        elem = before;
        before = parent;
        parent  = before.parentNode;
    }

    // Get the new array of elements
    var elems = checkElem( elem );

    // Move through the array backwards,
    // because we��re prepending elements
    for ( var i = elems.length - 1; i >= 0; i-- ) {
        parent.insertBefore( elems[i], before );
    }
}


/**
 * ��ָ���Ĳ���ת����һ�������ЧdomԪ�ص�����
 */
function checkElem(a) {
    var r = [];
    // Force the argument into an array, if it isn��t already
    if ( a.constructor != Array )
        a = [ a ];//["<p>1111</p><strong>2222</strong>"]

    for ( var i = 0; i < a.length; i++ ) {
        // If there��s a String
        if ( a[i].constructor == String ) {
            // Create a temporary element to house the HTML
            var div = document.createElement("div");

            // Inject the HTML, to convert it into a DOM structure
            div.innerHTML = a[i];// <p>1111<strong>2222</strong></p>

            // Extract the DOM structure back out of the temp DIV
            for ( var j = 0; j < div.childNodes.length; j++ )
                r[r.length] = div.childNodes[j];
        } else if ( a[i].length ) { // If it��s an array
            // Assume that it��s an array of DOM Nodes
            for ( var j = 0; j < a[i].length; j++ )
                r[r.length] = a[i][j];
        } else { // Otherwise, assume it��s a DOM Node
            r[r.length] = a[i];
        }
    }
    return r;
}

/**
 * ��dom�ṹ���Ƴ�ָ��Ԫ��
 */
// Remove a single Node from the DOM
function remove( elem ) {
    if ( elem ) elem.parentNode.removeChild( elem );
}


/**
 * ���ָ��Ԫ���µ������ӽڵ�
 * @param elem ��Ҫ��յ�Ԫ��
 */
// Remove all of an Element��s children from the DOM
function empty( elem ) {
    while ( elem.firstChild )
        remove( elem.firstChild );
}

/**
 * �޸Ļ򷵻�ָ��Ԫ�ص�Ԫ������
 */
function text(e, txt) {

    if(!txt){
        var t = "";

        // If an element was passed, get it��s children,
        // otherwise assume it��s an array
        e = e.childNodes || e;

        // Look through all child nodes
        for ( var j = 0; j < e.length; j++ ) {
            // If it��s not an element, append its text value
            // Otherwise, recurse through all the element��s children
            t += e[j].nodeType != 1 ?
                e[j].nodeValue : text(e[j].childNodes);
        }

        // Return the matched text
        return t;
    }

    empty(e);

    append(e, txt);
}


function create( elem ) {
    return document.createElementNS ?
        document.createElementNS( 'http://www.w3.org/1999/xhtml', elem ) :
        document.createElement( elem );
}

/**
 * ����ָ��Ԫ�صĵ�һ��Ԫ���ӽڵ�
 */
function first( elem ) {
    elem = elem.firstChild;
    return elem && elem.nodeType != 1 ?
        next( elem ) : elem;
}

function last( elem ) {
    elem = elem.lastChild;
    return elem && elem.nodeType != 1 ?
        prev( elem ) : elem;
}


/**
 * ����ָ��Ԫ�ص���һ���ֵ�Ԫ�ؽڵ�
 */
function next( elem ) {
    do {
        elem = elem.nextSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}


function prev( elem ) {
    do {
        elem = elem.previousSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}

/**
 * ���Ը��ݸ�Ԫ�صĲ㼶������ָ��Ԫ�صĸ�Ԫ��
 */
function parent( elem, num ) {
    num = num || 1;
    for ( var i = 0; i < num; i++ )
        if ( elem != null ) elem = elem.parentNode;
    return elem;
}

/**
 * ΪԪ�ذ��¼�
 */
function removeEvent(elem, type, handler){
    if(elem.removeEventListener){
        elem.removeEventListener(type, handler);
    }else if(elem.detachEvent){
        elem.detachEvent('on' + type, elem[type + handler]);
    }else{
        elem['on' + type]  = null;
    }
}


function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent){
        elem['temp' + type + handler] = handler;
        elem[type + handler] = function(){
            elem['temp' + type + handler].call(elem);
        };
        elem.attachEvent('on' + type, elem[type + handler]);

    }else{
        elem['on' + type] = handler;
    }
}


// A function for hiding (using display) an element
function hide( elem ) {
    // Find out what it��s current display state is
    var curDisplay = _getStyle( elem, 'display' );

    //  Remember its display state for later
    if ( curDisplay != 'none' )
        elem.$oldDisplay = curDisplay;

    // Set the display to none (hiding the element)
    elem.style.display = 'none';
}

// A function for showing (using display) an element
function show( elem ) {
    // Set the display property back to what it use to be, or use
    // ��block��, if no previous display had been saved
    elem.style.display = elem.$oldDisplay || 'block';
}


function slideDown( elem ) {
    // Start the slide down at  0

    // Show the element (but you can see it, since the height is 0)

    // Find the full, potential, height of the element
    var h = fullHeight( elem );

    elem.style.height = '0px';

    show( elem );

    // We?re going to do a 20 ?frame? animation that takes
    // place over one second ֡
    for ( var i = 0; i <= 100; i += 5 ) {
        // A closure to make sure that we have the right ?i?
        (function(){
            var pos = i;

            // Set the timeout to occur at the specified time in the future
            setTimeout(function(){
                // Set the new height of the element
                elem.style.height = ( pos / 100 ) * h  + "px";

            }, ( pos + 1 ) * 10 );
        })();
    }
}

function fadeIn( elem ) {
    // Start the opacity at  0
    setOpacity( elem, 0 );

    // Show the element (but you can see it, since the opacity is 0)
    show( elem );

    // We?re going to do a 20 ?frame? animation that takes
    // place over one second
    for ( var i = 0; i <= 100; i += 5 ) {
        // A closure to make sure that we have the right ?i?
        (function(){
            var pos = i;

            // Set the timeout to occur at the specified time in the future
            setTimeout(function(){

                // Set the new opacity of the element
                setOpacity( elem, pos );

            }, ( pos + 1 ) * 10 );
        })();
    }
}


// Set an opacity level for an element
// (where level is a number 0-100)
function setOpacity( elem, level ) {
    if(elem.filters){
        elem.style.filter = "alpha(opacity="+level+")";
    }else{
        elem.style.opacity = level/100;

    }
}

/**
 * ajax����
 * @param type ��������ͣ�GET/POST
 * @param url ����ĵ�ַ
 * @param data �ύ������
 * @param callback �ص�����
 */
function ajax(options){

    options = {
        type: options.type || 'GET',
        url: options.url,
        data: options.data || {}, //????
        callback: options.callback || function(){}
    };

    var xmlHttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //"xxx.php?name=zs&age=34&sex=male"
    xmlHttp.open(options.type, options.url + "?" + serialize(options.data) ,true);
    xmlHttp.send();


    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            options.callback(xmlHttp.responseText);
        }
    };

    //return "name=zs&age=34&"
    //data {name:'zs', age:34}
    function serialize(data){
        var t = "";
        for(var prop in data){
            t += prop + '=' + data[prop] + '&'
        }
        return t?t.substring(0, t.length - 1):"";
    }

}

/**

 @param attr ��һ������
 */
function animate(elem, attr, callback){
    clearInterval(elem.timer);
    elem.timer = setInterval(function(){
        var bStop = true;//һ����ʶλ��ֵΪtrue�Ǵ�����Ҫֹͣ��ʱ����Ϊfalse����Ҫֹͣ
        for(var prop in attr){//ȡ������attr�����е�����
            var currentStyle;

            if(prop == 'opacity'){//���prop��opacity
                currentStyle = parseInt(css(elem, prop)*100);//��ô����ȡ�����ĵ�ǰֵת����Ϊ�ٷ���
            }else{
                currentStyle = parseInt(css(elem, prop));
            }

            var speed = (attr[prop] - currentStyle) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);


            if(currentStyle != attr[prop]){
                bStop = false;
            }

            currentStyle += speed;
            if(prop == 'opacity'){
                elem.style.opacity = currentStyle / 100;
                elem.style.filter = "alpha(opacity:"+currentStyle+")";
            }else{
                elem.style[prop] = currentStyle + 'px';
            }
        }

        if(bStop){
            clearInterval(elem.timer);
            if(callback) callback();
        }
    }, 30);
}



























/**
 * Created by dell on 2017/7/2.
 */
