import { sameFactorization } from '../utils/answerCheck.js';

export default function TeacherPanel({ answerTests, teacherSync }) {
  return (
    <>
      <div className="card">
        <h2>🧪 正答判定セルフチェック</h2>
        <div className="grid">{answerTests.map((test) => <div key={test.label} className="area unlocked"><b>{sameFactorization(test.user, test.answers) ? '✅' : '❌'} {test.label}</b><p>入力：{test.user}</p><p>正答：{test.answers[0]}</p></div>)}</div>
      </div>
      <div className="card">
        <h2>📊 ファクト分析室（教師画面）</h2>
        <div className="notice"><p>🟢接続中：{teacherSync.online}/{teacherSync.total}人</p><p>同期状況：{teacherSync.lastUpload}</p><small>Google Classroom＋スプレッドシート連携予定</small></div>
        <div className="analysis">{[['x²−25',84],['x²−49',63],['x²+8x+15',34]].map(([label,percent]) => <div key={label}><div className="row"><span>{label}</span><b>{percent}%</b></div><div className="bar"><div className="hp" style={{width:`${percent}%`}} /></div></div>)}</div>
        <div className="notice"><b>🤖AI授業提案</b><p>差の平方とたすきの見分けに混乱あり → 比較活動を推奨</p></div>
      </div>
    </>
  );
}
