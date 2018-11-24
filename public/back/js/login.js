/**
 * Created by KJY on 2018/11/19.
 */

$(function (){
    //配置表单验证
    $("#form").bootstrapValidator({
        //表单验证小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //表单验证具体设置
       fields:{
           username:{
              validators:{
                  //非空提示
                  notEmpty:{
                      message:"用户名不能为空"
                  },
                  //长度提示
                  stringLength:{
                      min:2,
                      max:6,
                      message:"用户名长度必须是2-6位"
                  },
                  //callback 回调函数
                  callback:{
                      message:"用户名不存在"
                  }
              }
          },
           //密码配置
           password:{
               validators:{
                   notEmpty:{
                       message:"密码不能为空"
                   },
                   stringLength:{
                       min:2,
                       max:6,
                       message:"密码必须是6-12位"
                   },
                   callback:{
                       message:"密码错误"
                   }
               }
           }
       }
    })
});



//提交表单
$(function(){
    //自定义的方法
    $('#form').on('success.form.bv',function(e){
        //阻止表单submit按钮提交表单
        e.preventDefault();


        //发送ajax请求
        $.ajax({
            type:"post",
            url: "/employee/employeeLogin",
            dataType: "json",
            data: $('#form').serialize(),
            success:function( info ){
                console.log(info);
                //成功跳转首页
                if(info.success){
                    location.href="index.html"
                }
                //如果错误码为1000 调用callback
                if(info.error === 1000){
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                ////如果错误码为1001 调用callback
                if(info.error === 1001){
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                }

            }
        })
    });

  //c3的属性选择器 点击属性为reset的按钮，重置表单
    $('[type="reset"]').click(function() {
        console.log( 1111 );
        // 除了重置文本, 还要重置校验状态
        $('#form').data("bootstrapValidator").resetForm();
    });
});


