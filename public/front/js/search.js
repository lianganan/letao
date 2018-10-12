$(function () {
  // 取出localStorage的值
  function getHistory() {
    var jsonStr = localStorage.getItem('search_list');
    var arr = JSON.parse(jsonStr);
    return arr;
  };

  // 设置localStorage的值
  function setlocalStorage(arr) {
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list', jsonStr);
  };

  reander();

  // 渲染
  function reander() {
    $('.lt_history .content').html(template('tmp', {arr: getHistory()}));
  };

  //点击清空记录清空历史记录

  $('.lt_history .clear-history').on('click', function () {
    mui.confirm('你确定要清空历史记录吗？', '温馨提示！', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var arr = [];
        setlocalStorage(arr);
        reander();
      }
      ;
    });
  });

  //  点击X删除其中一条数据
  $('.lt_history .content').on('click', '.content i', function () {
    var $this = $(this);
    mui.confirm('你确定要删除历史记录吗？', '温馨提示！', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var arr = getHistory();
        arr.splice($this.data('index'), 1);
        setlocalStorage(arr);
        reander();
      }
    });
  });

  //  搜索时添加历史记录
  $('.lt_search button').on('click', function () {
    var value = $('.lt_search input').val();
    var arr = getHistory();
    if (arr.length >= 10) {
      arr.pop();
    }
    if (arr.indexOf(value) != -1) {
      arr.splice(arr.indexOf(value), 1);
    }
    if (value.trim().length === 0) {
      mui.toast('请输入搜索关键字');
    } else {
      arr.unshift(value);
      setlocalStorage(arr);
      reander();
      var hrefStr = 'searchList.html?value=' + value;
      location.href = hrefStr;
      $('.lt_search input').val('');
    }
  });

  //  点击历史记录跳转
  $('.lt_history .content').on('click', '.content a', function () {
    var value = $(this).text();
    var hrefStr = 'searchList.html?value=' + value;
    location.href = hrefStr;
  })

});