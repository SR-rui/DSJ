$(function() {
    // 点击实现切换登录注册
    $('.links').eq(0).on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('.links').eq(1).on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义登录注册的规则
    var form = layui.form
    form.verify({
            // 定义账户名
            user: [
                /^[\S]{6,12}$/,
                '密码为6到12位，且不能出现空格'
            ]
        })
        //注册表单验证
    form.verify({
            //校验密码是否一致

            repwd: function(value) {
                if (value !== $('.reg-box [name=password]').val()) {
                    return "两次密码不一致 请重新输入"
                }
            }

        })
        //注册接口
    $('#formzhuce').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: {
                    username: $('#formzhuce [name=username]').val(),
                    password: $('#formzhuce [name=password]').val()
                },
                success(res) {
                    if (res.status !== 0) return layui.layer.msg(res.message)
                    layui.layer.msg(res.message)
                    setTimeout(function() {
                        $('.links').eq(1).click()
                    }, 1000)
                }
            })
        })
        //点击登录接口
    $('#formdenglu').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                location.href = '/inde.html'
            }
        })
    })


})