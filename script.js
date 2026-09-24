const tasks=[
{id:1,q:"2x² − 5x − 3 = 0 теңдеуін шеш.",answer:"x₁ = 3, x₂ = −1/2",type:"quadratic"},
{id:2,q:"2a − 8 = 0 теңдеуін шеш.",answer:"a = 4",type:"linear"},
{id:3,q:"3(x − 2) = 12 теңдеуін шеш.",answer:"x = 6",type:"linear"},
{id:4,q:"5/2 + 1/4 өрнегін есепте.",answer:"11/4",type:"fraction"},
{id:5,q:"x² = 49 теңдеуінің түбірлерін тап.",answer:"x = 7 және x = −7",type:"square"},
{id:6,q:"4x + 7 = 19 теңдеуін шеш.",answer:"x = 3",type:"linear"},
{id:7,q:"(x + 3)(x − 2) = 0 теңдеуін шеш.",answer:"x = −3 және x = 2",type:"product"},
{id:8,q:"12, 18 және 30 сандарының ЕҮОБ-ын тап.",answer:"6",type:"gcd"},
{id:9,q:"y = 2x + 1 функциясында x = 4 болғандағы y мәнін тап.",answer:"y = 9",type:"function"},
{id:10,q:"Тік төртбұрыштың ұзындығы 8 см, ені 5 см. Ауданын тап.",answer:"40 см²",type:"area"}
];

const examples=[
"1) D = (-5)² - 4·2·(-3) = 49\n2) x = (5 ± √49) / 4\n3) x₁ = 3, x₂ = -1/2",
"1) 2a = 8\n2) a = 4",
"1) x - 2 = 12/3\n2) x = 6",
"1) 5/2 = 10/4\n2) 10/4 + 1/4 = 11/4",
"1) √49 = 7\n2) x = 7",
"1) 4x = 19 - 7\n2) 4x = 12\n3) x = 3",
"1) x + 3 = 0 немесе x - 2 = 0\n2) x = -3 және x = 2",
"1) 12 = 2²·3\n2) 18 = 2·3²\n3) 30 = 2·3·5\n4) ЕҮОБ = 2·3 = 6",
"1) y = 2·4 + 1\n2) y = 9",
"1) S = a·b\n2) S = 8·5 = 40 см²"
];

let selected=0;
const $=id=>document.getElementById(id);

function init(){
  const select=$("taskSelect");
  tasks.forEach((t,i)=>{const o=document.createElement("option");o.value=i;o.textContent=`${t.id}. ${t.q}`;select.appendChild(o)});
  select.addEventListener("change",()=>loadTask(+select.value));
  loadTask(0); renderTasks(); renderHistory();
  document.querySelectorAll(".nav").forEach(n=>n.addEventListener("click",()=>showPage(n.dataset.page)));
}
function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  $(page).classList.remove("hidden");
  document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
  const titles={home:"Басты бет",checker:"ЖИ жауабын тексеру",tasks:"Тапсырмалар",stats:"Тексеру тарихы",about:"Жоба туралы"};
  $("pageTitle").textContent=titles[page];
}
function loadTask(i){
 selected=i;$("taskSelect").value=i;$("taskText").textContent=tasks[i].q;$("solutionInput").value="";resetChecks();
}
function loadExample(){$("solutionInput").value=examples[selected]}
function resetChecks(){ $("score").textContent="—";$("result").className="result hidden";document.querySelectorAll(".check").forEach(x=>{x.className="check muted";x.textContent="○ "+x.textContent.slice(2)})}
function checkSolution(){
 const s=$("solutionInput").value.trim().toLowerCase();
 if(!s){$("result").className="result bad";$("result").innerHTML="<b>Шешім енгізілмеді.</b><br>Алдымен ЖИ ұсынған шешім қадамдарын енгіз.";return}
 let checks=[];
 const t=tasks[selected];
 if(t.type==="quadratic") checks=[/49/.test(s),/x₁|x1/.test(s)&&/x₂|x2/.test(s),/3/.test(s)&&/1\/2/.test(s),/d/.test(s)||/дискрим/.test(s)];
 else if(t.type==="linear") checks=[/=\s*\d/.test(s),/x|a/.test(s),new RegExp(t.answer.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).test(s),/12|8|19|6|4/.test(s)];
 else if(t.type==="fraction") checks=[/10\/4/.test(s),/11\/4/.test(s),/2/.test(s),/4/.test(s)];
 else if(t.type==="square") checks=[/49/.test(s),/7/.test(s),/−7|-7/.test(s),/x/.test(s)];
 else if(t.type==="product") checks=[/0/.test(s),/-3/.test(s),/2/.test(s),/x/.test(s)];
 else if(t.type==="gcd") checks=[/12/.test(s),/18/.test(s),/30/.test(s),/6/.test(s)];
 else if(t.type==="function") checks=[/2/.test(s),/4/.test(s),/9/.test(s),/y/.test(s)];
 else if(t.type==="area") checks=[/s|ауд|area/.test(s),/8/.test(s),/5/.test(s),/40/.test(s)];
 const nodes=document.querySelectorAll(".check");
 checks.forEach((ok,i)=>{if(nodes[i]){nodes[i].className="check "+(ok?"ok":"bad");nodes[i].textContent=(ok?"✓ ":"✗ ")+["Есептің шарты түсінілді","Формула дұрыс таңдалды","Есептеу дұрыс орындалды","Қорытынды жауап дұрыс"][i]}});
 const score=Math.round(checks.filter(Boolean).length/checks.length*100);$("score").textContent=score;
 const good=score>=75;$("result").className="result "+(good?"good":"bad");
 $("result").innerHTML=good?`<b>Тексеру аяқталды.</b><br>Шешімнің негізгі қадамдары дұрыс. Ұпай: <b>${score}/100</b>.`:`<b>Қате қадам бар.</b><br>Қызыл белгіленген қадамдарды қайта тексер. Дайын жауапты көшірмей, қай жерде есептеу өзгергенін анықта. Ұпай: <b>${score}/100</b>.`;
 saveHistory(t.q,score);
}
function renderTasks(){
 $("taskList").innerHTML=tasks.map((t,i)=>`<div class="task-item" onclick="showPage('checker');loadTask(${i})"><b>${t.id}-есеп</b><p>${t.q}</p></div>`).join("");
}
function saveHistory(q,score){
 let h=JSON.parse(localStorage.getItem("mathai-history")||"[]");h.unshift({q,score,date:new Date().toLocaleString("kk-KZ")});h=h.slice(0,10);localStorage.setItem("mathai-history",JSON.stringify(h));renderHistory();
}
function renderHistory(){
 let h=JSON.parse(localStorage.getItem("mathai-history")||"[]");
 $("history").innerHTML=h.length?h.map(x=>`<div class="history-row"><div><strong>${x.q}</strong><span>${x.date}</span></div><b>${x.score}/100</b></div>`).join(""):"<p class='muted-text'>Әзірге тексеру тарихы жоқ.</p>";
}
function clearHistory(){localStorage.removeItem("mathai-history");renderHistory()}
init();