

function getTweets( id ) {
    return fetch("https://api.twitter.com/user/" + id).then(function (response) {
        return JSON.parse(response);
    }).then(function (response) {
        return response.data;
    }).then(function (tweets) {
        return tweets.filter(function (tweet) {
            return tweet.stars > 50
        })
    }).then(function (tweets) {
        return tweets.filter(function (tweet) {
            return tweet.rts > 50
        })
    })
}

getTweets(1573434);