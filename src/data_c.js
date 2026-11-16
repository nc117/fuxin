/* ============ 1. 貓舍資料（之後由後台 CMS 管理） ============
   內容整理自老大 2026 年的 Threads 貼文。標「待確認」的請老大過目。 */
const SITE = {
  name:"福信貓老大", owner:"老大",
  breeds:"英國短毛貓・英國長毛貓・塞爾凱克捲毛貓",
  address:"高雄市（預約後提供詳細地址）",
  hours:"全預約制，時間請 LINE 討論",
  license:"特寵業繁字第 W1151148 號",
  licenseCheck:"https://data.gov.tw/dataset/97070",
  registry:"TICA／WCF（待確認）",
  lineId:"@fuxincat",
  shopUrl:"https://example.com/shop",
  threads:"https://www.threads.com/@mokachiu",
  facebook:"https://www.facebook.com/moka.chiu.2025",
};
const INCLUDES = [
  "至少滿四個月，三劑核心疫苗打滿",
  "爸媽與小貓都做 13 項遺傳疾病基因篩檢",
  "毛色基因、血型基因檢測",
  "交貓前三合一快篩、血液檢查",
  "術前血檢＋氣體麻醉絕育，老大親自照顧到康復",
  "基礎健康檢查證明、晶片登記過戶",
  "老大親自開車送到家，不用寵物託運",
  "娘家禮：德罐、K36 過渡糧 1kg、不鏽鋼貓砂盆、日本外出籠、貓砂、玩具",
  "終身回娘家住宿免費，每月回來洗澡美容免費",
  "老大到府探望：清耳朵、驅蟲（高屏地區）",
];
const GUARANTEE = [
  ["貓瘟","7 天","2 個月"],
  ["傳染性腹膜炎（FIP）","7 天，通常只換貓","1 年，全額退費，貓由老大帶回照顧一輩子"],
  ["先天與遺傳疾病（HCM、PKD、PRA⋯）","180 天","終身，退費退貓"],
];
const PROMISES = ["一定要絕育","除了生病治療，不可以關籠","不可以蹓貓","不當店貓","哪天真的養不了，不棄養、不轉送，先聯絡老大"];
const FACTS = [
  ["柯南主題曲一響","全家的貓都會自己跑到餵食器前站好，因為要開飯了。"],
  ["晚上 11 點熄燈","幼稚園的小貓會回房間睡覺，家裡沒有日夜顛倒的貓。"],
  ["到新家最快 1 分鐘","打開外出籠就去吃飯，平均十分鐘。無籠長大的孩子不怕新環境。"],
  ["福丸是一隻有小狗靈魂的喵","叫了就會自己走過來，把頭塞進你手裡討摸。"],
];
const STEPS = [
  ["LINE 聊聊","老大會先問：養過貓嗎？能接受無籠飼養嗎？為什麼喜歡這隻？想回答哪些都可以。"],
  ["來家裡互動","小貓打滿三劑、滿四個月後才開放互動。一定要本人來，一組一組。"],
  ["遇到有緣的貓","互不勉強，貓願不願意跟你玩，牠自己決定。一趟不夠就兩趟。"],
  ["簽約","簽老大的保固合約，你也要答應<a href=\"#process\" class=\"jump\" data-jump=\"promises\">老大的五件事</a>。（訂金方式待確認）"],
  ["絕育與康復","術前血檢、氣麻絕育，老大親自照顧到康復，再體檢、洗香香。"],
  ["老大親自送到家","再遠都開車送，順便確認新家的環境。"],
];
const FAQ = [
  ["可以視訊看貓、直接匯款嗎？","不行。寧可不成交，也絕不隔空成交。每位家長都一定要來互動過，彼此確認養貓的想法。"],
  ["為什麼要等到四個月才能帶走？","第一劑疫苗會被媽媽給的抗體干擾，要連打三劑才有完整保護力。小貓多跟媽媽待一陣子，情緒和社會化也更穩定。小貓不是越小越親人。"],
  ["我住很遠，怎麼接貓？","老大親自開車送到你家，東部也一樣，不用寵物託運，也不搭高鐵。"],
  ["回家之後有問題怎麼辦？","隨時 LINE 老大。畢業的孩子終身可以回娘家住宿，每月回來洗澡美容都免費。"],
  ["可以帶回家當店貓、或是出門蹓貓嗎？","搭咩。也不可以關籠飼養。"],
  ["有開發票嗎？","有。不管金額高低都開。"],
  ["一定買得到嗎？","不一定。貓舍很小，很多孩子是自留的；理念不合的家長，出多少錢老大都不賣。"],
];
const ART = {
  gold:   {base:"#E9CC95",shade:"#B98A4A",chest:"#F8EEDA",eye:"#5F9B54"},
  purple: {base:"#E7D6B8",shade:"#A3909B",chest:"#F8F0E3",eye:"#5F9B54"},
  cream:  {base:"#F3E6CF",shade:"#D2B07C",chest:"#FFFFFF",eye:"#4F86B8"},
  van:    {base:"#FFFDF8",shade:"#E3B57A",chest:"#FFFFFF",eye:"#C8902E"},
  white:  {base:"#FBF8F2",shade:"#D9D0C2",chest:"#FFFFFF",eye:"#C8902E"},
  amber:  {base:"#D8AE73",shade:"#9E6C35",chest:"#F4E5C8",eye:"#6FA35A"},
  calico: {base:"#F4EEE4",shade:"#C9874A",chest:"#FFFFFF",eye:"#C8902E"},
  tux:    {base:"#3D3B44",shade:"#26242B",chest:"#FFFFFF",eye:"#C9B04A"},
  bluewhite:{base:"#8E97A6",shade:"#6B7383",chest:"#FFFFFF",eye:"#C9B04A"},
  choc:   {base:"#7A5642",shade:"#5A3D2E",chest:"#FFFFFF",eye:"#C9B04A"},
  himalayan:{base:"#F1E6D8",shade:"#7A6656",chest:"#FFFFFF",eye:"#4F86B8"},
};
/* role: kitten | king | queen | pet | grad
   status（小貓）：available 可預約 / talking 洽談中 / home 已有家長 / stay 自留 */
