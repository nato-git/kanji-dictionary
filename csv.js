async function csvFile() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n');
  const data = rows.map((row) => {
    const columns = row.split(',');
    return {
      音読み: columns[0],
      訓読み: columns[1],
      内容: columns[2],
      部首: columns[3],
      画数: columns[4],
      熟語: columns[5],
    };
  });
  function kanjiButton(i) {
    const kanjiHTML = document.getElementById('body');
    kanjiHTML.innerHTML = `
    <h2>漢字：${data[i].内容}</h2>
    <p>音読み：${data[i].音読み}</p>
    <p>訓読み：${data[i].訓読み}</p>
    <p>部首：${data[i].部首}</p>
    <p>画数：${data[i].画数}</p>
    <p>熟語：${data[i].熟語}</p>
  `;
  }
  for (let i = 0; i < data.length; i++) {
    //1年生
    if (i >= 0 && i <= 80) {
      document.getElementById('one').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
    //2年生
    else if (i >= 81 && i <= 240) {
      document.getElementById('two').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
    //3年生
    else if (i >= 241 && i <= 441) {
      document.getElementById('three').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
    //4年生
    else if (i >= 442 && i <= 642) {
      document.getElementById('four').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
    //5年生
    else if (i >= 643 && i <= 828) {
      document.getElementById('five').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
    //6年生
    else if (i >= 829 && i <= 1010) {
      document.getElementById('six').innerHTML += `
      <div>
        <a href=# onclick="kanjiButton(${i})">${data[i].内容}</a>
      </div>
    `;
    }
  }
}

csvFile();
