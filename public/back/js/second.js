$(function () {
  function ready(page, pageSize) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
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
  $('.lt_content .btn').on('click', function () {
    $('#categoryModal').modal('show');
  })
  // 一级分类下拉
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: "json",
    success: function (response) {
      console.log(response);
      $('.dropdown-menu').html(template('tmp1', response));
    }
  });
  // 给下拉li注册点击事件
  $('.dropdown-menu').on('click', 'li', function () {
    $('.dropdownTxt').text($(this).text());
    $('.categoryId').val($(this).data('id'));

    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  // 上传图片预览
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result.picAddr);
      $('.img').attr('src', data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  // 表单验证
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })

  // 添加功能
  $('#form').on("success.form.bv", function () {
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.success) {
          $('#categoryModal').modal('hide');
          ready(1);
          // 重置表单
          // 重置表单里面的内容和校验状态
          $('#form').data("bootstrapValidator").resetForm(true);
          // 找到下拉菜单文本重置
          $('.dropdownTxt').text("请选择一级分类");
          // 找到图片重置
          $('.img').attr("src", "images/none.png");
        }
      }
    });
  })
})