$(function () {
  // 模态框显示功能
  $('.lt_content .btn').on('click', function () {
    $('#categoryModal').modal('show');
  })
  // 动态渲染
  function ready(page, pageSize) {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page || 1,
        pageSize: pageSize || 2
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        $('tbody').html(template('tmp',response));
        
      }
    });
  }
  ready();

})