const DEFAULT_CATS = [
  {id:"maru",role:"king",name:"福丸",en:"Maru",breed:"英國短毛貓",color:"紫金 12 色（金漸層）",sex:"公",birthday:"2025-07-10",art:"purple",
   traits:["小狗靈魂","呆萌老實","愛被摸頭"],scores:{黏人:5,活潑:3,話量:2,好奇:4},registry:"WCF／TICA 雙綠單",
   tests:[["13 項遺傳疾病基因篩檢","（檢測機構待提供）","全數正常"],["毛色基因、血型基因","（待提供）","已檢測"]],
   note:"我一直懷疑福丸其實是一隻紫金 12 色的小狗，只是我沒有證據。叫了就會走過來，把頭塞進你手裡。"},
  {id:"vaseline",role:"king",name:"凡士林",en:"Vaseline",breed:"塞爾凱克捲毛貓（待確認）",color:"（待確認）",sex:"公",birthday:"",art:"white",
   traits:["6 公斤","溫柔的胖子","愛被美容"],scores:{黏人:5,活潑:2,話量:2,好奇:3},registry:"（待提供）",
   tests:[["13 項遺傳疾病基因篩檢","（檢測機構待提供）","全數正常"]],
   note:"看起來很壯，很愛找公貓打架，對母貓和小貓卻超溫柔，放飯時還會讓她們先吃。拿出梳子，他就自己跳上桌趴好等美容。"},
  {id:"queen",role:"queen",name:"（種母）",en:"Queens",breed:"（待老大提供）",color:"",sex:"母",birthday:"",art:"gold",
   traits:["待提供"],scores:null,registry:"",tests:null,
   note:"種母的名字與資料待老大提供。每位媽媽都有自己的房間，懷孕也不住籠子；一年最多一胎，早早退休。"},

  {id:"tuoba",role:"kitten",status:"available",name:"拖把",en:"Tuoba",breed:"塞爾凱克捲毛貓",color:"（待確認）",sex:"公",birthday:"2026-05-15",ready:"已可回家（待確認）",
   sire:"vaseline",dam:"queen",art:"white",traits:["沒節操","誰都可以摸","愛跳上腿"],scores:{黏人:5,活潑:4,話量:3,好奇:5},price:"請 LINE 詢問",
   note:"跟弟弟抹布一樣，誰來都可以、誰摸都行，直接跳到人家腳上賣萌。長大以後臉會非常大，因為爸爸凡士林臉超大。（狀態待更新）"},
  {id:"mobu",role:"kitten",status:"available",name:"抹布",en:"Mobu",breed:"塞爾凱克捲毛貓",color:"（待確認）",sex:"公",birthday:"2026-06-15",ready:"（待確認）",
   sire:"vaseline",dam:"queen",art:"white",traits:["親人","愛玩","羊毛捲"],scores:{黏人:5,活潑:5,話量:3,好奇:4},price:"請 LINE 詢問",
   note:"拖把的弟弟，一樣主打毫無原則，只要對方是個人都好。（狀態待更新）"},
  {id:"suluofei",role:"kitten",status:"stay",name:"蘇洛妃",en:"Suluofei",breed:"（待確認）",color:"（待確認）",sex:"母",birthday:"2026-05-08",ready:"自留",
   sire:"maru",dam:"queen",art:"cream",traits:["太親人","離不開老大"],scores:{黏人:5,活潑:3,話量:3,好奇:4},price:"不找家",
   note:"這個孩子太親人，離不開我，我也離不開她，所以不找家。"},
  {id:"mianhuatang",role:"kitten",status:"stay",name:"棉花糖",en:"Mianhuatang",breed:"（待確認）",color:"重點色",sex:"母",birthday:"2026-07-01",ready:"自留",
   sire:"maru",dam:"queen",art:"himalayan",traits:["早上會叫人起床","愛咬逗貓棒"],scores:{黏人:5,活潑:5,話量:4,好奇:4},price:"不找家",
   note:"每天一早咬著逗貓棒來床邊喵喵叫。她是我女兒的愛貓，所以不找家。"},

  {id:"wangzai",role:"grad",name:"旺仔",en:"Wangzai",formerly:"蛋黃酥",breed:"英國短毛貓",color:"奶油加白梵色",sex:"公",birthday:"2026-05-28",home:"台中",art:"van",
   note:"全家最聰明的貓，看到梳子就跑，看到罐罐就湊過來。到新家五分鐘就出來吃飯，現在被寵成蛋黃豬。"},
  {id:"xuebao",role:"grad",name:"雪寶",en:"Xuebao",formerly:"OK",breed:"（待確認）",color:"",sex:"公",home:"高雄",art:"cream",
   note:"到新家一分鐘就去偷吃原住民貓咪的碗，創下最快適應紀錄。老大每月去探望、清耳朵、驅蟲。"},
  {id:"roubao",role:"grad",name:"肉包",en:"Roubao",breed:"（待確認）",color:"",sex:"",home:"（待確認）",art:"amber",
   note:"離開好一陣子，再見面還是乖乖坐在老大腿上讓他清耳朵。"},
  {id:"gongtang",role:"grad",name:"貢糖",en:"Gongtang",formerly:"龍五",breed:"英國長毛貓",color:"",sex:"公",birthday:"2026-05-08",home:"（待確認）",art:"gold",
   note:"那一窩裡體格最好、骨架最大。回娘家洗澡時，自己走到小時候睡覺的位置躺好，家長要走時還帶不走。"},
  {id:"shaoye",role:"grad",name:"少爺（酒酒）",en:"Shaoye",breed:"英國長毛貓",color:"藍白雙色",sex:"公",home:"台北",art:"bluewhite",
   photos:["img/shaoye-1.jpg","img/shaoye-2.jpg","img/shaoye-3.jpg","img/shaoye-4.jpg","img/shaoye-5.jpg"],
   note:"和妹妹小花一起去了大到會迷路的新家。老大只收了一包糖當聘金。"},
  {id:"xiaohua",role:"grad",name:"小花（小貝）",en:"Xiaohua",breed:"英國短毛貓",color:"藍白雙色",sex:"母",home:"台北",art:"bluewhite",
   photos:["img/xiaohua-5.jpg","img/xiaohua-1.jpg","img/xiaohua-2.jpg","img/xiaohua-3.jpg","img/xiaohua-4.jpg"],
   photoPos:["50% 72%"],
   note:"有次全家找她找了好久，最後發現她躺在椅子上睡到翻白肚。"},

  {id:"keyi",role:"pet",name:"可以",en:"Keyi",breed:"",art:"gold",note:"傲嬌高冷的小公主，會自己開門，還教會小核桃開門。"},
  {id:"buyao",role:"pet",name:"不要",en:"Buyao",breed:"",art:"bluewhite",note:"藍白賓士，家裡最撒嬌的貓。"},
  {id:"mianmian",role:"pet",name:"麵麵",en:"Mianmian",breed:"",art:"choc",note:"三歲時收養的巧克力白賓士，從哈氣凶貓變成黏人精。"},
  {id:"ouou",role:"pet",name:"歐歐",en:"Ouou",breed:"",art:"tux",note:"黑白賓士，會自己乖乖吃藥的天使小貓（也是神經病）。"},
  {id:"hetao",role:"pet",name:"小核桃",en:"Hetao",breed:"塞爾凱克捲毛貓",art:"amber",note:"三歲多收養的捲毛妹妹，用監視器叫她吃飯就會過來站好。"},
];
const STATUS = {available:"可預約",talking:"洽談中",home:"已有家長",stay:"自留不找家"};
const ROLE = {king:"種公",queen:"種母",kitten:"小貓",pet:"家裡的貓",grad:"畢業生"};
