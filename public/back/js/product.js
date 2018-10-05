$(function () {
  var picArr = []; // 专门用来保存图片对象
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
        $('tbody').html(template('tmp', response));
        // 分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(response.total / response.size),
          currentPage: response.page,
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "末页";
              case "page":
                return page;
            }
          },
          // 配置按钮大小 large
          size: "normal",
          // 配置提示框
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return "第" + page + "页";
            }
          },
          // 使用 bootstrap 样式的提示框组件
          useBootstrapTooltip: true,
          onPageClicked: function (e, o, t, page) {
            ready(page);
          }
        });

      }
    });
  }
  ready();
  // 渲染二级分类
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
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
  // 设置点击下拉菜单选中
  $('.dropdown-menu').on('click', 'a', function () {
    $('#caretTxt').text($(this).text());
    $('.brandId').val($(this).parent().data('id'));
    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })
  // 配置上传图片的回调函数
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      // 获取图片地址对象
      var picObj = data.result;
      // 获取图片地址
      var picAddr = picObj.picAddr;
      picArr.unshift(picObj);
      console.log(picArr);
      $('#imgBox').prepend('<img src="' + picAddr + '" width="100" >');
      // 限制上传图片的张数
      if (picArr.length > 3) {
        // 删除数组最后一项
        picArr.pop();
        // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
        $('#imgBox img:last-of-type').remove();
      }
      // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
      // 需要将表单 picStatus 的校验状态, 置成 VALID
      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
      }
    }
  });


  // 配置表单验证
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验二级分类
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },
        }
      },
      // 商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品库存
      // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
      // 数字: \d
      // + 表示一个或多个
      // * 表示零个或多个
      // ? 表示零个或1个
      // {n} 表示出现 n 次
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入非零的整数"
          }
        }
      },
      // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 如32-40'
          }
        }
      },
      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          },
          //正则校验
          regexp: {
            regexp: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: '价格输入不正确'
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          },
          //正则校验
          regexp: {
            regexp: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: '价格输入不正确'
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });
  // 提交表单
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    var params = $("#form").serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    //使用ajax提交逻辑
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: params,
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.success) {
          ready();
          // 关闭模态框
          $('#categoryModal').modal('hide');
        }
        // 重置校验状态和文本内容
        $('#form').data("bootstrapValidator").resetForm(true);
        // 手动重置, 下拉菜单
        $('.dropdownTxt').text("请选择二级分类")

        // 删除结构中的所有图片
        $('#imgBox img').remove();
        // 重置数组 picArr
        picArr = [];
      }
    });
  });
})