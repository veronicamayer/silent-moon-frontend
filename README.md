# Silent Moon - Graduation Project

The Silent Moon Project was my final work of the Full-Stack Web Development Bootcamp at SuperCode. Initially, it was set up as a group project but unfortunately, my group was only able to work together for the first 2 days of the 8-day period due to health issues. So for the rest of the time I was working on the project alone. If you're reviewing the code, please keep in mind that I'm still working on cleaning up the code and rearranging some parts for more efficiency. Below you can see some of my open todos.

The task was to build a mobile website based on the Figma design you can see [here](https://www.figma.com/file/vjj41U1G4KYqpBAoYzSPek/Silent-Moon?type=design&node-id=0-1&mode=design). There was no specification as to what data sources to use but it was suggested that Spotify offers a public API for their content.

The main goal of the project was to bring together the most relevant technologies we studied during the program: HTML, CSS, React, Node.js, Express, MongoDB, and using APIs.

## API

This website uses the Spotify API. You can see the documentation here. As for a short introduction: 
1. It is possible to access all information such as available playlists, items in the playlist, etc. without logging in with a personal account. It only requires an admin to register the website at Spotify and then fetch an access token on a user request. All this happens in the backend of the Silent Moon website.
2. As for actually playing a song on the Silent Moon website, every user has to log in with their private Spotify premium account. This way Spotify can prevent people from building a free version of Spotify as the API doesn't include any advertisement.
3. The Silent Moon website will guide you to the login page as soon as a login is required. Spotify handles the login process so I do not have any access to any of your login data. If you do not want to log in, the only thing you can't see is the web player that plays the song. That's it.

All the yoga videos are free-to-use stock videos. We saved the video URL in Mongo DB and are therefore not using any API for the yoga content.

## Get an account 
You can simply register as a new user by typing any email (it doesn't need to be a real email address) and a password. The password will be encrypted so I can't see it in the database. After you registered, feel free to use your credentials to log in again later. 

## Deployment

This project is deployed on Vercel:

```bash
  https://silent-moon-frontend.vercel.app/
```

## Backend
You can find the backend [here](https://github.com/veronicamayer/silent-moon-backend)

## ToDos
- [ ] Improve loading speed
- [ ] CSS improvements + responsiveness
- [ ] Web player can't go to the next song in the playlist yet
- [ ] The Spotify access token needs a refresh token because once it expires the user is not redirected to the Spotify login page
- [ ] The site is not compatible with Safari yet and has only been tested on Chrome so far



