const defaultLoading = `
	<div class="xy-center lds-circle">
		<div></div>
	</div>
`;

function loading(element, html = defaultLoading) {
	element.innerHTML = html;
};

export default loading;