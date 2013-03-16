# A Childhood Favorite — Tic Tac Toe

I’ve always wanted to recreate the simple games of my youth on the computer. Those games, the ones I played with pencil and paper and loved as a child, were as exciting to me then as the video games must be to the children playing them today.

So here’s Tic Tac Toe, which I chose to be the first game I’d recreate because out of all the childhood games of my youth none were as exciting and as much fun to play. The funny thing is, I still enjoy playing it today, and now, having written this, I won’t even need pencil and paper anymore. I don’t know if that’s a good or a bad thing but I do know I had a real blast cooking this game up.

So click on the link below and play a few games of Tic Tac Toe and see who’s really smarter, you or the computer.

I wrote Tic Tac Toe using 100% JavaScript. That means JavaScript on the server and JavaScript on the client. Here’s a few implementation details, just in case you are interested:

On the front end I employed:

* A customized version of Twitter Bootstrap’s 12 column grid. I needed to eliminate the gutters between columns so the divs could buttress each other which was necessary for the game grid.
* RequireJS for JavaScript modularity.
* LESS for dynamic CSS stylesheets.
* JavaScript/jQuery for the Tic Tac Toe game engine. Nothing fancy here but I did intentionally dumb down the computer somewhat because I didn’t want it to be too one-sided in the computer’s favor. You can win if you are careful but I have to admit, the computer is pretty smart too

And on the back end I used:

* NodeJS for the http server.
* Express Web Framework for simple http request routing.
* EJS for dynamic embedded JavaScript HTML generation.
* MongoDB for storing unique url hits and from which a visitor count is displayed in the footer of the page.
* MongoSkin for its nice MongoDb wrapper employing the future pattern.

[Play Tic Tac Toe on nodejitsu!](http://jefftschwartz.tictactoe.jit.su "click here to play Tic Tac Toe on nodejitsu")
