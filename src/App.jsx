import { useEffect, useState } from 'react';
import LoginPanel from './components/LoginPanel.jsx';
import TabMenu from './components/TabMenu.jsx';
import WorldMap from './components/WorldMap.jsx';
import BattlePanel from './components/BattlePanel.jsx';
import MonsterBook from './components/MonsterBook.jsx';
import RaidPanel from './components/RaidPanel.jsx';
import TeacherPanel from './components/TeacherPanel.jsx';
import { getWorldAreas } from './data/areas.js';
import { getMonsterBook } from './data/monsters.js';
import { randomProblem } from './utils/problemGenerator.js';
import { readNumber, saveProgress } from './utils/saveProgress.js';
import { sameFactorization } from './utils/answerCheck.js';
import { getStudentProfile, clearStudentProfile } from './utils/studentProfile.js';
import { sendTeacherData } from './utils/teacherSync.js';

const TABS = [
  { id: 'adventure', label: '⚔️冒険' },
  { id: 'book', label: '📖図鑑' },
  { id: 'raid', label: '👑レイド' },
  { id: 'teacher', label: '📊教師' },
];

export default function App() {
  const [profile, setProfile] = useState(() => getStudentProfile());
  const [activeTab, setActiveTab] = useState('adventure');
  const [question, setQuestion] = useState(randomProblem());
  const [selectedType, setSelectedType] = useState('');
  const [input, setInput] = useState('');
  const [inputMode, setInputMode] = useState('normal');
  const [enemyHp, setEnemyHp] = useState(620);
  const [message, setMessage] = useState('まず「何型か」を見抜こう！');
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(() => readNumber('fh_level', 1));
  const [xp, setXp] = useState(() => readNumber('fh_xp', 0));
  const [captured, setCaptured] = useState(() => readNumber('fh_captured', 0));
  const [streak, setStreak] = useState(() => readNumber('fh_streak', 0));
  const [rareMode, setRareMode] = useState(false);
  const [lastResult, setLastResult] = useState('neutral');
  const [hintLevel, setHintLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [rank, setRank] = useState('-');
  const [teacherSync, setTeacherSync] = useState({ online: 28, total: 30, lastUpload: '待機中' });

  useEffect(() => {
    setTimeLeft(20);
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [question]);

  if (!profile) return <LoginPanel onLogin={setProfile} />;

  const enemy = { name: rareMode ? '古代スクエアム' : question.monster, maxHp: 1000 };
  const hpPercent = Math.round((enemyHp / enemy.maxHp) * 100);
  const worldAreas = getWorldAreas({ captured, level, streak });
  const monsterBook = getMonsterBook({ captured, rareMode });
  const messageColor = { neutral: 'neutral', success: 'success', warning: 'warning', danger: 'danger' }[lastResult];

  const answerTests = [
    { label: '順番違い', user: '(x-5)(x+5)', answers: ['(x+5)(x-5)'] },
    { label: '全角かっこ・全角記号', user: '（x＋５）（x−５）', answers: ['(x+5)(x-5)'] },
    { label: '係数外出し順番違い', user: '(x+2)6', answers: ['6(x+2)'] },
    { label: '大文字X', user: '(X+7)(X-7)', answers: ['(x+7)(x-7)'] },
  ];

  const checkAnswer = async () => {
    if (!selectedType) { setLastResult('warning'); setMessage('先に「何型か」を選ぼう！式の顔を見るのがハンターの基本だ！'); return; }
    if (!input.trim()) { setLastResult('warning'); setMessage('答えを入力してから攻撃しよう！'); return; }

    const typeCorrect = selectedType === question.type;
    const answerCorrect = sameFactorization(input, question.answers);

    if (typeCorrect && answerCorrect) {
      const currentRank = timeLeft >= 15 && hintLevel === 0 ? 'S' : timeLeft >= 10 ? 'A' : timeLeft >= 5 ? 'B' : 'C';
      const damage = 150 + question.level * 50 + combo * 30 + (currentRank === 'S' ? 500 : 0);
      const gainedXp = 50 + question.level * 20 + (currentRank === 'S' ? 30 : 0);
      const newXp = xp + gainedXp;
      const newLevel = Math.floor(newXp / 300) + 1;
      const nextHp = Math.max(enemyHp - damage, 0);
      const newCaptured = nextHp === 0 ? captured + 1 : captured;
      const newStreak = streak + 1;

      setRank(currentRank); setEnemyHp(nextHp); setXp(newXp); setLevel(newLevel); setCaptured(newCaptured); setStreak(newStreak); setCombo(combo + 1); setRareMode(newStreak >= 10); setLastResult('success'); setHintLevel(0);
      saveProgress({ xp: newXp, level: newLevel, captured: newCaptured, streak: newStreak });
      await sendTeacherData({ type: question.type, expression: question.exp, selectedType, input, rank: currentRank, hints: hintLevel, time: 20 - timeLeft, combo: combo + 1, correct: true, level: newLevel, xp: newXp, captured: newCaptured, streak: newStreak });
      setTeacherSync((prev)=>({ ...prev, lastUpload: '送信完了' }));
      setMessage(`【${currentRank}判定】見抜き成功！ ${damage}ダメージ！ ${nextHp === 0 ? '捕獲成功！' : '紋章が弱まった！'}`);
      return;
    }

    setCombo(0); setStreak(0); setRareMode(false); setRank('-');
    if (!typeCorrect) { setLastResult('danger'); setMessage(`型が違う！これは「${question.type}」の特徴を持っているぞ。ヒントを使って式の顔を見よう。`); }
    else { setLastResult('warning'); setMessage('型は合っている！ヒントを使って、計算・符号・かっこの順番を確認しよう。'); }
  };

  const nextProblem = () => { setQuestion(randomProblem()); setSelectedType(''); setInput(''); setMessage('新しい式が現れた！まず「何型か」を見抜こう！'); setLastResult('neutral'); setHintLevel(0); setRank('-'); if (enemyHp === 0) setEnemyHp(620); };
  const showHint = () => { const nextLevel = Math.min(hintLevel + 1, question.hints.length); setHintLevel(nextLevel); setLastResult('warning'); setMessage(`ヒント${nextLevel}：${question.hints[nextLevel - 1]}`); };
  const getFactorPartsForQuestion = () => { const answer = question.answers[0] || ''; const baseParts = answer.split(')').map((part) => part.trim()).filter(Boolean).map((part) => `${part})`); const distractors = ['(x+1)', '(x-1)', '(x+2)', '(x-2)', '(x+3)', '(x-3)', '(x+5)', '(x-5)', '2x', '3x']; return Array.from(new Set([...baseParts, ...distractors])).slice(0, 10); };

  return (
    <div className="page">
      <div className="app">
        <header>
          <h1>因数分解ハンターズ</h1>
          <p>Ver1.0 完成版</p>
          <div className="status"><span>{profile.number}番 {profile.name}</span><span>{profile.group}</span><span>Lv.{level}</span><span>XP:{xp}</span><span>捕獲:{captured}</span><span>連勝:{streak}</span><button onClick={()=>{clearStudentProfile(); location.reload();}}>登録やり直し</button></div>
        </header>
        <TabMenu tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'adventure' && <><WorldMap worldAreas={worldAreas} /><BattlePanel question={question} enemy={enemy} enemyHp={enemyHp} hpPercent={hpPercent} rareMode={rareMode} selectedType={selectedType} setSelectedType={setSelectedType} input={input} setInput={setInput} inputMode={inputMode} setInputMode={setInputMode} getFactorPartsForQuestion={getFactorPartsForQuestion} addPart={(part) => setInput((prev) => prev + part)} clearInput={() => setInput('')} checkAnswer={checkAnswer} nextProblem={nextProblem} showHint={showHint} message={message} messageColor={messageColor} combo={combo} hintLevel={hintLevel} timeLeft={timeLeft} rank={rank} /></>}
        {activeTab === 'book' && <MonsterBook monsterBook={monsterBook} />}
        {activeTab === 'raid' && <RaidPanel />}
        {activeTab === 'teacher' && <TeacherPanel answerTests={answerTests} teacherSync={teacherSync} />}
      </div>
    </div>
  );
}
