export function getWorldAreas({ captured, level, streak }) {
  return [
    { name: '始まりの草原', icon: '🌱', focus: '共通因数', unlocked: true, condition: '最初から解放' },
    { name: '双子の洞窟', icon: '💧', focus: '差の平方', unlocked: captured >= 1 || level >= 2, condition: '1体捕獲 or Lv.2' },
    { name: '組み合わせの森', icon: '🌳', focus: 'x²+ax+b', unlocked: captured >= 3 || level >= 3, condition: '3体捕獲 or Lv.3' },
    { name: 'たすき火山', icon: '🔥', focus: 'たすき掛け', unlocked: captured >= 5 || level >= 4, condition: '5体捕獲 or Lv.4' },
    { name: '幻影遺跡', icon: '🏺', focus: '複合問題', unlocked: captured >= 8 || streak >= 5, condition: '8体捕獲 or 5連勝' },
    { name: '式王城', icon: '👑', focus: '発展・ボス', unlocked: captured >= 12 || level >= 6, condition: '12体捕獲 or Lv.6' },
  ];
}
