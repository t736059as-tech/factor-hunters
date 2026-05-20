export const baseProblems = [
  { exp: '6x+12', type: '共通因数', answers: ['6(x+2)'], level: 1, monster: 'ククリン', hints: ['共通する数は？', '6xと12を見よう', '6でくくれる'] },
  { exp: '3x²+9x', type: '共通因数', answers: ['3x(x+3)'], level: 1, monster: 'ククリン', hints: ['文字も見る', '3とxが共通', '3xでくくろう'] },
  { exp: 'x²−25', type: '差の平方', answers: ['(x+5)(x-5)', '(x-5)(x+5)'], level: 2, monster: 'スクエアム', hints: ['25は5²だね', '平方数どうしの引き算', 'a²-b²=(a+b)(a-b)'] },
  { exp: 'x²−49', type: '差の平方', answers: ['(x+7)(x-7)', '(x-7)(x+7)'], level: 2, monster: 'スクエアム', hints: ['49=7²', '左右対称', '差の平方'] },
  { exp: 'x²+8x+15', type: 'たすき', answers: ['(x+3)(x+5)', '(x+5)(x+3)'], level: 3, monster: 'タスゴン', hints: ['かけて15', 'たして8', '3と5'] },
  { exp: '2x²+7x+3', type: 'たすき', answers: ['(2x+1)(x+3)', '(x+3)(2x+1)'], level: 4, monster: 'タスゴン', hints: ['2×3', 'たして7', 'たすき図を考える'] },
  { exp: '5x²−45', type: '複合', answers: ['5(x+3)(x-3)', '5(x-3)(x+3)'], level: 5, monster: 'シャドウ・ファクター', hints: ['5でくくる', '差の平方', '2段階'] },
];

export const TYPES = ['共通因数', '差の平方', 'たすき', '複合'];
