$(function () {
  function ready(page, pageSize) {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page || 1,
        pageSize: pageSize || 5
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        $('tbody').html(template('tmp', response));
        // 分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(response.total / response.size),
          currentPage: response.page,
          onPageClicked: function (e, o, t, page) {
            ready(page);
          }
        });
      }
    });
  }
  ready();

  $('.lt_content button').on('click', function () {
    $('#categoryModal').modal('show');
  })


  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名不能'
          },
        }
      },
    }
  });
  $('#form').on('success.form.bv',function () {
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.success) {
          ready(1);
          // 重置表单及状态
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#categoryModal').modal('hide');
        }
      }
    });
  })
})