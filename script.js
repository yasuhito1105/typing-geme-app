// const RANDOM_SENTENCE_URL_API ="https://meigen.doodlenote.net/api/json.php?c=1";
// const typeDisplay =document.getElementById("typeDisplay");
// const typeInput = document.getElementById("type-Input");
// const timer = document.getElementById("timer");

// 下のコードでヘッダーの処理をなくす この処理はnode.jsを入れないと使えないらしい//
// fetch('https://meigen.doodlenote.net/api/json.php?c=1', {
//     mode: 'no-cors'
//   })

// //非同期の処理//
// async function getRandomSentence() {
//   try {
//       const response = await fetch(RANDOM_SENTENCE_URL_API);
//       const data = await response.json();
//       return data[1].meigen;
//   } catch (error) {
//       console.error('Error fetching sentence:', error);
//       return "名言の取得に失敗しました"; // エラー時の代替メッセージ
//   }
// }

// async function renderNextSentence() {
//   try {
//       const meigen = await getRandomSentence();
//       typeDisplay.innerText = meigen;
//       typeInput.innerText = "";
//       // ... (タイマーの処理は省略)
//   } catch (error) {
//       console.error('Error rendering sentence:', error);
//         StartTimer();
//   }
//   let startTime;
// let originTime = 30;
// function StartTimer() {
//   timer.innerText = originTime;
//   startTime = new Date();
//   setInterval(() => {
//     timer.innerText = originTime - getTimerTime();
//     if (timer.innerText <= 0)TimeUp();
//   },1000);
// }

// function getTimerTime(){
//   return Math.floor((new Date() - startTime) / 1000);
// }
// function TimeUp(){
//   RenderNextSentence();
// }
// }

//非同期の処理//
// function GetRandomSentence(){
//   return fetch(RANDOM_SENTENCE_URL_API)
//     .then((response) => response.json())
//     .then((data) => console.log(data[0].meigen));
// }
// GetRandomSentence();

// async function RenderNextSentence(){
//   const sentence = await GetRandomSentence();
//   // console.log(sentence)
//   typeDisplay.innerText = sentence;


//   typeInput.innerText = "";

// }

// let startTime;
// let originTime = 30;
// function StartTimer() {
//   timer.innerText = originTime;
//   startTime = new Date();
//   setInterval(() => {
//     timer.innerText = originTime - getTimerTime();
//     if (timer.innerText <= 0)TimeUp();
//   },1000);
// }

// function getTimerTime(){
//   return Math.floor((new Date() - startTime) / 1000);
// }
// function TimeUp(){
//   RenderNextSentence();
// }
// renderNextSentence();

// ここからAPIを使わないコードを書く
// 表示する問題文の記述
const questions = [
  // 'JavaScript',
  'document',
  // 'const',
  'let',
  // 'var',//varはあまり使われてない定数
  // 'console',
  // 'addEventListener',
  // 'getElementById',
  // 'split',
  // 'Math',
  // 'click',
  // 'log',
  'function',
  'for',
];

const typeDisplay = document.getElementById('typeDisplay');
const typeArea = document.getElementById('typeArea');
const game = document.getElementById('game');
const message = document.getElementById('message');
const replayBtn = document.getElementById('replayBtn');
const typeQuestion = document.getElementById('type-Question');
const timerLabel = document.getElementById('timer');

let typeDisplayTextWords = [];
let typeInputTextWords = [];
// let typeInputTextWords = [];let typeInputTextWord = typeInput.textContent.split('');
let currentKer;
let currentText;
let startTime;
let time;
let intervalId;
let gameStarted = false; // ゲームが開始されたかどうかを追跡する変数


// タイマー関数
const timer = () => {
  time = ((Date.now() - startTime) / 1000).toFixed(2);
  timerLabel.textContent = time;
};

// 新しい問題文をセットする記述
const setQuestion = () =>{

  currentKer = Math.floor( Math.random() * questions.length );
  currentText = questions[ currentKer ];

  // 問題が重複しない処理
  questions.splice(currentKer, 1);
  // console.log(questions);

  typeDisplay.textContent = '';
  typeQuestion.textContent = currentText;

  // これまでに入力されたフォームのリセット
  typeArea.value = '';

  typeDisplayTextWords = [];
  typeInputTextWords = currentText.split('');
};

//ゲーム開始関数
const startGame = () => {
  gameStarted = true;
  startTime = Date.now();
  intervalId = setInterval(timer, 10);
  typeArea.focus(); // テキストエリアにフォーカスを当てる
};
setQuestion();

typeArea.addEventListener('input', (e) => {
  if (!gameStarted) return; // ゲームが開始されていない場合は何もしない

  if (typeInputTextWords[0] === e.data) {
    typeDisplayTextWords.push(typeInputTextWords[0]);
    typeInputTextWords.shift();

    // console.log('入力済み:' + typeDisplayTextWords);
    // console.log('未入力:' + typeInputTextWords)

    typeDisplay.textContent = typeDisplayTextWords.join('');
    typeQuestion.textContent = typeInputTextWords.join('');

    // 全ての文字が正しく入力されたら新しい問題文をセットする関数
    if (typeInputTextWords.length <= 0) {
        if (questions.length <= 0) {
          clearInterval(intervalId);
          game.classList.add('hidden'); //ゲーム画面を非表示
          message.classList.remove('hidden'); //終了メッセージの表示
        } else {
          setQuestion(); //新しい問題文をセット
        }
        // console.log('クリア');
        // setQuestion();
      }
  }
});
// 最初のエンターかスペースでスタートする記述
document.addEventListener('keydown', (e) => {
  if (!gameStarted && (e.key === 'Enter' || e.key === ' ')) {
    startGame();
    e.preventDefault(); //デフォルトの動作をキャンセル
  }
});
// もう一度プレイするボタンの機能
replayBtn.addEventListener('click', () => {
  window.location.reload();
});
// ゲーム開始時の処理
startTime = Date.now();
// const intervalId = setInterval(timer, 10);