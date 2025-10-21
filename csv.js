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
    //1年生
    if (i >= 0 && i <= 80) {
      document.getElementById('one').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
    //2年生
    else if (i >= 81 && i <= 240) {
      document.getElementById('two').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
    //3年生
    else if (i >= 241 && i <= 441) {
      document.getElementById('three').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
    //4年生
    else if (i >= 442 && i <= 642) {
      document.getElementById('four').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
    //5年生
    else if (i >= 643 && i <= 828) {
      document.getElementById('five').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
    //6年生
    else if (i >= 829 && i <= 1010) {
      document.getElementById('six').innerHTML += `
      <div>
        <p>${data[i].内容}</p>
      </div>
    `;
    }
  }
}

csvFile();
