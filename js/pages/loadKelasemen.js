import api from '../api/api.js';
import loading from '../utils/loading.js';

function loadKelasemen() {
	const content = document.getElementById('kelasemen');

	if(content) {
		loading(content);

		api.getStandings()
			.then(standings => {

				content.innerHTML = `
					<div class="row">
						<div class="col s12 center-align">
							<span>PG: Played Games | </span>
							<span>W: Won | </span>
							<span>D: Draw | </span>
							<span>L: Lost | </span>
							<span>GF: Goal For | </span>
							<span>GA: Goals Against | </span>
							<span>GD: Goals Difference | </span>
							<span>Pts: Points</span>
						</div>
					</div>
					<table class="responsive-table">
					  <thead>
					    <tr>
					      <th>Club</th>
					      <th>PG</th>
					      <th>W</th>
					      <th>D</th>
					      <th>L</th>
					      <th>GF</th>
					      <th>GA</th>
					      <th>GD</th>
					      <th>Pts</th>
					    </tr>
					  </thead>

					  <tbody id="kelasemen-table-body"></tbody>
					</table>
				`;

				const tableBody = document.getElementById('kelasemen-table-body');
				
				for(let standing of standings) {
					tableBody.innerHTML += `
				    <tr>
				    	<td>
				    		${standing.position} ${standing.team.name}
				    		<img class="m-2" src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
				    	</td>
				    	<td>${standing.playedGames}</td>
				    	<td>${standing.won}</td>
				    	<td>${standing.draw}</td>
				    	<td>${standing.lost}</td>
				    	<td>${standing.goalsFor}</td>
				    	<td>${standing.goalsAgainst}</td>
				    	<td>${standing.goalDifference}</td>
				    	<td>${standing.points}</td>
				    </tr>
					`;
				}
			})
	}
};

export default loadKelasemen;
