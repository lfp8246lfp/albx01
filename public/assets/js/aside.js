$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(result) {
        var randomTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(randomTpl, { data: result });
        $('.random').html(html);
    }
})



$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(result) {

        var commentsTpl = `
        {{each data}}
        <li>
        <a href="javascript:;">
            <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
                <p>
                    <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
                </p>
                <p>{{$value.content.substr(0, 30)}}</p>
            </div>
        </a>
    </li>
        {{/each}}
        `;
        var html = template.render(commentsTpl, { data: result });
        $('.discuz').html(html);
    }
})



$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        console.log(result)

        var categoriesTpl = `
        {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(categoriesTpl, { data: result });
        $('.nav').html(html);
    }
});


$('.search form').on('submit', function() {
    var key = $(this).find('.keys').val();
    return false;
})