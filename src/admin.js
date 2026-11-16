
/* ============ 老大後台（原型） ============ */
const TABS=[["kitten","小貓","🐾"],["breeder","種貓","👑"],["grad","畢業生","🎓"],["pet","家裡的貓","🏠"],["settings","設定","⚙︎"]];
const ROLE_OF_TAB={kitten:["kitten"],breeder:["king","queen"],grad:["grad"],pet:["pet"]};
const BREEDS=["英國短毛貓","英國長毛貓","塞爾凱克捲毛貓"];
const SCORE_KEYS=["黏人","活潑","話量","好奇"];
let tab="kitten", editing=null, draft=null, pickMode=null, sureDelete=false;

const $app=document.getElementById("app");
function toast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2200); }
function persist(okMsg){ if(saveCats(CATS)){ if(okMsg) toast(okMsg); return true; } toast("空間不夠：原型只能存少量照片，請先刪掉幾張"); return false; }
const thumb = c => `<span class="thumb ${tintOf(c)}">${pic(c,56)}</span>`;
const subOf = c => [c.breed,c.color,c.birthday?ageText(c.birthday):"",c.role==="grad"&&c.home?`住在${c.home}`:""].filter(Boolean).join("，");

function drawTabs(){
  document.getElementById("tabs").innerHTML=TABS.map(t=>`<button type="button" data-tab="${t[0]}" ${t[0]===tab&&!editing?'aria-current="page"':""}><i aria-hidden="true">${t[2]}</i>${t[1]}</button>`).join("");
}
function header(){
  return `<header><h1><img src="img/logo.svg" alt="" width="40" height="40"><span>老大後台<small>福信貓老大（原型）</small></span></h1><a class="link" href="index.html" target="_blank" rel="noopener">看前台 ↗</a></header>`;
}

/* ---------- 列表 ---------- */
function listView(){
  const roles=ROLE_OF_TAB[tab]; const items=CATS.filter(c=>roles.includes(c.role));
  const title={kitten:"小貓",breeder:"種公與種母",grad:"畢業生",pet:"家裡的貓"}[tab];
  const statusRow = c => `<div class="seg" role="group" aria-label="${esc(c.name)}的狀態">${Object.entries(STATUS).map(([k,v])=>`<button type="button" data-status="${k}" data-id="${c.id}" data-v="${k}" aria-pressed="${c.status===k}">${v}</button>`).join("")}</div>`;
  return header()+
   (tab==="kitten"?`<p class="note">點一下狀態就會更新，前台馬上跟著變。點小貓可以改資料、上傳照片和成長紀錄。</p>`:"")+
   `<div class="bar"><h2>${title}</h2><span>${items.length} 隻</span></div>
    <div class="list">${items.length?items.map(c=>`<div class="item">
      <button type="button" class="top" data-edit="${c.id}">${thumb(c)}<span><b>${esc(c.name)}</b><span class="sub">${esc(subOf(c))||"（資料待補）"}</span></span><span class="chev" aria-hidden="true">›</span></button>
      ${c.role==="kitten"?statusRow(c):""}</div>`).join(""):`<div class="empty">這裡還沒有貓。按右下角「新增」開始吧。</div>`}</div>
    <button type="button" class="fab" data-new="${tab}">＋ 新增</button>`;
}

