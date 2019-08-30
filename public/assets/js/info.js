$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(result) {
        console.log(result);
        $('.profile .avatar').attr('src', result.avatar);
        $('.profile .name').val(result.nickName);
        $('.profile').show();
    }
});