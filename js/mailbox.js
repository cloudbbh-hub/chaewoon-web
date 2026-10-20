// Demo only. Memory state is never persisted or sent to an API/analytics service.
let draft='',sent='',opened=false,replyIndex=0;
const replies=[
 '안녕, 여행자님.\n\n오늘 바다를 보다가 문득 생각했어요. 파도도 매번 같은 속도로 밀려오지는 않는다고요. 조금 느린 하루여도 괜찮겠죠?\n\n당신의 하루에도 편히 숨 쉴 수 있는 작은 틈이 있었으면 좋겠어요. 따뜻한 무언가를 한 모금 마시며 쉬어 가요.\n\n— 바닷바람을 닮은 여행자',
 '이 편지를 펼친 당신에게.\n\n골목 끝에서 작은 꽃을 발견했어요. 누가 알아봐 주지 않아도 자기 자리에 피어 있더라고요. 그 모습을 오래 바라봤어요.\n\n오늘 당신이 스스로에게 건넬 다정한 말 한마디는 무엇인가요? 저는 “오늘도 여기까지 잘 왔어”라고 말해 주려 해요.\n\n— 골목을 걷는 여행자',
 '안녕하세요, 아직 만나지 못한 친구.\n\n여행 가방엔 생각보다 많은 것이 필요하지 않더라고요. 편한 신발, 좋아하는 노래, 그리고 잠깐 멈출 여유 정도요.\n\n당신도 오늘만큼은 해야 할 일 사이에 좋아하는 일을 하나 끼워 넣어 보면 어때요? 작은 기쁨 하나를 응원할게요.\n\n— 노래를 흥얼거리는 여행자'
];
export function renderMailbox({main,el,button,link}){
 function draw(focus=false){
  main.replaceChildren();const heading=el('div','page-heading');heading.append(el('p','eyebrow','A LETTER FROM THE SEASIDE'),el('h1','','바닷마을 익명 우체통'),el('p','lead','얼굴도 이름도 모르는 여행자에게, 다정한 한 줄을 건네 보세요.'));main.append(heading);
  const guide=el('div','mail-guide');const mascot=el('img','flower-postkeeper');mascot.src='assets/characters/flower-postkeeper.png';mascot.alt='사용자의 꽃 캐릭터를 바탕으로 만든 꽃 우체부';mascot.addEventListener('error',()=>mascot.hidden=true);const greeting=el('div');greeting.append(el('strong','','꽃 우체부가 기다리고 있어요'),el('p','','길지 않아도 괜찮아요. 오늘의 마음을 한 장에 담아 보세요.'));guide.append(mascot,greeting);main.append(guide);
  const notice=el('p','mail-demo','체험용 우체통 · 실제 사람에게 전송되지 않아요. 답장은 미리 작성된 예시이며, 편지는 새로고침하면 사라집니다.');main.append(notice);
  const grid=el('div','mail-grid');const writing=el('section','game-panel mail-paper');writing.append(el('p','panel-label','01 / WRITE A LITTLE LETTER'),el('h2','',sent?'접어 둔 나의 편지':'어딘가의 여행자에게'));
  if(sent){writing.append(el('p','mail-body',sent),el('p','mail-success','✓ 체험 우체통에 편지를 넣었어요. 실제 전송은 하지 않았어요.'),button('새 편지 쓰기',()=>{draft='';sent='';opened=false;replyIndex=(replyIndex+1)%replies.length;draw(true);},'secondary'));}
  else {const form=el('form');const label=el('label','mail-label','오늘의 마음을 적어 주세요');label.htmlFor='letter-body';const input=el('textarea');input.id='letter-body';input.maxLength=500;input.rows=8;input.value=draft;input.placeholder='안녕, 여행자님. 오늘 나에게 작은 기쁨이었던 순간은…';input.setAttribute('aria-describedby','letter-help letter-count letter-error');const help=el('p','fine','이름이나 연락처 없이, 1~500자로 마음만 남겨 주세요.');help.id='letter-help';const count=el('p','mail-count',`${draft.length} / 500`);count.id='letter-count';const error=el('p','mail-error');error.id='letter-error';error.setAttribute('role','alert');input.addEventListener('input',()=>{draft=input.value;count.textContent=`${draft.length} / 500`;error.textContent='';input.removeAttribute('aria-invalid');});const submit=button('✉ 체험 우체통에 넣기',()=>{},'primary');submit.type='submit';form.addEventListener('submit',event=>{event.preventDefault();if(!input.value.trim()){error.textContent='짧은 인사라도 좋아요. 편지 내용을 적어 주세요.';input.setAttribute('aria-invalid','true');input.focus();return;}sent=input.value.trim();draft=sent;draw(true);});form.append(label,input,help,count,error,submit);writing.append(form);}
  const receiving=el('section','game-panel mail-receive');receiving.append(el('p','panel-label','02 / A SMALL REPLY'),el('h2','','바다 건너 온 편지'),el('span','mail-example','미리 준비한 예시 답장'));
  if(opened){receiving.append(el('p','mail-body',replies[replyIndex]),button('다른 예시 편지 읽기',()=>{replyIndex=(replyIndex+1)%replies.length;draw(true);},'secondary'));}
  else {receiving.append(el('div','mail-envelope','✉'),el('p','muted',sent?'당신을 위한 예시 답장이 준비되어 있어요.':'편지를 한 통 남기면, 준비된 예시 답장을 열어볼 수 있어요.'));const open=button('예시 답장 열어보기',()=>{opened=true;draw(true);},'secondary');open.disabled=!sent;receiving.append(open);}
  grid.append(writing,receiving);main.append(grid,link('← 마을 광장으로','#/','text-link mail-home'));if(focus){const target=sent?main.querySelector('.mail-receive h2'):main.querySelector('textarea');if(sent)target.setAttribute('tabindex','-1');target.focus();}
 }
 draw();
}
