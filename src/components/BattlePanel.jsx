import { TYPES } from '../data/problems.js';

export default function BattlePanel(props) {
  const { question, enemy, enemyHp, hpPercent, rareMode, selectedType, setSelectedType, input, setInput, inputMode, setInputMode, getFactorPartsForQuestion, addPart, clearInput, checkAnswer, nextProblem, showHint, message, messageColor, combo, hintLevel, timeLeft, rank } = props;
  return (
    <div className="card">
      <h2>⚔️ バトル開始</h2>
      <p>{rareMode ? '✨古代スクエアム（レア）出現！' : `${question.monster}が現れた！`}</p>
      {rareMode && <div className="notice">レア出現！限定紋章＆限定図鑑チャンス！</div>}
      <div className="enemy">
        <div className="row"><b>{enemy.name}</b><span>HP {enemyHp} / {enemy.maxHp}</span></div>
        <div className="bar"><div className="hp" style={{ width: hpPercent + '%' }} /></div>
      </div>
      <div className="problem">
        <div className="row"><span>⏱️ {timeLeft}s</span><b>ランク：{rank}</b></div>
        <div className="expression">{question.exp}</div>
        <small>難易度★{question.level}</small>
      </div>
      <h3>STEP1：何型？</h3>
      <div className="buttons">{TYPES.map((type) => <button key={type} onClick={() => setSelectedType(type)} className={selectedType === type ? 'selected' : ''}>{type}</button>)}</div>
      <h3>STEP2：因数分解せよ！</h3>
      <div className="buttons">
        <button onClick={() => setInputMode('easy')} className={inputMode==='easy'?'selected':''}>🟢かんたん</button>
        <button onClick={() => setInputMode('normal')} className={inputMode==='normal'?'selected':''}>🔵ふつう</button>
        <button onClick={() => setInputMode('hunter')} className={inputMode==='hunter'?'selected':''}>🔴ハンター</button>
      </div>
      {inputMode === 'easy' && <div className="parts"><b>因数パーツを選ぼう</b><div className="buttons">{getFactorPartsForQuestion().map((part, i)=><button key={i} onClick={()=>addPart(part)}>{part}</button>)}</div><button onClick={clearInput}>入力クリア</button></div>}
      <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder={inputMode==='hunter'?'完全入力で挑戦！':'例：(x+5)(x-5) ※順番違い・全角もOK'} />
      <small>🟢かんたん：パーツ選択　🔵ふつう：手入力＋表記ゆれOK　🔴ハンター：完全入力でS狙い</small>
      <div className="buttons main"><button onClick={checkAnswer}>攻撃する</button><button onClick={nextProblem}>次の式へ</button><button onClick={showHint}>ヒントを見る</button></div>
      <div className={`message ${messageColor}`}><b>📣 判定メッセージ</b><p>{message}</p><p>見抜きコンボ：{combo}</p><p>ヒント使用：{hintLevel} / {question.hints.length}</p></div>
    </div>
  );
}
