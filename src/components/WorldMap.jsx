export default function WorldMap({ worldAreas }) {
  const unlockedCount = worldAreas.filter((area) => area.unlocked).length;
  return (
    <div className="card">
      <h2>🗺️ ワールドマップ：ファクトリア</h2>
      <p>解放エリア：{unlockedCount} / {worldAreas.length}</p>
      <div className="grid">
        {worldAreas.map((area) => (
          <div key={area.name} className={`area ${area.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="emoji">{area.icon}</div>
            <b>{area.name}</b>
            <p>対象：{area.focus}</p>
            <small>{area.unlocked ? '解放済み' : `解放条件：${area.condition}`}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