/* ---------- 編輯 ---------- */
function newCat(t){
  const role={kitten:"kitten",breeder:"queen",grad:"grad",pet:"pet"}[t]||"kitten";
  return {id:"c"+Date.now().toString(36),role,status:"available",name:"",en:"",breed:BREEDS[0],color:"",sex:"公",birthday:"",ready:"",price:"請 LINE 詢問",
    sire:"",dam:"",art:"gold",traits:[],scores:{黏人:3,活潑:3,話量:3,好奇:3},note:"",photos:[],timeline:[]};
}
function opt(list,val){ return list.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o]; return `<option value="${esc(v)}" ${v===val?"selected":""}>${esc(l)}</option>`;}).join(""); }
function editView(){
  const c=draft, isNew=!CATS.some(x=>x.id===c.id);
  const kings=CATS.filter(x=>x.role==="king").map(x=>[x.id,x.name]), queens=CATS.filter(x=>x.role==="queen").map(x=>[x.id,x.name]);
  const photos=(c.photos||[]).map((p,i)=>`<div class="ph"><img src="${p}" alt="照片 ${i+1}"><button type="button" class="x" data-delphoto="${i}" aria-label="刪除第 ${i+1} 張照片">×</button>${i===0?'<span class="cover">封面</span>':""}</div>`).join("");
  const tl=(c.timeline||[]).map((w,i)=>`<div class="ph"><img src="${w.img}" alt="${esc(w.label)}"><button type="button" class="x" data-deltl="${i}" aria-label="刪除這張成長照片">×</button><span class="lbl">${esc(w.label)}</span></div>`).join("");
  return `<div class="backbar"><button type="button" data-back>‹ 返回</button></div>
  <form class="form" id="editForm" autocomplete="off">
    <h2 style="margin:6px 0 0;font-family:var(--round);font-weight:400;font-size:26px">${isNew?"新增一隻貓":esc(c.name||"未命名")}</h2>
    ${!isNew?`<a class="preview-link" href="index.html#cat-${c.id}" target="_blank" rel="noopener">在前台看${esc(c.name)} ↗</a>`:""}

    <div class="group" style="margin-top:18px;border:0;padding:0"><h3>照片</h3><p>第一張是封面。手機可以直接拍照上傳。</p>
      <div class="photos">${photos}<button type="button" class="ph add" data-pick="photos"><i aria-hidden="true">＋</i>加照片</button></div></div>

    ${c.role==="kitten"?`<div class="field"><span>狀態</span><div class="seg">${Object.entries(STATUS).map(([k,v])=>`<button type="button" data-dstatus="${k}" data-v="${k}" aria-pressed="${c.status===k}">${v}</button>`).join("")}</div></div>`:""}

    <div class="row2"><label class="field"><span>名字</span><input name="name" value="${esc(c.name)}" required placeholder="例：湯圓"></label>
      <label class="field"><span>英文／拼音</span><input name="en" value="${esc(c.en)}" placeholder="例：Tangyuan"></label></div>
    <label class="field"><span>身分</span><select name="role">${opt([["kitten","小貓"],["king","種公"],["queen","種母"],["grad","畢業生（已回新家）"],["pet","家裡的貓"]],c.role)}</select><small>小貓畢業了，改成「畢業生」就會搬到畢業生牆。</small></label>
    <div class="row2"><label class="field"><span>品種</span><input name="breed" list="breeds" value="${esc(c.breed)}"><datalist id="breeds">${BREEDS.map(b=>`<option value="${b}">`).join("")}</datalist></label>
      <label class="field"><span>毛色</span><input name="color" value="${esc(c.color)}" placeholder="例：奶油加白梵色"></label></div>
    <div class="row2"><div class="field"><span>性別</span><div class="seg two">${["公","母"].map(s=>`<button type="button" data-sex="${s}" class="${c.sex===s?"on":""}" aria-pressed="${c.sex===s}">${s==="公"?"♂ 弟弟":"♀ 妹妹"}</button>`).join("")}</div></div>
      <label class="field"><span>生日</span><input type="date" name="birthday" value="${esc(c.birthday)}"></label></div>

    ${c.role==="kitten"?`<div class="row2"><label class="field"><span>預計回家</span><input name="ready" value="${esc(c.ready)}" placeholder="例：12 月底"></label>
      <label class="field"><span>價格</span><input name="price" value="${esc(c.price)}" placeholder="例：請 LINE 詢問"></label></div>
      <div class="row2"><label class="field"><span>爸爸</span><select name="sire"><option value="">（未選）</option>${opt(kings,c.sire)}</select></label>
      <label class="field"><span>媽媽</span><select name="dam"><option value="">（未選）</option>${opt(queens,c.dam)}</select></label></div>`:""}
    ${c.role==="grad"?`<div class="row2"><label class="field"><span>在老大家時的名字</span><input name="formerly" value="${esc(c.formerly||"")}" placeholder="例：蛋黃酥"></label>
      <label class="field"><span>新家在哪</span><input name="home" value="${esc(c.home||"")}" placeholder="例：台中"></label></div>`:""}
    ${c.role==="king"||c.role==="queen"?`<label class="field"><span>協會註冊</span><input name="registry" value="${esc(c.registry||"")}" placeholder="例：WCF／TICA 雙綠單"></label>`:""}

    <label class="field"><span>老大說</span><textarea name="note" rows="3" placeholder="用一兩句話介紹牠，前台會變成老大的對話框">${esc(c.note)}</textarea></label>
    <label class="field"><span>個性標籤</span><input name="traits" value="${esc((c.traits||[]).join("、"))}" placeholder="用頓號分開，例：黏人、膽大、愛踩踩"></label>

    ${c.role!=="pet"&&c.role!=="grad"?`<div class="group"><h3>個性小檔案</h3><p>前台會顯示成貓掌，1 到 5 分。</p>
      ${SCORE_KEYS.map(k=>`<label class="range"><span>${k}</span><input type="range" min="1" max="5" step="1" name="score_${k}" value="${(c.scores||{})[k]||3}" data-out="out_${k}"><b id="out_${k}">${(c.scores||{})[k]||3}</b></label>`).join("")}</div>`:""}

    ${c.role==="kitten"?`<div class="group"><h3>成長紀錄</h3><p>每週拍一張，寫上幾週大，前台會依序貼成拍立得。</p>
      <div class="row2" style="margin-top:10px"><input id="tlLabel" placeholder="例：8 週" aria-label="這張成長照片是幾週大"><button type="button" class="btn small" data-pick="timeline">＋ 上傳這週的照片</button></div>
      <div class="photos">${tl||'<p style="grid-column:1/-1;font-size:13px;color:var(--ink2);margin:6px 0">還沒有成長照片。</p>'}</div></div>`:""}

    ${!isNew?`<div class="group"><button type="button" class="btn danger ${sureDelete?"sure":""}" data-delete style="width:100%">${sureDelete?`確定刪除${esc(c.name)}？再按一次`:"刪除這隻貓"}</button></div>`:""}
  </form>
  <div class="actions"><div><button type="button" class="btn" data-back>取消</button><button type="submit" form="editForm" class="btn pri">儲存</button></div></div>`;
}

