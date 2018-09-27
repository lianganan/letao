// NProgress.configure({ showSpinner: false });
//         NProgress.start();
// 重置时重置内容和状态
// $('[type="reset"]').on('click',function () {
//   $('#form').data('bootstrapValidator').resetForm();
//   NProgress.done();
// })
$(document).ajaxStart(function () {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500)
})