import $ from './lib/jquery.esm.js';
$('.login-submit').on('click', function() {
    let username = $('#username').val();
    // console.log(username);
    let password = $('#password').val();
    // console.log(password);
    $.ajax({
        type: "get",
        url: "../interface/regsiter.php",
        data: {
            username: username,
            password: password
        },
        dataType: "json",
    }).then(res => {
        // console.log(res);
        alert('注册成功')
        location.href = './login.html';
    }).catch(xhr => {
        // console.log(xhr.status);
        alert('注册失败，用户名已存在');
        location.href = './reg.html';
    });
})