import React,{useEffect,useMemo,useState} from 'react';
import {ActivityIndicator,StatusBar,Text,View} from 'react-native';
import {SafeAreaProvider,useSafeAreaInsets} from 'react-native-safe-area-context';
import Storage from 'expo-sqlite/kv-store';
import {C,makeId,saved} from './src/config';
import {BottomNav} from './src/ui';
import {Challenges,Create,Home,More,requestReset} from './src/screens';
import {Detail} from './src/detail';
const KEY='zielora.v2';
function Main(){const i=useSafeAreaInsets();const[tab,setTab]=useState('home');const[data,setData]=useState({challenges:[]});const[ready,setReady]=useState(false);const[selectedId,setSelectedId]=useState(null);const[depositOpen,setDepositOpen]=useState(false);const[deposit,setDeposit]=useState('');const[note,setNote]=useState('');
const persist=async next=>{setData(next);await Storage.setItem(KEY,JSON.stringify(next))};
useEffect(()=>{(async()=>{try{const raw=await Storage.getItem(KEY);const parsed=raw?JSON.parse(raw):null;if(parsed&&Array.isArray(parsed.challenges))setData(parsed)}catch{}setReady(true)})()},[]);
const selected=data.challenges.find(c=>c.id===selectedId)||null;const totalSaved=useMemo(()=>data.challenges.reduce((s,c)=>s+saved(c),0),[data]);const totalTarget=useMemo(()=>data.challenges.reduce((s,c)=>s+Number(c.target||0),0),[data]);
const activate=async t=>{const old=data.challenges.find(c=>c.templateId===t.id);if(old){setSelectedId(old.id);return}const c={...t,id:makeId(),templateId:t.id,createdAt:Date.now(),entries:[]};await persist({challenges:[c,...data.challenges]});setSelectedId(c.id)};
const create=async values=>{const c={id:makeId(),...values,createdAt:Date.now(),entries:[]};await persist({challenges:[c,...data.challenges]});setSelectedId(c.id)};
const addDeposit=async()=>{if(!selected)return;const amount=Number(deposit.replace(',','.'));if(!Number.isFinite(amount)||amount<=0)return;await persist({challenges:data.challenges.map(c=>c.id===selected.id?{...c,entries:[{id:makeId(),amount,note:note.trim(),createdAt:Date.now()},...(c.entries||[])]}:c)});setDeposit('');setNote('');setDepositOpen(false)};
const remove=async()=>{await persist({challenges:data.challenges.filter(c=>c.id!==selected.id)});setSelectedId(null)};
if(!ready)return <View style={{flex:1,backgroundColor:C.bg,alignItems:'center',justifyContent:'center'}}><ActivityIndicator color={C.green}/></View>;
if(selected)return <View style={{flex:1,backgroundColor:C.bg,paddingTop:i.top}}><StatusBar barStyle="dark-content"/><Detail challenge={selected} back={()=>setSelectedId(null)} remove={remove} depositOpen={depositOpen} setDepositOpen={setDepositOpen} deposit={deposit} setDeposit={setDeposit} note={note} setNote={setNote} save={addDeposit} bottom={i.bottom}/></View>;
const title={home:'Zielora',challenges:'Challenges',create:'Neue Challenge',more:'Mehr'}[tab];return <View style={{flex:1,backgroundColor:C.bg,paddingTop:i.top}}><StatusBar barStyle="dark-content"/><View style={{height:58,paddingHorizontal:18,justifyContent:'center'}}><Text style={{color:C.ink,fontSize:28,fontWeight:'900',letterSpacing:-.8}}>{title}</Text></View><View style={{flex:1}}>{tab==='home'&&<Home challenges={data.challenges} totalSaved={totalSaved} totalTarget={totalTarget} open={setSelectedId} discover={()=>setTab('challenges')}/>} {tab==='challenges'&&<Challenges challenges={data.challenges} activate={activate} open={setSelectedId}/>} {tab==='create'&&<Create create={create} done={()=>setTab('home')}/>} {tab==='more'&&<More count={data.challenges.length} reset={()=>requestReset(()=>persist({challenges:[]}))}/>}</View><BottomNav tab={tab} setTab={setTab} bottom={i.bottom}/></View>}
export default function App(){return <SafeAreaProvider><Main/></SafeAreaProvider>}
