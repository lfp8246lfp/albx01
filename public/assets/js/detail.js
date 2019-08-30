function getUrlParams(name) {
    var arr1 = location.search.substr(1).split('&');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return -1;
}

var id = getUrlParams('id');


$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function(result) {
        var html = template('detailTpl', result);
        $('.article').html(html);
    }
});


$('.article').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function(result) {
            $('#likes').html('(' + result.meta.likes + ')');
        }
    })
});



var review;

$.ajax({
    type: 'get',
    url: '/settings',
    success: function(result) {
        review = result.review;
        if (result.comment == true) {
            var commentTpl = `
            <form>
            <textarea></textarea>
            <input type="submit" value="提交评论">
        </form>
            `;
            $('.comment').html(commentTpl);
        }
    }
});


$('.comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();

    var state;
    if (review == true) {
        state = 1;
    } else {
        state = 0;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content,
            post: id,
            state
        },
        success: function() {
            location.reload();
        }
    })
    return false;
})