/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
	}

	function unRfc2068(value) {
		if (value.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		return value;
	}

	function fromJSON(value) {
		return config.json ? JSON.parse(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? null : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = fromJSON(cookie);
				break;
			}

			if (!key) {
				result[name] = fromJSON(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);


function updateCookie(pageNum) {
    var list = new cookieList("lesson" + LessonNum);  //Gets LessonNum from current page.
    list.add(pageNum);
}


//This is not production quality, its just demo code.
var cookieList = function (cookieName) {
    //When the cookie is saved the items will be a comma seperated string
    //So we will split the cookie by comma to get the original array
    var cookie = $.cookie(cookieName);
    //Load the items or a new array if null.
    var items = cookie ? cookie.split(/,/) : new Array();

    //Return a object that we can use to access the array.
    //while hiding direct access to the declared items array
    //this is called closures see http://www.jibbering.com/faq/faq_notes/closures.html
    return {
        "add": function (val) {
            if (!this.exists(val)) {
                //Add to the items.
                items.push(val);
                //Save the items to a cookie.
                $.cookie(cookieName, items.join(','));
            }
        },
        "remove": function (val) {
            //EDIT: Thx to Assef and luke for remove.
            indx = items.indexOf(val);
            if (this.exists(val.toString())) items.splice(indx, 1);
            $.cookie(cookieName, items.join(','));
        },
        "clear": function () {
            items = null;
            //clear the cookie.
            $.cookie(cookieName, null);
        },
        "exists": function (val) {
            indx = items.indexOf(val);
            if (indx != -1)
                return true;
            else
                return false;
        },
        "items": function () {
            //Get all the items.
            return items;
        }
    }
}