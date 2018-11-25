/**
 * Created by KJY on 2018/11/25.
 */
$(function(){

    $.ajax({
        url : "/category/queryTopCategory",
        type : "get",
        dataType: "json",
        success : function(info){
            console.log(info);
            var htmlStr = template("leftTpl",info);
            $(".lt_category_left ul").html(htmlStr);
            renderSecondById( info.rows[0].id );
        }
    })

  $(".lt_category_left").on("click","a",function(){
      $(this).addClass("current").parent().siblings().find("a").removeClass("current");
      var id = $(this).data("id");
      renderSecondById(id);
  });




    function renderSecondById(id){
        $.ajax({
            url  : "/category/querySecondCategory",
            type : "get",
            data : {
                id : id
            },
            dataType: "json",
            success : function(info){
                console.log(info);
                var htmlStr = template("rightTpl",info);
                $('.lt_category_right ul').html( htmlStr );
            }
        })
    }



});