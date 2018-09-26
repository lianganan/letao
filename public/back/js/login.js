$(function () {

  // 表单验证
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '请输入用户名'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名在2-6位之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '请输入密码'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '用户名在6-18位之间'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  });
  //通过登录验证

  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.success) {
          location.href = "index.html";
        };
        if (response.error === 1000) {
          //更新验证状态
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        };
        if (response.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    });
  })
// 重置时重置内容和状态
  $('[type="reset"]').on('click',function () {
    $('#form').data('bootstrapValidator').resetForm();
  })

});