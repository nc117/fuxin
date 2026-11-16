/* ============ 2. helpers ============ */
const byId = id => CATS.find(c=>c.id===id);
const esc = s => String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const lineUrl = t => t ? `https://line.me/R/oaMessage/${encodeURIComponent(SITE.lineId)}/?${encodeURIComponent(t)}` : `https://line.me/R/ti/p/${encodeURIComponent(SITE.lineId)}`;
const tints = ["t1","t2","t3","t4","t5"];
const tintOf = c => tints[Math.max(0,CATS.indexOf(c))%5];
function ageText(b){
  if(!b) return "";
  const d=new Date(b), n=new Date(); const days=Math.floor((n-d)/864e5);
  if(days<0) return "即將出生"; if(days<140) return `${Math.max(1,Math.floor(days/7))} 週大`;
  const m=(n.getFullYear()-d.getFullYear())*12+n.getMonth()-d.getMonth()-(n.getDate()<d.getDate()?1:0);
  return m<24?`${m} 個月大`:`${Math.floor(m/12)} 歲`;
}
function cat(artKey,size=120,{sleep=false}={}){
  const a=ART[artKey]||ART.gold;
  const eyes = sleep
    ? `<path d="M76 86 q8 6 16 0 M108 86 q8 6 16 0" stroke="#3A2A22" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="84" cy="86" rx="8" ry="9" fill="${a.eye}"/><ellipse cx="116" cy="86" rx="8" ry="9" fill="${a.eye}"/><ellipse cx="84" cy="87" rx="3" ry="6" fill="#1E1A18"/><ellipse cx="116" cy="87" rx="3" ry="6" fill="#1E1A18"/><circle cx="86.5" cy="83" r="2.2" fill="#fff"/><circle cx="118.5" cy="83" r="2.2" fill="#fff"/>`;
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" aria-hidden="true">
  <ellipse cx="100" cy="190" rx="62" ry="6" fill="#000" opacity=".06"/>
  <path class="olt" d="M144 170 C192 164 194 108 166 98" stroke="#2E2A4F" stroke-width="23" fill="none" stroke-linecap="round"/><path d="M144 170 C192 164 194 108 166 98" stroke="${a.shade}" stroke-width="17" fill="none" stroke-linecap="round"/>
  <ellipse class="ol" cx="100" cy="150" rx="58" ry="42" fill="${a.base}"/>
  <path d="M50 140 Q100 108 150 140" stroke="${a.shade}" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/>
  <ellipse cx="100" cy="154" rx="26" ry="30" fill="${a.chest}"/>
  <ellipse class="ol" cx="78" cy="186" rx="16" ry="9" fill="${a.chest}"/><ellipse class="ol" cx="122" cy="186" rx="16" ry="9" fill="${a.chest}"/>
  <path class="ol" d="M58 70 L64 34 L92 52 Z" fill="${a.base}"/><path class="ol" d="M142 70 L136 34 L108 52 Z" fill="${a.base}"/>
  <path d="M64 34 L72 46 L66 50 Z M136 34 L128 46 L134 50 Z" fill="${a.shade}"/>
  <path d="M66 62 L68 44 L84 54 Z M134 62 L132 44 L116 54 Z" fill="#EFB3A6" opacity=".75"/>
  <ellipse class="ol" cx="100" cy="88" rx="50" ry="44" fill="${a.base}"/>
  <path d="M70 58 Q100 44 130 58" stroke="${a.shade}" stroke-width="9" fill="none" opacity=".4" stroke-linecap="round"/>
  <ellipse cx="88" cy="106" rx="13" ry="10" fill="${a.chest}"/><ellipse cx="112" cy="106" rx="13" ry="10" fill="${a.chest}"/>
  ${eyes}
  <path d="M95 99 h10 l-5 5 z" fill="#D98B7E"/>
  <path d="M100 104 v4 M100 108 q-5 5 -10 2 M100 108 q5 5 10 2" stroke="#3A2A22" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".6"/>
  </svg>`;
}
const ph = (c,size,cls="",cap="") => `<div class="ph ${tintOf(c)} ${cls}">${pic(c,size)}${cap?`<span class="cap">${cap}</span>`:""}</div>`;
const lic = () => `<span class="license">${esc(SITE.license)}，<a href="${SITE.licenseCheck}" target="_blank" rel="noopener">到政府合法業者名單查證 ↗</a></span>`;


/* 有照片用照片，沒有就用插畫 */
function pic(c,size,opts={},idx=0){
  const p=(c.photos||[])[idx];
  return p ? `<img class="photo" src="${p}" alt="${esc(c.name)}的照片">` : cat(c.art,size,opts);
}
