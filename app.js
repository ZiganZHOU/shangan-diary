'use strict';

const ICONS = {
  book:'<path d="M4 4h12a4 4 0 0 1 4 4v13H8a4 4 0 0 1-4-4V4Z"/><path d="M4 16h16M8 8h8M8 11h5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-14 4h2m4 0h2m-8 3h2"/>',
  chart:'<path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4"/>',
  route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h7a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h7"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  upload:'<path d="M12 15V3m-4 4 4-4 4 4M4 16v4h16v-4"/>',
  chevronRight:'<path d="m9 5 7 7-7 7"/>',chevronLeft:'<path d="m15 5-7 7 7 7"/>',
  x:'<path d="m6 6 12 12M6 18 18 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="m5 12 4 4L19 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  flame:'<path d="M12 3c1 5 7 6 7 12a7 7 0 0 1-14 0c0-3 1-5 3-7 0 3 1 4 2 4 2-2 2-5 2-9Z"/>',
  verbal:'<path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 8h8m-8 4h5"/>',
  logic:'<path d="m8 3 5 5-5 5-5-5 5-5Z"/><circle cx="17" cy="16" r="5"/><path d="M3 17h5v5H3z"/>',
  data:'<path d="M5 20V10h4v10m3 0V4h4v16m3 0v-7h3v7M2 20h21"/>',
  politics:'<path d="m12 3 9 5H3l9-5Zm-7 8v7m5-7v7m4-7v7m5-7v7M3 21h18M2 18h20"/>',
  math:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M7 7h10M7 12h3m-1.5-1.5v3M14 12h3M7 17h3m4 0h3"/>',
  knowledge:'<path d="M8 17c0-3-3-3-3-7a7 7 0 0 1 14 0c0 4-3 4-3 7H8Zm0 3h8m-6 2h4"/>',
  pen:'<path d="m14 4 6 6M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15l-1 5Z"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  arrow:'<path d="M4 12h16m-5-5 5 5-5 5"/>',leaf:'<path d="M4 20C2 10 7 3 21 3c0 14-7 18-17 17Zm0 0L16 8"/>'
};
const MODULES = [
  {id:'verbal',name:'言语理解',subject:'行测',icon:'verbal',color:'#365fa5',tint:'#eaf0fc',hint:'中心理解、逻辑填空等',subs:['中心理解','逻辑填空','语句表达','篇章阅读','综合练习']},
  {id:'logic',name:'判断推理',subject:'行测',icon:'logic',color:'#6854a3',tint:'#f0ecf9',hint:'图形、定义、类比与逻辑',subs:['图形推理','定义判断','类比推理','逻辑判断','综合练习']},
  {id:'data',name:'资料分析',subject:'行测',icon:'data',color:'#327188',tint:'#e8f3f7',hint:'公式、速算与综合练习',subs:['基础概念与公式','速算技巧','增长类','比重与平均数','综合练习']},
  {id:'politics',name:'政治理论',subject:'行测',icon:'politics',color:'#9c5b67',tint:'#f9edf0',hint:'理论、政策与时政',subs:['党的创新理论','方针政策','马克思主义基本原理','时政热点','综合练习']},
  {id:'math',name:'数量关系',subject:'行测',icon:'math',color:'#6364a0',tint:'#efeff9',hint:'工程、行程与概率等',subs:['工程问题','行程问题','经济利润','排列组合与概率','其他题型','综合练习']},
  {id:'knowledge',name:'常识判断',subject:'行测',icon:'knowledge',color:'#397469',tint:'#e8f4f0',hint:'法律、科技与人文等',subs:['法律','经济','科技','人文历史','地理国情','综合练习']},
  {id:'essay',name:'申论',subject:'申论',icon:'pen',color:'#345fd1',tint:'#eaf0fd',hint:'概括、分析、应用文与写作',subs:['归纳概括','提出对策','综合分析','贯彻执行／应用文','文章写作','素材积累','套卷练习']}
];
const KINDS = ['听课学习','专项刷题','错题复盘','套卷模考','阅读积累','写作练习'];
const STORAGE_KEY = 'shangan-diary-v1';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.book}</svg>`;
const moduleById = id => MODULES.find(m=>m.id===id);
const today = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dateObj = s => new Date(`${s}T12:00:00+08:00`);
const addDays = (s,n) => {const d=dateObj(s);d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const formatDate = (s,year=false) => new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',...(year?{year:'numeric'}:{}),month:'long',day:'numeric',weekday:'long'}).format(dateObj(s));
const sum = (arr,key) => arr.reduce((n,r)=>n+(Number(r[key])||0),0);
const duration = n => n>=60?`${Math.floor(n/60)}小时${n%60?`${n%60}分钟`:''}`:`${n}分钟`;
const uid = () => globalThis.crypto?.randomUUID?.() || `e-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const validDate = s => typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(+dateObj(s)) && dateObj(s).toISOString().slice(0,10)===s && s<='9999-12-31';
let blockedStorage=false;
function validateEntry(r){
  if(!r||typeof r!=='object'||typeof r.id!=='string'||r.id.length>100||!r.id)throw Error('记录编号无效');
  const m=moduleById(r.module);if(!m||!m.subs.includes(r.submodule))throw Error('学习模块或题型无效');
  if(!validDate(r.date)||r.date>today())throw Error('请选择今天或之前的学习日期');
  if(typeof r.content!=='string'||!r.content.trim()||r.content.length>2000)throw Error('请写下今天学了什么（最多 2000 字）');
  if(!Number.isInteger(r.minutes)||r.minutes<1||r.minutes>1440)throw Error('学习时长应为 1–1440 分钟的整数');
  if(!KINDS.includes(r.kind))throw Error('学习方式无效');
  for(const k of ['questions','correct'])if(r[k]!==null&&(!Number.isInteger(r[k])||r[k]<0||r[k]>10000))throw Error('题数应为 0–10000 的整数');
  if(r.correct!==null&&(r.questions===null||r.correct>r.questions))throw Error('答对数不能大于刷题数，请先填写刷题数');
  if(typeof r.note!=='string'||r.note.length>2000)throw Error('复盘内容最多 2000 字');
  if(typeof r.createdAt!=='string'||!Number.isFinite(Date.parse(r.createdAt))||typeof r.updatedAt!=='string'||!Number.isFinite(Date.parse(r.updatedAt)))throw Error('记录时间无效');
  return {id:r.id,date:r.date,module:r.module,submodule:r.submodule,kind:r.kind,content:r.content.trim(),minutes:r.minutes,questions:r.questions,correct:r.correct,note:r.note.trim(),createdAt:r.createdAt,updatedAt:r.updatedAt};
}
function loadState(){
  try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return{entries:[],goal:120};const s=JSON.parse(raw);if(!s||s.version!==1||!Array.isArray(s.entries))throw Error('format');return {entries:s.entries.map(validateEntry),goal:Number.isInteger(s.goal)&&s.goal>0&&s.goal<=1440?s.goal:120};}
  catch(e){blockedStorage=true;return{entries:[],goal:120};}
}
let state=loadState();
let selectedDate=today(),calendarMonth=selectedDate.slice(0,7),subjectFilter='全部',historyModule='all',historySearch='',historyMonth='all',statsPeriod='week';
let activePage='today',toastTimer;
function persist(next){
  if(blockedStorage){toast('浏览器存储暂不可用，无法保存。请先检查浏览器权限。');return false;}
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,...next}));state=next;return true;}
  catch(e){toast('保存失败：浏览器存储空间不足或权限受限，请先导出备份。');return false;}
}
function hydrateIcons(){document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);el.removeAttribute('data-icon')})}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function dayEntries(d=selectedDate){return state.entries.filter(r=>r.date===d).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))}
function streak(){const dates=new Set(state.entries.map(r=>r.date));let d=today();if(!dates.has(d))d=addDays(d,-1);let n=0;while(dates.has(d)){n++;d=addDays(d,-1)}return n}
function heading(title,sub,action=true){return `<div class="page-heading"><div><h1>${title}</h1><p>${sub}</p></div>${action?`<button class="button primary" data-action="new">${icon('plus')}记录学习</button>`:''}</div>`}
function statCard(label,value,unit,ico,note=''){return `<div class="stat-card"><span class="stat-icon">${icon(ico)}</span><div><div class="label">${label}</div><div class="stat-value">${value}<small>${unit}</small></div></div>${note?`<span class="side-note">${note}</span>`:''}</div>`}
function renderModule(m, rows) {
  const done = rows.filter(r => r.module === m.id), minutes = sum(done, 'minutes');
  return `<button class="module-card ${m.id === 'essay' ? 'shenlun-card' : ''}" data-action="new" data-module="${m.id}" aria-label="记录${m.name}学习${done.length ? `，已学${minutes}分钟` : ''}">
    <span class="module-icon">${icon(m.icon)}</span>
    <div><strong>${m.name}</strong><small>${m.hint}</small></div>
    ${done.length ? `<span class="learned">${minutes} 分钟</span>` : ''}<span class="plus" aria-hidden="true">+</span>
  </button>`;
}

