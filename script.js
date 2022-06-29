
// no context menu
window.addEventListener('contextmenu', function(e) {
	e.preventDefault();
});

// output
function downloads() {
	let url = 'https://raw.githubusercontent.com/SyntLang/releases/main/latest.csv';

	fetch(url).then(response => response.text()).then(csv_raw => {
		let csv = csv_raw.split('\n');
		csv.pop();

		let downloads = [];
		for (let download of csv) {
			let [name, icon, desc, btndataraw] = download.split(',');
			
			let urls_raw = btndataraw.split(';');
			let urls = [];

			for (let url of urls_raw) {
				let [btn, value] = url.split('?==');
				urls.push({name: btn, url: value});
			}

			let data = {
				name: name,
				icon: icon,
				desc: desc,
				urls: urls
			};

			downloads.push(data);
		}

		let downloads_html = '';

		for (let download of downloads) {
			downloads_html += `
				<div class="card">
					<div class="card-icon">
						<i class="${download.icon}"></i>
					</div>
					<div class="card-title">
						${download.name}
					</div>
					<div class="card-desc">
						${download.desc}
					</div>
					<div class="card-button">
			`;

			for (let url of download.urls) {
				downloads_html += `
					<a href="${url.url}">
						<button>
							<i class="fa-solid fa-download"></i>
							${url.name}
						</button>
					</a>
				`;
			}
					
			downloads_html += `
					</div>
				</div>
			`;
		}


		document.getElementById('downloads').innerHTML = downloads_html;
	});
}

downloads();

