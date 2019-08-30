$('#userForm').on('submit', function() {

    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/users',
                success: function(result) {
                    var html = template('usersTpl', { data: result });
                    $('#usersList').html(html);
                }
            });
        }
    });

    return false;
    //阻止默认行为
});


$('#avatar').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            $('#preview').attr('src', result[0].avatar);
            $('#hiddenImg').val(result[0].avatar);
        }
    });
});

$.ajax({
    type: 'get',
    url: '/users',
    success: function(result) {
        var html = template('usersTpl', { data: result });
        $('#usersList').html(html);
    }
});


$('#usersList').on('click', '.edit', function() {

    var id = $(this).attr('data-id');

    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(result) {
            var html = template('modifyTpl', result);
            $('#formBox').html(html);
        }
    });
});


$('#formBox').on('submit', '#userForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/users',
                success: function(result) {
                    var html = template('usersTpl', { data: result });
                    $('#usersList').html(html);
                }
            });
        }
    });


    return false;
});

$('#formBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            $('#preview').attr('src', result[0].avatar);
            $('#hiddenImg').val(result[0].avatar);
        }
    });
});

$('#usersList').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/users',
                success: function(result) {
                    var html = template('usersTpl', { data: result });
                    $('#usersList').html(html);
                }
            });
        }
    });
});


$('#selectAll').on('change', function() {
    var bool = $(this).prop('checked');
    $('.select').prop('checked', bool);
    if (bool === true) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});

$('#usersList').on('change', '.select', function() {
    if ($('.select').length === $('.select').filter(':checked').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }

    if ($('#usersList').find('.select').filter(':checked').length >= 2) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});


$('#deleteMany').on('click', function() {
    var selectAll = $('#usersList').find('.select').filter(':checked');
    var arr = [];
    selectAll.each(function(index, element) {
        arr.push($(element).attr('data-id'));
    });

    var ids = arr.join('-');

    $.ajax({
        type: 'delete',
        url: '/users/' + ids,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/users',
                success: function(result) {
                    var html = template('usersTpl', { data: result });
                    $('#usersList').html(html);
                }
            });
        }
    })
});


$('#modifyPwd').on('click', function() {
    location.href = "./password-reset.html";
})