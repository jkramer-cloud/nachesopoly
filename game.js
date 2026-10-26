'use strict';
/* Nachesopoly Stage 2.3 release QA candidate. Game engine and Stage 2.2 hybrid dashboard. */
const $=id=>document.getElementById(id);
let portfolioExpanded=true;
const STORE='nachesopoly_stage1_v1'; // Historical key retained to keep previous saved games compatible.
const TOKEN_SET=['🍎','🐻','🚍','🚜','🦌','🚚'];
const COLORS=['#b65849','#3b83aa','#ad7752','#558c64','#b27aaf','#d19747'];
const GROUPS=['Brown','Light blue','Pink','Orange','Red','Yellow','Green','Dark blue'];
const GROUP_COLOR={'Brown':'#93603b','Light blue':'#8fcbe1','Pink':'#cb8baa','Orange':'#e99d51','Red':'#d76565','Yellow':'#e7c562','Green':'#72a47a','Dark blue':'#4066a6'};
const PROPERTY_INDICES=[1,3,6,8,9,11,13,14,16,18,19,21,23,24,26,27,29,31,32,34,37,39];
const PRICES=[60,60,100,100,120,140,140,160,180,180,200,220,220,240,260,260,280,300,300,320,350,400];
const RENTS=[2,4,6,6,8,10,10,12,14,14,16,18,18,20,22,22,24,26,26,28,35,50];
const DEVELOPMENT_COST={'Brown':50,'Light blue':50,'Pink':100,'Orange':100,'Red':100,'Yellow':150,'Green':200,'Dark blue':200};
const EVENTS={
 'Valley Opportunity':[
  {title:'A Little Extra',text:'A community project pays you $100.',kind:'gain',amount:100,icon:'💰'},
  {title:'Scenic Route Home',text:'Advance to Gateway to Naches and collect $200.',kind:'move',index:0,icon:'🏔️'},
  {title:'Found Your Wallet',text:'Recover $50 you thought was lost.',kind:'gain',amount:50,icon:'👛'},
  {title:'Broken Equipment',text:'Unexpected maintenance costs $75.',kind:'pay',amount:75,icon:'🔧'},
  {title:'Volunteer Recognition',text:'Your neighborhood project earns a $75 stipend.',kind:'gain',amount:75,icon:'🤝'},
  {title:'Visit the Depot',text:'Advance to Naches Depot Park. Do not collect Start income unless you pass it.',kind:'move',index:20,icon:'🚂'},
  {title:'Bonus Paycheck',text:'Collect an extra $125.',kind:'gain',amount:125,icon:'💵'},
  {title:'Parking Ticket',text:'The meter expired. Pay $30.',kind:'pay',amount:30,icon:'🚗'},
  {title:'Refund Arrives',text:'A supplier sends a $90 refund.',kind:'gain',amount:90,icon:'📨'},
  {title:'Detour Release Pass',text:'Keep this pass to leave Scenic Detour without paying.',kind:'holdcard',icon:'🎫'},
  {title:'Quick Errand',text:'Move forward three spaces and resolve the destination.',kind:'advance',steps:3,icon:'👟'},
  {title:'Scholarship Support',text:'Collect $80 for mentoring a student.',kind:'gain',amount:80,icon:'📚'},
  {title:'Unexpected Bonus',text:'Collect $150 from a fictional community prize.',kind:'gain',amount:150,icon:'🏆'},
  {title:'Safety Inspection',text:'Pay $65 for a necessary inspection.',kind:'pay',amount:65,icon:'🦺'},
  {title:'Tour the Valley',text:'Advance to the nearest transportation space and resolve it.',kind:'nearest',target:'TRANSPORT',icon:'🚌'},
  {title:'Local Business Award',text:'Collect $110 in a promotional prize.',kind:'gain',amount:110,icon:'🏅'},
  {title:'Generous Tip',text:'Collect $25 from every other active player.',kind:'collectEach',amount:25,icon:'🪙',rare:true},
  {title:'Helping Hands',text:'Give $20 to every other active player.',kind:'payEach',amount:20,icon:'💝'},
  {title:'Travel Reimbursement',text:'Advance to US-12 Scenic Route, passing Start income if applicable.',kind:'move',index:5,icon:'🛣️'},
  {title:'Property Improvement Grant',text:'Receive $40 for each improvement you own, up to $240.',kind:'perUpgradeGain',amount:40,cap:240,icon:'🏘️',rare:true},
  {title:'Rainy Day Fund',text:'Protect yourself against one future event fee up to $100.',kind:'shield',amount:100,icon:'🛡️',rare:true},
  {title:'A Lucky Break',text:'Advance five spaces and resolve the destination.',kind:'advance',steps:5,icon:'🎲'},
  {title:'Strategic Choice',text:'Choose a modest guaranteed $65 or a 50/50 chance of $160 versus paying $40.',kind:'choice',choices:[{label:'Take $65',kind:'gain',amount:65},{label:'Try your luck',kind:'gamble',win:160,lose:40}],icon:'⚖️',rare:true},
  {title:'Neighborhood Sponsorship',text:'Receive $100 now and $30 at the start of each of your next two turns.',kind:'ongoing',amount:30,turns:2,immediate:100,icon:'🌟',rare:true}
 ],
 'Community Events':[
  {title:'Sportsman’s Days',text:'Festival visitors bring $100 in game income.',kind:'gain',amount:100,icon:'🎉'},
  {title:'Snow Tire Season',text:'Vehicle upkeep costs $60.',kind:'pay',amount:60,icon:'❄️'},
  {title:'Volunteer Appreciation',text:'Collect a $40 appreciation gift.',kind:'gain',amount:40,icon:'💚'},
  {title:'School Supplies Drive',text:'Contribute $50 in supplies.',kind:'pay',amount:50,icon:'🎒'},
  {title:'Depot Celebration',text:'Move to Naches Depot Park.',kind:'move',index:20,icon:'🚉'},
  {title:'Road Repairs',text:'Pay $100 for the community repair project.',kind:'pay',amount:100,icon:'🚧'},
  {title:'Community Raffle',text:'Collect $75!',kind:'gain',amount:75,icon:'🎟️'},
  {title:'Good Neighbor',text:'Receive $30 in thank-you gifts.',kind:'gain',amount:30,icon:'🏡'},
  {title:'Safety Training',text:'Pay $50 for a training course.',kind:'pay',amount:50,icon:'🦺'},
  {title:'Local Art Show',text:'Sell artwork for $120.',kind:'gain',amount:120,icon:'🎨'},
  {title:'Highway Detour',text:'Go directly to Scenic Detour; do not collect Start income.',kind:'hold',icon:'🚦'},
  {title:'Recycling Rebate',text:'Collect a $60 rebate.',kind:'gain',amount:60,icon:'♻️'},
  {title:'Apple Harvest Weekend',text:'Collect $95 for helping at a harvest event.',kind:'gain',amount:95,icon:'🍎'},
  {title:'Storm Cleanup',text:'Pay $85 to repair storm damage.',kind:'pay',amount:85,icon:'🌧️'},
  {title:'Community Picnic',text:'Collect $45 in shared food donations.',kind:'gain',amount:45,icon:'🧺'},
  {title:'Broken Streetlight',text:'Pay $35 toward maintenance.',kind:'pay',amount:35,icon:'💡'},
  {title:'Local History Day',text:'Collect $70 for a successful exhibit.',kind:'gain',amount:70,icon:'🏛️'},
  {title:'Generosity Goes Around',text:'Every other active player pays you $15.',kind:'collectEach',amount:15,icon:'🎁'},
  {title:'Community Contributions',text:'Pay $15 to each other active player.',kind:'payEach',amount:15,icon:'🤲'},
  {title:'Building Inspection',text:'Pay $30 per improvement you own, up to $240.',kind:'perUpgradePay',amount:30,cap:240,icon:'🏗️'},
  {title:'Spring Blossom Festival',text:'Receive $80 today and $20 at the start of your next two turns.',kind:'ongoing',immediate:80,amount:20,turns:2,icon:'🌸',rare:true},
  {title:'Winter Road Closure',text:'You must pay $50 now; your next Start income is reduced by $50.',kind:'winterToll',amount:50,icon:'🌨️',rare:true},
  {title:'Town Celebration',text:'Choose a $50 prize or advance to Gateway to Naches for Start income.',kind:'choice',choices:[{label:'Collect $50',kind:'gain',amount:50},{label:'Travel to Start',kind:'move',index:0}],icon:'🎊',rare:true},
  {title:'Unexpected Community Grant',text:'A rare community grant awards $175.',kind:'gain',amount:175,icon:'🏆',rare:true}
 ]
};
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
function ensureCardState(){
 if(!g)return;
 if(!g.decks||typeof g.decks!=='object')g.decks={};
 if(!g.seenCards||typeof g.seenCards!=='object')g.seenCards={};
 if(!g.effects||typeof g.effects!=='object')g.effects={};
 for(const name of Object.keys(EVENTS)){
  if(!Array.isArray(g.decks[name])||!g.decks[name].length)g.decks[name]=shuffle(EVENTS[name].map((_,i)=>i));
  if(!Array.isArray(g.seenCards[name]))g.seenCards[name]=[];
 }
 for(const pl of g.players){
  const e=g.effects[pl.id];
  if(!e||!Array.isArray(e.income)||!Number.isFinite(e.shield)||!Number.isFinite(e.startToll))g.effects[pl.id]={income:[],shield:0,startToll:0};
 }
}
function applyTimedEffects(p){ensureCardState();const e=g.effects[p.id];if(e.income.length){for(const a of e.income){p.cash+=a.amount;ledger(`${p.name} collected ${money(a.amount)} in continuing community income.`,'income');a.remaining--;}e.income=e.income.filter(a=>a.remaining>0);}}
function cardTile(deck,card){return `<div class="event-art ${deck==='Valley Opportunity'?'opportunity':'community'}"><div class="event-sky"><span class="event-sun"></span><span class="event-peaks">▲ ▲ ▲</span></div><div class="event-foreground">${esc(card.icon||'🍎')}</div><span class="event-landscape-label">NACHES · VALLEY VENTURES</span></div>`;}
function renderEventPanel(){const panel=$('eventPanel');if(!panel)return;if(!g||g.phase!=='card'||!g.activeCard){panel.classList.add('hidden');panel.innerHTML='';return;}const a=g.activeCard,c=EVENTS[a.deck][a.index],p=current();panel.classList.remove('hidden');panel.innerHTML=`<div class="draw-backdrop"><div class="event-card-view">${cardTile(a.deck,c)}<div class="event-card-body"><span class="eyebrow">${esc(a.deck)} · ${c.rare?'RARE CARD':'CARD DRAW'}</span><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p><div class="event-card-actions">${c.kind==='choice'&&p.human?c.choices.map((ch,i)=>`<button class="button ${i?'minor':'primary'}" data-card-choice="${i}">${esc(ch.label)}</button>`).join(''):`<button class="button primary" id="resolveCard">${p.human?'Apply card & continue':'Reveal computer action →'}</button>`}</div></div></div></div>`;panel.querySelector('#resolveCard')?.addEventListener('click',()=>resolveCard());panel.querySelectorAll('[data-card-choice]').forEach(b=>b.onclick=()=>resolveCard(Number(b.dataset.cardChoice)));}
function drawEvent(deck,depth){ensureCardState();if(!g.decks[deck].length)g.decks[deck]=shuffle(EVENTS[deck].map((_,i)=>i));const index=g.decks[deck].pop();g.activeCard={deck,index,depth};g.phase='card';if(!g.seenCards[deck].includes(index))g.seenCards[deck].push(index);ledger(`${current().name} drew a ${deck} card: ${EVENTS[deck][index].title}.`,'event');commit();}
function finishCardEffect(card,depth){const p=current(),e=g.effects[p.id];const finish=()=>finishLanding();switch(card.kind){
 case 'gain':p.cash+=card.amount;ledger(`${p.name} received ${money(card.amount)}: ${card.title}.`,'income');finish();break;
 case 'pay':{let amount=card.amount;if(e.shield){const discount=Math.min(amount,e.shield);amount-=discount;e.shield-=discount;ledger(`${p.name} used ${money(discount)} of an event fee shield.`,'event');}makePayment(p.id,null,amount,card.title,finish);break;}
 case 'holdcard':p.holdCards++;ledger(`${p.name} received a Detour Release Pass.`,'event');finish();break;
 case 'hold':sendToHold(p,card.title);commit();break;
 case 'move':{const old=p.position,steps=(card.index-old+40)%40;if(card.index===0||old+steps>=40&&steps>0){p.cash+=g.startIncome;ledger(`${p.name} collected ${money(g.startIncome)} for passing Start.`,'income');}p.position=card.index;ledger(`${p.name} moved to ${space(card.index).name}.`,'event');land(p,depth+1);break;}
 case 'advance':moveBy(p,card.steps,true);break;
 case 'nearest':{const n=Array.from({length:40},(_,i)=>(p.position+i+1)%40).find(i=>space(i).type===card.target);finishCardEffect({kind:'move',index:n,title:card.title},depth);break;}
 case 'collectEach':{let total=0;for(const q of alive().filter(x=>x.id!==p.id)){const paid=Math.min(q.cash,card.amount);q.cash-=paid;p.cash+=paid;total+=paid;}ledger(`${p.name} collected ${money(total)} from other players.`,'income');finish();break;}
 case 'payEach':{let total=0;for(const q of alive().filter(x=>x.id!==p.id)){const paid=Math.min(p.cash,card.amount);p.cash-=paid;q.cash+=paid;total+=paid;}ledger(`${p.name} shared ${money(total)} with other players.`,'expense');finish();break;}
 case 'perUpgradeGain':{const sum=Math.min(card.cap,owned(p.id).reduce((a,b)=>a+b.level,0)*card.amount);p.cash+=sum;ledger(`${p.name} collected ${money(sum)} in improvement grants.`,'income');finish();break;}
 case 'perUpgradePay':{const sum=Math.min(card.cap,owned(p.id).reduce((a,b)=>a+b.level,0)*card.amount);makePayment(p.id,null,sum,card.title,finish);break;}
 case 'shield':e.shield+=card.amount;ledger(`${p.name} gained ${money(card.amount)} in future event fee protection.`,'event');finish();break;
 case 'ongoing':{p.cash+=card.immediate||0;e.income.push({amount:card.amount,remaining:card.turns});ledger(`${p.name} gained ${money(card.immediate||0)} and continuing income for ${card.turns} turns.`,'income');finish();break;}
 case 'winterToll':e.startToll+=card.amount;makePayment(p.id,null,card.amount,card.title,finish);break;
 case 'gamble':{const won=Math.random()<0.5;finishCardEffect(won?{kind:'gain',amount:card.win,title:'Lucky outcome'}:{kind:'pay',amount:card.lose,title:'Unlucky outcome'},depth);break;}
 default:finish();}}
