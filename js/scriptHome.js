import { updatePositionsTable } from './scriptPositionsTable.js';
import { callApi, endpointTeamsSpainStandings, endpointTeamsEnglandStandings, 
                  endpointTeamsGermanyStandings,endpointTeamsItalyStandings, 
                  endpointTeamsFranceStandings, endPointCountries } 
from './scpritApi.js';

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
            insertFlagLeagueIntoNav(flagURLFrance, "SERIE_A_SPAN");
            insertFlagLeagueIntoNav(flagURLItaly, "LEAGUE_1_SPAN");

        })
        .catch(error => console.log(error))

    
    addEventToButtonLeague(buttonLaLiga,endpointTeamsSpainStandings,spainFirstDivisionTeams,urlLogoSpain);
    addEventToButtonLeague(buttonSerieA,endpointTeamsItalyStandings,italyFirstDivisionTeams,urlLogoItaly);
    addEventToButtonLeague(buttonBundesliga,endpointTeamsGermanyStandings,germanyFirstDivisionTeams,urlLogoGermany);
    addEventToButtonLeague(buttonLeague1,endpointTeamsFranceStandings,franceFirstDivisionTeams,urlLogoLeague1);
    addEventToButtonLeague(buttonPremierLeague,endpointTeamsEnglandStandings,englandFirstDivisionTeams,urlLogoPremierLeague);

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