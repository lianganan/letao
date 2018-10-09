$(function () {
  // 取出localStorage的值
  function getHistory(){
    var jsonStr = localStorage.getItem("search_list");
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  $('.lt_history .content').html(template('tmp', {arr: getHistory()}));

  $('.lt_history .clear-history').on('click',function () {
    var arr = getHistory();

  })
})