function resolveCard(choiceIndex=0){if(!g||g.phase!=='card'||!g.activeCard)return;const a=g.activeCard,c=EVENTS[a.deck][a.index];if(c.kind==='choice'){const chosen=c.choices[Math.min(c.choices.length-1,Math.max(0,choiceIndex))];ledger(`${current().name} chose: ${chosen.label}.`,'event');g.activeCard=null;finishCardEffect(chosen,a.depth);return;}g.activeCard=null;finishCardEffect(c,a.depth);}
function showCardGallery(){if(!g)return;ensureCardState();let html='<p class="subtle">Cards revealed in this match appear below. Others remain surprises. Rare cards may take several matches to see.</p>';for(const [deck,cards] of Object.entries(EVENTS)){const seen=g.seenCards[deck]||[];html+=`<h3>${esc(deck)} · ${seen.length} / 24 discovered</h3><div class="gallery-grid">`+cards.map((c,i)=>`<div class="gallery-card ${seen.includes(i)?'':'undiscovered'}">${seen.includes(i)?`<span class="gallery-icon">${esc(c.icon||'🍎')}</span><b>${esc(c.title)}</b><small>${esc(c.text)}</small>`:'<span class="gallery-icon">❔</span><b>Undiscovered</b>'}</div>`).join('')+'</div>';}showModal('Naches Event Card Gallery',html);}

let g=null,setupPlayers=[{name:'Player 1',human:true},{name:'Computer 1',human:false}];
let inspected=null,botTimer=null,modalState=null,shownRecapId=null;
let presentationBusy=false, presentationTimers=[],toastTimer=null;
const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
const sleep=ms=>new Promise(resolve=>{const handle=setTimeout(resolve,ms);presentationTimers.push(handle);});
function paceMs(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return 0;return g?.aiPace==='fast'?110:g?.aiPace==='balanced'?215:380;}
function toast(message){if(!g)return;const el=$('actionToast');el.textContent=message;el.classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.add('hidden'),g.aiPace==='fast'?1300:2200);}
async function animatedDice(d1,d2,player){const box=$('diceScene'),a=$('rollingDieOne'),b=$('rollingDieTwo');box.classList.remove('hidden');$('diceSceneTitle').textContent=player.name+' rolls the dice';$('diceSceneResult').textContent='';a.className='cube tumbling';b.className='cube tumbling';const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:g.aiPace==='fast'?320:g.aiPace==='balanced'?650:1050;const frames=Math.max(1,Math.floor(duration/110));for(let j=0;j<frames;j++){a.textContent=FACES[Math.floor(Math.random()*6)];b.textContent=FACES[Math.floor(Math.random()*6)];await sleep(110);}a.textContent=FACES[d1-1];b.textContent=FACES[d2-1];a.className='cube settled';b.className='cube settled';$('diceSceneResult').textContent=d1+' + '+d2+' = '+(d1+d2)+(d1===d2?' · DOUBLES!':'');await sleep(duration===0?100:g.aiPace==='fast'?220:630);box.classList.add('hidden');}
function endPresentation(){presentationBusy=false;}
function cancelPresentation(){presentationBusy=false;for(const t of presentationTimers)clearTimeout(t);presentationTimers=[];$('diceScene').classList.add('hidden');}

const AI_PACE_MS={story:1250,balanced:750,fast:280};
const money=n=>'$'+Number(n||0).toLocaleString('en-US');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isOwnable=s=>['BUSINESS','TRANSPORT','UTILITY'].includes(s.type);
const space=i=>g.board[i];
const current=()=>g.players[g.turnIndex];
const alive=()=>g.players.filter(p=>!p.bankrupt);
const getPlayer=id=>g.players.find(p=>p.id===id);
const price=s=>s.type==='BUSINESS'?PRICES[PROPERTY_INDICES.indexOf(s.index)]:s.type==='TRANSPORT'?200:s.type==='UTILITY'?150:0;
const baseRent=s=>s.type==='BUSINESS'?RENTS[PROPERTY_INDICES.indexOf(s.index)]:0;
const developCost=s=>DEVELOPMENT_COST[s.group]||0;
const ownGroup=(id,group)=>g.board.filter(s=>s.type==='BUSINESS'&&s.group===group).every(s=>s.owner===id);
const owned=(id)=>g.board.filter(s=>s.owner===id);
const worth=(p)=>p.cash+owned(p.id).reduce((n,s)=>n+(s.mortgaged?Math.floor(price(s)/2):price(s))+(s.level||0)*developCost(s),0);
function ledger(message,type='info'){
 g.log.unshift({round:g.round,p:current()?.name||'',message,type,at:Date.now()});
 if(g.log.length>900)g.log.length=900;
 if(g.botTurn && current()?.id===g.botTurn.playerId && g.phase!=='recap' && g.botTurn.entries.length<80){
   g.botTurn.entries.push({message,type});
 }
 g.last=message;
 if(['purchase','expense','income','event','auction','hold'].includes(type))toast(message);
}
function beginBotTurn(){
 if(!g||current().human||g.botTurn)return;
 const p=current();
 g.botTurn={playerId:p.id,name:p.name,token:p.token,startCash:p.cash,startWorth:worth(p),startPosition:p.position,entries:[],startedAt:Date.now()};
}
function finalizeBotTurn(){
 const p=current();
 if(!g.botTurn||g.botTurn.playerId!==p.id)beginBotTurn();
 const bt=g.botTurn||{entries:[],startCash:p.cash,startWorth:worth(p),startPosition:p.position};
 const ending=alive().length<=1||(g.mode==='quick'&&((g.quickEnd==='rounds'&&alive().every(x=>x.turnsTaken>=g.roundLimit))||(g.quickEnd==='time'&&g.finalRoundTarget&&alive().every(x=>x.turnsTaken>=g.finalRoundTarget))));
 const r={id:Date.now()+'-'+p.id,playerId:p.id,name:p.name,token:p.token,startCash:bt.startCash,endCash:p.cash,startWorth:bt.startWorth,endWorth:worth(p),startPosition:bt.startPosition,endPosition:p.position,entries:bt.entries.slice(),nextIsEnd:ending,round:Math.max(1,p.turnsTaken)};
 g.botRecap=r;
 g.recentBotRecaps=[r,...(g.recentBotRecaps||[])].slice(0,12);
 g.botTurn=null;g.phase='recap';
 g.last=`${p.name} finished their turn. Review what happened before continuing.`;
 commit();
}
function finishBotRecap(){
 if(!g||g.phase!=='recap'||!g.botRecap)return;
 const r=g.botRecap;
 g.botRecap=null;
 if(r.nextIsEnd){endMatch();return;}
 g.turnIndex=nextPlayer();g.lastDice=[0,0];g.phase=current().human?'handoff':'roll';applyTimedEffects(current());
 ledger(`Next: ${current().name}.`);
 if(!current().human)beginBotTurn();
 commit();
}
function describeBotRecap(r){
 const entries=r.entries||[];
 const rolls=entries.filter(x=>x.type==='dice').map(x=>x.message.replace(/^.*?rolled /,'').replace(/\.$/,''));
 const landings=entries.filter(x=>/ arrived at | moved to /.test(x.message)).map(x=>x.message.replace(/^.*?(?:arrived at |moved to )/,'').replace(/\.$/,''));
 const delta=r.endCash-r.startCash;
 const impactful=entries.filter(x=>['dice','event','purchase','expense','income','auction','management','hold','debt','trade'].includes(x.type)||/ purchased | improved | mortgaged | auction | sold an improvement |declined /.test(x.message));
 const steps=impactful.length?impactful:entries;
 return `<div class="recap-summary">`+
 `<div class="recap-stat"><small>Dice rolled</small><strong>${rolls.length?esc(rolls.join(' · ')):'—'}</strong></div>`+
 `<div class="recap-stat"><small>Final destination</small><strong>${esc(landings.at(-1)||space(r.endPosition).name)}</strong></div>`+
 `<div class="recap-stat"><small>Cash change</small><strong class="${delta>0?'gain':delta<0?'loss':''}">${delta>0?'+':delta<0?'−':''}${money(Math.abs(delta))}</strong><small>${money(r.startCash)} → ${money(r.endCash)}</small></div>`+
 `<div class="recap-stat"><small>Net worth</small><strong>${money(r.endWorth)}</strong><small>${r.endWorth>=r.startWorth?'+':'−'}${money(Math.abs(r.endWorth-r.startWorth))} this turn</small></div></div>`+
 `<ol class="recap-events">${steps.length?steps.map(e=>`<li><span class="event-type">${esc(e.type==='dice'?'Roll':e.type==='purchase'?'Property':e.type==='expense'?'Payment':e.type==='income'?'Income':e.type==='event'?'Event':e.type==='auction'?'Auction':e.type==='management'?'Upgrade':e.type==='debt'?'Debt':'Action')}</span><span>${esc(e.message)}</span></li>`).join(''):'<li>Turn completed without a financial transaction.</li>'}</ol>`;
}
function renderBotActivity(){
 const live=$('computerActivity'),recap=$('computerRecap');
 const bt=g.botTurn,p=current();
 if(g.phase==='recap'&&g.botRecap){
  const r=g.botRecap;live.classList.add('hidden');recap.classList.remove('hidden');
  recap.innerHTML=`<div class="recap-header"><div><span class="eyebrow">COMPUTER TURN COMPLETE · ROUND ${r.round}</span><h2 id="recapTitle">${esc(r.token)} ${esc(r.name)} — Turn recap</h2><p>See what happened before the next turn starts.</p></div><span class="recap-complete">Turn finished</span></div>${describeBotRecap(r)}<div class="recap-footer"><p>Computer turns pause here so you can follow the game.</p><button id="continueAfterBot" class="button primary">${r.nextIsEnd?'View final results →':'Continue to next player →'}</button></div>`;
  $('continueAfterBot').onclick=finishBotRecap;
  if(shownRecapId!==r.id){shownRecapId=r.id;requestAnimationFrame(()=>{if(g?.phase==='recap')recap.focus({preventScroll:true});});}
 }else{
  recap.classList.add('hidden');recap.innerHTML='';
  if(bt&&p.id===bt.playerId&&!p.human&&g.phase!=='ended'){
   const last=bt.entries.slice(-3);
   live.classList.remove('hidden');
   live.innerHTML=`<div class="activity-head"><span class="ai-pulse" aria-hidden="true"></span><div><b>${esc(p.token)} ${esc(p.name)} is taking a turn</b><small>Follow each action on the board · ${esc(({story:'Story',balanced:'Balanced',fast:'Fast'})[g.aiPace]||'Story')} pace</small></div></div><div class="activity-steps">${last.length?last.map(x=>`<div><span class="activity-dot"></span>${esc(x.message)}</div>`).join(''):'<div><span class="activity-dot"></span>Getting ready to roll…</div>'}</div>`;
  }else if(g.phase==='auction'&&g.auction&&!getPlayer(g.auction.current).human){
   live.classList.remove('hidden');live.innerHTML=`<div class="activity-head"><span class="ai-pulse" aria-hidden="true"></span><div><b>${esc(getPlayer(g.auction.current).name)} is considering an auction bid</b><small>${esc(space(g.auction.space).name)} · current bid ${money(g.auction.highBid)}</small></div></div>`;
  }else{live.classList.add('hidden');live.innerHTML='';}
 }
 const b=$('recapBtn');b.disabled=!(g.recentBotRecaps?.length||g.botRecap);
}
function showPreviousBotRecap(){const r=g?.botRecap||g?.recentBotRecaps?.[0];if(!r)return;showModal(`${r.name} · previous computer turn`,describeBotRecap(r));}

