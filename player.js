const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const fileInput = document.getElementById('fileInput');
const listEl = document.getElementById('list');
const nowTrack = document.getElementById('nowTrack');

let files = [];
let current = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function play(){ audio.play().then(()=>{ isPlaying=true; playBtn.textContent='⏸️'; }).catch(()=>{}); }
function pause(){ audio.pause(); isPlaying=false; playBtn.textContent='▶️'; }

playBtn.addEventListener('click', ()=> audio.paused ? play() : pause());
prevBtn.addEventListener('click', ()=>{ current=(current-1+files.length)%files.length; load(current); play(); });
nextBtn.addEventListener('click', ()=>{ current=(current+1)%files.length; load(current); play(); });
shuffleBtn.addEventListener('click', ()=>{ isShuffle=!isShuffle; shuffleBtn.style.background=isShuffle?'#1db954':'#444'; });
repeatBtn.addEventListener('click', ()=>{ isRepeat=!isRepeat; repeatBtn.style.background=isRepeat?'#1db954':'#444'; });

fileInput.addEventListener('change', e=>{
  files = Array.from(e.target.files).filter(f=>f.type.startsWith('audio/'));
  if(!files.length) return;
  current=0;
  renderList();
  load(current);
});

function load(pos){
  if(!files.length) return;
  current = pos;
  audio.src = URL.createObjectURL(files[current]);
  nowTrack.textContent = files[current].name;
  updateActive();
}

function updateActive(){
  Array.from(listEl.children).forEach((el,i)=>el.classList.toggle('active',i===current));
}

function renderList(){
  listEl.innerHTML='';
  files.forEach((f,i)=>{
    const div = document.createElement('div');
    div.className='track-item';
    div.textContent=f.name;
    div.onclick=()=>{ load(i); play(); };
    listEl.appendChild(div);
  });
  updateActive();
}

audio.addEventListener('ended', ()=>{
  if(!files.length) return;
  if(isRepeat){ load(current); play(); return; }
  if(isShuffle){ current = Math.floor(Math.random()*files.length); }
  else { current = (current+1)%files.length; }
  load(current); play();
});
