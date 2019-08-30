$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) {
                    var html = template('categoryListTpl', { data: result });
                    $('#categoryList').html(html);
                }
            });
        }
    });
    return false;
});


$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        var html = template('categoryListTpl', { data: result });
        $('#categoryList').html(html);
    }
});


$('#categoryList').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(result) {
            var html = template('modifyCategoryTpl', result);
            $('#modifyBox').html(html);
        }
    })
});


$('#modifyBox').on('submit', '#modifyCategory', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();

    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) {
                    var html = template('categoryListTpl', { data: result });
                    $('#categoryList').html(html);
                }
            });
        }
    });
    return false;
});


$('#categoryList').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success: function() {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) {
                    var html = template('categoryListTpl', { data: result });
                    $('#categoryList').html(html);
                }
            });
        }
    });
});


$('#selectAll').on('change', function() {
    var bool = $(this).prop('checked');
    $('.select').prop('checked', bool);
    $('#deleteMany').show();
});


$('#categoryList').on('change', '.select', function() {
    var checked = $('.select').filter(':checked').length;
    if ($('.select').filter(':checked').length > 1) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
    if (checked === $('.select').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
});



$('#deleteMany').on('click', function() {
    var arr = [];
    $('.select').filter(':checked').each((index, ele) => {
        arr.push($(ele).attr('data-id'));
        // var id = $(ele).attr('data-id');
        // arr.push(id);
        // var id = ele.getAttribute('data-id');
        // arr.push(id);
    });
    $.ajax({
        type: 'delete',
        url: '/categories/' + arr.join('-'),
        success: function(result) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) {
                    var html = template('categoryListTpl', { data: result });
                    $('#categoryList').html(html);
                }
            });
        }
    })
});