function safeSave(){if(!g)return;try{g.lastSaved=Date.now();localStorage.setItem(STORE,JSON.stringify(g));}catch(e){g.storageIssue='Autosave unavailable. Use Save / Export to back up your match.';}}
function commit(){if(!g)return;safeSave();render();scheduleBot();}
function createBoard(){return BOARD_DATA.map(s=>({...s,owner:null,level:0,mortgaged:false}));}
function setupInit(){renderPlayerSetup();$('addHuman').onclick=()=>addPlayer(true);$('addBot').onclick=()=>addPlayer(false);$('newGame').onclick=startMatch;$('continueGame').onclick=loadMatch;
 ['gameMode','quickEnd','roundLimit','timeLimit'].forEach(id=>$(id).addEventListener('change',setupOptions));
 $('newBtn').onclick=()=>{if(confirm('Return to main menu? Your match will be saved.')){cancelPresentation();safeSave();g=null;$('game').classList.add('hidden');$('setup').classList.remove('hidden');updateContinue();}};
 $('aiPaceLive').onchange=e=>{if(g){g.aiPace=e.target.value;commit();}}; $('recapBtn').onclick=showPreviousBotRecap;
 $('cardGalleryBtn').onclick=showCardGallery;$('helpBtn').onclick=showRules;$('saveBtn').onclick=saveDialog;$('historyBtn').onclick=showHistory;$('fullLogBtn').onclick=showHistory;
 $('tradeBtn').onclick=()=>tradeDialog();$('closeModal').onclick=()=>closeModal();$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
 setInterval(()=>{if(!g||g.phase==='ended')return;if(presentationBusy){g.clockAnchor=Date.now();return;}if(g.phase==='recap'){g.clockAnchor=Date.now();return;}if(g.mode==='quick'&&g.quickEnd==='time'&&g.startedAt){const diff=Math.max(0,(Date.now()-g.clockAnchor)/1000);if(diff>=1){g.elapsedSeconds+=Math.floor(diff);g.clockAnchor=Date.now();if(!g.finalRoundTarget&&g.elapsedSeconds>=g.timeLimit*60){g.finalRoundTarget=Math.max(...alive().map(p=>p.turnsTaken));if(g.finalRoundTarget<1)g.finalRoundTarget=1;ledger('Time expired: finish the current round for equal turns.','time');commit();}else{if(g.elapsedSeconds%10===0)safeSave();renderHUD();}}}},1000);
 updateContinue();setupOptions();}
function setupOptions(){const quick=$('gameMode').value==='quick';$('quickEnd').disabled=!quick;$('roundLimit').disabled=!quick||$('quickEnd').value!=='rounds';$('timeLimit').disabled=!quick||$('quickEnd').value!=='time';}
function renderPlayerSetup(){$('playerSetup').innerHTML=setupPlayers.map((p,i)=>`<div class="setup-player"><span class="token-round" style="background:${COLORS[i]}22">${TOKEN_SET[i]}</span><div style="min-width:0;flex:1"><div class="type">${p.human?'HUMAN':'COMPUTER'} · PLAYER ${i+1}</div><input aria-label="Player ${i+1} name" value="${esc(p.name)}" data-pname="${i}" maxlength="21"></div>${setupPlayers.length>2?`<button class="remove" aria-label="Remove ${esc(p.name)}" data-remove="${i}">×</button>`:''}</div>`).join('');
 document.querySelectorAll('[data-pname]').forEach(x=>x.addEventListener('input',e=>setupPlayers[Number(e.target.dataset.pname)].name=e.target.value));
 document.querySelectorAll('[data-remove]').forEach(x=>x.onclick=()=>{setupPlayers.splice(+x.dataset.remove,1);renderPlayerSetup();});$('addHuman').disabled=setupPlayers.length>=4;$('addBot').disabled=setupPlayers.length>=4;}
function addPlayer(human){if(setupPlayers.length>=4)return;setupPlayers.push({name:human?'Player '+(setupPlayers.filter(p=>p.human).length+1):'Computer '+(setupPlayers.filter(p=>!p.human).length+1),human});renderPlayerSetup();}
function updateContinue(){let save;try{save=JSON.parse(localStorage.getItem(STORE)||'null');}catch(e){}$('continueGame').disabled=!validateState(save);$('continueGame').textContent=validateState(save)?`Resume Saved Match · ${save.round||1}`:'Resume Saved Match';}
function startMatch(){cancelPresentation();if(setupPlayers.length<2||setupPlayers.length>4){$('setupError').textContent='Choose 2–4 players.';return;}if(!setupPlayers.some(p=>p.human)){$('setupError').textContent='Include at least one human player.';return;}
 g={version:1,board:createBoard(),players:setupPlayers.map((p,i)=>({id:'p'+i,name:(p.name||'Player '+(i+1)).trim().slice(0,21),human:p.human,personality:!p.human?$('defaultAI').value:'human',difficulty:$('defaultDifficulty').value,token:TOKEN_SET[i],color:COLORS[i],cash:Number($('startingCash').value),position:0,turnsTaken:0,held:0,holdCards:0,bankrupt:false,stats:{rentPaid:0,rentCollected:0,purchases:0,upgrades:0,trades:0,auctions:0}})),turnIndex:0,mode:$('gameMode').value,quickEnd:$('quickEnd').value,roundLimit:Number($('roundLimit').value),timeLimit:Number($('timeLimit').value),startingCash:Number($('startingCash').value),startIncome:200,round:1,phase:'roll',doubleStreak:0,extra:false,lastDice:[0,0],pending:null,debt:null,auction:null,log:[],last:'Welcome to the Naches Edition!',elapsedSeconds:0,clockAnchor:Date.now(),startedAt:Date.now(),finalRoundTarget:null,decks:null,seenCards:null,effects:null,activeCard:null,storageIssue:null,aiPace:$('botPace').value,botTurn:null,botRecap:null,recentBotRecaps:[]};
 ensureCardState();ledger('Match started. '+g.players.length+' players are ready.');enterGame();commit();}
