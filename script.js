const Twitter = require('twitter');

// Authenticate to Twitter
const client = new Twitter({
  consumer_key: 'Pma44WHCFFMlhlavEpp3egvwH',
  consumer_secret: 'xYkM9EuNsD7873yfUy3rQ9RKQdAZLje2vUUkTJKxfuzSsqSLvp',
  access_token_key: '1004830270174965761-nmMJSp6QQ6nE7GDASQguN6K7Opv0PF',
  access_token_secret: '6D00M0IhmnY0KHQGMa8UXZaBwLUzLYTCIiRO2cqd7Jkvv'
});

// Function to post a tweet
const post = (status) => {
    client.post('statuses/update', {status: status},  function(error, tweet, response) {
        if(error) throw error;
    });
}

// Function to listen to mentions
const listenToMentions = () => {
    client.stream('statuses/filter', {track: '@owengezeh'}, stream => {
        stream.on('data', event => {
            let text = event.text;
            let user = event.user.screen_name;
            if(text.includes("hi")){
                post("@"+user+" Hello!");
            }else if(text.includes("how are you")){
                post("@"+user+" I am fine, thank you!");
            }else{
                post("@"+user+" I am sorry I didn't understand that.");
            }
        });
    });
}

listenToMentions();