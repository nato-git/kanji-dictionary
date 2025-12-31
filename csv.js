// グローバルスコープで data を保持するための変数
let kanjiData = [];

// CSVを読み込み、dataを構築し、HTMLを生成する関数
async function csvFile() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n');

  // data を構築し、グローバル変数に格納する
  kanjiData = rows
    .map((row) => {
      const columns = row.split(',');
      // CSVファイルの行末に余分な空行がある場合に備えて、内容（columns[2]）が空でないかチェック
      if (!columns[2]) return null;

      return {
        音読み: columns[0],
        訓読み: columns[1],
        内容: columns[2],
        部首: columns[3],
        画数: columns[4],
        熟語: columns[5],
        熟語ふりがな: columns[6],
      };
    })
    .filter((item) => item !== null); // nullをフィルタリングして除外

  // AタグのHTMLを生成する処理
  for (let i = 0; i < kanjiData.length; i++) {
    // data.length が想定より短い場合、ここでエラーにならないように i < kanjiData.length の条件が必要

    //1年生
    if (i >= 0 && i <= 80) {
      document.getElementById('one').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //2年生
    else if (i >= 81 && i <= 240) {
      document.getElementById('two').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //3年生
    else if (i >= 241 && i <= 441) {
      document.getElementById('three').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //4年生
    else if (i >= 442 && i <= 642) {
      document.getElementById('four').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //5年生
    else if (i >= 643 && i <= 828) {
      document.getElementById('five').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //6年生
    else if (i >= 829 && i <= 1010) {
      document.getElementById('six').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
  }
  return kanjiData;
}

// グローバルスコープに配置された kanjiButton 関数
// クリック時に実行され、グローバルの kanjiData にアクセスする
function kanjiButton(i) {
  const kanjiHTML = `<div class="kanji-detail">
    <h2><ruby>漢字<rt>かんじ</rt></ruby>：${kanjiData[i].内容}</h2>
    <p><ruby>音読み<rt>おんよみ</rt></ruby>：${kanjiData[i].音読み}</p>
    <p><ruby>訓読み<rt>くんよみ</rt></ruby>：${kanjiData[i].訓読み}</p>
    <p><ruby>部首<rt>ぶしゅ</rt></ruby>：${kanjiData[i].部首}</p>
    <p><ruby>画数<rt>かくすう</rt></ruby>：${kanjiData[i].画数}</p>
    <p class="end"><ruby>熟語<rt>じゅくご</rt></ruby>：<ruby>${kanjiData[i].熟語}<rt>${kanjiData[i].熟語ふりがな}</rt></ruby></p>
    <a href="home.html"><ruby>戻る<rt>もどる</rt></ruby></a>
    </div>
  `;
  document.body.innerHTML = kanjiHTML;
}

// 最後に実行
csvFile();

document.getElementById('findarea').addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    const FindWord = document.getElementById('findarea').value;
    var pushWord = '';
    for (let i = 0; i < kanjiData.length; i++) {
      if (FindWord === kanjiData[i].内容) {
        pushWord = `<div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>`;
        document.getElementById('AreaReturn').innerHTML = pushWord;
        return;
      }
    }
    if (pushWord == '') {
      pushWord =
        '<div><p><ruby>小学生<rt>しょうがくせい<rt></ruby>の<ruby>範囲<rt>はんい<rt></ruby>ではありません</p></div>';
      document.getElementById('AreaReturn').innerHTML = pushWord;
      return;
    }
  }
});

document
  .getElementById('findarea_sound')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // 入力値をひらがなに変換
      const rawInput = document.getElementById('findarea_sound').value.trim();
      const findWord = toHiragana(rawInput);

      if (!findWord) return;

      let pushWord = '';

      for (let i = 0; i < kanjiData.length; i++) {
        // データの音読み・訓読みもひらがなに変換して比較
        const onyomiList = kanjiData[i].音読み
          .split('・')
          .map((y) => toHiragana(y));
        const kunyomiList = kanjiData[i].訓読み.split('・').map((y) => {
          // 送り仮名を除去
          const base = y.includes('（') ? y.substring(0, y.indexOf('（')) : y;
          return toHiragana(base);
        });

        if (onyomiList.includes(findWord) || kunyomiList.includes(findWord)) {
          pushWord += `<div>
          <a href="#" onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>`;
        }
      }

      if (pushWord === '') {
        pushWord =
          '<div><p><ruby>小学生<rt>しょうがくせい</rt></ruby>の<ruby>範囲<rt>はんい</rt></ruby>ではありません</p></div>';
      }
      document.getElementById('AreaReturn').innerHTML = pushWord;
    }
  });

/**
 * カタカナをひらがなに変換する関数
 */
function toHiragana(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}
