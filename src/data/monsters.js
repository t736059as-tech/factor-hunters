export function getMonsterBook({ captured, rareMode }) {
  return [
    { name: 'ククリン', emoji: '🌱', type: '共通因数', description: '共通する力を見抜く草原の守護獣', evolve: 'ファクタウル Lv15', unlocked: true },
    { name: 'スクエアム', emoji: '💧', type: '差の平方', description: '左右対称の式を見抜く洞窟の精霊', evolve: 'アークスクエア Lv15', unlocked: captured >= 1 },
    { name: 'タスゴン', emoji: '🔥', type: 'たすき掛け', description: '組み合わせを操る火山の戦士', evolve: 'メガタスゴン Lv20', unlocked: captured >= 5 },
    { name: '古代スクエアム', emoji: '✨', type: 'レア', description: '伝説級モンスター', evolve: '？？？', unlocked: rareMode },
  ];
}