function renderEntry(r,showDate=false){const m=moduleById(r.module);return `<article class="entry"><div class="entry-top"><span class="tag" style="--color:${m.color};--tint:${m.tint}">${m.name}</span><span class="entry-sub">${esc(r.submodule)} · ${esc(r.kind)}</span><div class="entry-actions"><button class="icon-button" aria-label="编辑这条学习记录" data-action="edit" data-id="${esc(r.id)}">${icon('pen')}</button><button class="icon-button" aria-label="删除这条学习记录" data-action="delete" data-id="${esc(r.id)}">${icon('trash')}</button></div></div><h3>${esc(r.content)}</h3>${r.note?`<p class="entry-note">${esc(r.note)}</p>`:''}<div class="entry-meta"><span>${icon('clock')}${duration(r.minutes)}</span>${r.questions!==null?`<span>${icon('book')}完成 ${r.questions} 题</span>`:''}${r.correct!==null?`<span>${icon('target')}答对 ${r.correct} 题${r.questions>0?` · 正确率 ${Math.round(r.correct/r.questions*100)}%`:''}</span>`:''}${showDate?`<span>${r.date}</span>`:''}</div></article>`}
function renderCalendar(){const [year,month]=calendarMonth.split('-').map(Number);const first=`${calendarMonth}-01`,offset=(dateObj(first).getUTCDay()+6)%7,start=addDays(first,-offset);const counts=new Map();state.entries.forEach(r=>counts.set(r.date,(counts.get(r.date)||0)+1));const count=[...counts.keys()].filter(d=>d.startsWith(calendarMonth)).length;let cells=['一','二','三','四','五','六','日'].map(d=>`<span class="weekday">${d}</span>`).join('');const daysInMonth=new Date(Date.UTC(year,month,0)).getUTCDate();const cellCount=Math.ceil((offset+daysInMonth)/7)*7;for(let i=0;i<cellCount;i++){const d=addDays(start,i);cells+=`<button class="day ${d.slice(0,7)!==calendarMonth?'other-month':''} ${d===today()?'today':''} ${d===selectedDate?'selected':''} ${counts.has(d)?'studied':''}" data-action="select-date" data-date="${d}" ${d>today()?'disabled':''} aria-label="${d}${counts.has(d)?`，${counts.get(d)}条学习记录`:''}" ${d===selectedDate?'aria-pressed="true"':''}>${Number(d.slice(8))}</button>`;}return `<section class="panel"><div class="calendar-header"><h3>${year} 年 ${month} 月</h3><div class="calendar-controls"><button class="icon-button" data-action="prev-month" aria-label="上一个月">${icon('chevronLeft')}</button><button class="icon-button" data-action="next-month" aria-label="下一个月" ${calendarMonth>=today().slice(0,7)?'disabled':''}>${icon('chevronRight')}</button></div></div><div class="calendar-grid">${cells}</div><div class="calendar-foot"><span class="dot-key"><i></i>有学习记录</span><span>本月打卡 <strong>${count}</strong> 天</span></div></section>`}
function renderMiniRoute() {
  return `<section class="panel route-card" aria-labelledby="miniRouteTitle">
    <div class="panel-title"><h3 id="miniRouteTitle">学习顺序时间线</h3><span class="reference-tag">参考</span></div>
    <ol class="mini-timeline">
      <li class="mini-route"><span class="step-dot" aria-hidden="true">1</span><div><strong>言语理解</strong><small>先打基础</small></div></li>
      <li class="mini-route"><span class="step-dot" aria-hidden="true">2</span><div><strong>判断推理 ＋ 资料分析</strong><small>并行</small><span class="essay-branch">此时同步开始学申论</span></div></li>
      <li class="mini-route"><span class="step-dot" aria-hidden="true">3</span><div><strong>政治理论</strong><small>接着系统学</small></div></li>
      <li class="mini-route"><span class="step-dot" aria-hidden="true">4</span><div><strong>数量关系 ＋ 常识判断</strong><small>按基础补充</small></div></li>
    </ol>
    <a class="text-button" href="#route">顺序说明与视频出处</a>
  </section>`;
}

