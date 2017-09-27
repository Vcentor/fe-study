/**
 * Jsonp Request
 *
 *    options = {
 *        	url: 'http://wwww.aa.com',
 *        	callback: 'cb_field_name',// 可以忽略
 *          data: {
 *               foo: 1,
 *               bar: 2
 *			 }
 *    }
 * 
 */
function jsonp(options) {
	options = options || {};
	var cb_field_name = options.callback || 'callback';
	return new Promise(function (resolve, reject) {
		// 创建callback value name
		let cb_value_name = ('$CB' + Math.random()).replace('.', '');

		// 格式化请求参数
		options.data[cb_field_name] = cb_value_name;
		options.data['t'] = (new Date()).getTime();
		let request_data = _formatParams(options.data);
		// 创建url
		let url = options.url + (options.url.indexOf('?') > -1 ? '&' : '?') + request_data;
		console.log(url);
		// 创建script标签，并添加到页面中
		let oS = document.createElement('script');
		oS.type = 'text/javascript';
		oS.src = url;
		document.body.appendChild(oS);

		// 请求容错
		let onerror = (msg, url, line) => {
			oS.parentNode.removeChild(oS);
			delete window[cb_value_name];
			reject('msg:' + msg);
		}

		// 创建jsonp回调函数
		window[cb_value_name] = function (json) {
			oS.parentNode.removeChild(oS);
			delete window[cb_value_name];
			resolve(json);
		} 
	})
}

/**
 * Ajax Request
 * 
 *    options = {
 *        url: 'http://www.aa.com',
 *        type: 'POST',
 *        data: {
 *             foo: 1,
 *             bar: 2
 *        }  
 *	  };
 *
 */
function ajax(options) {
	options = options || {};
	options.type = (options.type || 'GET').toUpperCase();
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		if (options.type === 'GET') {
			xhr.open('GET', options.url + '?' + _formatParams(options.data), true);
			xhr.send();
		} else if (options.type === 'POST') {
			xhr.open('POST', options.url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-wwww-form-urlencoded');
			xhr.send(options.data);
		}

		xhr.onreadystatechange = function () {

			if (xhr.readyState === 4) {
				let status = xhr.status;
				if (status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(new Error(xhr.statusText));
				}
			}
		};

	})
}

function _formatParams(data) {
	let arr = [];
	for (let index in data) {
		arr.push(encodeURIComponent(index) + '=' + encodeURIComponent(data[index]));
	}

	arr.push('v=' + Math.random());

	let result = arr.join('&');
	return result;
}

export default {
	jsonp,
	ajax
}