function loadMatch(){cancelPresentation();try{const save=JSON.parse(localStorage.getItem(STORE));if(!validateState(save))throw Error('Invalid save');g=save;normalizeLoadedGame();if(!current().human&&g.phase!=='recap'&&!g.botTurn)beginBotTurn();enterGame();commit();if(g.pendingTrade&&validTrade(g.pendingTrade)&&getPlayer(g.pendingTrade.to).human)showTradeAcceptance(g.pendingTrade);}catch(e){$('setupError').textContent='Saved match could not be loaded. You can start a new game.';}}
function validateState(s){
 if(!s||s.version!==1||!Array.isArray(s.board)||s.board.length!==40||!Array.isArray(s.players)||s.players.length<2||s.players.length>6||!Number.isInteger(s.turnIndex)||s.turnIndex<0||s.turnIndex>=s.players.length)return false;
 const ids=s.players.map(p=>p?.id);
 if(new Set(ids).size!==ids.length||s.players.some(p=>!p||typeof p.id!=='string'||!Number.isFinite(p.cash)||p.cash<0||!Number.isInteger(p.position)||p.position<0||p.position>=40||!Number.isInteger(p.turnsTaken)||p.turnsTaken<0||typeof p.human!=='boolean'||typeof p.name!=='string'||p.name.length>100))return false;
 if(!Array.isArray(s.log)||!Array.isArray(s.lastDice)||s.lastDice.length!==2||!Number.isFinite(s.round)||s.round<1)return false;
 if(!s.board.every((b,i)=>b&&b.index===i&&b.type===BOARD_DATA[i].type&&(!b.owner||ids.includes(b.owner)&&isOwnable(b))&&Number.isInteger(b.level)&&b.level>=0&&b.level<=5&&(b.type==='BUSINESS'||b.level===0)))return false;
 const phases=['roll','choice','auction','debt','manage','handoff','recap','card','ended'];
 if(!phases.includes(s.phase))return false;
 if(s.phase==='choice'&&(!s.pending||!Number.isInteger(s.pending.space)||!s.board[s.pending.space]||!isOwnable(s.board[s.pending.space])||s.board[s.pending.space].owner))return false;
 if(s.phase==='auction'&&(!s.auction||!Number.isInteger(s.auction.space)||!isOwnable(s.board[s.auction.space]||{})||!ids.includes(s.auction.current)||!Array.isArray(s.auction.active)||s.auction.active.some(id=>!ids.includes(id))||!Number.isFinite(s.auction.highBid)))return false;
 if(s.phase==='debt'&&(!s.debt||!ids.includes(s.debt.fromId)||!Number.isFinite(s.debt.amount)||s.debt.amount<0))return false;
 if(s.phase==='card'&&(!s.activeCard||!EVENTS[s.activeCard.deck]||!Number.isInteger(s.activeCard.index)||!EVENTS[s.activeCard.deck][s.activeCard.index]))return false;
 if(s.phase==='recap'&&!s.botRecap)return false;
 return true;
}
function normalizeLoadedGame(){
 if(!Array.isArray(g.recentBotRecaps))g.recentBotRecaps=[];
 if(!g.aiPace)g.aiPace='story';
 if(!Array.isArray(g.log))g.log=[];
 for(const p of g.players){
  if(!p.stats||typeof p.stats!=='object')p.stats={rentPaid:0,rentCollected:0,purchases:0,upgrades:0,trades:0,auctions:0};
  for(const k of ['rentPaid','rentCollected','purchases','upgrades','trades','auctions'])if(!Number.isFinite(p.stats[k]))p.stats[k]=0;
  if(!Number.isFinite(p.holdCards))p.holdCards=0;
  if(!Number.isFinite(p.held))p.held=0;
 }
 ensureCardState();
 g.clockAnchor=Date.now();
}
function enterGame(){$('setup').classList.add('hidden');$('game').classList.remove('hidden');}
function nextPlayer(){let ix=g.turnIndex;for(let i=0;i<g.players.length;i++){ix=(ix+1)%g.players.length;if(!g.players[ix].bankrupt)return ix;}return g.turnIndex;}
async function rollDice(){if(!g||g.phase!=='roll'||presentationBusy)return;presentationBusy=true;clearTimeout(botTimer);const original=g,p=current();const d1=1+Math.floor(Math.random()*6),d2=1+Math.floor(Math.random()*6);await animatedDice(d1,d2,p);if(g!==original)return;endPresentation();resolveDice(d1,d2);}
function resolveDice(d1,d2){const p=current();const sum=d1+d2;g.lastDice=[d1,d2];ledger(`${p.name} rolled ${d1} + ${d2} = ${sum}.`,'dice');
 if(p.held>0){if(d1===d2){p.held=0;g.doubleStreak=0;g.extra=false;ledger(`${p.name} rolled doubles and escaped the detour.`);moveBy(p,sum,false);return;}p.held++;if(p.held>=3){p.held=0;g.extra=false;makePayment(p.id,null,50,'Third unsuccessful detour roll',()=>moveBy(p,sum,false));return;}ledger(`${p.name} is still on the detour (${p.held}/3).`);g.phase='manage';commit();return;}
 g.doubleStreak=d1===d2?g.doubleStreak+1:0;g.extra=(d1===d2);if(g.doubleStreak>=3){g.extra=false;sendToHold(p,'Three consecutive doubles');commit();return;}moveBy(p,sum,true);}
async function moveBy(p,count,grantStart){
 const old=p.position,match=g;presentationBusy=true;clearTimeout(botTimer);const steps=Math.max(0,Math.min(40,count));
 for(let i=1;i<=steps;i++){
  if(g!==match)return;
  p.position=(old+i)%40;
  renderBoard();const el=document.querySelector(`[data-space="${p.position}"]`);el?.classList.add('traveling');
  await sleep(paceMs());
 }
 if(g!==match)return;
 if(grantStart&&old+count>=40){ensureCardState();const toll=g.effects[p.id].startToll||0;const income=Math.max(0,g.startIncome-toll);g.effects[p.id].startToll=0;p.cash+=income;ledger(`${p.name} passed Gateway to Naches and received ${money(income)}${toll?' after winter road deductions':''}.`,'income');}
 p.position=(old+count)%40;
 const landing=document.querySelector(`[data-space="${p.position}"]`);landing?.classList.remove('traveling');landing?.classList.add('landing');
 ledger(`${p.name} arrived at ${space(p.position).name}.`);toast(`${p.token} ${p.name} landed on ${space(p.position).name}`);
 await sleep(paceMs()*1.5);if(g!==match)return;endPresentation();land(p,0);
}
function moveTo(p,i){toast(`${p.token} Travel to ${space(i).name}`);if(i<=p.position&&i===0){p.cash+=g.startIncome;ledger(`${p.name} collected ${money(g.startIncome)} for passing Start.`,'income');}p.position=i;ledger(`${p.name} moved to ${space(i).name}.`);land(p,1);}
function sendToHold(p,reason){p.position=10;p.held=1;g.doubleStreak=0;g.extra=false;ledger(`${p.name} enters the Scenic Detour. ${reason}.`,'hold');g.phase='manage';}
function land(p,depth){if(depth>3){finishLanding();return;}const s=space(p.position);if(isOwnable(s)){
 if(!s.owner){g.pending={space:s.index};g.phase='choice';ledger(`${s.name} is unowned. Purchase or auction it.`);commit();return;}
 if(s.owner!==p.id&&!s.mortgaged){const amount=calculateRent(s);const rec=getPlayer(s.owner);makePayment(p.id,rec.id,amount,`Rent at ${s.name}`,finishLanding);return;}
 }else if(s.type==='TAX'){makePayment(p.id,null,s.index===4?200:100,`${s.name}`,finishLanding);return;}
 else if(s.type==='GO_TO_HOLD'){sendToHold(p,'Road closure');commit();return;}
 else if(s.type==='EVENT'){drawEvent(s.name,depth);return;}
 finishLanding();}
function calculateRent(s){if(s.type==='TRANSPORT'){const c=owned(s.owner).filter(b=>b.type==='TRANSPORT').length;return [0,25,50,100,200][c];}if(s.type==='UTILITY'){const c=owned(s.owner).filter(b=>b.type==='UTILITY').length;return (g.lastDice[0]+g.lastDice[1])*(c===2?10:4);}let r=baseRent(s);if(s.level>0)return Math.max(r,Math.round(r*[1,5,15,40,70,110][s.level]/2)*2);return ownGroup(s.owner,s.group)?r*2:r;}

function makePayment(fromId,toId,amount,reason,onPaid){const p=getPlayer(fromId);if(amount<=0){onPaid();return;}if(p.cash<amount){g.debt={fromId,toId,amount,reason,resume:reason==='Third unsuccessful detour roll'?{type:'move',steps:g.lastDice[0]+g.lastDice[1]}:null};g.phase='debt';ledger(`${p.name} needs ${money(amount-p.cash)} more to pay ${reason}.`,'debt');commit();if(!p.human)scheduleBot();return;}p.cash-=amount;if(toId)getPlayer(toId).cash+=amount;if(toId&&reason.startsWith('Rent at ')){p.stats.rentPaid+=amount;getPlayer(toId).stats.rentCollected+=amount;}ledger(`${p.name} paid ${money(amount)} ${toId?'to '+getPlayer(toId).name:'to the bank'}: ${reason}.`,'expense');onPaid();}
function settleDebt(){if(g.phase!=='debt'||!g.debt)return;const d=g.debt,p=getPlayer(d.fromId);if(p.cash<d.amount)return;p.cash-=d.amount;if(d.toId)getPlayer(d.toId).cash+=d.amount;if(d.toId&&d.reason.startsWith('Rent at ')){p.stats.rentPaid+=d.amount;getPlayer(d.toId).stats.rentCollected+=d.amount;}ledger(`${p.name} recovered and paid ${money(d.amount)} for ${d.reason}.`,'expense');g.debt=null;if(d.reason==='Detour release fee'){p.held=0;g.phase='roll';commit();}else if(d.resume?.type==='move'){moveBy(p,d.resume.steps,false);}else finishLanding();}
function declareBankruptcy(){if(!g.debt)return;const d=g.debt,p=getPlayer(d.fromId);const cr=d.toId?getPlayer(d.toId):null;if(cr){cr.cash+=p.cash;}p.cash=0;for(const s of owned(p.id)){s.owner=cr?cr.id:null;s.level=0;if(!cr)s.mortgaged=false;}p.bankrupt=true;g.debt=null;g.extra=false;g.doubleStreak=0;ledger(`${p.name} declared bankruptcy${cr?' to '+cr.name:''}.`,'debt');if(alive().length<=1){if(!p.human){g.phase='manage';finishTurn();}else endMatch();return;}g.phase='manage';commit();}
function finishLanding(){if(current().bankrupt){g.phase='manage';commit();return;}g.pending=null;g.debt=null;g.phase=g.extra?'roll':'manage';commit();}
function buyProperty(){if(g.phase!=='choice')return;const p=current(),s=space(g.pending.space),v=price(s);if(p.cash<v)return;p.cash-=v;s.owner=p.id;p.stats.purchases++;ledger(`${p.name} purchased ${s.name} for ${money(v)}.`,'purchase');finishLanding();}
function declineProperty(){if(g.phase!=='choice')return;const s=space(g.pending.space);ledger(`${current().name} declined ${s.name}; auction begins.`,'auction');startAuction(s.index);}
function startAuction(index){g.phase='auction';g.pending=null;g.auction={space:index,active:alive().map(p=>p.id),current:null,highBid:0,leader:null,lastIndex:g.turnIndex};chooseAuctionBidder();}
function chooseAuctionBidder(){const a=g.auction;if(!a)return;if(a.active.length===0||a.active.length===1&&a.leader){completeAuction();return;}if(a.active.length===1&&!a.leader){a.current=a.active[0];commit();return;}for(let k=1;k<=g.players.length;k++){const ix=(a.lastIndex+k)%g.players.length;const id=g.players[ix].id;if(a.active.includes(id)){a.lastIndex=ix;a.current=id;commit();return;}}completeAuction();}
function placeBid(amount){const a=g.auction;if(!a||!a.active.includes(a.current))return;const p=getPlayer(a.current);if(!Number.isInteger(amount)||amount<=a.highBid||amount>p.cash)return;a.highBid=amount;a.leader=p.id;ledger(`${p.name} bid ${money(amount)} for ${space(a.space).name}.`,'auction');chooseAuctionBidder();}
function passBid(){const a=g.auction;if(!a)return;const p=getPlayer(a.current);a.active=a.active.filter(x=>x!==p.id);ledger(`${p.name} passed on the auction.`,'auction');chooseAuctionBidder();}
function completeAuction(){const a=g.auction;if(!a)return;const s=space(a.space);if(a.leader){const p=getPlayer(a.leader);if(p.cash>=a.highBid){p.cash-=a.highBid;s.owner=p.id;p.stats.auctions++;ledger(`${p.name} won the ${s.name} auction for ${money(a.highBid)}.`,'purchase');}}else ledger(`Nobody bid for ${s.name}.`);g.auction=null;finishLanding();}
function canBuild(s){if(!g||s.type!=='BUSINESS'||s.owner!==current().id||s.mortgaged||s.level>=5||!ownGroup(s.owner,s.group))return false;const group=g.board.filter(x=>x.group===s.group);return !group.some(x=>x.mortgaged)&&s.level===Math.min(...group.map(x=>x.level))&&current().cash>=developCost(s);}
function canSell(s){if(!g||s.owner!==current().id||s.type!=='BUSINESS'||s.level<=0)return false;return s.level===Math.max(...g.board.filter(x=>x.group===s.group).map(x=>x.level));}
function canMortgage(s){return s.owner===current().id&&!s.mortgaged&&(s.type!=='BUSINESS'||g.board.filter(x=>x.group===s.group).every(x=>x.level===0));}
function canUnmortgage(s){return s.owner===current().id&&s.mortgaged&&current().cash>=Math.ceil(price(s)*.55);}
function manage(index,action){if(!g||!['manage','debt','roll'].includes(g.phase))return;const s=space(index),p=current();if(s.owner!==p.id||!p.human)return;let label='';if(action==='build'&&canBuild(s)){s.level++;p.cash-=developCost(s);p.stats.upgrades++;label=`${p.name} improved ${s.name} to level ${s.level} for ${money(developCost(s))}.`;}else if(action==='sell'&&canSell(s)){s.level--;p.cash+=Math.floor(developCost(s)/2);label=`${p.name} sold an improvement at ${s.name} for ${money(Math.floor(developCost(s)/2))}.`;}else if(action==='mortgage'&&canMortgage(s)){s.mortgaged=true;p.cash+=Math.floor(price(s)/2);label=`${p.name} mortgaged ${s.name} for ${money(Math.floor(price(s)/2))}.`;}else if(action==='unmortgage'&&canUnmortgage(s)){s.mortgaged=false;p.cash-=Math.ceil(price(s)*.55);label=`${p.name} repaid the mortgage on ${s.name}.`;}if(label){ledger(label,'management');commit();}}
function payToLeave(){if(g.phase!=='roll'||current().held<=0)return;const p=current();if(p.holdCards>0){p.holdCards--;p.held=0;ledger(`${p.name} used a Detour Pass.`);commit();return;}if(p.cash<50){g.debt={fromId:p.id,toId:null,amount:50,reason:'Detour release fee'};g.phase='debt';commit();return;}p.cash-=50;p.held=0;ledger(`${p.name} paid $50 to leave the detour.`);commit();}
function finishTurn(){if(!g||g.phase!=='manage')return;const p=current();p.turnsTaken++;g.doubleStreak=0;g.extra=false;g.round=Math.min(...alive().map(x=>x.turnsTaken))+1;
 if(!p.human){finalizeBotTurn();return;}
 if(alive().length<=1){endMatch();return;}
 if(g.mode==='quick'&&((g.quickEnd==='rounds'&&alive().every(x=>x.turnsTaken>=g.roundLimit))||(g.quickEnd==='time'&&g.finalRoundTarget&&alive().every(x=>x.turnsTaken>=g.finalRoundTarget)))){endMatch();return;}
 g.turnIndex=nextPlayer();g.lastDice=[0,0];g.phase=g.players[g.turnIndex].human?'handoff':'roll';applyTimedEffects(current());ledger(`Next: ${current().name}.`);if(!current().human)beginBotTurn();commit();}
