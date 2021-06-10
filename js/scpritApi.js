const apiKey = "66ab6bc907msh0221a2a6f3a869ep10c796jsn63c0bc0fe4a5";

export const endpointTeamsSpainStandings = "standings?season=2020&league=140";
export const endpointTeamsEnglandStandings = "standings?season=2020&league=39";
export const endpointTeamsGermanyStandings = "standings?season=2020&league=78";
export const endpointTeamsItalyStandings = "standings?season=2020&league=135";
export const endpointTeamsFranceStandings = "standings?season=2020&league=61";
export const endPointCountries = 'countries';

//66ab6bc907msh0221a2a6f3a869ep10c796jsn63c0bc0fe4a5
//549a7bb64cmsh22a289e69814bbcp1e7974jsnc74d4dcbd570
//60578cd98amsha3895ea4ceffa95p1eb205jsnf5b9038a2ada
//482da72a4amshd322910e475844ep18be3fjsn50c45c92e8f4
//f1efd0d1b6mshdfa7dc15a0f02e4p118de2jsnf42e1105895c
//2938945cdfmsh65219211443b464p10be5ejsnbf197b431a12
//4828be84afmshc16b2cc2c73861bp144ffajsn8b7fdac6603e
//a84e12600emsh55fa72be90df181p186ea1jsn2ebd3a322446
//c6d3962b98msh3d9ef288192541bp13fdb4jsn4ea5154eb7d4
//a78f6a8f62msh63445a357fa766ep1bd777jsnd6a696a0d63e
//13ee55ebdfmsh299e1efb590aae5p12e35fjsn2165e4f34d47


export function callApi(endPoint) {

    return new Promise(function (resolve, reject) {

        var request = new XMLHttpRequest();

        request.open("GET", "https://api-football-beta.p.rapidapi.com/" + endPoint);
        request.setRequestHeader("x-rapidapi-key", apiKey);
        request.setRequestHeader("x-rapidapi-host", "api-football-beta.p.rapidapi.com");

        request.responseType = 'json';

        request.onload = function () {

            if (request.status == 200) {
                resolve(request.response);
            }
            else {
                reject(Error('Json couldn\'t be loaded. Error: ' + request.statusText));
            }
        }

        request.onerror = function () {
            reject(Error('Oops!, there was a network error.'));
        }

        request.send();
    });
}

export function callApi2(endPoint) {

    const data = null;

    const xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    return new Promise((resolve, reject) => {

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                resolve(this.responseText);
            }
        });

        xhr.open("GET", "https://api-football-beta.p.rapidapi.com/" + endPoint);
        xhr.setRequestHeader("x-rapidapi-key", apiKey);
        xhr.setRequestHeader("x-rapidapi-host", "api-football-beta.p.rapidapi.com");

        xhr.send(data);

    });

}