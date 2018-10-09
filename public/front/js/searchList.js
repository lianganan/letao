$(function () {
  var url = location.search; //获取url中"?"符后的字串
  var value = url.split('=')[1];
  $('.lt_search input').val(value);

  function reander(obj) {
    var obj = obj || {proName: 2, page: 1, pageSize: 100};
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: {
        proName: obj.proName,
        page: obj.page,
        pageSize: obj.pageSize,
        price: obj.price || 1,
        num: obj.num || 2
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.lt_product').html(template('tmp',info));
      }
    })
  }
  reander({
    proName:2,
    page:1,
    pageSize:100
  });

  $('.lt_search button').on('click',function () {
    var value = $('.lt_search input').val();
    reander({
      proName:value,
      page:1,
      pageSize:100
    })
  })
})