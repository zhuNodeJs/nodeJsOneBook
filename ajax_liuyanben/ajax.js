function ajax(method, url, data, success) {
  var xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }else {
    xhr = new ActiveXObject('Microsoft.XMLHTTTP');
  }
  if (method === 'get' && data) {
    url += '?'+data+'&'+(new Date()).getTime();
  }
  xhr.open(method,url,true);
  if(method === 'get') {
    xhr.send();
  }else {
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send(data);
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        success && success(xhr.responseText);
      }else {
        alert('处错误了，Error:'+xhr.status);
      }
    }
  }
}
