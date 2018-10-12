$(function () {
  var url = location.search; //获取url中"?"符后的字串
  var id = decodeURI(url.split('=')[1]);

  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.lt_main .mui-scroll').html(template('tmp',info));

      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui('.mui-numbox').numbox();
    }
  })


})