$('#formBox').on('change', '#myFile', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            console.log(result);
            $('#preview').attr('src', result[0].avatar);
            $('#hiddenImg').val(result[0].avatar);
        }
    })
})


$('#formBox').on('submit', '#settingsForm', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(result) {
            alert('修改成功')
        }
    })
    return false;
});



$.ajax({
    type: 'get',
    url: '/settings',
    success: function(result) {
        var html = template('settingsTpl', result);
        $('#formBox').append(html);
    }
})