function readyNext(){if(g.phase!=='handoff')return;g.phase='roll';commit();}
function endMatch(){g.phase='ended';g.auction=null;g.debt=null;const results=[...g.players].sort((a,b)=>Number(a.bankrupt)-Number(b.bankrupt)||worth(b)-worth(a));const champ=results[0];ledger(`Match completed. ${champ.name} is Valley Champion!`,'victory');commit();}
function render(){if(!g)return;renderEventPanel();renderBoard();renderHUD();renderTurn();renderPlayers();renderPortfolio();renderAssets();renderBotActivity();$('lastAction').textContent=g.last||'';}
function renderHUD(){const p=current();$('aiPaceLive').value=g.aiPace||'story';$('roundTitle').textContent=`Round ${g.round}`;$('modeDescription').textContent=g.mode==='quick'?g.quickEnd==='rounds'?`Quick Play · ${g.roundLimit} turns / player`:`Quick Play · ${Math.max(0,Math.ceil((g.timeLimit*60-g.elapsedSeconds)/60))} min remaining${g.finalRoundTarget?' · final round':''}`:'Full Game';$('statusTitle').textContent=g.phase==='ended'?'Game complete':g.phase==='debt'?'Financial recovery':g.phase==='auction'?'Property auction':g.phase==='card'?'Event card drawn':g.phase==='choice'?'Property available':g.phase==='handoff'?'Pass device to '+p.name:g.phase==='recap'?'Computer turn complete · read recap':`${p.name} · ${g.phase==='roll'?'roll dice':'manage and end turn'}`;}
function boardCoords(i){if(i<=10)return [11,11-i];if(i<=20)return [21-i,1];if(i<=30)return [1,i-19];return [i-29,11];}
// Stage 2.0: a lightweight, accessible SVG town that reads the live property state.
const TOWN_SITES=[1,3,6,8,9,11,13,14,16,18,19,21,23,24,26,27,29,31,32,34,37,39];
function townBuilding(s,i){
 const owner=s.owner?getPlayer(s.owner):null,level=s.level||0;
 const col=i%6,row=Math.floor(i/6),x=79+col*109+(row%2)*12,y=295+row*78;
 const front=owner?owner.color:'#d7bd92',roof=owner?owner.color:'#765d53';
 const w=level>=5?78:level>=2?72:65,h=level>=5?67:38+level*5;
 const name=esc(s.name),label=esc(s.name.length>17?s.name.slice(0,16)+'…':s.name);
 const roofTop=y-h,lit=level>0?'#ffe5a6':'#c2e1dc';
 const signs=level>=5?'<text x="0" y="-6" text-anchor="middle" font-size="25" fill="#f5d16b">★</text>':level?`<text x="0" y="-6" text-anchor="middle" font-size="15" fill="#f9eac3">${'✦'.repeat(Math.min(level,4))}</text>`:'';
 return `<g class="town-site ${owner?'town-owned':''} ${level?'town-developed':''}" data-town-space="${s.index}" role="button" tabindex="0" aria-label="${name}: ${owner?'owned by '+esc(owner.name):'unowned'}, ${level} improvements" transform="translate(${x} ${y})" style="--site-color:${roof}">
 <ellipse cx="0" cy="5" rx="48" ry="13" fill="#294b40" opacity=".24"/>
 <path d="M${-w/2} ${-h} l${w/2} -19 l${w/2} 19 v${h} h${-w}Z" fill="${roof}" stroke="#4f5350" stroke-width="1.3"/>
 <path d="M${-w/2} ${-h}h${w}v${h}h${-w}z" fill="${front}" stroke="#544f49" stroke-width="1.3"/>
 <path d="M${-w/2-6} ${-h}l${w/2+6} -19 l${w/2+6} 19z" fill="${roof}" stroke="#4d4b42" stroke-width="1.5"/>
 <rect x="-12" y="-27" width="24" height="27" rx="2" fill="#776453"/><rect x="${-w/2+6}" y="${-h+11}" width="15" height="14" rx="2" fill="${lit}" stroke="#6e7975" stroke-width="1"/><rect x="${w/2-21}" y="${-h+11}" width="15" height="14" rx="2" fill="${lit}" stroke="#6e7975" stroke-width="1"/>
 ${level>=3?`<rect x="${-w/2+4}" y="${-h+30}" width="${w-8}" height="6" fill="#fff1c3" opacity=".65"/>`:''}
 ${signs}
 <rect x="-47" y="11" width="94" height="21" rx="5" fill="#f8f7e8" opacity=".96" stroke="#677c65" stroke-width=".8"/>
 <text x="0" y="25" font-size="10" fill="#213c3a" font-weight="700" text-anchor="middle">${label}</text>
 </g>`;
}
function renderMiniTown(){
 const acquired=g.board.filter(s=>isOwnable(s)&&s.owner).length;
 const developed=g.board.reduce((sum,s)=>sum+(s.level||0),0);
 return `<div class="board-center town-center clear-center"><div class="simple-landscape" aria-hidden="true"><svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice"><rect width="800" height="340" fill="#d8ebea"/><circle cx="653" cy="68" r="38" fill="#f2dba0"/><path d="M0 225 125 92 231 189 392 52 545 225 675 100 800 232V340H0Z" fill="#7a9e9c"/><path d="M80 140 125 92 170 142 126 130Z M333 123 392 52 450 122 394 105Z M637 143 675 100 710 144 675 134Z" fill="#f5f8f5"/><path d="M0 250q180 -84 390 0t410 -18V340H0Z" fill="#8bac7d"/><path d="M0 293q190 -42 390 5t410 -11V340H0Z" fill="#6f9a6e"/><g fill="#477752">${Array.from({length:8},(_,i)=>`<circle cx="${43+i*103}" cy="281" r="20"/>`).join('')}</g></svg></div><div class="simple-center-info"><div class="mini-overline">NACHES EDITION</div><strong>NACHESOPOLY</strong><span>VALLEY VENTURES</span><div class="center-metrics"><b>${acquired}/${g.board.filter(isOwnable).length}</b> properties owned <b>${developed}</b> improvements</div><button class="town-explore" id="townExplore" type="button">Browse all properties</button></div></div>`;
}
const BUSINESS_SYMBOLS={1:'☕',3:'☕',6:'🧺',8:'🌷',9:'🍔',11:'🥐',13:'🥤',14:'🍽️',16:'🎨',18:'🏫',19:'🧰',21:'🛒',23:'🍎',24:'🍐',26:'🔧',27:'🛞',29:'⛽',31:'🛍️',32:'🛏️',34:'🍽️',37:'🏭',39:'🍎'};
function propertySymbol(s){if(s.type==='BUSINESS')return BUSINESS_SYMBOLS[s.index]||'⌂';if(s.type==='TRANSPORT')return '🚚';if(s.type==='UTILITY')return '⚡';if(s.type==='EVENT')return '✦';if(s.type==='TAX')return '$';if(s.index===0)return '➤';if(s.index===10||s.index===30)return '⚠';if(s.index===20)return '♧';return '◆';}
function buildingMarker(s,owner){if(!owner)return '';const level=s.level||0;const floors=Math.max(1,Math.min(5,level+1));return `<span class="cell-building" title="${esc(owner.name)} · ${level?level===5?'Landmark upgrade':level+' upgrades':'No upgrades'}" style="--building:${owner.color};--floors:${floors}"><span class="roof"></span><span class="building-body">${level>=5?'★':Array.from({length:Math.min(4,floors)},()=>'<i></i>').join('')}</span></span>`;}
function renderPortfolio(){
 const p=current(),mine=owned(p.id);
 const cards=mine.length?mine.map(s=>{
   const gc=GROUP_COLOR[s.group]||(s.type==='TRANSPORT'?'#9b7858':'#b8aa57');
   return `<button class="portfolio-property" data-portfolio="${s.index}" style="--group:${gc}" aria-label="${esc(s.name)}; ${s.mortgaged?'mortgaged':s.level===5?'landmark':s.level+' improvements'}"><span class="portfolio-group"></span><span class="portfolio-property-symbol" aria-hidden="true">${propertySymbol(s)}</span><span class="portfolio-property-name">${esc(s.name)}</span><span class="portfolio-property-meta">${s.mortgaged?'Mortgaged':s.level===5?'★ Landmark':s.level?'↑ Level '+s.level:'Owned'} · ${money(price(s))}</span></button>`;
 }).join(''):'<div class="portfolio-empty">No property cards yet. Purchase a space to add it here.</div>';
 $('portfolioBar').innerHTML=`<div class="portfolio-heading"><span class="portfolio-avatar" style="background:${p.color}" aria-hidden="true">${p.token}</span><div class="portfolio-title"><b>My property cards</b><small>${esc(p.name)} · ${mine.length} owned · ${money(worth(p))} net worth</small></div><button class="portfolio-toggle" id="portfolioToggle" type="button" aria-expanded="${portfolioExpanded}" aria-controls="activePortfolioCards">${portfolioExpanded?'Hide':'Show'} cards ${portfolioExpanded?'−':'+'}</button></div><div id="activePortfolioCards" class="portfolio-list ${portfolioExpanded?'':'collapsed'}">${cards}</div>`;
 $('portfolioToggle').onclick=()=>{portfolioExpanded=!portfolioExpanded;renderPortfolio()};
 $('portfolioBar').querySelectorAll('[data-portfolio]').forEach(b=>b.onclick=()=>showSpace(Number(b.dataset.portfolio)));
}

