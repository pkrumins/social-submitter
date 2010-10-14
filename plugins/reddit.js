var Browser = require('../lib/browser');

module.exports = function (client, data) {
    var browser = new Browser;
    browser
        .get('http://www.reddit.com')
        .post(
            'http://www.reddit.com/api/login/' + data.username,
            {
                op : 'login-main',
                user : data.username,
                passwd : data.password,
                id : '#login_login-main',
                renderstyle : 'html'
            }
        )
        .get('http://www.reddit.com/r/' + data.subreddit)
        .get('http://www.reddit.com/r/' + data.subreddit + '/submit')
        .post(
            'http://www.reddit.com/api/submit',
            {
                uh : 'todo',
                kind : 'link',
                sr : data.subreddit,
                url : data.url,
                title : data.title,
                id : '#newlink',
                r : data.subreddit,
                renderstyle : 'html'
            }
        )
        .end();
}

