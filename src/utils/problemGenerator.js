import { baseProblems } from '../data/problems.js';

function choice(list) { return list[Math.floor(Math.random() * list.length)]; }

function makeCommonFactorProblem() {
  const a = choice([2, 3, 4, 5, 6]);
  const b = choice([2, 3, 4, 5]);
  return { exp: `${a}x²+${a*b}x`, type: '共通因数', answers: [`${a}x(x+${b})`], level: b <= 3 ? 1 : 2, monster: 'ククリン', hints: ['どちらの項にも共通しているものは？', `${a} と x が共通していないかな？`, `${a}x でくくってみよう。`] };
}

function makeDifferenceOfSquaresProblem() {
  const n = choice([2, 3, 4, 5, 6, 7, 8, 9]);
  return { exp: `x²−${n*n}`, type: '差の平方', answers: [`(x+${n})(x-${n})`, `(x-${n})(x+${n})`], level: n <= 5 ? 2 : 3, monster: 'スクエアム', hints: [`${n*n} は ${n}² だね。`, '平方数どうしの引き算になっているよ。', 'a²−b²=(a+b)(a-b) が使えそう。'] };
}

function makeSimpleQuadraticProblem() {
  const p = choice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  let q = choice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  while (p === q || p + q === 0) q = choice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  const sum = p + q;
  const product = p * q;
  const middle = sum > 0 ? `+${sum}x` : `${sum}x`;
  const last = product > 0 ? `+${product}` : `${product}`;
  const fp = `x${p > 0 ? `+${p}` : p}`;
  const fq = `x${q > 0 ? `+${q}` : q}`;
  return { exp: `x²${middle}${last}`, type: 'たすき', answers: [`(${fp})(${fq})`, `(${fq})(${fp})`], level: product > 0 ? 3 : 4, monster: 'タスゴン', hints: [`かけて ${product} になる2つの数を探そう。`, `たして ${sum} になる組み合わせは？`, `${p} と ${q} が使えそう。`] };
}

function makeTasukiProblem() {
  const a = choice([2, 3, 4]);
  const p = choice([1, 2, 3, 4]);
  const q = choice([1, 2, 3, 4, 5]);
  const b = a * q + p;
  const c = p * q;
  return { exp: `${a}x²+${b}x+${c}`, type: 'たすき', answers: [`(${a}x+${p})(x+${q})`, `(x+${q})(${a}x+${p})`], level: 4, monster: 'タスゴン', hints: [`${a}x² と ${c} の組み合わせを考えよう。`, 'たすきの交差で真ん中の係数を作るよ。', `${a}×${q} と ${p}×1 の和を見よう。`] };
}

export function randomProblem() {
  return choice([makeCommonFactorProblem, makeDifferenceOfSquaresProblem, makeSimpleQuadraticProblem, makeTasukiProblem, () => choice(baseProblems)])();
}