function renderBoard(){let html=renderMiniTown();
 for(const s of g.board){const [r,c]=boardCoords(s.index);const isCorner=[0,10,20,30].includes(s.index);const tokens=g.players.filter(p=>!p.bankrupt&&p.position===s.index).map(p=>`<span class="mini-token" title="${esc(p.name)}">${p.token}</span>`).join('');const owner=s.owner?getPlayer(s.owner):null;const gc=GROUP_COLOR[s.group]||(s.type==='TRANSPORT'?'#9b7858':s.type==='UTILITY'?'#b8aa57':s.type==='EVENT'?'#73a9a2':s.type==='TAX'?'#b97676':'#a9b4a5');html+=`<button class="board-cell ${isCorner?'corner':''} ${owner?'owned':''} ${current().position===s.index?'active':''}" data-space="${s.index}" style="grid-row:${r};grid-column:${c};--group:${gc};--owner:${owner?owner.color:gc}" title="${esc(s.name)} — ${esc(s.type)}" aria-label="${esc(s.name)}, ${isOwnable(s)?money(price(s)):s.type}, ${owner?'owned by '+esc(owner.name):'unowned'}${s.level?', ' + s.level + ' upgrades':''}"><span class="group-strip"></span>${owner?'<span class="cell-owner"></span>':''}<span class="cell-symbol" aria-hidden="true">${propertySymbol(s)}</span>${buildingMarker(s,owner)}<span class="cell-name">${esc(s.name)}</span><span class="cell-price">${isOwnable(s)?money(price(s)):s.index===0?'START':''}</span>${s.level?`<span class="cell-upgrades">${s.level===5?'★':'+'+s.level}</span>`:''}<span class="cell-tokens">${tokens}</span></button>`;}
 $('board').innerHTML=html;document.querySelectorAll('[data-space]').forEach(el=>{
  const i=Number(el.dataset.space);
  el.onclick=()=>showSpace(i);
  el.addEventListener('pointerenter',()=>showBoardPeek(i));
  el.addEventListener('focus',()=>showBoardPeek(i));
});document.querySelectorAll('[data-town-space]').forEach(el=>{const open=()=>showSpace(Number(el.dataset.townSpace));el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});$('townExplore')?.addEventListener('click',showTownExplorer);}
function showBoardPeek(i){
 const s=space(i),p=s.owner?getPlayer(s.owner):null,peek=$('boardPeek');
 if(!peek)return;
 peek.innerHTML=`<span class="peek-dot" style="background:${p?p.color:GROUP_COLOR[s.group]||'#82aaa1'}"></span><strong>${esc(s.name)}</strong><span>${isOwnable(s)?money(price(s)):'Special space'}</span><span>${p?'Owned by '+esc(p.name):isOwnable(s)?'Unowned':esc(s.type)}</span>${s.level?`<span>Level ${s.level===5?'★':s.level}</span>`:''}`;
}
function showTownExplorer(){
 const entries=g.board.filter(s=>s.type==='BUSINESS');
 const rows=entries.map(s=>{const owner=s.owner?getPlayer(s.owner):null;return `<button class="town-explore-item" data-inspect-town="${s.index}"><span class="town-marker" style="background:${owner?owner.color:'#aaa58e'}"></span><span><b>${esc(s.name)}</b><small>${owner?'Owned by '+esc(owner.name):'Unowned'} · ${s.level?`${s.level===5?'Landmark':s.level+' improvements'}`:'No improvements'}</small></span><strong>View ↗</strong></button>`;}).join('');
 showModal('Browse Naches properties',`<p>Inspect the property cards, ownership, and improvement levels in the current match. Select any business below for purchase and rent details.</p><div class="town-explore-list">${rows}</div>`);
 document.querySelectorAll('[data-inspect-town]').forEach(b=>b.addEventListener('click',()=>showSpace(Number(b.dataset.inspectTown))));
}
function renderPlayers(){
 const rivals=g.players.filter(p=>p.id!==current().id);
 $('playerCards').innerHTML=rivals.map(p=>{
  const own=owned(p.id),groups=own.map(s=>`<button type="button" class="rival-property" data-rival-space="${s.index}" style="--group:${GROUP_COLOR[s.group]||(s.type==='TRANSPORT'?'#a18461':'#c5b35f')}" aria-label="Inspect ${esc(s.name)} owned by ${esc(p.name)}" title="${esc(s.name)}${s.level?' · Level '+s.level:''}">${esc(s.name)}${s.level?` <b>${s.level===5?'★':'+'+s.level}</b>`:''}</button>`).join('');
  return `<article class="rival-player ${p.bankrupt?'bankrupt':''}" style="--player:${p.color}"><div class="rival-top"><span class="rival-avatar" aria-hidden="true">${p.token}</span><div class="rival-identity"><strong>${esc(p.name)}</strong><small>${p.human?'Human':'Computer · '+esc(p.personality||'AI')}${p.bankrupt?' · OUT':''}</small></div><div class="rival-cash"><strong>${money(p.cash)}</strong><small>Worth ${money(worth(p))}</small></div></div><div class="rival-assets"><span class="rival-property-count">${own.length} ${own.length===1?'card':'cards'}</span><div class="rival-property-list">${groups||'<span class="rival-no-properties">None yet</span>'}</div></div></article>`;
 }).join('');
 $('playerCards').querySelectorAll('[data-rival-space]').forEach(b=>b.onclick=()=>showSpace(Number(b.dataset.rivalSpace)));
}

function renderTurn(){const p=current();let html=`<div class="turn-badge">${p.human?'LOCAL PLAYER':'COMPUTER PLAYER'} · ${p.token}</div><div class="turn-name">${esc(p.name)}</div><div class="turn-funds"><div class="funds-cell"><small>Cash</small><strong>${money(p.cash)}</strong></div><div class="funds-cell"><small>Net worth</small><strong>${money(worth(p))}</strong></div></div>`;
 if(g.lastDice.some(Boolean))html+=`<div class="dice" aria-label="Last dice ${g.lastDice[0]} and ${g.lastDice[1]}"><span class="die">${g.lastDice[0]}</span><span class="die">${g.lastDice[1]}</span></div>`;
 html+='<div class="turn-actions">';switch(g.phase){case 'handoff':html+='<p class="notice">Pass the device to '+esc(p.name)+'. Press Ready when they have it.</p><button class="button primary" data-action="ready">Ready — My Turn</button>';break;
 case 'roll':if(p.held>0)html+=`<div class="notice">Scenic Detour · Attempt ${p.held}/3. Roll doubles to leave, pay $50, or use a pass.</div>`;html+=p.human?'<button class="button primary" data-action="roll">🎲 Roll dice</button>':`<div class="notice">${esc(p.name)} is thinking…</div>`;if(p.held>0&&p.human)html+='<button class="button minor" data-action="release">Pay / use Detour Pass</button>';break;
 case 'choice':{const s=space(g.pending.space);html+=`<div class="notice"><b>${esc(s.name)}</b><br>Available for ${money(price(s))}</div>`;if(p.human){html+=`<button class="button primary" data-action="buy" ${p.cash<price(s)?'disabled':''}>Buy · ${money(price(s))}</button><button class="button minor" data-action="decline">Decline / Auction</button>`;}else html+='<div class="notice">Computer considering purchase…</div>';break;}
 case 'auction':{const a=g.auction,bidder=getPlayer(a.current);const s=space(a.space);html+=`<div class="notice"><b>Auction: ${esc(s.name)}</b><br>High bid: ${money(a.highBid)} ${a.leader?'· '+esc(getPlayer(a.leader).name):''}<br>Current bidder: ${esc(bidder.name)}</div>`;if(bidder.human){const min=a.highBid+10;html+=`<label style="font-size:12px">Your bid <input id="bidInput" type="number" min="${min}" max="${bidder.cash}" value="${min}" step="10" style="width:105px;padding:8px"></label><button class="button primary" data-action="bid" ${min>bidder.cash?'disabled':''}>Place Bid</button><button class="button minor" data-action="pass">Pass</button>`;}else html+='<div class="notice">Computer bidding…</div>';break;}
 case 'debt':{const d=g.debt;html+=`<div class="notice"><b>Financial Recovery</b><br>${esc(d.reason)} · Due ${money(d.amount)}<br>Shortfall: ${money(Math.max(0,d.amount-p.cash))}. Sell upgrades or mortgage properties below.</div>`;if(p.human)html+=`<button class="button primary" data-action="pay-debt" ${p.cash<d.amount?'disabled':''}>Pay ${money(d.amount)}</button><button class="button warn" data-action="bankrupt">Declare bankruptcy</button>`;break;}
 case 'manage':html+=p.human?'<button class="button primary" data-action="end">End turn →</button>':`<div class="notice">${esc(p.name)} is managing their properties…</div>`;break;
 case 'card':html+='<div class="notice">An event card is being revealed. Read it before continuing.</div>';break;
 case 'recap':html+=`<div class="notice">${esc(p.name)} has finished. Read the complete turn recap above, then choose Continue.</div>`;break;
 case 'ended':{let sorted=[...g.players].sort((a,b)=>Number(a.bankrupt)-Number(b.bankrupt)||worth(b)-worth(a));html+=`<div class="notice"><strong>🏆 ${esc(sorted[0].name)} wins!</strong><br>${money(worth(sorted[0]))} final net worth.</div><button class="button primary" data-action="results">Results & rankings</button>`;break;}}
 html+='</div>';if(g.storageIssue)html+=`<p class="notice">${esc(g.storageIssue)}</p>`;$('turnPanel').innerHTML=html;document.querySelectorAll('#turnPanel [data-action]').forEach(el=>el.onclick=()=>act(el.dataset.action));}
function renderAssets(){const p=current(),ls=owned(p.id);if(!ls.length){$('ownedList').innerHTML='<p class="subtle">No properties yet. Land on an unowned business to start investing.</p>';return;}$('ownedList').innerHTML=ls.map(s=>`<div class="asset-row"><div class="asset-info"><strong>${esc(s.name)}</strong>${esc(s.group||s.type)} · ${s.mortgaged?'Mortgaged':s.level===5?'Landmark':s.level+' improvements'}</div><div class="asset-actions"><button data-manage="build" data-id="${s.index}" title="Improve" ${canBuild(s)?'':'disabled'}>+</button><button data-manage="sell" data-id="${s.index}" title="Sell improvement" ${canSell(s)?'':'disabled'}>−</button><button data-manage="${s.mortgaged?'unmortgage':'mortgage'}" data-id="${s.index}" title="${s.mortgaged?'Repay mortgage':'Mortgage'}" ${(s.mortgaged?canUnmortgage(s):canMortgage(s))?'':'disabled'}>${s.mortgaged?'↗':'M'}</button></div></div>`).join('');document.querySelectorAll('[data-manage]').forEach(el=>el.onclick=()=>manage(+el.dataset.id,el.dataset.manage));}
function act(a){if(presentationBusy)return;switch(a){case 'card':resolveCard();break;case 'continue-recap':finishBotRecap();break;case 'ready':readyNext();break;case 'roll':rollDice();break;case 'release':payToLeave();break;case 'buy':buyProperty();break;case 'decline':declineProperty();break;case 'bid':placeBid(Number($('bidInput').value));break;case 'pass':passBid();break;case 'pay-debt':settleDebt();break;case 'bankrupt':if(confirm('Declare bankruptcy and exit this match?'))declareBankruptcy();break;case 'end':finishTurn();break;case 'results':resultsDialog();break;}}
function scheduleBot(){clearTimeout(botTimer);if(presentationBusy)return;if(!g||['ended','recap'].includes(g.phase)||modalState)return;let p=g.phase==='auction'?getPlayer(g.auction.current):current();if(p?.human)return;botTimer=setTimeout(()=>{if(!g||['ended','recap'].includes(g.phase)||modalState)return;stepBot();},AI_PACE_MS[g.aiPace]||AI_PACE_MS.story);}
// Stage 1.4: explainable, deterministic-on-state financial choices (dice remain random).
const AI_SETTINGS={easy:{reserve:140,premium:.76,bid:.78,upgrade:1.35},normal:{reserve:240,premium:1,bid:1,upgrade:1},hard:{reserve:300,premium:1.19,bid:1.14,upgrade:.82}};
function botCfg(p){return AI_SETTINGS[p.difficulty]||AI_SETTINGS.normal;}
function liquidReserve(p){const base={saver:500,investor:110,negotiator:270,strategist:290}[p.personality]||290;return Math.max(65,Math.round(base*botCfg(p).reserve/240));}
function groupProgress(p,s){if(s.type!=='BUSINESS')return 0;const arr=g.board.filter(x=>x.group===s.group);return arr.filter(x=>x.owner===p.id).length/arr.length;}
function aiPropertyValue(p,s){let value=price(s),premium=1;const progress=groupProgress(p,s);if(s.type==='BUSINESS'){
  if(progress>0&&progress<1)premium+=progress*.48;
  if(g.board.filter(x=>x.group===s.group&&x.owner===p.id).length===g.board.filter(x=>x.group===s.group).length-1)premium+=.40;
  if(g.board.some(x=>x.group===s.group&&x.owner&&x.owner!==p.id))premium-=.09;
 }else if(s.type==='TRANSPORT')premium+=owned(p.id).filter(x=>x.type==='TRANSPORT').length*.15;
 else if(s.type==='UTILITY')premium+=owned(p.id).filter(x=>x.type==='UTILITY').length*.22;
 if(p.personality==='investor')premium+=.15;
 if(p.personality==='saver')premium-=.12;
 if(p.personality==='strategist')premium+=.035;
 return Math.max(0,Math.round(value*premium*botCfg(p).premium));}
