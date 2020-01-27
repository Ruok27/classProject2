    let rowContent; 

	// Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
	function getScoresForTable() {
		$.ajax({
            url: "/api/getscores",
            method: 'GET',
            dataType: 'json'
        }).then(function(response) {
            console.log(response)
            for (let i = 0; i < response.length; i++) {
                playerId = response[i].UserId;
                player = "whovever's info corresponds to playerId";
                score = response[i].score;
                let tableRow = $("<tr class='tables'>").append(
                    $("<td>").text(playerId),
                    $("<td>").text(player),
                    $("<td>").text(score)
                );
                $("#table").find("tbody").append(tableRow);
            }
        })
    }

    getScoresForTable();

