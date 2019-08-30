$('#logout').on('click', function() {
    var cf = confirm('确定要退出吗？');
    if (cf) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(result) {
                location.href = './login.html';
            }
        })
    }
});