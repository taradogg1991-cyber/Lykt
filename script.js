const gallery=document.querySelector('.hover-gallery');
const projects=document.querySelectorAll('.project');

const media={
  orange:[
    ['IMG_0%20%281%29.MOV','video'],
    ['IMG_6828%20%281%29.jpg','img'],
    ['IMG_9718.jpg','img']
  ],
  grass:[['Spritt_e.jpg','img']],
  moss:[['Untitled%20design%20%282%29.mp4','video']],
  money:[
    ['Screenshot%202026-08-20%20at%2018.53.21.png','img'],
    ['Screenshot%202026-08-20%20at%2018.53.28.png','img']
  ]
};

const layouts={
  1:[{left:'68%',top:'28%',width:'24vw',height:'44vh'}],
  2:[
    {left:'63%',top:'13%',width:'22vw',height:'34vh'},
    {left:'71%',top:'56%',width:'21vw',height:'31vh'}
  ],
  3:[
    {left:'61%',top:'8%',width:'21vw',height:'30vh'},
    {left:'76%',top:'38%',width:'18vw',height:'27vh'},
    {left:'58%',top:'63%',width:'20vw',height:'28vh'}
  ]
};

function clearGallery(){
  if(!gallery)return;
  [...gallery.children].forEach((el,i)=>{
    el.classList.remove('show');
    setTimeout(()=>el.remove(),520+i*60);
  });
}

function showProject(key){
  if(!gallery)return;
  clearGallery();
  const items=media[key]||[];
  const slots=layouts[Math.min(items.length,3)]||layouts[1];
  setTimeout(()=>{
    items.forEach((item,i)=>{
      const el=item[1]==='video'?document.createElement('video'):document.createElement('img');
      const slot=slots[i];
      el.className='floating-media';
      el.src=item[0];
      el.style.left=slot.left;
      el.style.top=slot.top;
      el.style.width=slot.width;
      el.style.height=slot.height;
      if(item[1]==='video'){
        el.autoplay=true;
        el.muted=true;
        el.loop=true;
        el.playsInline=true;
        el.classList.add('v');
      }
      gallery.appendChild(el);
      requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
    });
  },180);
}

projects.forEach(project=>{
  project.addEventListener('mouseenter',()=>{
    projects.forEach(x=>x.classList.remove('active'));
    project.classList.add('active');
    showProject(project.dataset.project);
  });
});

const projectList=document.querySelector('.project-list');
if(projectList){
  projectList.addEventListener('mouseleave',()=>{
    projects.forEach(x=>x.classList.remove('active'));
    clearGallery();
  });
}

const entry=document.querySelector('.entry');
const cursorText=document.querySelector('.entry-cursor-text');
if(entry&&cursorText&&window.matchMedia('(pointer:fine)').matches){
  entry.addEventListener('pointermove',e=>{
    cursorText.style.display='block';
    cursorText.style.left=(e.clientX+16)+'px';
    cursorText.style.top=(e.clientY+16)+'px';
  });
  entry.addEventListener('pointerleave',()=>cursorText.style.display='none');
}
