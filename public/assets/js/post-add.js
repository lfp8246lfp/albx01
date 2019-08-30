$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        console.log(result);

        var html = template('categoryTpl', {
            data: result
        });
        $('#category').html(html);
    }
});

$('#formBox').on('change', '#feature', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            $('.thumbnail').attr('src', result[0].avatar).show();
            $('#hiddenImg').val(result[0].avatar);
        }
    });
});

$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(result) {
            location.href = './posts.html';
        }
    });
    return false;
});


//从地址栏获取查询参数
function getUrlParams(name) {
    var arr1 = location.search.substr(1).split('&')
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=')
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return -1;
}


var id = getUrlParams('id');

if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(result) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(response) {
                    result.categories = response;
                    console.log(result);
                    var html = template('modifyTpl', result);
                    $('#formBox').html(html);
                }
            })
        }
    })
}


$('#formBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(formData);
    console.log(id);

    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(result) {
            location.href = 'posts.html';
        }
    })
    return false;
})