export const C={bg:'#F4F7F3',card:'#FFF',ink:'#14221A',muted:'#718078',line:'#E3EAE5',green:'#1F7A4D',greenSoft:'#E0F2E7',nav:'#10261B',gold:'#C38B2A',danger:'#B74747'};
export const suggestions=[
{id:'30x2',title:'2 € pro Tag',description:'30 Tage lang jeden Tag zwei Euro zurücklegen.',target:60,days:30,emoji:'🌱'},
{id:'week5',title:'5 € pro Woche',description:'Ein leichter Einstieg für zwanzig Wochen.',target:100,days:140,emoji:'🪙'},
{id:'month100',title:'100 € in 30 Tagen',description:'Ein klares Monatsziel mit flexiblen Einzahlungen.',target:100,days:30,emoji:'🎯'},
{id:'buffer500',title:'500 € Notgroschen',description:'Baue Schritt für Schritt einen finanziellen Puffer auf.',target:500,days:120,emoji:'🛟'},
{id:'holiday',title:'Urlaubskasse',description:'Spare über sechs Monate für deine nächste Auszeit.',target:1000,days:180,emoji:'🏖️'},
{id:'year520',title:'52-Wochen Light',description:'Im Schnitt zehn Euro pro Woche für ein Jahr.',target:520,days:364,emoji:'📆'}];
export const money=v=>new Intl.NumberFormat('de-AT',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(v||0);
export const saved=c=>(c.entries||[]).reduce((s,e)=>s+Number(e.amount||0),0);
export const makeId=()=>`${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
