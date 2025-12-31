const imageZone = document.getElementById('image_zone');
imageZone.addEventListener('change', resizePinnedImage, false);

async function loadKanjiData() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n').filter((row) => row.trim() !== '');

  const data = rows
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
      };
    })
    .filter((item) => item !== null);

  return data; // 漢字データの配列を返す
}

async function resizePinnedImage(e) {
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = 'ロード中...';

  const file = e.target.files[0];
  if (!file || !file.type.match('image.*')) {
    outputElement.innerHTML = '画像ファイルを選択してください。';
    return;
  }

  const kanjiData = await loadKanjiData();

  // OCR処理に必要なインデックスマップを作成
  const kanjiToIndexMap = new Map();
  kanjiData.forEach((item, index) => {
    kanjiToIndexMap.set(item.内容, index);
  }); // OCR開始

  Tesseract.recognize(file, 'jpn', { logger: (m) => console.log(m) })
    .then(({ data: { text } }) => {
      if (!kanjiData || kanjiData.length === 0) {
        outputElement.innerHTML = 'CSVデータのロードに失敗しました。';
        return;
      }

      const recognizedChars = text.split('');
      outputElement.innerHTML = ''; // 出力エリアのヘッダー // 結果を一時的に保持する HTML 文字列

      let matchedHtml = ''; // 認識された文字を1文字ずつチェック

      for (const char of recognizedChars) {
        // Mapを使ってインデックスを取得
        const index = kanjiToIndexMap.get(char);

        if (index !== undefined) {
          // 【修正】該当する漢字が存在する場合、<a>タグを作成し、インデックスを渡す
          matchedHtml += `<a href=# onclick="kanjiButton(${index})">${char}</a>`;
        }
      } // ループを抜けた後、最後に一度だけ出力する

      if (matchedHtml.length > 0) {
        outputElement.innerHTML += matchedHtml;
      } else {
        outputElement.innerHTML = '該当する漢字が見つかりませんでした。';
      }
    })
    .catch((error) => {
      console.error('OCR処理中にエラーが発生しました:', error);
      outputElement.innerHTML = 'OCR処理中にエラーが発生しました。';
    });
}