function renderToday() {
  const rows = dayEntries(), minutes = sum(rows, 'minutes');
  const modules = new Set(rows.map(r => r.module)).size;
  const progress = Math.min(100, Math.round(minutes / state.goal * 100));
  const isToday = selectedDate === today();
  const filtered = rows.filter(r => subjectFilter === '全部' || moduleById(r.module).subject === subjectFilter);
  $('#app').innerHTML = heading('每日打卡', '今天学过的内容，都记在这一页。') + `
    <section class="hero" aria-label="所选日期与学习目标">
      <div class="date-tab" aria-hidden="true"><small>${Number(selectedDate.slice(5,7))} 月</small><strong>${Number(selectedDate.slice(8))}</strong></div>
      <div class="hero-copy"><h2>${isToday ? '今天的学习页' : '这一天的学习页'}</h2>
        <p>${formatDate(selectedDate, true)}</p>
        ${!isToday ? `<button class="text-button" data-action="return-today">返回今天</button>` : ''}
      </div>
      <div class="goal"><div class="goal-ring" style="--progress:${progress}" role="img" aria-label="学习目标完成 ${progress}%"><span>${progress}<small>%</small></span></div>
        <div class="goal-text"><strong>${isToday ? '今日' : '当日'}目标</strong><p>${minutes} / ${state.goal} 分钟</p><button class="text-button" data-action="goal">调整目标 ${icon('pen')}</button></div>
      </div>
    </section>
    <div class="stat-row">
      ${statCard(isToday ? '今日学习' : '当日学习', minutes, '分钟', 'clock')}
      ${statCard('已学模块', modules, '/ 7', 'book')}
      ${statCard('当前连续打卡', streak(), '天', 'flame')}
    </div>
    <div class="dashboard-grid"><div>
      <section class="record-sheet" aria-labelledby="moduleTitle">
        <div class="section-heading"><h2 id="moduleTitle">选择学习模块</h2><span class="section-note">点选模块，开始记录</span></div>
        <div class="subject-label"><strong>行测</strong><span>六大模块</span></div>
        <div class="module-grid">${MODULES.slice(0,6).map(m => renderModule(m, rows)).join('')}</div>
        ${renderModule(MODULES[6], rows)}
      </section>
      <section class="journal-section">
        <div class="section-heading"><h2>${isToday ? '今天' : '这一天'}的记录<span class="count">${rows.length} 条</span></h2>
          <div class="segment" aria-label="筛选科目">${['全部','行测','申论'].map(subject => `<button data-action="subject" data-subject="${subject}" class="${subject === subjectFilter ? 'active' : ''}" aria-pressed="${subject === subjectFilter}">${subject}</button>`).join('')}</div>
        </div>
        ${filtered.length ? filtered.map(r => renderEntry(r)).join('') : `<div class="empty-state"><div class="empty-art">${icon('pen')}</div><h3>${rows.length ? '这个科目还没有记录' : '还没有学习记录'}</h3><p>选一个模块，记下学了什么、花了多久。<br>也可以在日历中选择日期，补记之前的学习。</p><button class="button secondary small" data-action="new">${icon('plus')}记录学习</button></div>`}
      </section>
    </div><aside class="right-column">${renderCalendar()}${renderMiniRoute()}</aside></div>`;
}

