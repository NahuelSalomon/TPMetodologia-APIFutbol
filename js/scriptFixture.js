import { callApi } from './scpritApi.js';

export const endpointFixtureRounds = "fixtures/rounds?league="; //Enponint que obtiene todoas las rondas. Ej fecha 1 = Regular Season - 19;

//End ponint para obtener la información de la ultima fecha de cada liga, podria ser dinamico
export const endpointFixtureSpain = "fixtures?season=2020&league=140&round=";
export const endpointFixtureEngland = "fixtures?league=39&season=2020&round=";
export const endpointFixtureFrance = "fixtures?league=61&season=2020&round=";
export const endpointFixtureItaly = "fixtures?league=135&season=2020&round=";
export const endpointFixtureGermany = "fixtures?league=78&season=2020&round=";

export const spainMatches = new Array();
export const englandMatches = new Array();
export const franceMatches = new Array();
export const italyMatches = new Array();
export const germanyMatches = new Array();

/*NOTAS
* En francia y alemania en las ultimas rondas juegan solo dos equipos porque se juega la promoción
para ver si el equipo desciende con el de la segunda división.
* Todos los console log son de prueba se pueden borrar.
*
*/

//Obtiene todas las rondas de una determinada liga
function getEndpointLastRoundOfLeague(league, season) {
    return "fixtures/rounds?league=" + league + "&season=" + season;
}


export function getFixtureLeague(endPointfixture, leagueMatches, league) {

    callApi(getEndpointLastRoundOfLeague(league, "2020"))
        .then(response => {

            //Cantidad de rondas de la liga
            var quantityRounds = response["results"];

            //Obtener String de la ultima ronda. 
            //Esto lo tube que hacer dinámico porque no todas las ligas tienen la misma cantidad de rondas
            var lastRoundLeague = response["response"][quantityRounds - 1];

            console.log("LAST ROUND"+lastRoundLeague);

            callApi(endPointfixture+lastRoundLeague)
                .then(response => {

                    leagueMatches.push(response["response"]);
                    console.log("------------------------------------------------------------------------------------");
                    console.log("------------------------------------------------------------------------------------");
                    insertAllMatchesIntoFixture(leagueMatches[0]);
                    
                })
                .catch(error => { console.log(error); })
        })
        .catch(error => { console.log(error); })
}

function insertAllMatchesIntoFixture(matches) {

    matches.forEach(match => {
        insertMatchIntoFixture(match);
    });
}

function insertMatchIntoFixture(match) {

    //Datos encesarios
    var nameHome = match["teams"]["home"]["name"];
    var urlLogoHome = match["teams"]["home"]["logo"];
    var goalsHome = match["goals"]["home"];

    var nameAway = match["teams"]["away"]["name"];
    var urlLogoAway = match["teams"]["away"]["logo"];
    var goalsAway = match["goals"]["away"];

    //Console log a modo de mostrar como son los datos, hacer tabla con tags necesarios para mostrar la información. Parecido a como lo hicimos con tabla de posiciones
    console.log("HOME= Name: " + nameHome + ", Goals: " + goalsHome + ", urlLogo: " + urlLogoHome
        + " -- AWAY= Name: " + nameAway + ", Goals: " + goalsAway + ", urlLogo: " + urlLogoAway);

}