function aiBidLimit(p,s){const cashLimit=Math.max(0,p.cash-liquidReserve(p));return Math.max(0,Math.min(cashLimit,Math.round(aiPropertyValue(p,s)*botCfg(p).bid)));}
function aiPurchaseDecision(p,s){const cost=price(s),value=aiPropertyValue(p,s),reserve=liquidReserve(p);
 const affordable=p.cash>=cost && (p.cash-cost>=reserve || (value>cost*1.33 && p.cash-cost>=Math.round(reserve*.45)));
 const reason=!affordable?`preserving ${money(reserve)} as a cash reserve`:`evaluating its group potential at ${money(value)} against the ${money(cost)} price`;
 return {buy:affordable&&value>=cost*(p.difficulty==='easy'?.66:.83),reason};}
function eligibleAiBuild(p,s){if(s.type!=='BUSINESS'||s.owner!==p.id||s.mortgaged||s.level>=5||!ownGroup(p.id,s.group))return false;const group=g.board.filter(x=>x.group===s.group);return group.every(x=>!x.mortgaged)&&s.level===Math.min(...group.map(x=>x.level));}
function aiBuildCandidate(p){let candidates=owned(p.id).filter(s=>eligibleAiBuild(p,s)&&p.cash>=developCost(s)+liquidReserve(p)*botCfg(p).upgrade);
 candidates.sort((a,b)=>(baseRent(b)*([1,5,15,40,70,110][b.level+1]-[1,5,15,40,70,110][b.level]))/developCost(b)-(baseRent(a)*([1,5,15,40,70,110][a.level+1]-[1,5,15,40,70,110][a.level]))/developCost(a));return candidates[0]||null;}
function aiTradeUtility(p,recv,send,receiveCash,payCash){let delta=receiveCash-payCash;
 if(recv)delta+=aiPropertyValue(p,recv)+(recv.type==='BUSINESS'&&groupProgress(p,recv)>0?.15*price(recv):0);
 if(send)delta-=aiPropertyValue(p,send)+(send.type==='BUSINESS'&&ownGroup(p.id,send.group)?.45*price(send):0);
 return delta;}
function stepBot(){if(!g)return;const p=current();if(g.phase==='auction'){const a=g.auction,b=getPlayer(a.current);if(!b||b.human)return;const s=space(a.space);const willing=aiBidLimit(b,s);const min=a.highBid+10;if(min<=willing){ledger(`${b.name} values ${s.name} at roughly ${money(aiPropertyValue(b,s))} and keeps a cash reserve.`,'strategy');placeBid(min);}else{ledger(`${b.name} will not exceed ${money(willing)} for ${s.name}.`,'strategy');passBid();}return;}
 if(p.human)return;
 if(g.phase==='card'){resolveCard(EVENTS[g.activeCard.deck][g.activeCard.index].kind==='choice'?0:0);return;}
 if(g.phase==='roll'){rollDice();return;}
 if(g.phase==='choice'){const s=space(g.pending.space);const decision=aiPurchaseDecision(p,s);ledger(`${p.name} is ${decision.reason}.`,'strategy');if(decision.buy)buyProperty();else declineProperty();return;}
 if(g.phase==='debt'){const d=g.debt;if(p.cash>=d.amount){settleDebt();return;}const improv=owned(p.id).filter(x=>x.type==='BUSINESS'&&x.level>0&&x.level===Math.max(...g.board.filter(z=>z.group===x.group).map(z=>z.level))).sort((a,b)=>developCost(b)-developCost(a));if(improv.length){sellForBot(improv[0]);return;}const mort=owned(p.id).filter(s=>!s.mortgaged&&((s.type!=='BUSINESS')||g.board.filter(x=>x.group===s.group).every(x=>x.level===0)));mort.sort((a,b)=>groupProgress(p,a)-groupProgress(p,b)||price(b)-price(a));if(mort.length){mort[0].mortgaged=true;p.cash+=Math.floor(price(mort[0])/2);ledger(`${p.name} mortgaged ${mort[0].name} to raise cash.`);commit();return;}declareBankruptcy();return;}
 if(g.phase==='manage'){if(!p.bankrupt&&maybeBotTrade(p))return;if(!p.bankrupt){const candidate=aiBuildCandidate(p);if(candidate){candidate.level++;p.cash-=developCost(candidate);p.stats.upgrades++;ledger(`${p.name} improved ${candidate.name} after comparing rent growth and available cash.`,'strategy');commit();return;}}
 finishTurn();return;}}
function sellForBot(s){const p=current();s.level--;p.cash+=Math.floor(developCost(s)/2);ledger(`${p.name} sold an improvement to raise cash.`);commit();}
function showModal(title,body){modalState=true;$('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modal').classList.remove('hidden');$('closeModal').focus();}
function closeModal(){
 // Closing a proposal without responding must not leave a phantom pending trade in saves.
 if(modalState==='trade'&&g?.pendingTrade){
  g.pendingTrade=null;
  ledger('The trade proposal was dismissed without a transaction.','trade');
  safeSave();
 }
 $('modal').classList.add('hidden');modalState=null;scheduleBot();
}
function showSpace(i){if(!g)return;const s=space(i),v=price(s),owner=s.owner?getPlayer(s.owner):null,ownable=isOwnable(s);let body=`<p>${esc(s.name)}${s.group?' · '+esc(s.group)+' group':''}</p>`;if(ownable){body+=`<div class="detail-meta"><div><small>Purchase</small><b>${money(v)}</b></div><div><small>Mortgage</small><b>${money(Math.floor(v/2))}</b></div><div><small>Owner</small><b>${owner?esc(owner.name):'Unowned'}</b></div></div>`;if(s.type==='BUSINESS'){body+='<table class="rate-table">'+[0,1,2,3,4,5].map(k=>`<tr><td>${k===0?'Base rent':k===5?'Landmark':'Improvements: '+k}</td><td>${money(k===0?baseRent(s):Math.max(baseRent(s),Math.round(baseRent(s)*[1,5,15,40,70,110][k]/2)*2))}</td></tr>`).join('')+'</table>'+`<p class="subtle">Improvement cost: ${money(developCost(s))} each. Requires complete group and even development.</p>`;}else body+`<p class="subtle">${s.type==='TRANSPORT'?'Rent rises with number of transportation franchises owned.':'Rent is based on dice roll and utilities owned.'}</p>`;if(s.mortgaged)body+='<p class="notice">This property is mortgaged and currently collects no rent.</p>';}else body+='<p class="subtle">Community-themed space; no private owner.</p>';if(s.address)body+=`<p class="subtle">Location: ${esc(s.address)}. Game values are fictional; business names do not imply sponsorship.</p>`;showModal(s.name,body);}
function showHistory(){if(!g)return;showModal('Transaction history',`<div style="max-height:55vh;overflow:auto">${g.log.map(x=>`<div class="log-entry"><small>Round ${x.round}</small><span>${esc(x.message)}</span></div>`).join('')}</div>`);}
function showRules(){showModal('How to play',`<p>Roll two dice and travel around the 40-space Naches board. You may purchase an unowned business, route or utility; declining sends it to auction. Pay rent on opponents’ properties and collect $200 for passing Start.</p><p>Own an entire color group to build evenly: up to four improvements and a landmark upgrade. You can mortgage eligible properties and sell improvements to raise cash.</p><p><strong>Doubles:</strong> Roll again, but three consecutive doubles send you to Scenic Detour. On a detour, roll doubles, pay $50, use a release card, or pay after three unsuccessful attempts.</p><p><strong>Quick Play:</strong> Most net worth after equal rounds or the class timer. <strong>Full Game:</strong> Last solvent player wins. Only in-game property values are shown. Both 24-card Naches event decks are active. Draws pause for reading; occasional rare and multi-turn effects are included. Additional towns and classroom features are upcoming.</p>`);}
// Stage 1.5: multi-asset, two-sided offers and bounded counteroffers.
function tradeEligible(playerId){return owned(playerId).filter(s=>!s.mortgaged&&s.level===0&&(s.type!=='BUSINESS'||g.board.filter(b=>b.group===s.group).every(b=>b.level===0)));}
function cleanDeal(d){return {from:d.from,to:d.to,give:Array.isArray(d.give)?d.give:(d.give===null?[]:[d.give]),take:Array.isArray(d.take)?d.take:(d.take===null?[]:[d.take]),offer:Number(d.offer)||0,request:Number(d.request)||0,counters:Number(d.counters)||0,origin:d.origin||'human'};}
function validTrade(raw){const d=cleanDeal(raw),p=getPlayer(d.from),t=getPlayer(d.to);if(!p||!t||p.bankrupt||t.bankrupt||p.id===t.id)return false;if(!Number.isSafeInteger(d.offer)||!Number.isSafeInteger(d.request)||d.offer<0||d.request<0||p.cash<d.offer||t.cash<d.request)return false;if(!d.give.length&&!d.take.length&&!d.offer&&!d.request)return false;if(new Set([...d.give,...d.take]).size!==d.give.length+d.take.length)return false;return d.give.every(i=>Number.isInteger(i)&&tradeEligible(p.id).some(s=>s.index===i))&&d.take.every(i=>Number.isInteger(i)&&tradeEligible(t.id).some(s=>s.index===i));}
function dealValue(player,raw){const d=cleanDeal(raw),receiver=player.id===d.to,rec=receiver?d.give:d.take,sent=receiver?d.take:d.give;let val=receiver?d.offer-d.request:d.request-d.offer;for(const i of rec)val+=aiPropertyValue(player,space(i));for(const i of sent)val-=aiPropertyValue(player,space(i));return val;}
function describeDeal(d){const p=getPlayer(d.from),t=getPlayer(d.to);const names=ids=>ids.length?ids.map(i=>esc(space(i).name)).join(', '):'No properties';return `<div class="deal-columns"><section><b>${esc(p.name)} gives</b><p>${names(d.give)}</p><strong>${money(d.offer)} cash</strong></section><section><b>${esc(t.name)} gives</b><p>${names(d.take)}</p><strong>${money(d.request)} cash</strong></section></div>`;}
function assetChecks(id,side,selected){const list=tradeEligible(id);return list.length?list.map(s=>`<label class="trade-check"><input type="checkbox" data-trade-side="${side}" value="${s.index}" ${selected.includes(s.index)?'checked':''}><span>${esc(s.name)} <small>${esc(s.group||s.type)} · ${money(price(s))}</small></span></label>`).join(''):'<p class="subtle">No eligible properties to exchange.</p>';}
function tradeDialog(seed=null,mode='propose'){
 if(!g||!['roll','manage'].includes(g.phase)||!current().human&&!seed)return;
 const initiator=seed?getPlayer(seed.from):current();const partners=g.players.filter(x=>x.id!==initiator.id&&!x.bankrupt);
 if(!partners.length)return;
 const d=seed?cleanDeal(seed):{from:initiator.id,to:partners[0].id,give:[],take:[],offer:0,request:0,counters:0,origin:'human'};
 const targets=partners.map(t=>`<option value="${t.id}" ${t.id===d.to?'selected':''}>${esc(t.name)} ${t.human?'(human)':'(computer)'}</option>`).join('');
 showModal(mode==='counter'?'Prepare a counteroffer':'Build a trade proposal',`<p class="subtle">Choose one or more properties on either side and optional cash. Properties with improvements or mortgages cannot be traded.</p><div class="trade-form"><label>Trade partner<select id="tradeTarget">${targets}</select></label><div></div><div class="trade-picker"><b>Your properties to offer</b><div id="offerAssets">${assetChecks(d.from,'give',d.give)}</div></div><div class="trade-picker"><b>Properties to request</b><div id="requestAssets">${assetChecks(d.to,'take',d.take)}</div></div><label>Cash you offer<input id="giveCash" type="number" min="0" step="10" value="${d.offer}"></label><label>Cash you request<input id="takeCash" type="number" min="0" step="10" value="${d.request}"></label></div><p id="tradeMessage" class="subtle" aria-live="polite">Both players must approve a valid deal.</p><div class="modal-actions"><button id="proposeTrade" class="button primary">${mode==='counter'?'Send counteroffer':'Propose trade'}</button><button id="cancelTrade" class="button minor">Cancel</button></div>`);
 $('tradeTarget').onchange=()=>{$('requestAssets').innerHTML=assetChecks($('tradeTarget').value,'take',[])};
 $('cancelTrade').onclick=closeModal;
 $('proposeTrade').onclick=()=>{
  const deal={from:d.from,to:$('tradeTarget').value,give:[...document.querySelectorAll('[data-trade-side="give"]:checked')].map(x=>+x.value),take:[...document.querySelectorAll('[data-trade-side="take"]:checked')].map(x=>+x.value),offer:Number($('giveCash').value),request:Number($('takeCash').value),counters:d.counters,origin:d.origin};
  if(!validTrade(deal)){$('tradeMessage').textContent='Invalid trade. Check cash, ownership, and eligible properties.';return;}
  closeModal();dispatchTrade(deal);
 };
}
function aiAcceptsTrade(raw,t){const d=cleanDeal(raw);if(!validTrade(d))return false;const slack=t.difficulty==='easy'?30:t.difficulty==='hard'?0:12;return dealValue(t,d)>=-slack&&t.cash+d.offer-d.request>=Math.min(liquidReserve(t),150);}
function dispatchTrade(raw){const d=cleanDeal(raw),recipient=getPlayer(d.to);if(!validTrade(d))return;if(recipient.human){g.pendingTrade=d;commit();showTradeAcceptance(d);}else{if(aiAcceptsTrade(d,recipient)){executeTrade(d);return;}if(d.counters<1){const counter=aiCounterTrade(d,recipient);if(counter){g.pendingTrade=counter;commit();showTradeAcceptance(counter,true);return;}}ledger(`${recipient.name} declined ${getPlayer(d.from).name}'s trade offer.`,'trade');g.pendingTrade=null;commit();}}
function aiCounterTrade(raw,bot){const d=cleanDeal(raw),deficit=Math.ceil(-dealValue(bot,d));if(deficit<=0)return null;const counter={...d,give:[...d.give],take:[...d.take],counters:d.counters+1}; // Request compensation without making the opponent's offer invalid.
 if(bot.id===d.to){counter.offer=Math.min(getPlayer(d.from).cash,d.offer+Math.ceil((deficit+20)/10)*10);}else{counter.request=Math.min(getPlayer(d.to).cash,d.request+Math.ceil((deficit+20)/10)*10);}
 return validTrade(counter)&&dealValue(bot,counter)>dealValue(bot,d)?counter:null;}
