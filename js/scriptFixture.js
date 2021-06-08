import { callApi } from './scpritApi.js';
import {addAccionModalWindowStadistics } from './scriptStatistics.js'; 

export const endpointFixtureRounds = "fixtures/rounds?league=";
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

function getEndpointLastRoundOfLeague(league, season) {
    return "fixtures/rounds?league=" + league + "&season=" + season;
}

 export function chargeFixturesForLeague(leagueMatches, league, season) {    //leagueMatches es un array clave-valor de rounds-partidos del round

    if(leagueMatches.length === 0) {

        callApi("fixtures?season="+season+"&league="+league)
        .then(response => {

            var index = 1;
            var actualRound = response["response"][0]["league"]["round"];
            leagueMatches[index] = new Array();
            

            response["response"].forEach( match => {

                if (match["league"]["round"] != actualRound){     //Los partidos vienen todos juntos pero ordenados por rounds
                    index++;
                    actualRound = match["league"]["round"];
                    leagueMatches[index] = new Array();
                }
                
                leagueMatches[index].push(match);
            });
                    
        })
        .catch(error => { console.log(error); })
    
    }

    console.log(leagueMatches);
}

//Esta función no tiene mucho sentido ahora
 export function updateFixtureLeague(endPointfixture, leagueMatches, league, array) {


     if(leagueMatches.length === 0) {

        callApi(getEndpointLastRoundOfLeague(league, "2020"))
        .then(response => {

            var quantityRounds = response["results"];

            var lastRoundLeague = response["response"][quantityRounds - 1];

            callApi(endPointfixture+lastRoundLeague)
                .then(response => {

                    leagueMatches.push(response["response"]);
                    insertAllMatchesIntoFixture(array);
                     
                })
                .catch(error => { console.log(error); })
        })
        .catch(error => { console.log(error); })
    
    }
    else {
        insertAllMatchesIntoFixture(array);
    }

}

/* export function roundsSelector(leagueMatches){

    var divCol = document.getElementById("colFixture");

    const keys = Object.keys(leagueMatches);    

    console.log(divCol);
    var div = document.createElement("div");
    divCol.appendChild(div);

        var divCard2 = document.createElement("div");
        divCard2.classList.add("card", "card-stats");
        div.appendChild(divCard2);

        var divCardBody = document.createElement("div");
        divCardBody.classList.add("card", "body");
        divCard2.appendChild(divCardBody);

            var divRow= document.createElement("div");
            divRow.classList.add("row");
            divCardBody.appendChild(divRow);

                var divSelect = document.createElement("div");
                divSelect.classList.add("tab-pane", "tab-example-result", "fade show active");
                divRow.appendChild(divSelect);

                var select = document.createElement("select");
                select.classList.add("form-control");
                
                for (const key of keys){
                    var option = document.createElement("option");
                    console.log(key);
                    option.value = key;
                    option.text = key;
                    select.appendChild(option);
                }

                divRow.appendChild(select);            
} */

export function insertAllMatchesIntoFixture(leagueMatches) {

    var divRawTablePositions = document.getElementById("rawTablePositions");

    var divCol = document.createElement("div");
    divCol.classList.add("col");
    divCol.id = "colFixture";
    divRawTablePositions.appendChild(divCol);


    // ------------------- Card to select round --------------------------------------
console.log(leagueMatches);

    const keys = Object.keys(leagueMatches);
    var selectedRound = keys[keys.length - 1];  //Por default se muestra la fecha actual

    console.log(selectedRound);
    console.log(leagueMatches);
    var div = document.createElement("div");
    divCol.appendChild(div);

        var divOne = document.createElement("div");
        divOne.classList.add("tab-content");
        div.appendChild(divOne);

        var divTwo = document.createElement("div");
        divTwo.classList.add("tab-pane", "tab-example-result", "fade", "show", "active");
        divOne.appendChild(divTwo);

            var divSelect = document.createElement("div");
            divSelect.classList.add("tab-pane", "tab-example-result");
            divTwo.appendChild(divSelect);

            var select = document.createElement("select");
            select.classList.add("form-control");
            
            for (const key of keys){
                var option = document.createElement("option");
                option.value = key;
                option.text = leagueMatches[key][0]["league"]["round"];
                select.appendChild(option);
            }
            divTwo.appendChild(select);

            select.addEventListener('change', (e) => {
                selectedRound = e.target.value;
                console.log(selectedRound);
                console.log(leagueMatches[selectedRound]);

                    leagueMatches[selectedRound].forEach(match => {
                    insertMatchIntoFixture(match);
                });
            });

// ------------------- End card to select round --------------------------------------


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

                    var thStatistics = document.createElement("th");
                    thStatistics.scope = "col";
                    thStatistics.innerHTML = "#";
                    headTable.appendChild(thStatistics);


}


function cleanTableFixture() {

    var bodyTable = document.getElementById("bodyTableFixture");

    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }
}

function insertMatchIntoFixture(match) {

    console.log("ENTRO");

    var date = new Date(match["fixture"]["date"]).toDateString();
    var time = new Date(match["fixture"]["timestamp"] * 1000);
    var formatedTime = time.getHours() + ":" + ("0" + time.getMinutes()).substr(-2);

    var nameHome = match["teams"]["home"]["name"];
    var urlLogoHome = match["teams"]["home"]["logo"];
    var goalsHome = match["goals"]["home"];

    var nameAway = match["teams"]["away"]["name"];
    var urlLogoAway = match["teams"]["away"]["logo"];
    var goalsAway = match["goals"]["away"];

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


                var tdStadistics = document.createElement("td");
                tdStadistics.classList.add("tbody-dark");
                tdStadistics.innerHTML = `<a class="nav-link" href=#>
                                            <span class="nav-link-text">
                                                <i class="fas fa-search-plus" style="font-size:30px; color: black;"></i>
                                            </span>
                                         </a>`;
                tr.appendChild(tdStadistics);
                
                var aStadistics = document.getElementById("match"+id);
                addAccionModalWindowStadistics(aStadistics);
                                
}



