import { questions } from './data/questions.js?v=pink-play-2';
export const isType = value => typeof value === 'string' && /^[EI][SN][TF][JP]$/.test(value);
export function calculateType(answers) {
 if (!Array.isArray(answers) || answers.length !== questions.length) throw new Error('12개의 답변이 필요합니다.');
 const scores={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
 questions.forEach((q,i)=>{if(!q.axis.includes(answers[i]) || typeof answers[i] !== 'string' || answers[i].length!==1) throw new Error('올바르지 않은 답변입니다.');scores[answers[i]]++;});
 return ['EI','SN','TF','JP'].map(([a,b])=>scores[a]>scores[b]?a:b).join('');
}
export function setAnswer(answers,index,value) {
 const q=questions[index]; if(!q || !q.options.some(o=>o.value===value)) throw new Error('올바르지 않은 선택입니다.');
 const next=[...answers];next[index]=value;return next;
}
export const mapUrl = name => `https://map.naver.com/p/search/${encodeURIComponent(name)}`;
export const musicUrl = (title,artist) => `https://music.youtube.com/search?q=${encodeURIComponent(`${artist} ${title}`)}`;
