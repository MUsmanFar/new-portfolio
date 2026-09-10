'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Entrance({onUnavailable}:{onUnavailable:()=>void}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const mount=host.current;if(!mount)return;
  const small=matchMedia('(max-width: 760px)').matches;
  const constrained=small||((navigator as Navigator & {deviceMemory?:number}).deviceMemory??8)<=4;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:!constrained,powerPreference:'low-power'});}catch{onUnavailable();return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,constrained?1:1.5));renderer.setClearColor(0x0b0e0b,1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  renderer.shadowMap.enabled=!constrained;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  mount.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0b0e0b,.048);
  const camera=new THREE.PerspectiveCamera(43,1,.1,60);camera.position.set(0,1.65,9);
  const resources:(THREE.BufferGeometry|THREE.Material|THREE.Texture)[]=[];
  const material=(color:number,metalness=.1,roughness=.75)=>{const m=new THREE.MeshStandardMaterial({color,metalness,roughness});resources.push(m);return m};
  const dark=material(0x151b14,.6,.4),wall=material(0x0f140f,.15,.86),frame=material(0x394033,.72,.3);
  const glow=new THREE.MeshBasicMaterial({color:0xd0ff71});resources.push(glow);
  function box(w:number,h:number,d:number,mat:THREE.Material,x:number,y:number,z:number,parent:THREE.Object3D=scene){const geo=new THREE.BoxGeometry(w,h,d);resources.push(geo);const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.castShadow=!constrained;mesh.receiveShadow=!constrained;parent.add(mesh);return mesh}
  box(35,.2,35,material(0x1a2118,.45,.45),0,-.1,-6);
  box(8,8,.5,wall,-5.75,4,0);box(8,8,.5,wall,5.75,4,0);box(4.2,4,.5,wall,0,6.9,0);
  box(.2,5.4,.6,frame,-1.86,2.65,0);box(.2,5.4,.6,frame,1.86,2.65,0);box(3.9,.2,.6,frame,0,5.25,0);
  box(.035,5.15,.64,glow,-1.73,2.65,.02);box(.035,5.15,.64,glow,1.73,2.65,.02);box(3.48,.035,.64,glow,0,5.21,.02);
  const left=new THREE.Group(),right=new THREE.Group();left.position.set(-1.72,0,.05);right.position.set(1.72,0,.05);scene.add(left,right);
  box(1.71,5.1,.22,dark,.855,2.61,0,left);box(1.71,5.1,.22,dark,-.855,2.61,0,right);
  for(let i=0;i<8;i++){box(.017,4.85,.045,frame,.17+i*.2,2.62,.13,left);box(.017,4.85,.045,frame,-.17-i*.2,2.62,.13,right)}
  box(.045,.65,.12,glow,1.55,2.25,.21,left);box(.045,.65,.12,glow,-1.55,2.25,.21,right);
  // Repeating structural frames create depth as the camera enters the room.
  for(let i=0;i<4;i++){const z=-3-i*3;box(.11,5.3,.14,frame,-2.8,2.65,z);box(.11,5.3,.14,frame,2.8,2.65,z);box(5.7,.07,.14,frame,0,5.28,z);box(.035,.02,2.7,glow,-2.6,.02,z);box(.035,.02,2.7,glow,2.6,.02,z)}
  const ambient=new THREE.HemisphereLight(0xd8e9c6,0x101710,1.4);scene.add(ambient);
  const key=new THREE.SpotLight(0xcfff8a,55,25,Math.PI/5,.65,1);key.position.set(1.2,5,3);key.target.position.set(0,1,-3);key.castShadow=!constrained;key.shadow.mapSize.set(1024,1024);scene.add(key,key.target);
  const rim=new THREE.PointLight(0xa4ff52,24,13,1.4);rim.position.set(0,3,-5);scene.add(rim);
  const fill=new THREE.PointLight(0x91bde0,5,10,1);fill.position.set(-3,3,-2);scene.add(fill);
  const plinth=box(2.4,.16,1.5,frame,0,.08,-4.6);
  const characterGroup=new THREE.Group();characterGroup.position.set(0,2,-4.6);scene.add(characterGroup);
  let alive=true,visible=true,dirty=true,loaded=false;
  const texture=new THREE.TextureLoader().load('/assets/usman-cutout.webp',()=>{if(!alive)return;loaded=true;dirty=true;});texture.colorSpace=THREE.SRGBColorSpace;resources.push(texture);
  const portraitMat=new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.03,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});resources.push(portraitMat);
  const portraitGeo=new THREE.PlaneGeometry(3.5*(900/920),3.5);resources.push(portraitGeo);const character=new THREE.Mesh(portraitGeo,portraitMat);characterGroup.add(character);
  // Alpha-derived rim follows the actual silhouette, without changing the portrait pixels.
  const portraitRimMaterial=new THREE.ShaderMaterial({
   uniforms:{portrait:{value:texture},texel:{value:new THREE.Vector2(1/900,1/920)},rimColor:{value:new THREE.Color(0xc8ff79)}},
   vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
   fragmentShader:`uniform sampler2D portrait; uniform vec2 texel; uniform vec3 rimColor; varying vec2 vUv;
    void main(){float center=texture2D(portrait,vUv).a;float edge=0.0;float halo=0.0;
     for(int i=0;i<8;i++){float angle=float(i)*.785398;vec2 direction=vec2(cos(angle),sin(angle));edge=max(edge,texture2D(portrait,vUv+direction*texel*2.5).a);halo=max(halo,texture2D(portrait,vUv+direction*texel*5.5).a);}
     float alpha=(1.0-center)*(.72*edge+.16*halo);if(alpha<.015)discard;gl_FragColor=vec4(rimColor,alpha);
     #include <colorspace_fragment>
    }`,transparent:true,depthWrite:false,toneMapped:false,side:THREE.DoubleSide
  });resources.push(portraitRimMaterial);
  const portraitRim=new THREE.Mesh(portraitGeo,portraitRimMaterial);portraitRim.position.z=-.008;character.add(portraitRim);
  // The supplied illustrated character remains a textured portrait, not a fabricated rigged model.
  const state={progress:0};const entry=mount.closest('.entrance');
  gsap.registerPlugin(ScrollTrigger);
  const tween=gsap.to(state,{progress:1,ease:'none',scrollTrigger:{trigger:entry,start:'top top',end:'bottom bottom',scrub:constrained?.3:.7},onUpdate:()=>{dirty=true}});
  const mouse={x:0,y:0};
  const pointer=(e:PointerEvent)=>{if(constrained||e.pointerType!=='mouse')return;mouse.x=(e.clientX/innerWidth-.5)*.14;mouse.y=(e.clientY/innerHeight-.5)*.08;dirty=true};
  const resize=()=>{const w=mount.clientWidth,h=mount.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=w<760?58:43;camera.updateProjectionMatrix();dirty=true};
  const ro=new ResizeObserver(resize);ro.observe(mount);resize();
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)dirty=true});io.observe(mount);
  const changeVisibility=()=>{dirty=true};document.addEventListener('visibilitychange',changeVisibility);window.addEventListener('pointermove',pointer,{passive:true});
  const contextLost=(event:Event)=>{event.preventDefault();mount.style.opacity='0';onUnavailable()};renderer.domElement.addEventListener('webglcontextlost',contextLost);
  let previous=-1,announced=false,lastFrame=0;
  const render=(time:number)=>{
   if(!visible||document.hidden)return;
   const p=state.progress,characterInView=loaded&&p>.16&&p<.98;
   if(!dirty&&!characterInView)return;
   if(characterInView&&!dirty&&time-lastFrame<1/(constrained?24:40))return;
   lastFrame=time;dirty=false;
   // Animate the intact cutout gently; do not warp the face or invent a facial rig.
   const breathe=Math.sin(time*1.5),sway=Math.sin(time*.75);
   character.position.y=characterInView?breathe*.018:0;
   character.rotation.z=characterInView?sway*.006:0;
   character.scale.setScalar(characterInView?1+breathe*.0025:1);
   const opening=THREE.MathUtils.smoothstep(p,.05,.52);left.rotation.y=-opening*1.55;right.rotation.y=opening*1.55;
   const forward=THREE.MathUtils.smoothstep(p,.3,1);camera.position.set(mouse.x+forward*.35,1.9+mouse.y+forward*.1,(small?10.5:9)-forward*9.5);camera.lookAt(forward*.5,2.3,-5);
   characterGroup.position.z=-4.6+THREE.MathUtils.smoothstep(p,.2,.68)*1.1;characterGroup.rotation.y=-forward*.1+(characterInView?sway*.018:0);
   key.intensity=55+opening*80;rim.intensity=24+opening*55;fill.intensity=5+forward*18;rim.color.setHSL(.23-forward*.1,.9,.64);renderer.toneMappingExposure=1.05+opening*.27;
   plinth.visible=p<.96;character.visible=loaded;renderer.render(scene,camera);if(loaded&&!announced){announced=true;window.dispatchEvent(new Event('portfolio:scene-ready'))}if(previous<0){mount.style.opacity='1';previous=p}
  };
  gsap.ticker.add(render);
  return()=>{alive=false;tween.scrollTrigger?.kill();tween.kill();gsap.ticker.remove(render);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',changeVisibility);window.removeEventListener('pointermove',pointer);renderer.domElement.removeEventListener('webglcontextlost',contextLost);resources.forEach(r=>r.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()};
 },[onUnavailable]);
 return <div ref={host} className="three-scene" aria-hidden="true"/>;
}
