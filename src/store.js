
/* ============ 1b. 資料儲存（原型：存在這台裝置的瀏覽器；正式版改接雲端資料庫） ============ */
const STORE_KEY="fx-cats-v1", SITE_KEY="fx-site-v1";
function loadCats(){ try{ const s=localStorage.getItem(STORE_KEY); if(s) return JSON.parse(s); }catch(e){} return JSON.parse(JSON.stringify(DEFAULT_CATS)); }
function saveCats(list){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(list)); return true; }catch(e){ return false; } }
function loadSite(){ try{ const s=localStorage.getItem(SITE_KEY); if(s) return JSON.parse(s); }catch(e){} return {}; }
function saveSite(o){ try{ localStorage.setItem(SITE_KEY, JSON.stringify(o)); return true; }catch(e){ return false; } }
function resetAll(){ try{ localStorage.removeItem(STORE_KEY); localStorage.removeItem(SITE_KEY); }catch(e){} }
const DEFAULT_SITE = Object.assign({}, SITE);
let CATS = loadCats();
Object.assign(SITE, loadSite());
