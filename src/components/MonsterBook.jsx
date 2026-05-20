export default function MonsterBook({ monsterBook }) {
  return (
    <div className="card">
      <h2>📖 モンスター図鑑</h2>
      <p>捕獲したモンスターの情報と進化先を確認しよう</p>
      <div className="grid">
        {monsterBook.map((monster) => (
          <div key={monster.name} className="area unlocked">
            {monster.unlocked ? <>
              <div className="emoji">{monster.emoji}</div><b>{monster.name}</b><p>属性：{monster.type}</p><p>{monster.description}</p><div className="notice">次の進化：{monster.evolve}</div>
            </> : <>
              <div className="emoji">❔</div><b>？？？？？</b><p>未発見モンスター</p>
            </>}
          </div>
        ))}
      </div>
    </div>
  );
}
