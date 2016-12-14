window.onload = function() {
  // 初始化，判断侧边栏的状态
  var oRegDiv = document.getElementById('reg');
  var oLoginDiv = document.getElementById('login');
  var oUserInfo = document.getElementById('user');
  var oUserName = document.getElementById('userinfo');
  var oGetMoreList = document.getElementById('showMore');
  var promptMessageState = false;
  oGetMoreList.style.display = 'none';
  var initIndex = 1;
  updateUserState();
  initListInfo();
  function updateUserState() {
    var oUid = getCookie('uid');
    var oUsername = getCookie('username');
    if (oUid) {
      oUserInfo.style.display = 'block';
      oRegDiv.style.display = 'none';
      oLoginDiv.style.display = 'none';
      oUserName.innerText = oUsername;
    }else {
      oRegDiv.style.display = 'block';
      oLoginDiv.style.display = 'block';
      oUserInfo.style.display = 'none';
      oUserName.innerText = '';
    }
  }
  /*
    page: 页码
  */
  function initListInfo() {
    ajax('post','guestbook/index.php','m=index&a=getList&page=1&n=10',function(data) {
        var data = JSON.parse(data);
        if(data.code === 1) {
          promptMessageState = true;
          oList.innerHTML ='现在还没有留言，快来抢沙发呀！！！！';
          oGetMoreList.style.display = 'none';
        }else if(data.data.page === data.data.pages){
          oGetMoreList.style.display = 'none';
          for(var i=0;i<data.data.list.length;i++) {
            createDlist(data.data.list[i],false);
          }
        }else {
          for(var i=0;i<data.data.list.length;i++) {
            createDlist(data.data.list[i],false);
          }
          oGetMoreList.style.display = 'block';
        }
    })
  }
  // 注册，检查用户名是否存在
  /*
    get
    guestbook/index.php
      m: index
      a:verifyUserName
      username: 要验证的用户名
      {
        code: 返回的信息代码 0 = 没有错误，1 = 有错误
        message: 返回的信息 具体的返回的信息
    }
  */
  var oUsername1 = document.getElementById('username1');
  var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
  oUsername1.onblur = function() {
    ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+this.value,function(data) {
      var data = JSON.parse(data);
      oVerifyUserNameMsg.innerHTML = data.message;
      oVerifyUserNameMsg.style.fontSize = '12px';
        if(!data.code) {
          oVerifyUserNameMsg.style.color = 'green';
        }else {
          oVerifyUserNameMsg.style.color = 'red';
        }
    });
  }
  // 注册
  /*
    get
    guestbook/index.php
      m: index
      a: reg
      username: 注册的用户名
      password : 注册是用户的密码
      {
        code: 返回的信息代码 0 = 没有错误，1 = 有错误
        message: 返回的信息 具体的返回的信息
    }
  */
  var oPassword1 = document.getElementById('password1');
  var btnReg = document.getElementById('btnReg');
  btnReg.onclick = function() {
    ajax('post','guestbook/index.php','m=index&a=reg&username='+encodeURI(oUsername1.value)+'&password='+oPassword1.value+'',function(data) {
        var data = JSON.parse(data);
        if (!data.code) {
          oPassword1.value = '';
          oUsername1.value = '';
          oVerifyUserNameMsg.innerHTML = '';
        }else {
          alert(data.message);
          oPassword1.value = '';
          oUsername1.value = '';
          oVerifyUserNameMsg.innerHTML = '';
        }
    })
  };
  // 登陆
  /*
    get/post
    guestbook/index.php
      m: index
      a: login
      username: 登陆的用户名
      password : 登录的用户的密码
      {
        code: 返回的信息代码 0 = 没有错误，1 = 有错误
        message: 返回的信息 具体的返回的信息
    }
  */
  var oUsername2 = document.getElementById('username2');
  var oPassword2 = document.getElementById('password2');
  var oBtnLogin = document.getElementById('btnLogin');
  oBtnLogin.onclick = function() {
    ajax('post','guestbook/index.php','m=index&a=login&username='+encodeURI(oUsername2.value)+'&password='+oPassword2.value+'',function(data) {
        var data = JSON.parse(data);
        alert(data.message);
        if(!data.code) {
          updateUserState();
        }
    });
  }
