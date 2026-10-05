const searchInput = document.getElementById("search");
const statusMessage = document.getElementById("status");
const playerList = document.getElementById("player-list");
const teamFilter = document.getElementById("team-filter");
const sortOrder = document.getElementById("sort-order");

let players = [];

function displayPlayers(playersToShow)
{
    playerList.textContent = "";

    for(const player of playersToShow)
    {
        const card = document.createElement("article");

        const name = document.createElement("h3");
        name.textContent = player.name;

        const team = document.createElement("p");
        team.textContent = "Team: " + player.team;

        const points = document.createElement("p");
        points.textContent = "Points: " + player.points;

        card.append(name, team, points);
        playerList.append(card);
    }
}

function populateTeams()
{
    const teamNames = [];

    for(const player of players)
    {
        if(!teamNames.includes(player.team))
        {
            teamNames.push(player.team);
        }
    }

    teamNames.sort();

    for(const teamName of teamNames)
    {
        const option = document.createElement("option");
        option.value = teamName;
        option.textContent = teamName;
        teamFilter.append(option);
    }
}

function comparePlayers(firstPlayer, secondPlayer)
{
    if(sortOrder.value === "name-asc")
    {
        return firstPlayer.name.localeCompare(secondPlayer.name);
    }
    else if(sortOrder.value === "name-desc")
    {
        return secondPlayer.name.localeCompare(firstPlayer.name);
    }
    else if(sortOrder.value === "points-desc")
    {
        return secondPlayer.points - firstPlayer.points;
    }
    else
    {
        return firstPlayer.points - secondPlayer.points;
    }
}

async function loadPlayers()
{
    statusMessage.textContent = "Loading players...";

    try
    {
        const response = await fetch("nba-players.json");

        if(!response.ok)
        {
            throw new Error("Unable to load the player file.");
        }

        players = await response.json();
        populateTeams();
        searchPlayers();

    }
    catch(error)
    {
        statusMessage.textContent = "Unable to load players. Please try refreshing.";
        console.error(error);
    }
}

function searchPlayers()
{
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedTeam = teamFilter.value;
    const filteredPlayers = [];

    for(const player of players)
    {
        const matchesName = player.name.toLowerCase().includes(searchText);
        const matchesTeam = selectedTeam === "" || player.team === selectedTeam;

        if(matchesName && matchesTeam)
        {
            filteredPlayers.push(player);
        }
    }

    filteredPlayers.sort(comparePlayers);
    displayPlayers(filteredPlayers);

    if(filteredPlayers.length === 0)
    {
        statusMessage.textContent = "No players found.";
    }
    else if(filteredPlayers.length === 1)
    {
        statusMessage.textContent = "1 player found.";
    }
    else
    {
        statusMessage.textContent = filteredPlayers.length + " players found.";
    }
}

searchInput.addEventListener("input", searchPlayers);
teamFilter.addEventListener("change", searchPlayers);
sortOrder.addEventListener("change", searchPlayers);

loadPlayers();