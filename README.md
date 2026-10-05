# TheNBAHub

## Description
TheNBAHub is a small NBA-themed dataset explorer built with HTML,
CSS, and JavaScript. Users can search players by name, filter by
listed team, and sort by name or listed points.

The site loads a local JSON file asynchronously using fetch().
It includes loading and error messages, labeled controls, and a
responsive CSS Grid layout.

Team assignments and point values are unverified and should not
be treated as official NBA records.

## How to Run
1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Start a local web server using Live Preview or Live Server.
4. Open index.html through that server.

Keep index.html, style.css, script.js, and nba-players.json in
the same folder. Opening index.html directly as a local file
may prevent the JSON data from loading.

## Data Source
The player dataset was downloaded from the Algolia datasets
repository on GitHub:

https://github.com/algolia/datasets/blob/dd302a00a5681a0344be81f510ba587f14c5ecde/basketball/nba-players.json

The file contains player names, listed teams, and point values.
It does not specify a season.

## AI Assistance Disclosure
I used ChatGPT for assistance with writing and explaining portions
of the HTML, CSS, and JavaScript, and troubleshooting. I reviewed
and adjusted the code and manually tested the site’s features.