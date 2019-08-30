$('#myFile').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            console.log(result);
            $('#preview').attr('src', result[0].avatar).show();
            $('#hiddenImg').val(result[0].avatar);
        }
    })
});


$.ajax({
    type: 'get',
    url: '/slides',
    success: function(result) {
        var html = template('slidesTpl', { data: result });
        $('#slidesBox').html(html);
    }
});


$('#formBox').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(result) {
            $.ajax({
                type: 'get',
                url: '/slides',
                success: function(result) {
                    var html = template('slidesTpl', { data: result });
                    $('#slidesBox').html(html);
                }
            })
        }
    })
    return false;
});


$('#slidesBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/slides',
                success: function(result) {
                    var html = template('slidesTpl', { data: result });
                    $('#slidesBox').html(html);
                }
            });
        }
    })
});