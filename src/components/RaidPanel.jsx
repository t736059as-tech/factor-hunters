export default function RaidPanel() {
  return (
    <div className="card dark">
      <h2>👑 協力レイド：式王</h2>
      <p>ファクト博士『ついに封印が崩れた…全員の力が必要じゃ！』</p>
      <div className="enemy"><div className="row"><b>式王</b><span>HP 83,500 / 100,000</span></div><div className="bar"><div className="hp" style={{width:'83%'}} /></div></div>
      <div className="grid"><div className="area"><b>通常正解</b><p>100ダメージ</p></div><div className="area"><b>見抜きコンボ</b><p>＋150ダメージ</p></div><div className="area"><b>S判定</b><p>クリティカル＋500</p></div></div>
      <div className="notice">撃破報酬：限定称号『式王討伐隊』＋伝説図鑑解放</div>
    </div>
  );
}
