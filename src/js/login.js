import $ from './lib/jquery.esm.js';
$('.login-submit').on('click', function() {
    let username = $('#username').val();
    // console.log(username);
    let password = $('#password').val();
    // console.log(password);
    $.ajax({
            type: "get",
            url: "../interface/login.php",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            // success(res) {
            //     console.log(res);
            // }
            // success(res) {
            //     console.log(res);
            // }
        })
        .then(res => {
            alert('登录成功');
            location.href = './index.html';
            // console.log(res);
        }).catch(xhr => {
            alert(`登录失败，状态码为${xhr.status}`)
            console.log(xhr.status);
            // location.href = './index.html';
        });
})

// 选项卡
$('.login-tab>a').on('click', function() {
    $(this).parents('.login-form').removeClass('display').siblings().addClass('display');
})