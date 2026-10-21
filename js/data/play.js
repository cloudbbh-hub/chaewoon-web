export const moods = [
 {id:'rest',label:'조금 지쳤어요',icon:'☁',title:'나만의 쉼표',message:'오늘은 멀리 가지 않아도 괜찮아. 네 마음이 쉬는 곳이 오늘의 여행지야.',missions:['좋아하는 노래 한 곡을 들으며 쉬어가기','창밖을 바라보며 천천히 숨 세 번 쉬기']},
 {id:'happy',label:'마음이 설레요',icon:'✿',title:'작은 반짝임',message:'네 설렘이 오늘을 환하게 밝혀 줄 거야. 작은 발견 하나를 주머니에 담아 봐.',missions:['오늘 예쁜 색 하나를 찾아 사진에 담기','좋아하는 사람에게 다정한 한 줄 전하기']},
 {id:'cloudy',label:'마음이 복잡해요',icon:'≈',title:'파도에 띄운 마음',message:'답을 바로 찾지 않아도 돼. 파도가 오고 가듯 마음에도 여유를 주자.',missions:['지금 마음을 종이에 한 문장으로 적기','잠깐 화면을 내려놓고 물 한 잔 마시기']},
 {id:'curious',label:'새로운 게 궁금해요',icon:'☆',title:'작은 모험가',message:'익숙한 길에서도 새로운 풍경을 만날 수 있어. 오늘은 호기심을 따라가 볼까?',missions:['평소 듣지 않던 음악 한 곡 만나기','주변에서 처음 눈에 들어오는 풍경 찾아보기']}
];
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function dailyCard(id,day=localDay()){const mood=moods.find(m=>m.id===id);if(!mood)throw new Error('마음을 다시 골라 주세요.');const seed=[...day].reduce((sum,c)=>sum+c.charCodeAt(0),0);return {...mood,mission:mood.missions[seed%mood.missions.length],day};}
export const treasures=[{id:'shell',icon:'🐚',name:'분홍 조개'},{id:'flower',icon:'🌸',name:'동백꽃'},{id:'letter',icon:'✉️',name:'바다 편지'},{id:'star',icon:'⭐',name:'작은 별'},{id:'bottle',icon:'🍶',name:'유리병'},{id:'ribbon',icon:'🎀',name:'분홍 리본'}];
export function collect(found,id){if(!treasures.some(t=>t.id===id))return [...found];return [...new Set([...found,id])];}
export const treasureStories = {
 shell:'파도가 오래 다듬은 조개. 서두르지 않아도 나만의 모양은 만들어져요.',
 flower:'먼 길을 건너온 꽃 한 송이. 오늘의 다정함은 생각보다 가까이에 있어요.',
 letter:'받는 이 없는 편지에는 이렇게 적혀 있어요. 오늘도 당신의 속도로 걸어요.',
 star:'모래 위에 내려앉은 작은 별. 사소한 기쁨도 모이면 길을 밝혀 줘요.',
 bottle:'바다빛을 담은 유리병. 오래 간직하고 싶은 오늘의 순간은 무엇인가요?',
 ribbon:'바람에 풀린 분홍 리본. 꼭 붙잡고 있던 마음을 잠깐 느슨하게 놓아 보세요.'
};
