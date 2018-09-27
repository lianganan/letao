$(function () {

  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data:{page:1,pageSize:5},
    dataType: "json",
    success: function (response) {
      console.log(response);
      $('tbody').html(template('tmp',response))
    }
  });


})