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

const desktopLayouts={
  orange:[
    {left:'4%',top:'58%',width:'10vw',height:'19vh'},
    {left:'69%',top:'8%',width:'18vw',height:'31vh'},
    {left:'84%',top:'63%',width:'9vw',height:'17vh'}
  ],
  grass:[
    {left:'82%',top:'8%',width:'11vw',height:'20vh'}
  ],
  moss:[
    {left:'5%',top:'61%',width:'13vw',height:'23vh'}
  ],
  money:[
    {left:'5%',top:'12%',width:'10vw',height:'18vh'},
    {left:'62%',top:'40%',width:'27vw',height:'43vh'}
  ]
};

const mobileLayouts={
  orange:[
    {left:'5%',top:'55%',width:'24vw'},
    {left:'57%',top:'14%',width:'34vw'},
    {left:'68%',top:'66%',width:'22vw'}
  ],
  grass:[
    {left:'62%',top:'57%',width:'28vw'}
  ],
  moss:[
    {left:'5%',top:'62%',width:'31vw'}
  ],
  money:[
    {left:'5%',top:'14%',width:'24vw'},
    {left:'42%',top:'48%',width:'49vw'}
  ]
};

function clearGallery(){
  if(!gallery)return;
  [...gallery.children].forEach((el,i)=>{
    el.classList.remove('show');
    setTimeout(()=>el.remove(),1000+i*90);
  });
}

function showProject(key){
  if(!gallery)return;
  clearGallery();
  const items=media[key]||[];
  const isMobile=window.matchMedia('(max-width:800px)').matches;
  const slots=(isMobile?mobileLayouts:desktopLayouts)[key]||[];

  setTimeout(()=>{
    items.forEach((item,i)=>{
      const el=item[1]==='video'?document.createElement('video'):document.createElement('img');
      const slot=slots[i]||{left:'70%',top:'20%',width:'12vw'};
      el.className=`floating-media media-${key}-${i}`;
      el.src=item[0];
      el.style.left=slot.left;
      el.style.top=slot.top;
      el.style.width=slot.width;
      if(!isMobile&&slot.height)el.style.height=slot.height;
      el.style.transitionDelay=`${i*180}ms`;
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
  },140);
}

projects.forEach(project=>{
  project.addEventListener('mouseenter',()=>{
    if(window.matchMedia('(hover:hover)').matches){
      projects.forEach(x=>x.classList.remove('active'));
      project.classList.add('active');
      showProject(project.dataset.project);
    }
  });
  project.addEventListener('click',()=>{
    if(window.matchMedia('(hover:none)').matches){
      const wasActive=project.classList.contains('active');
      projects.forEach(x=>x.classList.remove('active'));
      if(wasActive){clearGallery();return;}
      project.classList.add('active');
      showProject(project.dataset.project);
    }
  });
});

const projectList=document.querySelector('.project-list');
if(projectList){
  projectList.addEventListener('mouseleave',()=>{
    if(window.matchMedia('(hover:hover)').matches){
      projects.forEach(x=>x.classList.remove('active'));
      clearGallery();
    }
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
