async function csvFile() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n');
  const data = rows.map((row) => {
    const columns = row.split(',');
    return {
      教科: columns[0],
      ID: columns[1],
      内容: columns[2],
      元の行番号: columns[3],
    };
  });
  for (let i = 0; i < data.length; i++) {
    if (data[i].内容.length != 1) {
      document.getElementById('mains').innerHTML += `
        <div>
          <strong>${data[i].内容}</strong><br>
        </div>
      `;
    } else {
      document.getElementById('mains').innerHTML += `
      <div class="kanji">
        <p>${data[i].内容}</p>
      </div>
    `;
    }
  }
}

csvFile();
