$('#modifyForm').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(result) {
            location.href = '/admin/login.html';
        }
    });
    return false;
})