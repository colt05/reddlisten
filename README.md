# REDDListen [![Build Status](https://travis-ci.org/colt05/reddlisten.svg?branch=gh-pages)](https://travis-ci.org/colt05/reddlisten)
## Credits
- JSFiddle for cleaning code  
- @MaxLaumeister for original code  
- https://github.com/decred/insight-api for the API that dcrlisten connects to.  
- http://stackoverflow.com/questions/18935539/authenticate-with-github-using-token?rq=1
- https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
- http://stackoverflow.com/questions/999907/git-push-says-everything-up-to-date-even-though-i-have-local-changes
- credits listed at https://github.com/colt05/get-request
- some other forks of BitListen
- https://help.github.com/articles/duplicating-a-repository/
- http://stackoverflow.com/questions/19845679/build-with-travis-ci-and-push-some-files-folder-to-another-repository   
  
## About ##

Current version hosted at [**Github Pages**](http:/colt05.github.io/reddlisten).

Realtime Decred transaction visualizer written in HTML/Javascript. See and hear new transactions and blocks as they propagate through the Decred Network.

### Building ###

The project is built and ready-to-go in the dist folder. If you change any of the javascript, you will need to re-build the `bitlisten.min.js` file using Grunt. If you haven't used Grunt before, here is a short tutorial:

1. [Install Node.js](https://nodejs.org/download/).

2. Install grunt-cli using `sudo npm install -g grunt-cli`.

2. Cd into the project directory and run `npm install` to install the proper Grunt version and dependencies for this project.

3. Run `grunt` to build BitListen. Alternatively, run `grunt watch` to build BitListen, host it at http://localhost:8000, and watch for and rebuild changes in the source files.

The compiled/minified script will be output to `bitlisten.min.js`.

### APIs and Libraries ###

BitListen uses these libraries:

* [Howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) by James Simpson
* [Reconnecting-Websocket](https://github.com/joewalnes/reconnecting-websocket) by Joe Walnes

BitListen uses these APIs:

* [Toshi.io](https://toshi.io/docs/) WebSocket API (For Transactions)
* [Bitstamp.net](https://www.bitstamp.net/) WebSocket API (For Price Ticker)

### License ###

If you distribute this project in part or in full, please attribute with a link to [the GitHub page](https://github.com/MaxLaumeister/bitlisten). This software is available under The MIT License, reproduced below.

Copyright (c) 2014 Maximillian Laumeister

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