/* ---------- 設定 ---------- */
function settingsView(){
  let used=0; try{ used=((localStorage.getItem(STORE_KEY)||"").length+(localStorage.getItem(SITE_KEY)||"").length)*2/1024/1024; }catch(e){}
  return header()+`<form class="form" id="siteForm"><h2 style="margin:16px 0 0;font-family:var(--round);font-weight:400;font-size:22px">貓舍資料</h2>
    <label class="field"><span>LINE 官方帳號 ID</span><input name="lineId" value="${esc(SITE.lineId)}"></label>
    <label class="field"><span>地址（前台顯示）</span><input name="address" value="${esc(SITE.address)}"></label>
    <label class="field"><span>預約時間</span><input name="hours" value="${esc(SITE.hours)}"></label>
    <label class="field"><span>家長專區商店網址</span><input name="shopUrl" value="${esc(SITE.shopUrl)}"></label>
    <button type="submit" class="btn pri" style="width:100%;margin-top:18px">儲存貓舍資料</button>
    <div class="group"><h3>關於這個原型</h3><p>資料存在這台裝置的瀏覽器裡（目前用了 ${used.toFixed(1)} MB，上限約 5 MB），別台裝置看不到。正式版會接雲端資料庫，老大在手機改完，所有人都看得到，照片也不限量。</p>
      <button type="button" class="btn danger ${sureDelete?"sure":""}" data-reset style="width:100%;margin-top:14px">${sureDelete?"確定清除所有修改？再按一次":"清除所有修改，回到範例資料"}</button></div>
  </form>`;
}

/* ---------- render ---------- */
function render(){
  $app.innerHTML = editing ? editView() : tab==="settings" ? settingsView() : listView();
  drawTabs();
}

