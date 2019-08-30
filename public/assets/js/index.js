//获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(result) {
        console.log(result);
        $('#post').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）');
    }
})

//获取分类的数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(result) {
        $('#category').html('<strong>' + result.categoryCount + '</strong>个分类')
    }
})

//获取评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(result) {
        $('#comment').html('<strong>' + result.commentCount + '</strong>条评论');
    }
})