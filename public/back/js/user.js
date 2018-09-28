$(function() {
  function ready(page,pageSize) {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: { page: page || 1, pageSize: pageSize || 5 },
      dataType: "json",
      success: function(response) {
        console.log(response);
        totalPages = Math.ceil(response.total / response.size);
        // console.log(totalPages);
        // 分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(response.total / response.size),
          currentPage: response.page,
          onPageClicked: function(e, o, t, page) {
            ready(page);
          }
        });
        $("tbody").html(template("tmp", response));
      }
    });
  }
  ready();
});
