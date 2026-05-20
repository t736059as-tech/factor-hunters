import { useState } from 'react';
import { saveStudentProfile } from '../utils/studentProfile.js';

export default function LoginPanel({ onLogin }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');

  const submit = () => {
    if (!number.trim() || !name.trim()) {
      alert('出席番号と名前を入力してください');
      return;
    }
    const profile = {
      studentId: `no-${number.trim()}`,
      number: number.trim(),
      name: name.trim(),
      group: group.trim() || '未設定',
      registeredAt: new Date().toISOString(),
    };
    saveStudentProfile(profile);
    onLogin(profile);
  };

  return (
    <div className="page center">
      <div className="card login">
        <h1>因数分解ハンターズ</h1>
        <p>最初にハンター登録をしよう</p>
        <label>出席番号<input value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="例：12" /></label>
        <label>名前<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="例：スウ" /></label>
        <label>班<input value={group} onChange={(e)=>setGroup(e.target.value)} placeholder="例：3班" /></label>
        <button className="primary" onClick={submit}>冒険を始める</button>
        <small>入力内容はこの端末に保存され、解答データと一緒に送信できます。</small>
      </div>
    </div>
  );
}
