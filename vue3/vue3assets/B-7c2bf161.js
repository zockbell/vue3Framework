import{e as p}from"./mitt-7986091d.js";import{d as i,r as c,o as _,c as u,a as e,t as m,u as n,e as v,T as f,G as B,p as g,g as h,_ as k}from"./index-46877835.js";const w="/vue3/vue3assets/vueuse-995374f6.svg",l=s=>(g("data-v-92f146b7"),s=s(),h(),s),x={class:"Bwrap"},y=l(()=>e("div",{class:"teleport"},[e("div",{class:"modal"},"这是一个模态框")],-1)),I=l(()=>e("img",{src:w,width:"300"},null,-1)),S=i({__name:"B",setup(s){const t=c(""),r=a=>{t.value=a.value};p.on("send",r);let o=c(!1);const d=()=>{o.value=!0};return(a,b)=>(_(),u("div",x,[e("div",null,"这是B组件--"+m(n(t)),1),n(o)?(_(),v(f,{key:0,to:".main"},[y])):B("",!0),e("div",{onClick:d},"显示teleport模态框"),I]))}});const N=k(S,[["__scopeId","data-v-92f146b7"]]);export{N as default};