const params = new URLSearchParams(window.location.search);
const word = params.get('index');
let kanjiData = [];

function kanjiButton(i) {
  const title = document.getElementById('title');
  const onYomi = document.getElementById('on-yomi');
  const kunYomi = document.getElementById('kun-yomi');
  const bushu = document.getElementById('bushu');
  const kakusuu = document.getElementById('kakusuu');
  const jukugo = document.getElementById('jukugo');
  title.innerHTML += `<h2>${kanjiData[i].内容}</h2>`;
  onYomi.innerHTML += `<p>音読み：${kanjiData[i].音読み}</p>`;
  kunYomi.innerHTML += `<p>訓読み：${kanjiData[i].訓読み}</p>`;
  bushu.innerHTML += `<p>部首：${kanjiData[i].部首}</p>`;
  kakusuu.innerHTML += `<p>画数：${kanjiData[i].画数}</p>`;
  jukugo.innerHTML += `<p><ruby>${kanjiData[i].熟語}<rt>${kanjiData[i].熟語ふりがな}</rt></ruby></p>`;
}

async function loadKanjiData() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n').filter((row) => row.trim() !== '');

  kanjiData = rows
    .map((row) => {
      const columns = row.split(',');
      if (columns.length < 3 || !columns[2]) return null;

      return {
        音読み: columns[0],
        訓読み: columns[1],
        内容: columns[2], // 漢字本体
        部首: columns[3],
        画数: columns[4],
        熟語: columns[5],
        熟語ふりがな: columns[6],
      };
    })
    .filter((item) => item !== null);
  kanjiButton(word);
  return kanjiData; // 漢字データの配列を返す
}

loadKanjiData();