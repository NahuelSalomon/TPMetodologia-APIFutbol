import { updatePositionsTable,cleanTable } from './scriptPositionsTable.js';

import { callApi, endpointTeamsSpainStandings, endpointTeamsEnglandStandings, 
                  endpointTeamsGermanyStandings,endpointTeamsItalyStandings, 
                  endpointTeamsFranceStandings, endPointCountries } 
from './scpritApi.js';

import {updateFixtureLeague, endpointFixtureSpain,endpointFixtureEngland, endpointFixtureFrance,endpointFixtureItaly,endpointFixtureGermany,
        spainMatches, englandMatches, franceMatches, italyMatches, germanyMatches, chargeFixturesForLeague, insertAllMatchesIntoFixture } 
from './scriptFixture.js';


const spainFirstDivisionTeams = new Array();
const englandFirstDivisionTeams = new Array();
const italyFirstDivisionTeams = new Array();
const franceFirstDivisionTeams = new Array();
const germanyFirstDivisionTeams = new Array();

const urlLogoSpain = new String();
const urlLogoItaly = new String();
const urlLogoGermany = new String();
const urlLogoLeague1 = new String();
const urlLogoPremierLeague = new String();



window.onload = () => {

    cleanTable();

    const buttonLaLiga = document.getElementById("LA_LIGA");
    const buttonSerieA = document.getElementById("SERIE_A");
    const buttonBundesliga = document.getElementById("BUNDESLIGA");
    const buttonLeague1 = document.getElementById("LEAGUE_1");
    const buttonPremierLeague = document.getElementById("PREMIER_LEAGUE");
 
    callApi(endPointCountries)
        .then(response => {

            var flagURLSpain = response["response"][131]["flag"];
            var flagURLEngland = response["response"][44]["flag"];
            var flagURLGermany = response["response"][52]["flag"];
            var flagURLFrance = response["response"][50]["flag"];
            var flagURLItaly = response["response"][70]["flag"];
            
            insertFlagLeagueIntoNav(flagURLSpain, "LA_LIGA_SPAN");
            insertFlagLeagueIntoNav(flagURLEngland, "PREMIER_LEAGUE_SPAN");
            insertFlagLeagueIntoNav(flagURLGermany, "BUNDESLIGA_SPAN");
            insertFlagLeagueIntoNav(flagURLItaly, "SERIE_A_SPAN");
            insertFlagLeagueIntoNav(flagURLFrance, "LEAGUE_1_SPAN");

        })
        .catch(error => console.log(error))

    addEventGoToHome();
    addEventToButtonLeague(buttonLaLiga,endpointTeamsSpainStandings,spainFirstDivisionTeams,urlLogoSpain);
    addEventToButtonLeague(buttonSerieA,endpointTeamsItalyStandings,italyFirstDivisionTeams,urlLogoItaly);
    addEventToButtonLeague(buttonBundesliga,endpointTeamsGermanyStandings,germanyFirstDivisionTeams,urlLogoGermany);
    addEventToButtonLeague(buttonLeague1,endpointTeamsFranceStandings,franceFirstDivisionTeams,urlLogoLeague1);
    addEventToButtonLeague(buttonPremierLeague,endpointTeamsEnglandStandings,englandFirstDivisionTeams,urlLogoPremierLeague);

    //updateFixtureLeague(spainMatches, "140");

    addEventFixtureToButtonLeague(buttonLaLiga,endpointFixtureSpain,spainMatches,"140");
    addEventFixtureToButtonLeague(buttonPremierLeague,endpointFixtureEngland,englandMatches,"39");
    addEventFixtureToButtonLeague(buttonBundesliga,endpointFixtureGermany,germanyMatches,"78");
    addEventFixtureToButtonLeague(buttonSerieA,endpointFixtureItaly,italyMatches,"135");
    addEventFixtureToButtonLeague(buttonLeague1,endpointFixtureFrance,franceMatches,"61");
   
}

function insertFlagLeagueIntoNav(urlFlagLeague, parentId) {
    var image = document.createElement("img");

    image.src = urlFlagLeague;
    image.style.height = "30%"
    image.style.width = "30%";
    image.style.float = "right";
    document.getElementById(parentId).appendChild(image);
}

function addEventToButtonLeague(button,endponit,teams,urlLogo) {

        button.addEventListener("click", () => {

            if((teams.length === 0)) {

                callApi(endponit)
                    .then(response => {

                        urlLogo = response["response"][0]["league"]["logo"];
                        teams.push(response["response"][0]["league"]["standings"][0]);

                        updatePositionsTable(teams,urlLogo);
                    })
                    .catch(error => console.log(error));
            }
            else {
                updatePositionsTable(teams,urlLogo);
            }
        });
}


function addEventFixtureToButtonLeague(button,endPointfixture, leagueMatches, league) {

    button.addEventListener("click", () => {
    
    var arrayAux = new Array();
    chargeFixturesForLeague(arrayAux, league, 2020);
    updateFixtureLeague(endPointfixture,leagueMatches,league, arrayAux);
     
    });
}


function addEventGoToHome() {
    var buttonHome = document.getElementById("HOME");
    
    buttonHome.addEventListener("click",() => {
        cleanTable();
    });

}


export function addBodyHeader() {

    var divHeader = document.createElement("div");
    divHeader.classList.add("header","bg","pb-6");
    divHeader.style.backgroundColor = "#708C76";
    document.getElementById("panel").appendChild(divHeader);
    
        var divConteiner = document.createElement("div");
        divConteiner.classList.add("container-fluid");
        divHeader.appendChild(divConteiner);
    
            var divHeaderBody = document.createElement("div");
            divHeaderBody.classList.add("header-body");
            divConteiner.appendChild(divHeaderBody);
    
                var divRow = document.createElement("div");
                divRow.classList.add("row","align-items-center","py-4");
                divRow.id = "logo";
                divHeaderBody.appendChild(divRow);

                    var divCol = document.createElement("div");
                    divCol.classList.add("col-lg-6","col-7");
                    divRow.appendChild(divCol);

                        var h6PositionsTable =  document.createElement("div");
                        h6PositionsTable.classList.add("font-postions-table");
                        h6PositionsTable.innerHTML = "Statistics";
                        divCol.appendChild(h6PositionsTable);


}