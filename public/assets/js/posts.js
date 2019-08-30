function dateformat(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '/' + month + '/' + day;
}

// template.defaults.imports.dateformat = dateformat;



// var page = 1;

// function render() {
//     $.ajax({
//         type: 'get',
//         url: '/posts',
//         data: {
//             page: page
//         },
//         success: function(result) {
//             console.log(result);
//             var html = template('postsTpl', { data: result.records });
//             $('#postsBox').html(html);
//             var page = template('pagesTpl', result);
//             $('#pagesBox').html(page);
//         }
//     });
// }


$.ajax({
    type: 'get',
    url: '/posts',
    success: function(result) {
        console.log(result);
        var html = template('postsTpl', { data: result.records });
        $('#postsBox').html(html);
        var page = template('pagesTpl', result);
        $('#pagesBox').html(page);
    }
});
// render();




// function turnPage(newPage) {
// var page = newPage;
// $.ajax({
//     type: 'get',
//     url: '/posts',
//     data: { page: page },
//     success: function(result) {
//         var html = template('postsTpl', { data: result.records });
//         $('#postsBox').html(html);
//         var page = template('pagesTpl', result);
//         $('#pagesBox').html(page);
//     }
// })

// render();
//     $.ajax({
//         type: 'get',
//         url: '/posts',
//         data: {
//             page: newPage
//         },
//         success: function(result) {
//             console.log(result);
//             var html = template('postsTpl', { data: result.records });
//             $('#postsBox').html(html);
//             var page = template('pagesTpl', result);
//             $('#pagesBox').html(page);
//         }
//     });
// }


$('#pagesBox').on('click', '.turnPage', function() {
    var newPage = $(this).attr('data-page');
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: newPage
        },
        success: function(result) {
            var html = template('postsTpl', { data: result.records });
            $('#postsBox').html(html);
            var page = template('pagesTpl', result);
            $('#pagesBox').html(page);
        }
    });
})



$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        var html = template('categoryTpl', {
            data: result
        });
        $('#allState').html(html);
    }
});




$('#filterBox').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(result) {
            var html = template('postsTpl', { data: result.records });
            $('#postsBox').html(html);
            var page = template('pagesTpl', result);
            $('#pagesBox').html(page);
        }
    });
    return false;
})


// $('#postsBox').on('click', '.edit', function() {
//     var id = $(this).attr('data-id');
//     $.ajax({
//         type: 'put',
//         url: '/posts/' + id,
//         success: function(result) {
//             console.log(result);
//         }
//     });
// });


$('#postsBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                $.ajax({
                    type: 'get',
                    url: '/posts',
                    success: function(result) {
                        console.log(result);
                        var html = template('postsTpl', { data: result.records });
                        $('#postsBox').html(html);
                        var page = template('pagesTpl', result);
                        $('#pagesBox').html(page);
                    }
                });
            }
        });
    }
});