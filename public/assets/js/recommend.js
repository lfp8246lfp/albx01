$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(result) {
        var hotsTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
         </li>
         {{/each}}
        `;
        var html = template.render(hotsTpl, { data: result });
        $('.hots ul').html(html);
    }
})