function filteredHistory(){return state.entries.filter(r=>(historyModule==='all'||r.module===historyModule)&&(historyMonth==='all'||r.date.startsWith(historyMonth))&&(!historySearch||[r.content,r.note,moduleById(r.module).name,r.submodule,r.kind].join(' ').toLowerCase().includes(historySearch.toLowerCase()))).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt.localeCompare(a.createdAt));}
function renderHistoryResults(){const rows=filteredHistory();const groups=new Map();rows.forEach(r=>{if(!groups.has(r.date))groups.set(r.date,[]);groups.get(r.date).push(r)});$('#historyResults').innerHTML=`<div class="history-summary">共 ${rows.length} 条记录 · 学习 ${duration(sum(rows,'minutes'))}</div>${rows.length?[...groups].map(([date,rs])=>`<section class="history-group"><div class="history-group-title"><strong>${formatDate(date,true)}</strong><span>${rs.length} 次学习 · ${duration(sum(rs,'minutes'))}</span></div>${rs.map(r=>renderEntry(r)).join('')}</section>`).join(''):`<div class="empty-state"><div class="empty-art">${icon('calendar')}</div><h3>${state.entries.length?'没有找到符合条件的记录':'还没有学习记录'}</h3><p>${state.entries.length?'试试其他关键词或筛选条件。':'可以记录今天，也可以补记过去的学习内容。'}</p>${state.entries.length?'':`<button class="button secondary small" data-action="new">${icon('plus')}记录学习</button>`}</div>`}`;}
function renderHistory(){const months=[...new Set(state.entries.map(r=>r.date.slice(0,7)))].sort().reverse();$('#app').innerHTML=heading('学习记录','按日期、模块或关键词，查找学过的内容。')+`<div class="history-controls"><div class="search-box">${icon('search')}<input id="historySearch" type="search" placeholder="搜索学习内容、收获或题型" value="${esc(historySearch)}" aria-label="搜索学习记录"></div><select id="historyModule" aria-label="按模块筛选"><option value="all">全部模块</option>${MODULES.map(m=>`<option value="${m.id}" ${historyModule===m.id?'selected':''}>${m.name}</option>`).join('')}</select><select id="historyMonth" aria-label="按月份筛选"><option value="all">全部月份</option>${months.map(m=>`<option ${m===historyMonth?'selected':''}>${m}</option>`).join('')}</select><button class="button secondary" data-action="export">${icon('download')}导出</button></div><div id="historyResults"></div>`;renderHistoryResults();}
function statsRows(){const t=today();return state.entries.filter(r=>statsPeriod==='all'||r.date>=(statsPeriod==='week'?addDays(t,-6):t.slice(0,7)+'-01'))}
function renderStats(){const rows=statsRows(),mins=sum(rows,'minutes'),days=new Set(rows.map(r=>r.date)).size,answered=rows.filter(r=>r.questions>0&&r.correct!==null),q=sum(answered,'questions'),correct=sum(answered,'correct');const week=Array.from({length:7},(_,i)=>{const date=addDays(today(),i-6);return{date,min:sum(state.entries.filter(r=>r.date===date),'minutes')}}),max=Math.max(...week.map(d=>d.min),60);const moduleMins=MODULES.map(m=>({m,min:sum(rows.filter(r=>r.module===m.id),'minutes')}));const reviews=rows.filter(r=>r.note).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt.localeCompare(a.updatedAt)).slice(0,8);$('#app').innerHTML=heading('学习统计','查看时间分配、刷题情况和最近的复盘。',false)+`<div class="stats-filter"><p class="muted small">${statsPeriod==='week'?'最近 7 天':statsPeriod==='month'?'本月':'全部时间'}的学习概览</p><div class="segment">${[['week','最近 7 天'],['month','本月'],['all','全部']].map(([v,n])=>`<button data-action="stats-period" data-period="${v}" class="${v===statsPeriod?'active':''}">${n}</button>`).join('')}</div></div><div class="stat-row">${statCard('累计学习',mins,'分钟','clock')}${statCard('学习天数',days,'天','calendar')}${statCard('已填答题数的正确率',q?Math.round(correct/q*100)+'%':'—',q?`${correct}/${q}题`:'暂无数据','target')}</div><div class="stats-grid"><section class="panel"><h3>最近 7 天的学习节奏</h3><div class="bars">${week.map(d=>`<div class="bar-col"><span class="bar-number">${d.min||'—'}</span><div class="bar" style="height:${Math.max(3,d.min/max*125)}px" title="${d.date}：${d.min}分钟"></div><span>${d.date===today()?'今天':`${Number(d.date.slice(5,7))}/${Number(d.date.slice(8))}`}</span></div>`).join('')}</div><p class="bar-caption">单位：分钟。统计最近 7 天的学习时长。</p></section><section class="panel"><h3>时间花在了哪里</h3><div class="distribution">${moduleMins.map(({m,min})=>`<div class="distribution-line" style="--color:${m.color}"><span class="name">${m.name}</span><div class="track"><div class="fill" style="width:${mins?min/mins*100:0}%"></div></div><span class="amount">${min} 分</span></div>`).join('')}</div></section></div><section class="panel review-panel"><div class="section-heading"><h3>留给自己的复盘</h3><span class="small muted">最近 ${reviews.length} 条</span></div>${reviews.length?`<div class="review-list">${reviews.map(r=>`<article class="review-item"><header><span>${moduleById(r.module).name}</span><span>${r.date}</span></header><p>${esc(r.note)}</p></article>`).join('')}</div>`:`<div class="empty-compact">还没有复盘内容。<br>记录学习时填写收获或问题，即可在这里回看。</div>`}</section>`;}
function renderRoute(){const steps=[['01','先学言语理解','先练阅读、理解和抓重点，为后面的判断、资料和申论打基础。','verbal','记录言语学习'],['02','判断推理 ＋ 资料分析，同步开始申论','判断与资料可以并行学习。这个阶段加入申论，练阅读、理解、概括和总结。','essay','记录申论学习'],['03','接着学政治理论','系统学习相关理论、方针政策与时政内容，逐步整理知识框架。','politics','记录政治学习'],['04','数量关系 ＋ 常识判断，按基础补充','先巩固前面的重点模块，再安排数量和常识的投入；数学基础较强，可以灵活调整。','math','记录数量学习']];$('#app').innerHTML=heading('学习顺序参考','四个阶段，帮助你安排行测与申论的学习。',false)+`<p class="route-intro">根据视频中的学习建议整理。判断和资料可以并行，申论从第二阶段同步开始；已经学过的模块，继续练习巩固。</p><div class="route-steps">${steps.map(([n,title,desc,m,btn])=>`<section class="route-step"><span class="route-number">${n}</span><div><h3>${title}</h3><p>${desc}</p><button class="button secondary small" data-action="new" data-module="${m}">${icon('plus')}${btn}</button></div></section>`).join('')}</div><p class="route-source">学习顺序参考：<a href="https://www.bilibili.com/video/BV1YnMQzuEVH/?t=504" target="_blank" rel="noopener noreferrer">哎呀公考·彪哥《这才是行测6大模块正确的学习顺序》</a><br>可以依据自己的基础调整。这里的顺序用于安排学习优先级。</p>`;}
function render(){activePage=location.hash.slice(1);if(!['today','history','stats','route'].includes(activePage))activePage='today';document.querySelectorAll('[data-page]').forEach(a=>{a.classList.toggle('active',a.dataset.page===activePage);if(a.dataset.page===activePage)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});$('#pageName').textContent=({today:'每日打卡',history:'学习记录',stats:'统计与复盘',route:'学习路线'})[activePage];$('#todayLabel').textContent=formatDate(today());({today:renderToday,history:renderHistory,stats:renderStats,route:renderRoute})[activePage]();}
function fillSubmodules(moduleId,selected){const m=moduleById(moduleId)||MODULES[0];$('#entryForm').elements.module.value=m.id;$('#modulePicker').innerHTML=MODULES.map(x=>`<button type="button" data-action="pick-module" data-module="${x.id}" class="${x.id===m.id?'active':''}" aria-pressed="${x.id===m.id}">${x.name}</button>`).join('');$('#entryForm').elements.submodule.innerHTML=m.subs.map(s=>`<option ${s===selected?'selected':''}>${s}</option>`).join('');}
function openEntry(moduleId='verbal',entry=null){const f=$('#entryForm');f.reset();$('#formError').textContent='';f.elements.id.value=entry?.id||'';f.elements.date.max=today();f.elements.date.value=entry?.date||(activePage==='today'?selectedDate:today());fillSubmodules(entry?.module||moduleId,entry?.submodule);if(entry)for(const k of ['kind','content','minutes','questions','correct','note'])f.elements[k].value=entry[k]??'';$('#entryTitle').textContent=entry?'编辑学习记录':'记录学习';$('#entryDialog').showModal();}
function saveEntry(event){event.preventDefault();const f=event.currentTarget;const old=state.entries.find(r=>r.id===f.elements.id.value);const stamp=new Date().toISOString();try{const r=validateEntry({id:old?.id||uid(),date:f.elements.date.value,module:f.elements.module.value,submodule:f.elements.submodule.value,kind:f.elements.kind.value,content:f.elements.content.value,minutes:Number(f.elements.minutes.value),questions:f.elements.questions.value===''?null:Number(f.elements.questions.value),correct:f.elements.correct.value===''?null:Number(f.elements.correct.value),note:f.elements.note.value,createdAt:old?.createdAt||stamp,updatedAt:stamp});const others=state.entries.filter(e=>e.id!==r.id);if(sum(others.filter(e=>e.date===r.date),'minutes')+r.minutes>1440)throw Error('同一天的学习总时长不能超过 1440 分钟');if(persist({...state,entries:[...others,r]})){selectedDate=r.date;calendarMonth=r.date.slice(0,7);$('#entryDialog').close();render();toast(old?'记录已更新':'学习记录已保存')}}catch(e){$('#formError').textContent=e.message;}}
function exportData(){const blob=new Blob([JSON.stringify({app:'shangan-diary',version:1,exportedAt:new Date().toISOString(),goal:state.goal,entries:state.entries},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`上岸日记-学习备份-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);toast(`已导出 ${state.entries.length} 条学习记录`);}
async function importData(event){const file=event.target.files[0];if(!file)return;try{if(file.size>20*1024*1024)throw Error('备份文件过大，请选择 20 MB 以内的文件');const data=JSON.parse(await file.text());if(data.app!=='shangan-diary'||data.version!==1||!Array.isArray(data.entries)||data.entries.length>20000)throw Error('请选择上岸日记导出的有效备份文件');const imported=data.entries.map(validateEntry),merged=new Map(state.entries.map(r=>[r.id,r]));let changed=0;for(const r of imported){const prev=merged.get(r.id);if(!prev||Date.parse(r.updatedAt)>Date.parse(prev.updatedAt)){merged.set(r.id,r);changed++}}const totals=new Map();for(const r of merged.values()){totals.set(r.date,(totals.get(r.date)||0)+r.minutes);if(totals.get(r.date)>1440)throw Error(`${r.date} 合并后的学习总时长超过一天，请检查备份`)}const goal=Number.isInteger(data.goal)&&data.goal>0&&data.goal<=1440?data.goal:state.goal;if(persist({entries:[...merged.values()],goal})){render();$('#backupDialog').close();toast(`导入完成，新增或更新 ${changed} 条记录`)}}catch(e){toast(e instanceof SyntaxError?'文件格式不正确，请选择有效的 JSON 备份':e.message)}finally{event.target.value=''}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;if(action==='new')openEntry(b.dataset.module|| (subjectFilter==='申论'&&activePage==='today'?'essay':'verbal'));else if(action==='edit'){const r=state.entries.find(r=>r.id===b.dataset.id);if(r)openEntry(r.module,r)}else if(action==='delete'){const r=state.entries.find(r=>r.id===b.dataset.id);if(r&&confirm(`删除这条「${moduleById(r.module).name}」学习记录？\n${r.content.slice(0,60)}`)&&persist({...state,entries:state.entries.filter(x=>x.id!==r.id)})){render();toast('记录已删除')}}else if(action==='close-entry')$('#entryDialog').close();else if(action==='pick-module')fillSubmodules(b.dataset.module);else if(action==='subject'){subjectFilter=b.dataset.subject;renderToday()}else if(action==='select-date'){selectedDate=b.dataset.date;calendarMonth=selectedDate.slice(0,7);subjectFilter='全部';renderToday()}else if(action==='return-today'){selectedDate=today();calendarMonth=selectedDate.slice(0,7);subjectFilter='全部';renderToday()}else if(action==='prev-month'||action==='next-month'){const d=dateObj(calendarMonth+'-15');d.setUTCMonth(d.getUTCMonth()+(action==='next-month'?1:-1));calendarMonth=d.toISOString().slice(0,7);renderToday()}else if(action==='goal'){$('#goalInput').value=state.goal;$('#settingsDialog').showModal()}else if(action==='close-settings')$('#settingsDialog').close();else if(action==='stats-period'){statsPeriod=b.dataset.period;renderStats()}else if(action==='backup'){$('#backupInfo').textContent=`已保存 ${state.entries.length} 条记录 · ${new Set(state.entries.map(r=>r.date)).size} 个学习日`;$('#backupDialog').showModal()}else if(action==='close-backup')$('#backupDialog').close();else if(action==='export')exportData();else if(action==='import')$('#importFile').click();});
document.addEventListener('input',e=>{if(e.target.id==='historySearch'){historySearch=e.target.value;renderHistoryResults()}});
document.addEventListener('change',e=>{if(e.target.id==='historyModule'){historyModule=e.target.value;renderHistoryResults()}if(e.target.id==='historyMonth'){historyMonth=e.target.value;renderHistoryResults()}});
$('#entryForm').addEventListener('submit',saveEntry);
$('#goalForm').addEventListener('submit',e=>{e.preventDefault();const goal=Number($('#goalInput').value);if(Number.isInteger(goal)&&goal>=1&&goal<=1440&&persist({...state,goal})){$('#settingsDialog').close();render();toast('学习目标已更新')}});
$('#importFile').addEventListener('change',importData);
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY&&!$('#entryDialog').open){state=loadState();render()}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!$('#entryDialog').open){const old=$('#todayLabel').textContent;if(old!==formatDate(today())){selectedDate=today();calendarMonth=selectedDate.slice(0,7);render()}}});
if(blockedStorage){$('#storageWarning').hidden=false;$('#storageWarning').textContent='当前浏览器存储无法读取。为保护已有数据，暂不写入新记录；请检查浏览器存储权限或原有备份。';}
$('#todayLabel').insertAdjacentHTML('afterend','<button class="backup-mobile" data-action="backup">备份</button>');
hydrateIcons();render();
