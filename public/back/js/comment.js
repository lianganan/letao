$(function () {
  $(document).ajaxStart(function () {
    NProgress.configure({
      showSpinner: false
    });
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500)
  });


  // 未登录拦截
  if (location.href.indexOf('login.html') === -1) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      dataType: "json",
      success: function (response) {
        if (response.success) {
          console.log('登录成功');
        }
        if (response.error === 400) {
          location.href = "login.html";
        }
      }
    });
  }

  // 二级菜单切换功能
  $('.nav .subMenu').on('click', function () {
    $('.nav .child').slideToggle();
  })

  // 头部菜单按钮功能
  $('.icon_meun').on('click', function () {
    $('.lt_aside').toggleClass('hiddeAside');
    $('.lt_main').toggleClass('hiddeMain');
    $('.lt_topbar').toggleClass('hiddeTopbar');
  })
  // 模态框显示功能
  $('.icon_logout').on('click', function () {
    $('#loginoutModal').modal().show();
  })

  // 退出登录功能
  $('.loginout').on('click',function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (response) {
        if (response.success) {
          location.href = "login.html";
        }
      }
    });
    
  })
})