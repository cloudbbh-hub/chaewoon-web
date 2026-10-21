import {config} from './config.js?v=pink-play-2';
export class Analytics {
 constructor({id='',send=()=>{},load=()=>{}}={}){this.id=id;this.send=send;this.load=load;this.allowed=false;this.loaded=false;this.sent=new Set();}
 consent(value){this.allowed=value===true;if(this.allowed && /^G-[A-Z0-9]+$/.test(this.id) && !this.loaded){this.load(this.id);this.loaded=true;}}
 event(name,params={},key){if(!this.allowed || !this.loaded || (key && this.sent.has(key)))return false;this.send(name,params);if(key)this.sent.add(key);return true;}
}
export function readConsent(){try{return localStorage.getItem('busan-analytics');}catch{return null;}}
export const analytics=new Analytics({id:config.gaMeasurementId,load(id){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('js',new Date());window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;document.head.append(script);},send(name,params){window.gtag?.('event',name,params);}});
export function saveConsent(value){analytics.consent(value);try{localStorage.setItem('busan-analytics',value?'yes':'no');}catch{}if(window.gtag)window.gtag('consent','update',{analytics_storage:value?'granted':'denied'});if(config.gaMeasurementId)window[`ga-disable-${config.gaMeasurementId}`]=!value;}
analytics.consent(readConsent()==='yes');
