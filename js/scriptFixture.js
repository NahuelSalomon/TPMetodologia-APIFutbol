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


export function updateFixtureLeague(endPointfixture, leagueMatches, league) {


    if(leagueMatches.length === 0) {

        callApi(getEndpointLastRoundOfLeague(league, "2020"))
        .then(response => {
            //Cantidad de rondas de la liga
            var quantityRounds = response["results"];

            //Obtener String de la ultima ronda. 
            //Esto lo tube que hacer dinámico porque no todas las ligas tienen la misma cantidad de rondas
            var lastRoundLeague = response["response"][quantityRounds - 1];

            callApi(endPointfixture+lastRoundLeague)
                .then(response => {

                    leagueMatches.push(response["response"]);
                    insertAllMatchesIntoFixture(leagueMatches[0]);
                    //insertAllMatchesIntoFixture(leagueMatches[0]);
                    
                })
                .catch(error => { console.log(error); })
        })
        .catch(error => { console.log(error); })
    
    }
    else {
        insertAllMatchesIntoFixture(leagueMatches[0]);
    }

}

export function insertAllMatchesIntoFixture(matches) {

    //cleanTableFixture();
    var divRawTablePositions = document.getElementById("rawTablePositions");

    var divCol = document.createElement("div");
    divCol.classList.add("col");
    divCol.id = "colPositions";
    divRawTablePositions.appendChild(divCol);

    var divCard = document.createElement("div");
    divCard.classList.add("card","bg-default","shadow");
    divCard.style.backgroundColor = "#3D5443";
    divCol.appendChild(divCard);

    var divTableResponsive = document.createElement("div");
    divTableResponsive.classList.add("table-responsive");
    divTableResponsive.id = "divTable";
    divCard.appendChild(divTableResponsive);

            var tablePosition = document.createElement("table");
            tablePosition.classList.add("table","align-items-center","table-success","table-flush");
            tablePosition.id = "tablePositionFixture" ;
            tablePosition.style.fontWeight = "bold";
            tablePosition.style.color = "black";
            divTableResponsive.appendChild(tablePosition);
            
            var headTable = document.createElement("thead");
            headTable.classList.add("thead","head-table-positions" );
            headTable.id = "headTable";
            headTable.style.backgroundColor = "#708C76";
            headTable.style.color = "white";
            tablePosition.appendChild(headTable);
                    
                    var thDate = document.createElement("th");
                    thDate.scope = "col";
                    thDate.innerHTML = "Date";
                    headTable.appendChild(thDate);

                    var thRank = document.createElement("th");
                    thRank.scope = "col";
                    thRank.innerHTML = "Home";
                    headTable.appendChild(thRank);

                    var thName = document.createElement("th");
                    thName.scope = "col";
                    thName.innerHTML = "Goals"
                    headTable.appendChild(thName);

                    var thPoints = document.createElement("th");
                    thPoints.scope = "col";
                    thPoints.innerHTML = "Goals"
                    headTable.appendChild(thPoints);

                    var thPoints = document.createElement("th");
                    thPoints.scope = "col";
                    thPoints.innerHTML = "Away"
                    headTable.appendChild(thPoints);



    matches.forEach(match => {
        insertMatchIntoFixture(match);
    });

}


function cleanTableFixture() {

    var bodyTable = document.getElementById("bodyTableFixture");

    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }
}