function getCookie(key) {
  var arr1 = document.cookie.split('; ');
  for(var i=0;i<arr1.length;i++) {
    var arr2 = arr1[i].split('=');
    if (arr2[0] && arr2[0] === key) {
      return arr2[1];
    }
  }
}
// 用户的退出
/*
  get/post
  guestbook/index.php
  m: index
  a: logout
  返回：
  {
    code: 返回的信息代码 0 = 没有错误，1 = 有错误
    message : 返回的信息 具体返回信息
}
*/
var btnLogOut = document.getElementById('logout');
btnLogOut.onclick = function() {
  ajax('get','guestbook/index.php','m=index&a=logout',function(data) {
    var data = JSON.parse(data);
    alert(data.message);
    if(!data.code) {
      updateUserState();
    }
  })
}

//留言
/*
  post
   guestbook/index.php
   m: index
   a: send
   content: 留言内容
   {
   code:返回的信息代码，0表示没有错误， 1有错误
   data: 返回的成功的留言的详细信息
   {
   cid: 留言id
   content: 留言内容
   uid: 留言人的id
   username: 留言人的名称、
   dataline: 留言的时间戳（秒）
   support： 当前这条留言的支持
   oppose　：　当前这条留言的反对的支持
 }
 }
*/
var oContent = document.getElementById('content');
var oBtnPost = document.getElementById('btnPost');
var oList = document.getElementById('list');
oBtnPost.onclick = function () {
  if (promptMessageState) {
    oList.innerHTML = '';
    promptMessageState = false;
  }
  ajax('post','guestbook/index.php','m=index&a=send&content='+encodeURI(oContent.value),function(data) {
    var data = JSON.parse(data);
    alert(data.message);
    if(!data.code) {
      createDlist(data.data,true);
    }
  });
}

function createDlist(data,state) {
    var dl = document.createElement('dl');
    var dt = document.createElement('dt');
    dt.innerHTML = '<strong>'+data.username+'</strong>';
    dl.appendChild(dt);
    var dd = document.createElement('dd');
    dd.innerHTML = data.content;
    dl.appendChild(dd);
    var dd = document.createElement('dd');
    dd.className = 't';
    dd.innerHTML = '<a href="javascript:;" class="support" data-cid='+data.cid+'>顶(<span>'+data.support+'</span>)</a>'+
    '|'+
    '<a href="javascript:;" class="oppose" data-cid='+data.cid+'>踩(<span>'+data.oppose+'</span>)</a>';
    dl.appendChild(dd);
    if(state && oList.children[0]) {
      oList.insertBefore(dl,oList.children[0]);
    }else {
      oList.appendChild(dl);
    }
}

  oGetMoreList.onclick = function() {
    var page = ++initIndex;
      ajax('post','guestbook/index.php','m=index&a=getList&page='+page+'&n=10',function(data) {
        var data = JSON.parse(data);
        if(!data.code) {
          for(var i=0;i<data.data.list.length;i++) {
            createDlist(data.data.list[i],false);
          }
          if(data.data.page === data.data.pages) {
            oGetMoreList.style.display = 'none';
          }
        }else{
          oGetMoreList.style.display = 'none';
        }
      })
  }

  oList.addEventListener('click',function(event) {
    var e = event || window.event; //事件
    var target = e.target || e.srcElement; // 获得事件源
    if (target.tagName.toUpperCase() === 'A' && target.getAttribute('class').toUpperCase() === 'SUPPORT') {

      var cid = target.dataset.cid;
      ajax('post','guestbook/index.php','m=index&a=doSupport&cid='+cid,function(data) {
        var data = JSON.parse(data);
        alert(data.message);
        if(!data.code) {
          target.children[0].innerHTML = Number(target.children[0].innerHTML)+1;
        }
      });
    }else if(target.tagName.toUpperCase() === 'A' && target.getAttribute('class').toUpperCase() === 'OPPOSE'){
      var cid = target.dataset.cid;
      ajax('post','guestbook/index.php','m=index&a=doOppose&cid='+cid,function(data) {
        var data = JSON.parse(data);
        alert(data.message);
        if(!data.code) {
          target.children[0].innerHTML = Number(target.children[0].innerHTML)+1;
        }
      });
    }
  })


}
