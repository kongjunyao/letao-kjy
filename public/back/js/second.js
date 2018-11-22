/**
 * Created by KJY on 2018/11/22.
 */
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();
    function render(){

        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type : "get",
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            success : function(info){
                console.log(info);
                var htmlStr = template("secondTpl",info);
                $(".lt_content tbody").html( htmlStr );

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3 ,
                    currentpage : info.page ,
                    totalPages : Math.ceil( info.total / info.size),
                    onPageClicked : function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })


    }



    $("#addBtn").click(function(){
        $("#addModal").modal("show");
        var validator = $("#form").data('bootstrapValidator');
    });


   $.ajax({
       url: "/category/queryTopCategoryPaging",
       type: "get",
       data : {
           page : 1,
           pageSize : 100
       },
       success : function(info){
           console.log(info);
           var htmlStr =  template("dropdownTpl",info);
           $(".dropdown-menu").html( htmlStr );
       }
   });


    $(".dropdown-menu").on("click","a",function(){

        $("#dropdownText").text( $(this).text());

        $("[name = 'categoryId']").val($(this).data("id"));

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });


   $("#fileupload").fileupload({
       dataType:"json",
       //e：事件对象
       //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
       done:function (e, data) {
           console.log(data);
           var picAddr = data.result.picAddr;
           $("#imgbox img").attr("src",picAddr);
           $("[name = 'brandLogo']").val(picAddr);
           $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
       }

   });



    // 5. 配置表单校验
    $('#form').bootstrapValidator({

        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });


    $("#form").on("success.form.bv",function(e){
        e.preventDefault();

        $.ajax({
            url: "/category/addSecondCategory",
            type:"post",
            data : $("#form").serialize(),
            success : function(info){
                console.log(info);

                $("#addModal").modal("hide");
                $("#form").data("bootstrapValidator").resetForm(true);
                currentPage =  1;
                render();
                $("#dropdownText").text("请选择1级分类");
                $("#imgbox img").attr("src","images/none.png")
            }
        })

    })
});

