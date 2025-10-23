const imageZone = document.getElementById('image_zone');
imageZone.addEventListener('change', resizePinnedImage, false);
function resizePinnedImage(e) {
  document.getElementById('output').innerHTML = 'ロード中...';
  const file = e.target.files[0];
  if (!file.type.match('image.*')) {
    return;
  }
  async function csvfile() {
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
  }
  Tesseract.recognize(
    file,
    'jpn', // 言語設定
    { logger: (m) => console.log(m) }
  ).then(({ data: { text } }) => {
    text = text.split('');
    document.getElementById('output').innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (text[i] === data[j].内容) {
          const out = document.getElementById('output');
          out.innerHTML += text;
        }
      }
    }
    if (document.getElementById('output').innerHTML === '') {
      document.getElementById('output').innerHTML =
        '該当する漢字が見つかりませんでした。';
    }
  });
}
