const apiKey = "60578cd98amsha3895ea4ceffa95p1eb205jsnf5b9038a2ada";

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