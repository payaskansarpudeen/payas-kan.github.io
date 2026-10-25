const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalOpen = document.getElementById('modalOpen');
document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.full;
    modalTitle.textContent = card.dataset.title;
    modalImage.src = src;
    modalImage.alt = card.dataset.title + ' certificate';
    modalOpen.href = src;
    if (typeof modal.showModal === 'function') modal.showModal();
    else window.open(src, '_blank', 'noopener');
  });
});
document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => {
  if (e.target === modal) modal.close();
});

function setupCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return {ctx, w: rect.width, h: rect.height};
}
function drawDefectChart() {
  const setup = setupCanvas(document.getElementById('defectChart'));
  if (!setup) return;
  const {ctx, w, h} = setup;
  const pad = {l:42, r:18, t:18, b:42};
  const plotW = w-pad.l-pad.r, plotH = h-pad.t-pad.b;
  const max = 16;
  ctx.font = '11px DM Sans, sans-serif';
  ctx.strokeStyle = '#e7ebf0'; ctx.fillStyle = '#7b8797'; ctx.lineWidth = 1;
  for(let val=0; val<=16; val+=4){
    const y=pad.t+plotH-(val/max)*plotH;
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();
    ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText(val+'%',pad.l-9,y);
  }
  const bars=[{label:'Starting',value:14.3,color:'#c6a05b'},{label:'Reported current',value:1.3,color:'#58c4b4'}];
  const slot=plotW/bars.length, bw=Math.min(72,slot*.43);
  bars.forEach((b,i)=>{
    const bh=(b.value/max)*plotH, x=pad.l+i*slot+(slot-bw)/2, y=pad.t+plotH-bh;
    ctx.fillStyle=b.color; roundRect(ctx,x,y,bw,bh,7); ctx.fill();
    ctx.fillStyle='#182337';ctx.font='700 12px Manrope, sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillText(b.value+'%',x+bw/2,Math.max(12,y-7));
    ctx.fillStyle='#69778b';ctx.font='10px DM Sans, sans-serif';ctx.textBaseline='top';ctx.fillText(b.label,x+bw/2,pad.t+plotH+13);
  });
}
function drawTrainingChart() {
  const setup = setupCanvas(document.getElementById('trainingChart'));
  if (!setup) return;
  const {ctx,w,h}=setup;
  const data=[['Control plan',151],['Induction',55],['Failure-mode',33],['QC team',13]];
  const left=92,right=32,top=14,bottom=10,plotW=w-left-right,rowH=(h-top-bottom)/data.length,max=160;
  ctx.font='10px DM Sans, sans-serif';
  data.forEach((d,i)=>{
    const y=top+i*rowH+rowH*.24, bh=Math.min(18,rowH*.42);
    ctx.fillStyle='#69778b';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText(d[0],left-10,y+bh/2);
    ctx.fillStyle='#edf0f4';roundRect(ctx,left,y,plotW,bh,5);ctx.fill();
    ctx.fillStyle=['#58c4b4','#c6a05b','#7a9bd0','#9d8bc5'][i];roundRect(ctx,left,y,Math.max(2,plotW*d[1]/max),bh,5);ctx.fill();
    ctx.fillStyle='#182337';ctx.font='700 10px Manrope, sans-serif';ctx.textAlign='left';ctx.fillText(String(d[1]),Math.min(w-20,left+plotW*d[1]/max+7),y+bh/2);
  });
}
function roundRect(ctx,x,y,w,h,r){
  r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
function drawCharts(){drawDefectChart();drawTrainingChart();}
window.addEventListener('load', drawCharts);
let resizeTimer;
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(drawCharts,150);});
