const opening=document.getElementById('opening');
document.getElementById('openInvitation').onclick=()=>opening.classList.add('hidden');
document.getElementById('openingClose').onclick=()=>opening.classList.add('hidden');

const menu=document.getElementById('menuLayer');
document.getElementById('menuButton').onclick=()=>menu.classList.add('open');
document.getElementById('menuClose').onclick=closeMenu;
menu.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);
function closeMenu(){menu.classList.remove('open')}

const box=document.getElementById('lightbox'), boxImg=document.getElementById('lightboxImage');
document.querySelectorAll('.gallery-item').forEach(btn=>btn.onclick=()=>{
  boxImg.src=btn.dataset.full; box.classList.add('open');
});
document.getElementById('lightboxClose').onclick=()=>box.classList.remove('open');
box.onclick=e=>{if(e.target===box)box.classList.remove('open')};

document.getElementById('rsvpForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('formNote').textContent='현재는 디자인 템플릿 단계라 아직 전송되지 않습니다.';
};

// V10 Countdown: Korea wedding, 2026-10-10 11:30 KST
(function(){
  const target = new Date('2026-10-10T11:30:00+09:00').getTime();
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-minutes'),
    s: document.getElementById('cd-seconds')
  };
  if(!els.d || !els.h || !els.m || !els.s) return;
  const pad=n=>String(n).padStart(2,'0');
  function tick(){
    let diff=target-Date.now();
    if(diff<=0){els.d.textContent='00';els.h.textContent='00';els.m.textContent='00';els.s.textContent='00';return;}
    const days=Math.floor(diff/86400000); diff%=86400000;
    const hours=Math.floor(diff/3600000); diff%=3600000;
    const minutes=Math.floor(diff/60000); diff%=60000;
    const seconds=Math.floor(diff/1000);
    els.d.textContent=String(days);
    els.h.textContent=pad(hours);
    els.m.textContent=pad(minutes);
    els.s.textContent=pad(seconds);
  }
  tick(); setInterval(tick,1000);
})();

// V10 Account copy
(function(){
  const toast=document.getElementById('copyToast');
  document.querySelectorAll('.account-copy').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const account=btn.dataset.account||'';
      const bank=btn.dataset.bank||'';
      const holder=btn.dataset.holder||'';
      if(account.includes('입력해 주세요')){
        if(toast) toast.textContent=`${holder} 계좌번호를 index.html에 입력해 주세요.`;
        return;
      }
      try{
        await navigator.clipboard.writeText(account);
      }catch(e){
        const ta=document.createElement('textarea');
        ta.value=account; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      if(toast) toast.textContent=`${holder} ${bank} 계좌번호가 복사되었습니다.`;
    });
  });
})();
