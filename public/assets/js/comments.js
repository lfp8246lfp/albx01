$.ajax({
    type: 'get',
    url: '/comments',
    success: function(result) {
        var html = template('commentTpl', { data: result.records });
        $('#commentsBox').html(html);
        var page = template('pagesTpl', result);
        $('#pagesBox').html(page);
    }
});


$('#commentsBox').on('click', '.status', function() {
    var id = $(this).attr('data-id');
    var status = $(this).attr('data-status');

    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
                //result的state与输入的state相同，所以要调换一下
        },
        success: function() {
            $.ajax({
                type: 'get',
                url: '/comments',
                success: function(result) {
                    var html = template('commentTpl', { data: result.records });
                    $('#commentsBox').html(html);
                }
            });
        }
    });
    return false;
})