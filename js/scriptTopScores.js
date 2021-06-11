import { callApi } from './scpritApi.js';

export const scores = new Array();

export function chargeTopScores(scores, season, league){
    callApi("players/topscorers?season="+season+"&league="+league)
    .then(response => {
        scores.push(response["response"]);
    })
    .catch(error => { console.log(error); });
}

export function createTable(id) {
   
var divRawTablePositions = document.getElementById("rawTablePositions");

        var divCol = document.createElement("div");
        divCol.classList.add("col");
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

                        var thPlayer = document.createElement("th");
                        thPlayer.scope = "col";
                        thPlayer.innerHTML = "Player"
                        headTable.appendChild(thPlayer);

                        var thTeam = document.createElement("th");
                        thTeam.scope = "col";
                        thTeam.innerHTML = "Team"
                        headTable.appendChild(thTeam);

                        var thGoals = document.createElement("th");
                        thGoals.scope = "col";
                        thGoals.innerHTML = "Goals"
                        headTable.appendChild(thGoals);

                    var bodyTable = document.createElement("tbody");
                    bodyTable.classList.add("list");
                    bodyTable.id = "bodyTable"+id;
                    tablePosition.appendChild(bodyTable);

}


export function insertPlayerIntoTable(player, id) {

    var bodyTable = document.getElementById("bodyTable"+id);

    var tr = document.createElement("tr");
    tr.classList.add("tbody-dark");
    bodyTable.appendChild(tr);

    var tdName = document.createElement("td");
    tdName.classList.add("tbody-dark");
    tr.appendChild(tdName);
    tdName.innerHTML = `<div class="media align-items-center">
                            <a href="#" class="avatar img mr-3">
                                <img alt="player logo" src=" ${player["player"]["photo"]}">
                            </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm\">${player["player"]["name"]}</span>
                            </div>
                        </div>`;

    var tdTeam = document.createElement("td");
    tdTeam.classList.add("tbody-dark");
    tdTeam.style.backgroundColor = "#46C282";
    tr.appendChild(tdTeam);
    tdTeam.innerHTML = `<div class="media align-items-center">
                            <a href="#" class="avatar img mr-3">
                                <img alt="player logo" src=" ${player["statistics"][0]["team"]["logo"]}">
                            </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm\">${player["statistics"][0]["team"]["name"]}</span>
                            </div>
                        </div>`;

    var tdGoals = document.createElement("td");
    tdGoals.classList.add("tbody-dark");
    tdGoals.style.backgroundColor = "#46C282";
    tr.appendChild(tdGoals);
    tdGoals.innerHTML = player["statistics"][0]["goals"]["total"];

}


export function updateTable(scores, sesion ,league) {
    
    createTable(league);

    scores[0].forEach(player => {
        insertPlayerIntoTable(player,league);
    });

}