function showTradeAcceptance(raw,isCounter=false){const d=cleanDeal(raw),p=getPlayer(d.from),t=getPlayer(d.to);if(!validTrade(d)){g.pendingTrade=null;commit();return;}
 const humanRecipient=t.human?t:p;const fromComputer=!p.human;
 showModal(isCounter?'Computer counteroffer':fromComputer?'Computer trade proposal':`Trade proposal for ${t.name}`,`${describeDeal(d)}<p class="notice">${esc(humanRecipient.name)}, review the proposed exchange. No assets move until you accept. ${d.counters?'This is a counteroffer.':''}</p><div class="modal-actions"><button id="acceptTrade" class="button primary">Accept trade</button><button id="rejectTrade" class="button minor">Reject</button>${d.counters<2?'<button id="counterTrade" class="button minor">Counteroffer</button>':''}</div>`);
 modalState='trade';
 $('acceptTrade').onclick=()=>{g.pendingTrade=null;closeModal();executeTrade(d);};
 $('rejectTrade').onclick=()=>{g.pendingTrade=null;closeModal();ledger(`${humanRecipient.name} declined the trade offer.`,'trade');commit();};
 if($('counterTrade'))$('counterTrade').onclick=()=>{
  // Reverse direction so the human can propose their own assets and cash.
  const reversed={from:humanRecipient.id,to:humanRecipient.id===d.from?d.to:d.from,give:humanRecipient.id===d.from?[...d.give]:[...d.take],take:humanRecipient.id===d.from?[...d.take]:[...d.give],offer:humanRecipient.id===d.from?d.offer:d.request,request:humanRecipient.id===d.from?d.request:d.offer,counters:d.counters+1,origin:d.origin};
  g.pendingTrade=null;tradeDialog(reversed,'counter');
 };
}
function executeTrade(raw){const d=cleanDeal(raw);if(!validTrade(d)){ledger('A trade was canceled because assets or available cash changed.','trade');commit();return false;}const p=getPlayer(d.from),t=getPlayer(d.to);p.cash=p.cash-d.offer+d.request;t.cash=t.cash+d.offer-d.request;for(const i of d.give)space(i).owner=t.id;for(const i of d.take)space(i).owner=p.id;p.stats.trades++;t.stats.trades++;g.pendingTrade=null;ledger(`${p.name} and ${t.name} traded ${d.give.length+d.take.length} properties and ${money(d.offer+d.request)} in cash transfers.`,'trade');commit();return true;}
function maybeBotTrade(p){if(!g||p.human||g.phase!=='manage')return false;const key=`${p.id}:${p.turnsTaken}`;if(g.botTradeLast===key)return false;g.botTradeLast=key;
 if(p.personality==='saver'||p.difficulty==='easy')return false;
 const others=g.players.filter(x=>x.id!==p.id&&!x.bankrupt&&tradeEligible(x.id).length);
 const desired=others.flatMap(t=>tradeEligible(t.id).map(s=>({t,s,score:groupProgress(p,s)*100+(s.type==='BUSINESS'?20:0)}))).filter(x=>x.score>=50).sort((a,b)=>b.score-a.score);
 if(!desired.length)return false;
 const {t,s}=desired[0];const candidates=tradeEligible(p.id).filter(x=>x.type!==s.type||x.group!==s.group).sort((a,b)=>aiPropertyValue(p,a)-aiPropertyValue(p,b));
 if(!candidates.length)return false;
 const give=candidates[0],trade={from:p.id,to:t.id,give:[give.index],take:[s.index],offer:0,request:0,counters:0,origin:'computer'};
 const need=Math.max(0,Math.ceil((aiPropertyValue(t,s)-aiPropertyValue(t,give)+20)/10)*10);trade.offer=Math.min(need,Math.max(0,p.cash-liquidReserve(p)));if(!validTrade(trade)||dealValue(p,trade)<-Math.round(price(s)*.25))return false;
 ledger(`${p.name} proposed a trade to ${t.name} for ${s.name}.`,'trade');if(t.human){g.pendingTrade=trade;commit();showTradeAcceptance(trade);return true;}if(aiAcceptsTrade(trade,t)){executeTrade(trade);return true;}ledger(`${t.name} declined ${p.name}'s trade proposal.`,'trade');commit();return false;
}
function saveDialog(){if(!g)return;showModal('Save and export',`<p>Game auto-saves to this browser after every action. For another Chromebook, export a portable save file.</p><div class="modal-actions"><button class="button primary" id="exportSave">Download save JSON</button><button class="button minor" id="exportCode">Show portable code</button></div><p class="subtle">Save files or portable codes can be restored using the import box below. Keep the file private if you use a real name.</p><label>Import a saved-game JSON file<input type="file" accept=".json,application/json" id="importFile"></label><label>Or paste a portable code<textarea id="importCode" placeholder="Paste your Nachesopoly save code here"></textarea></label><button class="button minor" id="importFromCode">Import code</button><div id="importMsg" role="status"></div>`);
 $('exportSave').onclick=()=>{let blob=new Blob([JSON.stringify(g,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='nachesopoly-naches-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};$('exportCode').onclick=()=>{const raw=JSON.stringify(g);const code='NV1.'+btoa(unescape(encodeURIComponent(raw)));$('importCode').value=code;$('importCode').select();};$('importFile').onchange=async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());importGame(data);}catch(err){$('importMsg').textContent='Invalid save file.';}};$('importFromCode').onclick=()=>{try{const val=$('importCode').value.trim();if(!val.startsWith('NV1.'))throw Error('format');importGame(JSON.parse(decodeURIComponent(escape(atob(val.slice(4))))));}catch(err){$('importMsg').textContent='Could not read that code.';}};}
function importGame(data){cancelPresentation();if(!validateState(data))throw Error('Save validation failed');if(!confirm('Replace the current match with this imported saved game?'))return;g=data;normalizeLoadedGame();if(!current().human&&g.phase!=='recap'&&!g.botTurn)beginBotTurn();closeModal();enterGame();ledger('Imported a valid Nachesopoly saved match.');commit();}
function resultsDialog(){const arr=[...g.players].sort((a,b)=>Number(a.bankrupt)-Number(b.bankrupt)||worth(b)-worth(a));showModal('Valley Ventures · final standings',`<div>${arr.map((p,i)=>`<div class="player-card" style="--player:${p.color}"><div style="font-size:23px">${i===0?'🏆':p.token}</div><div><b>#${i+1} ${esc(p.name)}</b><small>${p.bankrupt?'Bankrupt · ':''}${owned(p.id).length} properties · ${p.stats.purchases} purchases</small></div><div class="pcash">${money(worth(p))}<small>Cash ${money(p.cash)}</small></div></div>`).join('')}</div><p class="subtle">Stage 1 shows core financial rankings. Personalized funny awards, XP and podium celebrations arrive in later stages.</p><button class="button minor" id="viewLogResults">View transaction log</button>`);$('viewLogResults').onclick=showHistory;}
setupInit();
