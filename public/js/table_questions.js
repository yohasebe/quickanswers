$(function() {

  var pp_options = {
    trigger: "hover",
    placement: "top",
  };
  
  function update_table(){
    $("#table_questions>tbody>tr").popover(pp_options);
  }

  $("#table_questions").on("click", "tbody tr", function() {
    var topic_id = $(this).data("topic_id");
    var topic_position = $("#" + topic_id).position();
    $(window).scrollTop(topic_position.top);
  });

  var sortOrder = -1;

  $('#table_questions .sortkey').click(function() {
    var type = $(this).data('type');
    var col = $(this).index();
    var rows = $('#table_questions tbody>tr');

    rows.sort(function(a, b) {
      return compare(a, b, type, col) * sortOrder;
    });

    $('#table_questions tbody').empty().append(rows);
    
    if(sortOrder === 1){
      var arrow =  "glyphicon-sort-by-attributes";
    }else{
      var arrow =  "glyphicon-sort-by-attributes-alt";
    }
    $('#table_questions .sortkey > span.direction').removeClass("glyphicon");
    $('#table_questions .sortkey > span.direction').removeClass("glyphicon-sort-by-attributes");
    $('#table_questions .sortkey > span.direction').removeClass("glyphicon-sort-by-attributes-alt");
    $(this).find('span.direction').addClass("glyphicon");
    $(this).find('span.direction').addClass(arrow);
    
    sortOrder *= -1;
    update_table();
  });

  function compare(a, b, type, col) {
    var _a = $(a).find('td').eq(col).text();
    var _b = $(b).find('td').eq(col).text();

    if (type == "string") {
      if (_a < _b) {
        return -1;
      }
      if (_a > _b) {
        return 1;
      }
      return 0;
    } else if (type == "integer"){
      _a *= 1;
      _b *= 1;
      return _a - _b;
    }
  }

  $('th.txt_topic_started').click();

});
