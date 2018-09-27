
$(document).ajaxStart(function () {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500)
});


// 未登录拦截




$(function () {

  $('.nav li:nth-child(2)').on('click',function () {
    $('.nav .child').slideToggle();
  })
  
})