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
        res.send(data);
        }
    });
};
app.get('/characterz', getCharacters);



const getCharactersFromFilm = (req, res) => {
    let toReturn = [];
    const url = 'https://swapi-api.hbtn.io/api/films/' + req.params.movieid + '/';
    request(url,{json:true}, (error, response, body) => {
        if (error) {
        console.log(error);
        } else {
            body.characters.forEach( (characterUrl) => { // tested async here , still not working 
                console.log(characterUrl);
                request(
                    characterUrl, {json:true} , (error, response, body) => {
                        if(error) {
                            console.log(error);
                        } else {
                            console.log(body); // console.log contains the data correctly 
                            toReturn.push(body.name);
                        }
                    }
                )
            });
        res.send(toReturn); // but still returning empty array , i must be missing some async await somewhere 
        }
    });
}

app.get('/characters/:movieid',getCharactersFromFilm);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});