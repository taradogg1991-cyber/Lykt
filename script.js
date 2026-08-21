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
    ['Screenshot%202026-08-21%20at%2017.44.03.png','img'],
    ['Screenshot%202026-08-21%20at%2017.44.11.png','img']
  ]
};

const layouts={
  orange:[
    {left:'5%',top:'9%',width:'12vw',height:'21vh'},
    {left:'76%',top:'14%',width:'13vw',height:'23vh'},
    {left:'67%',top:'67%',width:'10vw',height:'18vh'}
  ],
  grass:[
    {left:'81%',top:'61%',width:'12vw',height:'21vh'}
  ],
  moss:[
    {left:'7%',top:'62%',width:'14vw',height:'24vh'}
  ],
  money:[
    {left:'8%',top:'14%',width:'11vw',height:'19vh'},
    {left:'70%',top:'51%',width:'18vw',height:'31vh'}
  ]
};

function clearGallery(){
  if(!gallery)return;
  [...gallery.children].forEach((el,i)=>{
    el.classList.remove('show');
    setTimeout(()=>el.remove(),900+i*80);
  });
}

function showProject(key){
  if(!gallery)return;
  clearGallery();
  const items=media[key]||[];
  const slots=layouts[key]||[];
  setTimeout(()=>{
    items.forEach((item,i)=>{
      const el=item[1]==='video'?document.createElement('video'):document.createElement('img');
      const slot=slots[i]||{left:'70%',top:'20%',width:'12vw',height:'20vh'};
      el.className='floating-media';
      el.src=item[0];
      el.style.left=slot.left;
      el.style.top=slot.top;
      el.style.width=slot.width;
      el.style.height=slot.height;
      el.style.transitionDelay=`${i*160}ms`;
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
  },120);
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
