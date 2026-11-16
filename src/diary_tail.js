
/* ============ 3. diary pieces ============ */
function boss(size=320, wink=true){
  const a=ART.gold;
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="吉祥物老大，一隻戴紅項圈、眨眼的金漸層貓">
  <ellipse cx="100" cy="191" rx="62" ry="6" fill="#2E2A4F" opacity=".12"/>
  <path class="olt" d="M144 170 C192 164 194 108 166 98" stroke="#2E2A4F" stroke-width="23" fill="none" stroke-linecap="round"/>
  <path d="M144 170 C192 164 194 108 166 98" stroke="${a.shade}" stroke-width="17" fill="none" stroke-linecap="round"/>
  <ellipse class="ol" cx="100" cy="150" rx="58" ry="42" fill="${a.base}"/>
  <ellipse cx="100" cy="154" rx="26" ry="30" fill="${a.chest}"/>
  <ellipse class="ol" cx="78" cy="186" rx="16" ry="9" fill="${a.chest}"/><ellipse class="ol" cx="122" cy="186" rx="16" ry="9" fill="${a.chest}"/>
  <path class="ol" d="M58 70 L64 34 L92 52 Z" fill="${a.base}"/><path class="ol" d="M142 70 L136 34 L108 52 Z" fill="${a.base}"/>
  <path d="M66 62 L68 44 L84 54 Z M134 62 L132 44 L116 54 Z" fill="#F2877E" opacity=".8"/>
  <ellipse class="ol" cx="100" cy="88" rx="50" ry="44" fill="${a.base}"/>
  <path d="M70 58 Q100 44 130 58" stroke="${a.shade}" stroke-width="9" fill="none" opacity=".45" stroke-linecap="round"/>
  <ellipse cx="88" cy="106" rx="13" ry="10" fill="${a.chest}"/><ellipse cx="112" cy="106" rx="13" ry="10" fill="${a.chest}"/>
  <ellipse cx="84" cy="86" rx="7" ry="8.5" fill="#2E2A4F"/><circle cx="86" cy="83" r="2.3" fill="#fff"/>
  ${wink?`<path d="M108 87 q8 -7 16 0" stroke="#2E2A4F" stroke-width="3.5" fill="none" stroke-linecap="round"/>`:`<ellipse cx="116" cy="86" rx="7" ry="8.5" fill="#2E2A4F"/><circle cx="118" cy="83" r="2.3" fill="#fff"/>`}
  <circle cx="70" cy="100" r="6" fill="#F2877E" opacity=".5"/><circle cx="130" cy="100" r="6" fill="#F2877E" opacity=".5"/>
  <path d="M95 99 h10 l-5 5 z" fill="#2E2A4F"/>
  <path d="M100 104 v4 M100 108 q-5 5 -10 2 M100 108 q5 5 10 2" stroke="#2E2A4F" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M64 124 Q100 140 136 124" stroke="#F2877E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle class="ol" cx="100" cy="137" r="7.5" fill="#FFE38A"/>
  </svg>`;
}
const TAPES=["#F2877E","#BFDDF2","#FFE38A","#BFE5CF","#E4E1F2"];
const tilt = i => [-2.4,1.8,-1.1,2.3,-1.7,1.2][i%6];
function pol(c,i,{small=false}={}){
  const st=c.role==="kitten"?`<span class="sticker tagst tilt st-${c.status}">${STATUS[c.status]}</span>`:"";
  const meta=c.role==="kitten"?`${esc(c.color)}，${c.sex==="公"?"弟弟":"妹妹"}，${ageText(c.birthday)}`:c.role==="grad"?`住在${esc(c.home)}`:esc(ROLE[c.role]);
  return `<a class="pol tilt ${c.status==="home"?"gone":""}" href="#cat-${c.id}" style="transform:rotate(${tilt(i)}deg)">
    <span class="tape" style="background:${TAPES[i%5]};transform:rotate(${tilt(i+2)*2}deg)"></span>
    <span class="shot ${tintOf(c)}">${pic(c,small?100:170)}</span>${st}
    <span class="nm">${esc(c.name)}</span><span class="mt">${meta}</span>
    ${!small&&c.traits?`<span class="chips">${c.traits.map(t=>`<span>${esc(t)}</span>`).join("")}</span>`:""}</a>`;
}
const pawSVG=(on)=>`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="${on?"#F2877E":"#E7E2F2"}"><ellipse cx="12" cy="16" rx="5" ry="4.2"/><circle cx="6" cy="10" r="2.3"/><circle cx="10" cy="6.5" r="2.3"/><circle cx="14" cy="6.5" r="2.3"/><circle cx="18" cy="10" r="2.3"/></g></svg>`;
function ticket(){
  return `<footer><div class="ticket">
    <div class="a"><p class="note">福信貓老大　參觀券</p><h2 class="h2" style="margin:2px 0 16px">來透天找老大玩</h2>
      <dl class="dl"><dt>地址</dt><dd>${esc(SITE.address)}</dd><dt>時間</dt><dd>${esc(SITE.hours)}，一次一組</dd><dt>許可證</dt><dd>${lic()}</dd>
      <dt>社群</dt><dd><a href="${SITE.threads}" target="_blank" rel="noopener">Threads</a>　<a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a></dd></dl></div>
    <div class="b"><span style="font-family:var(--round);font-size:18px">撕下這張，LINE 約時間</span><a class="btn line" href="${lineUrl()}" target="_blank" rel="noopener">LINE ${esc(SITE.lineId)}</a><span class="sub" style="font-size:13px">一定要本人來互動喔，這是我們認識彼此的方式。</span></div>
  </div></footer>`;
}
const route6 = () => `<ol class="route">${STEPS.map((s,i)=>`<li><span class="dot" style="background:${["#FFE38A","#BFDDF2","#FBD3CE","#BFE5CF","#E4E1F2","#F2877E"][i]}">${i+1}</span><b>${s[0]}</b><span>${s[1]}</span></li>`).join("")}</ol>`;
const kittens = () => CATS.filter(c=>c.role==="kitten");


function guaranteeHTML(){
  return `<section><h2 class="h2">老大的保固</h2><p class="note">公版定型化契約保護的是店家，老大的合約保護的是貓和家長</p>
  <div class="gtable">${GUARANTEE.map(g=>`<div class="grow"><b>${g[0]}</b><span class="old"><s>${g[1]}</s><small>公版契約</small></span><span class="new">${g[2]}<small>福信貓老大</small></span></div>`).join("")}</div>
  <p class="sub" style="margin-top:14px;max-width:40em">為什麼 FIP 是退費而不是換一隻？因為如果新環境讓第一隻生病，老大不能確定第二隻送過去會不會一樣。換貓保護的是成交，退費保護的是貓。</p></section>`;
}
function promisesHTML(){
  return `<section class="split" id="promises" style="align-items:start;scroll-margin-top:90px"><div class="paper"><h2 class="h2" style="margin-bottom:10px">你也要答應老大的五件事</h2><ul class="rules">${PROMISES.map(p=>`<li><span>${p}</span></li>`).join("")}</ul></div>
  <div class="sticky tilt" style="transform:rotate(-2deg);background:var(--pink)">回家要關籠飼養的：搭咩。<br>要當店貓的：搭咩。<br>要帶去蹓貓的：也搭咩。<small>老大</small></div></section>`;
}
function factsHTML(){
  return `<div class="facts">${FACTS.map((f,i)=>`<div class="fact tilt" style="transform:rotate(${tilt(i+1)*.6}deg);background:${["#FFF4C9","#E3F1E8","#F7E6E2","#E3EEF5"][i%4]}"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("")}</div>`;
}

/* ============ 4. pages ============ */
const PAGES={
home(){
  const ks=kittens();
  return `<section class="hero">
    <div class="boss"><div class="blob"></div>${boss(500)}
      <span class="sticker tilt" style="left:2%;top:6%;background:var(--butter);border-radius:50%;padding:12px 12px;transform:rotate(-12deg)">合法<br>特寵業</span>
      <span class="sticker tilt" style="right:0;bottom:14%;background:var(--mint);transform:rotate(8deg)">全無籠飼養</span><span class="sticker tilt" style="right:4%;top:10%;background:var(--pink);transform:rotate(-6deg)">滿四個月<br>三劑疫苗</span></div>
    <div>
      <div class="bubble">我是老大。<br>我養的是貓，不是雞。<br>這裡是貓舍，不是養雞場。</div>
      <h1>福信貓老大的手帳</h1>
      <p class="lead">高雄一棟五層樓透天，只住了幾隻貓爸爸媽媽。沒有籠子，連種公都一貓一房。英短、英長和塞爾凱克捲毛貓，都在這裡自由自在地長大。</p>
      <p class="note" style="margin-top:8px">（老大說：要來看貓，先讀過小貓的個性，還有不要噴香水）</p>
      <div class="cta"><a class="btn berry" href="#kittens">翻到小貓那頁</a><a class="btn" href="#visit">約時間來玩</a></div>
    </div></section>

  <section><h2 class="h2">這一頁：在找家的小貓</h2><p class="note">點照片，看牠的個性、爸媽和成長紀錄</p>
    <div class="pgrid">${ks.map(pol).join("")}</div></section>

  <section class="split">
    <div class="paper"><h2 class="h2" style="margin-bottom:10px">福信的家規</h2>
      <ul class="rules"><li><span><b>種貓個位數</b>，綠單五代血系完整，保證無近親</span></li><li><span><b>全無籠飼養</b>，種公一貓一房，還有獨立衛浴</span></li><li><span><b>一年最多一胎</b>，媽媽早早退休，跟老大回家養老</span></li><li><span><b>滿四個月、三劑疫苗、絕育康復</b>才回新家</span></li><li><span><b>一定要見面</b>，不隔空成交</span></li><li><span><b>老大親自開車送到家</b>，不用寵物託運</span></li><li><span><b>終身回娘家</b>，住宿、洗澡、美容都免費</span></li></ul></div>
    <div class="sticky tilt" style="transform:rotate(2.5deg)">寧可不成交，<br>也絕不隔空成交。<small>老大，福信貓老大主人</small></div>
  </section>

  <section><h2 class="h2">帶小貓回家的路線</h2>${route6()}</section>

  ${guaranteeHTML()}
  <section><h2 class="h2">老大家的日常小事</h2><p class="note">都是真的，不是我們編的</p>${factsHTML()}</section>
  <section><h2 class="h2">已經回家的孩子</h2><p class="note">畢業不是結束，老大會去新家探望牠們</p>
    <div class="pgrid">${CATS.filter(c=>c.role==="grad").map(pol).join("")}</div></section>
  ${ticket()}`;
},
kittens(){
  return `<h1 class="h2">在找家的小貓</h1><p class="note">滿四個月、打滿三劑之後才開放互動。有些孩子太親人，老大捨不得，就自己留下來了</p>
   <div class="filters" id="filters">${[["all","全部"],["available","可預約"],["talking","洽談中"],["home","已有家長"],["stay","自留"]].map((f,i)=>`<button data-f="${f[0]}" class="${i?"":"on"}">${f[1]}</button>`).join("")}</div>
   <div class="pgrid" id="list">${kittens().map(pol).join("")}</div>${ticket()}`;
},
parents(){
  const g=(role,t,n)=>`<section><h2 class="h2">${t}</h2><p class="note">${n}</p><div class="pgrid">${CATS.filter(c=>c.role===role).map(pol).join("")}</div></section>`;
  return `<h1 class="h2" style="font-size:44px">種公、種母和家裡的貓</h1><p class="sub" style="margin-top:8px;max-width:32em">每隻種貓都做過 13 項遺傳疾病基因篩檢，結果寫在各自的頁面。五層樓電梯透天，只有八隻貓爸爸媽媽。</p>
   <div style="margin-top:40px"></div>${g("king","種公","一貓一房，15 坪，還有獨立衛浴")}${g("queen","種母","一年最多一胎，早早退休，跟老大回家養老")}${g("pet","家裡的貓","收養回來的孩子，不參與繁育。在老大家，品種貓和米克斯待遇都一樣")}${ticket()}`;
},
about(){
  return `<section class="split" style="align-items:start">
    <div><h1 class="h2" style="font-size:44px">我是老大</h1>
      <p style="margin-top:16px;font-size:17px">主業是貓奴、女兒奴、老婆奴，家裡一子二女，還有一屋子的貓。</p>
      <p class="sub" style="margin-top:14px">曾經有一段時間，我覺得自己快要過不下去了，是我的貓拉了我一把。所以養貓對我來說，從來不只是養幾隻寵物。</p>
      <p class="sub" style="margin-top:14px">我把一棟五層樓透天裝潢給貓住，沒有籠子。我想要的不是一間「貓舍」，而是一個我和牠們可以自由生活、也治癒彼此的小天地。</p>
      <p class="sub" style="margin-top:14px">如果只為了賺錢，我不如多看兩個門診。正因為不需要靠每一隻貓換生活，我才更有資格替牠們挑一輩子的家。理念不合的，出多少錢都不賣；看對眼的好人家，錢從來不是最重要的事。</p>
      <p class="sub" style="margin-top:14px">我也是醫生，所以我家的貓有點風吹草動就帶去給獸醫看，從不自己亂給藥。（是否公開本業，老大確認）</p>
      <p class="note" style="margin-top:14px">（老大還想加啥？刪啥？）</p></div>
    <div class="pol tilt" style="transform:rotate(2deg)"><span class="tape" style="background:#BFDDF2"></span><span class="shot t2">${boss(240,false)}</span><span class="nm">老大和他的貓</span><span class="mt">照片待提供</span></div>
  </section>
  <section class="paper"><h2 class="h2" style="margin-bottom:10px">證照與註冊</h2><ul class="rules"><li><span>${lic()}</span></li><li><span>協會註冊：${esc(SITE.registry)}</span></li><li><span>基因檢測：13 項遺傳疾病（機構待提供）</span></li></ul></section>
  ${ticket()}`;
},
plan(){
  return `<h1 class="h2" style="font-size:44px">繁育計畫</h1><p class="sub" style="margin-top:8px;max-width:32em">媽媽一年最多一胎，順其自然，不強迫繁育。每一胎都很少，想要的話先加入通知名單。</p>
   <div class="card" style="margin-top:36px;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between">
     <div style="display:flex;align-items:center;gap:6px">${["maru","queen"].filter(byId).map(id=>`<span class="shot ${tintOf(byId(id))}" style="width:86px;height:86px;border-radius:50%;border:var(--bw) solid var(--ink);display:grid;place-items:center">${cat(byId(id).art,64)}</span>`).join(`<span style="font-family:var(--round);font-size:22px">×</span>`)}</div>
     <div style="flex:1 1 220px"><h3 style="font-size:22px">福丸 × （種母）</h3><p class="sub">配對與時間待老大提供。媽媽一年最多一胎，不強迫繁育。</p></div>
     <a class="btn line" href="${lineUrl("我想加入福信貓老大的新小貓通知名單")}" target="_blank" rel="noopener">加入通知名單</a></div>${ticket()}`;
},
process(){
  return `<h1 class="h2" style="font-size:44px">帶小貓回家的路線</h1>${route6()}
   <section style="margin-top:96px"><div class="paper"><h2 class="h2" style="margin-bottom:10px">小貓畢業時會帶著</h2><ul class="rules">${INCLUDES.map(i=>`<li><span>${esc(i)}</span></li>`).join("")}</ul></div></section>
   ${guaranteeHTML()}${promisesHTML()}<section><h2 class="h2" style="margin-bottom:20px">常見問題</h2>${FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</section>${ticket()}`;
},
family(){
  return `<h1 class="h2" style="font-size:44px">已經回家的孩子</h1><p class="note">畢業的孩子終身可以回娘家住宿，每月回來洗澡美容，都不用錢</p>
   <div class="pgrid">${CATS.filter(c=>c.role==="grad").map(pol).join("")}</div>${ticket()}`;
},
visit(){
  const opts=kittens().filter(c=>c.status!=="home").map(c=>`<option>${esc(c.name)}（${c.sex==="公"?"弟弟":"妹妹"}）</option>`).join("");
  return `<section class="split" style="align-items:start">
   <div><div class="bubble">要來玩之前，<br>先跟我說說你家的事。</div>
     <h1 class="h2" style="font-size:44px;margin-top:24px">約時間來互動</h1>
     <p class="sub" style="margin-top:10px">每位家長都一定要本人來互動過。一趟不夠就來兩趟，我們彼此認識一下。貓願不願意跟你玩，牠自己決定。</p>
     <p class="note" style="margin-top:12px">（老大提醒：不要噴香水，十公尺外都聞得到；也不要抓著貓的手掌把牠提起來）</p>
     <div style="margin-top:20px;max-width:300px">${boss(260)}</div></div>
   <form class="formcard" id="bookForm">
     <div class="fgrid"><label>怎麼稱呼你<input name="name" required></label><label>聯絡電話<input name="phone" inputmode="tel" required></label></div>
     <label>想認識的小貓<select name="cat"><option>還沒決定，想先聊聊</option>${opts}</select></label>
     <div class="fgrid"><label>方便的日期<input type="date" name="date"></label><label>時段<select name="slot"><option>下午</option><option>傍晚</option><option>晚上</option></select></label></div>
     <label>以前養過貓嗎？家裡現在有其他貓或寵物嗎？<textarea name="home" rows="3"></textarea></label>
     <label>你可以接受無籠飼養嗎？<select name="nocage"><option>可以</option><option>想先了解</option></select></label>
     <label>你是因為哪裡喜歡上這隻貓？外型、個性，還是成長紀錄？<textarea name="why" rows="3"></textarea></label>
     <button class="btn ink" type="submit" style="width:100%">整理成 LINE 訊息</button><div id="bookOut"></div>
   </form></section>${ticket()}`;
},
};

function profile(c){
  const isK=c.role==="kitten";
  const parents=isK?[byId(c.sire),byId(c.dam)].filter(Boolean):[];
  const kids=(c.role==="king"||c.role==="queen")?CATS.filter(k=>k.sire===c.id||k.dam===c.id):[];
  const nPh=(c.photos||[]).length;
  const msg=`你好，我想問問「${c.name}」（${c.breed||""}${c.color?"・"+c.color:""}）`;
  const rows=[["品種",c.breed],["毛色",c.color],["性別",c.sex],c.birthday?["生日",`${c.birthday.replaceAll("-"," / ")}（${ageText(c.birthday)}）`]:null,
    isK&&byId(c.sire)?["爸爸",byId(c.sire).name]:null,isK&&byId(c.dam)?["媽媽",byId(c.dam).name]:null,isK?["回家時間",c.ready]:null,isK?["價格",c.price]:null,
    c.registry?["協會",c.registry]:null,c.home?["新家",c.home]:null].filter(r=>r&&r[1]);
  const back=isK?["kittens","在找家的小貓"]:c.role==="grad"?["family","已經回家的孩子"]:["parents","種公、種母和家裡的貓"];
  return `<div class="crumbs"><a href="#home">首頁</a> › <a href="#${back[0]}">${back[1]}</a> › ${esc(c.name)}</div>
  <div class="prof">
    <div><div class="pol tilt" style="transform:rotate(-1.5deg)" id="bigpol"><span class="tape" style="background:#FFE38A"></span>
      <span class="shot ${tintOf(c)}" id="pmain">${pic(c,320)}</span>
      ${isK?`<span class="sticker tagst tilt st-${c.status}" style="font-size:16px">${STATUS[c.status]}</span>`:""}
      <span class="nm" id="pcap">${nPh?`照片 1 / ${nPh}`:"照片 1 / 5（待提供）"}</span></div>
      <div class="thumbs">${(nPh?[...Array(nPh).keys()]:[0,1,2,3,4]).map(i=>`<button data-i="${i}" aria-label="第 ${i+1} 張照片" aria-current="${i===0}"><span class="shot ${tints[(CATS.indexOf(c)+i)%5]}">${pic(c,50,{sleep:i===3},i)}</span></button>`).join("")}</div></div>
    <div>
      <div class="idc"><div class="hd"><span>福信貓老大　貓咪身分證</span><span>${esc(ROLE[c.role])}</span></div>
        <div style="padding:18px 22px 0"><h1>${esc(c.name)}</h1><p class="sub">${esc(c.en)}${c.formerly?`，在老大家時叫${esc(c.formerly)}`:""}</p></div>
        <dl>${rows.map(r=>`<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl></div>
      <div class="says"><span class="face">${boss(64)}</span><div class="bubble">${esc(c.note)}</div></div>
      ${isK&&c.status!=="home"?`<div class="pcta"><a class="btn line" href="${lineUrl(msg)}" target="_blank" rel="noopener">LINE 問問${esc(c.name)}</a><a class="btn" href="#visit">約時間來看${esc(c.name)}</a></div>`:""}
    </div>
  </div>
  ${c.scores?`<section class="two">
    <div class="card"><h3>個性小檔案</h3>${Object.entries(c.scores).map(([k,v])=>`<div class="paws"><span>${k}</span><i>${[1,2,3,4,5].map(n=>pawSVG(n<=v)).join("")}</i></div>`).join("")}
      <div class="chips" style="margin-top:14px">${(c.traits||[]).map(t=>`<span>#${esc(t)}</span>`).join("")}</div></div>
    <div class="card"><h3>健康檢查</h3>${c.tests?`<ul class="checks">${c.tests.map(t=>`<li><span><b>${t[0]}</b>：${t[2]}<br><span class="sub" style="font-size:13px">${t[1]}</span></span></li>`).join("")}</ul>`:`<ul class="checks"><li>爸媽與自己都做過 13 項遺傳疾病基因篩檢</li><li>毛色基因、血型基因檢測</li><li>三劑核心疫苗</li><li>交貓前三合一快篩、血液檢查</li><li>術前血檢＋氣麻絕育，照顧到康復</li></ul>`}</div>
  </section>`:""}
  ${parents.length?`<section style="margin-top:80px"><h2 class="h2" style="margin-bottom:20px">爸爸和媽媽</h2><div class="mini">${parents.map((p,i)=>`<a href="#cat-${p.id}" class="card" style="padding:14px"><span class="shot ${tintOf(p)}">${pic(p,64)}</span><span><span class="sub" style="font-size:13px">${p.role==="queen"?"媽媽":"爸爸"}</span><br><b style="font-family:var(--round);font-weight:400;font-size:20px">${esc(p.name)}</b><br><span class="sub" style="font-size:13px">看健康檢查</span></span></a>`).join("")}</div></section>`:""}
  ${kids.length?`<section style="margin-top:80px"><h2 class="h2">${esc(c.name)}的孩子</h2><div class="pgrid">${kids.map(pol).join("")}</div></section>`:""}
  ${isK?`<section style="margin-top:80px"><h2 class="h2">成長紀錄</h2><p class="note">每週貼一張，看著${esc(c.name)}長大</p>
     <div class="strip">${(c.timeline&&c.timeline.length?c.timeline:["剛出生","2 週","4 週","8 週","12 週","16 週"].map(w=>({label:w}))).map((w,i)=>`<div class="pol tilt" style="transform:rotate(${tilt(i)}deg)"><span class="tape" style="background:${TAPES[i%5]};width:60px;margin-left:-30px"></span><span class="shot ${tints[i%5]}">${w.img?`<img class="photo" src="${w.img}" alt="${esc(c.name)} ${esc(w.label)}">`:cat(c.art,40+i*12,{sleep:i===0})}</span><span class="nm">${esc(w.label)}</span></div>`).join("")}</div></section>
   <section style="margin-top:80px"><div class="paper"><h2 class="h2" style="margin-bottom:10px">${esc(c.name)}畢業時會帶著</h2><ul class="rules">${INCLUDES.map(i=>`<li><span>${esc(i)}</span></li>`).join("")}</ul></div>
     <div class="shopnote"><span><b style="font-family:var(--round);font-weight:400;font-size:19px">迎接${esc(c.name)}要準備什麼？</b><br><span class="sub">飼料、貓砂、抓板，家長專區有整理好的組合。</span></span><a class="btn ink" href="${SITE.shopUrl}" target="_blank" rel="noopener">前往家長專區 ↗</a></div></section>`:""}
  ${ticket()}`;
}

/* ============ 5. router ============ */
const NAV=[["home","首頁","#FFE38A"],["about","關於老大","#BFDDF2"],["kittens","在找家的小貓","#FBD3CE"],["parents","種公和種母","#BFE5CF"],["plan","繁育計畫","#E4E1F2"],["process","回家的路線","#FFE38A"],["family","已經回家的孩子","#BFDDF2"],["visit","約時間來玩","#FBD3CE"]];
function navKey(h){ if(!h.startsWith("cat-")) return h; const c=byId(h.slice(4)); if(!c) return ""; return c.role==="kitten"?"kittens":c.role==="grad"?"family":"parents"; }
function route(){
  const h=(location.hash||"#home").slice(1)||"home";
  const c=h.startsWith("cat-")?byId(h.slice(4)):null;
  document.getElementById("app").innerHTML=c?profile(c):(PAGES[h]||PAGES.home)();
  const k=navKey(c?h:(PAGES[h]?h:"home"));
  document.getElementById("nav").innerHTML=NAV.map(n=>`<a href="#${n[0]}" class="${n[0]===k?"on":""}" style="background:${n[2]}">${n[1]}</a>`).join("");
  document.title=(c?`${c.name}｜`:"")+"福信貓老大｜高雄無籠家庭貓舍";
  document.body.classList.remove("menu"); window.scrollTo(0,0); bind();
  if(pendingJump){ const el=document.getElementById(pendingJump); pendingJump=null; if(el) setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),60); }
}
let pendingJump=null;
document.addEventListener("click",e=>{const a=e.target.closest("a.jump"); if(!a) return; const el=document.getElementById(a.dataset.jump);
  if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth",block:"start"}); } else { pendingJump=a.dataset.jump; }});
function bind(){
  const f=document.getElementById("filters");
  if(f) f.onclick=e=>{const b=e.target.closest("button"); if(!b) return; f.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
    const l=kittens().filter(c=>b.dataset.f==="all"||c.status===b.dataset.f);
    document.getElementById("list").innerHTML=l.length?l.map(pol).join(""):`<div class="card" style="grid-column:1/-1;text-align:center"><div style="max-width:160px;margin:0 auto">${boss(160)}</div><h3 style="margin-top:8px">這一頁還是空的</h3><p class="sub" style="margin:6px 0 16px">老大在睡覺。加入通知名單，有新小貓我第一個告訴你。</p><a class="btn line" href="${lineUrl("我想加入新小貓通知名單")}" target="_blank" rel="noopener">加入通知名單</a></div>`;};
  const th=document.querySelector(".thumbs");
  if(th) th.onclick=e=>{const b=e.target.closest("button"); if(!b) return; th.querySelectorAll("button").forEach(x=>x.setAttribute("aria-current",x===b));
    const pm=document.getElementById("pmain"); pm.className="shot "+b.querySelector(".shot").classList[1]; const im=b.querySelector("img"); if(im) pm.innerHTML=`<img class="photo" src="${im.src}" alt="">`; document.getElementById("pcap").textContent=`照片 ${+b.dataset.i+1} / ${th.children.length}`;};
  const form=document.getElementById("bookForm");
  if(form) form.onsubmit=e=>{e.preventDefault(); const d=Object.fromEntries(new FormData(form));
    const msg=`你好，我想約時間去福信貓老大互動。\n稱呼：${d.name}\n電話：${d.phone}\n想認識：${d.cat}\n方便時間：${d.date||"可再討論"} ${d.slot}\n養貓經驗與家裡寵物：${d.home||"（未填）"}\n能接受無籠飼養：${d.nocage}\n喜歡上牠的原因：${d.why||"（未填）"}`;
    document.getElementById("bookOut").innerHTML=`<div class="preview">${esc(msg)}</div><div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="btn" id="copy" style="flex:1">複製訊息</button><a class="btn line" style="flex:1" href="${lineUrl(msg)}" target="_blank" rel="noopener">用 LINE 傳給老大</a></div>`;
    document.getElementById("copy").onclick=async ev=>{try{await navigator.clipboard.writeText(msg);ev.target.textContent="已複製";}catch{ev.target.textContent="請手動複製上方文字";}};};
}
function setMode(m){ document.body.classList.toggle("calm",m==="calm"); document.querySelectorAll(".mode button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mode===m)); try{localStorage.setItem("fx-mode",m);}catch{} }
document.querySelector(".mode").onclick=e=>{const b=e.target.closest("button"); if(b) setMode(b.dataset.mode);};
try{ if(localStorage.getItem("fx-mode")==="calm") setMode("calm"); }catch{}
["logoFace","logoFace2"].forEach(i=>document.getElementById(i).innerHTML=boss(52));
["sideLine","mLine"].forEach(i=>document.getElementById(i).href=lineUrl());
document.getElementById("shopLink").href=SITE.shopUrl;
document.getElementById("burger").onclick=()=>document.body.classList.add("menu");
document.getElementById("scrim").onclick=()=>document.body.classList.remove("menu");
document.getElementById("protoX").onclick=()=>document.getElementById("proto").remove();
addEventListener("hashchange",route);
addEventListener("storage",e=>{ if(e.key===STORE_KEY||e.key===SITE_KEY){ CATS=loadCats(); Object.assign(SITE,loadSite()); route(); } });
route();
</script>
</body>
</html>