/* ---------- 照片：壓縮後存成 data URL ---------- */
function shrink(file,max=900){
  return new Promise((res,rej)=>{ const img=new Image(); const url=URL.createObjectURL(file);
    img.onload=()=>{ const s=Math.min(1,max/Math.max(img.width,img.height)); const cv=document.createElement("canvas");
      cv.width=Math.round(img.width*s); cv.height=Math.round(img.height*s); cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
      URL.revokeObjectURL(url); res(cv.toDataURL("image/jpeg",.8)); };
    img.onerror=()=>{ URL.revokeObjectURL(url); rej(new Error("讀不到這張圖")); }; img.src=url; });
}
function readForm(){
  const f=document.getElementById("editForm"); if(!f) return; const d=Object.fromEntries(new FormData(f));
  ["name","en","breed","color","birthday","ready","price","sire","dam","formerly","home","registry","note"].forEach(k=>{ if(k in d) draft[k]=d[k].trim(); });
  if(d.role) draft.role=d.role;
  if("traits" in d) draft.traits=d.traits.split(/[、,，\s]+/).map(s=>s.trim()).filter(Boolean);
  if(SCORE_KEYS.some(k=>("score_"+k) in d)){ draft.scores={}; SCORE_KEYS.forEach(k=>draft.scores[k]=+d["score_"+k]||3); }
}
document.getElementById("filePick").addEventListener("change",async e=>{
  const files=[...e.target.files]; e.target.value=""; if(!files.length) return;
  readForm(); toast("處理照片中⋯");
  try{
    for(const f of files){ const url=await shrink(f);
      if(pickMode==="timeline"){ const lb=(document.getElementById("tlLabel")||{}).value||`第 ${(draft.timeline||[]).length+1} 張`; (draft.timeline=draft.timeline||[]).push({label:lb.trim(),img:url}); }
      else (draft.photos=draft.photos||[]).push(url); }
    toast("照片加好了，記得按儲存");
  }catch(err){ toast(err.message); }
  render();
});

/* ---------- 事件 ---------- */
$app.addEventListener("click",e=>{
  const b=e.target.closest("button,a"); if(!b) return;
  if(b.dataset.status){ const c=byId(b.dataset.id); c.status=b.dataset.status; persist(`${c.name} → ${STATUS[c.status]}，前台已更新`); render(); return; }
  if(b.dataset.edit){ editing=b.dataset.edit; draft=JSON.parse(JSON.stringify(byId(editing))); sureDelete=false; render(); scrollTo(0,0); return; }
  if(b.dataset.new){ draft=newCat(b.dataset.new); editing=draft.id; sureDelete=false; render(); scrollTo(0,0); return; }
  if("back" in b.dataset){ editing=null; draft=null; sureDelete=false; render(); return; }
  if(b.dataset.pick){ pickMode=b.dataset.pick; const fp=document.getElementById("filePick"); fp.multiple=pickMode==="photos"; fp.click(); return; }
  if(b.dataset.delphoto){ readForm(); draft.photos.splice(+b.dataset.delphoto,1); render(); return; }
  if(b.dataset.deltl){ readForm(); draft.timeline.splice(+b.dataset.deltl,1); render(); return; }
  if(b.dataset.dstatus){ readForm(); draft.status=b.dataset.dstatus; render(); return; }
  if(b.dataset.sex){ readForm(); draft.sex=b.dataset.sex; render(); return; }
  if("delete" in b.dataset){ if(!sureDelete){ sureDelete=true; readForm(); render(); return; }
    const name=draft.name; CATS=CATS.filter(x=>x.id!==draft.id); persist(`已刪除${name}`); editing=null; draft=null; sureDelete=false; render(); return; }
  if("reset" in b.dataset){ if(!sureDelete){ sureDelete=true; render(); return; }
    resetAll(); CATS=loadCats(); Object.assign(SITE,DEFAULT_SITE); sureDelete=false; toast("已回到範例資料"); render(); return; }
});
$app.addEventListener("input",e=>{ const o=e.target.dataset&&e.target.dataset.out; if(o) document.getElementById(o).textContent=e.target.value; });
$app.addEventListener("submit",e=>{
  e.preventDefault();
  if(e.target.id==="siteForm"){ const d=Object.fromEntries(new FormData(e.target)); Object.assign(SITE,d); saveSite(d)?toast("貓舍資料已儲存"):toast("儲存失敗"); return; }
  readForm(); if(!draft.name){ toast("請先填名字"); return; }
  const i=CATS.findIndex(x=>x.id===draft.id); const isNew=i<0;
  if(isNew) CATS.push(draft); else CATS[i]=draft;
  if(persist(isNew?`已新增${draft.name}，前台已更新`:`已儲存${draft.name}，前台已更新`)){
    const t=Object.entries(ROLE_OF_TAB).find(([k,v])=>v.includes(draft.role)); if(t) tab=t[0];
    editing=null; draft=null; sureDelete=false; render(); scrollTo(0,0);
  }
});
document.getElementById("tabs").addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; tab=b.dataset.tab; editing=null; draft=null; sureDelete=false; render(); scrollTo(0,0); });
addEventListener("storage",e=>{ if(e.key===STORE_KEY && !editing){ CATS=loadCats(); render(); } });
render();
</script>
</body>
</html>
