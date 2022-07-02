const request = require('request');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const getCharacters = (req, res) => {
    const url = 'https://swapi-api.hbtn.io/api/people/';
    request(url, (error, response, body) => {
        if (error) {
        console.log(error);
        } else {
        const data = JSON.parse(body);
        res.send(data.results);
        }
    });
};
app.get('/characterz', getCharacters);

const getCharactersFromFilm = (req, res) => {
    let toReturn = [];
    const movieId = req.params.movieid;
    const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;
    let data;
    request(url, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            data = JSON.parse(body);
            console.log(data);
            /** data contains : 
            {
            title: 'Return of the Jedi',
            .....
            characters: [
                'https://swapi-api.hbtn.io/api/people/1/',
                'https://swapi-api.hbtn.io/api/people/2/',
                ....
            ],
            
            */
        }
    }).then(
        data.characters.forEach(characterUrl => {
            /**
            w houni y9oli cannot read properties of undefined, (reading characters) or que 3aml .then .. 
             */
            request(characterUrl,(error, response, body) => {
                const charData = JSON.parse(body);
                console.log(charData);
                toReturn.push(charData.name);
            })
        })
    )
    res.send(toReturn)
};

app.get('/characters/:movieid',getCharactersFromFilm);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});