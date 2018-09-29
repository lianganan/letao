$(function () {
  function ready(page, pageSize) {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page || 1,
        pageSize: pageSize || 5
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        totalPages = Math.ceil(response.total / response.size);
        // console.log(totalPages);
        $("tbody").html(template("tmp", response));
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
  var id;
  var isDelete;
  var currentPage;
  $("tbody").on("click", "button", function () {
    $("#userModal").modal("show");
    id = $(this)
      .parent()
      .data("id");
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    currentPage = $(this)
      .parent()
      .data("page");
    console.log(currentPage);
  });
  $(".btn-user").on("click", function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: "json",
      success: function (response) {
        $("#userModal").modal("hide");
        ready(currentPage);
      }
    });
  });
});