function insertMatchIntoFixture(match) {

//Datos encesarios
    var date = new Date(match["fixture"]["date"]).toDateString();
    var time = new Date(match["fixture"]["timestamp"] * 1000);
    var formatedTime = time.getHours() + ":" + ("0" + time.getMinutes()).substr(-2);
    
   // console.log("MATCH: "+match);
    var nameHome = match["teams"]["home"]["name"];
    var urlLogoHome = match["teams"]["home"]["logo"];
    var goalsHome = match["goals"]["home"];

    var nameAway = match["teams"]["away"]["name"];
    var urlLogoAway = match["teams"]["away"]["logo"];
    var goalsAway = match["goals"]["away"];


    /*
    
        
    var divCol = document.createElement("div");
            divCol.classList.add("col");
            divCol.id = "colPositions";
            divRawTablePositions.appendChild(divCol);

            var divCard = document.createElement("div");
            divCard.classList.add("card","bg-default","shadow");
            divCard.style.backgroundColor = "#3D5443";
            divCol.appendChild(divCard);

            var divTableResponsive = document.createElement("div");
            divTableResponsive.classList.add("table-responsive");
            divTableResponsive.id = "divTable";
            divCard.appendChild(divTableResponsive);

                    var tablePosition = document.createElement("table");
                    tablePosition.classList.add("table","align-items-center","table-success","table-flush");
                    tablePosition.id = "table-position" ;
                    tablePosition.style.fontWeight = "bold";
                    tablePosition.style.color = "black";
                    divTableResponsive.appendChild(tablePosition);
                    
                    var headTable = document.createElement("thead");
                    headTable.classList.add("thead","head-table-positions" );
                    headTable.id = "headTable";
                    headTable.style.backgroundColor = "#708C76";
                    headTable.style.color = "white";
                    tablePosition.appendChild(headTable);

                        var divImageLeague = document.createElement("div");
                        divImageLeague.id = "divLogo";
                        divImageLeague.classList.add("col-lg-6","col-7");
                               
                           var thRank = document.createElement("th");
                           thRank.scope = "col";
                           thRank.innerHTML = "Position";
                           headTable.appendChild(thRank);
   
                           var thName = document.createElement("th");
                           thName.scope = "col";
                           thName.innerHTML = "Team"
                           headTable.appendChild(thName);
   
                           var thPoints = document.createElement("th");
                           thPoints.scope = "col";
                           thPoints.innerHTML = "Points"
                           headTable.appendChild(thPoints);
   
                       var bodyTable = document.createElement("tbody");
                       bodyTable.classList.add("list");
                       bodyTable.id = "bodyTable";
                       tablePosition.appendChild(bodyTable);



*/ 
                var tablePosition = document.getElementById("tablePositionFixture");

                var bodyTable = document.createElement("tbody");
                bodyTable.classList.add("list");
                bodyTable.id = "bodyTable";
                tablePosition.appendChild(bodyTable);

                    var tr = document.createElement("tr");
                    tr.classList.add("tbody-dark");
                    bodyTable.appendChild(tr);

                        var tdDate = document.createElement("td");
                        tdDate.classList.add("tbody-dark");
                        tr.appendChild(tdDate);
                        tdDate.innerHTML = date + "<br>" + formatedTime;


                        var tdHomeTeam = document.createElement("td");
                        tdHomeTeam.classList.add("tbody-dark");
                        tr.appendChild(tdHomeTeam);
                        tdHomeTeam.innerHTML = `<div class="media align-items-center">
                                                <a href="#" class="avatar img mr-1">
                                                    <img alt="Team logo" src=" ${urlLogoHome}">
                                                </a>
                                                <div class="media-body">
                                                    <span class="name mb-0 text-sm\">${nameHome}</span>
                                                </div>
                                            </div>`;

                        var tdHomePoints = document.createElement("td");
                        tdHomePoints.classList.add("tbody-dark");
                        tr.appendChild(tdHomePoints);
                        tdHomePoints.innerHTML = goalsHome == null ? "-" : goalsHome;

                        var tdAwayPoints = document.createElement("td");
                        tdAwayPoints.classList.add("tbody-dark");
                        tr.appendChild(tdAwayPoints);
                        tdAwayPoints.innerHTML = goalsAway == null ? "-" : goalsHome;

                        var tdAwayTeam = document.createElement("td");
                        tdAwayTeam.classList.add("tbody-dark");
                        tr.appendChild(tdAwayTeam);
                        tdAwayTeam.innerHTML = `<div class="media align-items-center">
                                                <a href="#" class="avatar img mr-1">
                                                    <img alt="Team logo" src=" ${urlLogoAway}">
                                                </a>
                                                <div class="media-body">
                                                    <span class="name mb-0 text-sm\">${nameAway}</span>
                                                </div>
                                            </div>`;

    //Console log a modo de mostrar como son los datos, hacer tabla con tags necesarios para mostrar la información. Parecido a como lo hicimos con tabla de posiciones
    //console.log(date + " " + formatedTime + "HOME= Name: " + nameHome + ", Goals: " + goalsHome + ", urlLogo: " + urlLogoHome
    //    + " -- AWAY= Name: " + nameAway + ", Goals: " + goalsAway + ", urlLogo: " + urlLogoAway);

}



