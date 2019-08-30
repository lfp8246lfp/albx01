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
    url: '/posts/category/' + id,
    success: function(result) {
        console.log(result);
        var html = template('listTpl', { data: result });
        $('.new').html(html);
    }
})