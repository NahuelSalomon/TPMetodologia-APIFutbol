
import { addBodyHeader } from './scriptHome.js';

function cleanTable() {

    var bodyTable = document.getElementById("bodyTable");
    var headTable = document.getElementById("headTable");
    var logoHead = document.getElementById("logo");
    var panel = document.getElementById("panel");
    var rawTablePositions = document.getElementById("rawTablePositions");


    if(document.getElementById("divLogo")) {
        logoHead.removeChild(document.getElementById("divLogo"));
    }

/*     while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }

    while (headTable.firstChild) {
        headTable.removeChild(headTable.firstChild);
    } */
/* 
    if(panel) {
        while (panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
    } */



        while (panel.firstChild) {

            panel.removeChild(panel.firstChild);
        }
    


    
}

function addHeadTable(urlImageLeague) {
    
    var panel = document.getElementById("panel")

    var divConteinerFluid = document.createElement("div");
    divConteinerFluid.classList.add("container-fluid", "mt--6");
    panel.appendChild(divConteinerFluid);

    var divRawTablePositions= document.createElement("div");
    divRawTablePositions.classList.add("row");
    divRawTablePositions.id = "rawTablePositions";
    divConteinerFluid.appendChild(divRawTablePositions);

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
                       /*  
                           var logoHead = document.getElementById("logo");logoHead.appendChild(divImageLeague);
 */
                        var imageLeague = document.createElement("img");
                        imageLeague.src = urlImageLeague;
                        divImageLeague.appendChild(imageLeague);
                            
                        var thRank = document.createElement("th");
                        thRank.scope = "col";
                        thRank.innerHTML = "#";
                        headTable.appendChild(thRank);

                        var thName = document.createElement("th");
                        thName.scope = "col";
                        thName.innerHTML = "Team"
                        headTable.appendChild(thName);

                        var thPoints = document.createElement("th");
                        thPoints.scope = "col";
                        thPoints.innerHTML = "Points"
                        headTable.appendChild(thPoints);

                        var thPL = document.createElement("th");
                        thPL.scope = "col";
                        thPL.innerHTML = "PL"
                        headTable.appendChild(thPL);

                        var thW = document.createElement("th");
                        thW.scope = "col";
                        thW.innerHTML = "W"
                        headTable.appendChild(thW);

                        var thD = document.createElement("th");
                        thD.scope = "col";
                        thD.innerHTML = "D"
                        headTable.appendChild(thD);

                        var thL = document.createElement("th");
                        thL.scope = "col";
                        thL.innerHTML = "L"
                        headTable.appendChild(thL);

                        /* var thGF = document.createElement("th");
                        thGF.scope = "col";
                        thGF.innerHTML = "GF"
                        headTable.appendChild(thGF);

                        var thGA = document.createElement("th");
                        thGA.scope = "col";
                        thGA.innerHTML = "GA"
                        headTable.appendChild(thGA); */

                        var thGD = document.createElement("th");
                        thGD.scope = "col";
                        thGD.innerHTML = "GD"
                        headTable.appendChild(thGD);

                    var bodyTable = document.createElement("tbody");
                    bodyTable.classList.add("list");
                    bodyTable.id = "bodyTable";
                    tablePosition.appendChild(bodyTable);

}

function insertTeamsIntoTable(team) {

    console.log(team);

    var bodyTable = document.getElementById("bodyTable");

    var tr = document.createElement("tr");
    tr.classList.add("tbody-dark");
    bodyTable.appendChild(tr);

    var tdRank = document.createElement("td");
    tdRank.classList.add("tbody-dark");
    tr.appendChild(tdRank);
    tdRank.innerHTML = team["rank"];

    var tdName = document.createElement("td");
    tdName.classList.add("tbody-dark");
    tr.appendChild(tdName);
    tdName.innerHTML = `<div class="media align-items-center">
                            <a href="#" class="avatar img mr-3">
                                <img alt="Team logo" src=" ${team["team"]["logo"]}">
                            </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm\">${team["team"]["name"]}</span>
                            </div>
                        </div>`;

    var tdPoints = document.createElement("td");
    tdPoints.classList.add("tbody-dark");
    tdPoints.style.backgroundColor = "#46C282";
    tr.appendChild(tdPoints);
    tdPoints.innerHTML = team["points"];

    var tdMatchesPlayed = document.createElement("td");
    tdMatchesPlayed.classList.add("tbody-dark");
    tr.appendChild(tdMatchesPlayed);
    tdMatchesPlayed.innerHTML = team["all"]["played"];

    var tdWin = document.createElement("td");
    tdWin.classList.add("tbody-dark");
    tr.appendChild(tdWin);
    tdWin.innerHTML = team["all"]["win"];

    var tdLose = document.createElement("td");
    tdLose.classList.add("tbody-dark");
    tr.appendChild(tdLose);
    tdLose.innerHTML = team["all"]["lose"];

    var tdDraw = document.createElement("td");
    tdDraw.classList.add("tbody-dark");
    tr.appendChild(tdDraw);
    tdDraw.innerHTML = team["all"]["draw"];

    /* var tdGoalsFor = document.createElement("td");
    tdGoalsFor.classList.add("tbody-dark");
    tr.appendChild(tdGoalsFor);
    tdGoalsFor.innerHTML = team["all"]["goals"]["for"];

    var tdGoalsAgainst = document.createElement("td");
    tdGoalsAgainst.classList.add("tbody-dark");
    tr.appendChild(tdGoalsAgainst);
    tdGoalsAgainst.innerHTML = team["all"]["goals"]["against"]; */

    var tdGoalDiff = document.createElement("td");
    tdGoalDiff.classList.add("tbody-dark");
    tr.appendChild(tdGoalDiff);
    tdGoalDiff.innerHTML = team["goalsDiff"];



}

function updatePositionsTable(teams,urlLogo) {
    
    cleanTable();
    addBodyHeader();
    addHeadTable(urlLogo);

    teams[0].forEach(team => {
        insertTeamsIntoTable(team);
    });

}

export{cleanTable,addHeadTable,insertTeamsIntoTable,updatePositionsTable};