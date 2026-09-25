/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bu=0,Fl=1,zu=2,qf=3,Yf=0,tc=1,ku=2,vn=3,Gn=0,Ve=1,yn=2,kn=0,Li=1,Bl=2,zl=3,kl=4,Vu=5,ni=100,Hu=101,Gu=102,Wu=103,Xu=104,qu=200,Yu=201,Zu=202,$u=203,wa=204,Aa=205,Ju=206,Ku=207,ju=208,Qu=209,td=210,ed=211,nd=212,id=213,sd=214,Ta=0,Ca=1,Ra=2,Bi=3,Pa=4,Ia=5,La=6,Da=7,gr=0,rd=1,ad=2,Vn=0,od=1,ld=2,cd=3,hd=4,ud=5,dd=6,fd=7,Vl="attached",pd="detached",fo=300,Wn=301,ii=302,Qs=303,tr=304,Ss=306,er=1e3,an=1001,nr=1002,Ie=1003,ec=1004,Zf=1004,ds=1005,$f=1005,Me=1006,Ws=1007,Jf=1007,Sn=1008,Kf=1008,An=1009,nc=1010,ic=1011,xs=1012,po=1013,Xn=1014,$e=1015,bs=1016,mo=1017,go=1018,zi=1020,sc=35902,rc=1021,ac=1022,ke=1023,oc=1024,lc=1025,Di=1026,ki=1027,_o=1028,_r=1029,cc=1030,xo=1031,jf=1032,vo=1033,Xs=33776,qs=33777,Ys=33778,Zs=33779,Ua=35840,Na=35841,Oa=35842,Fa=35843,Ba=36196,za=37492,ka=37496,Va=37808,Ha=37809,Ga=37810,Wa=37811,Xa=37812,qa=37813,Ya=37814,Za=37815,$a=37816,Ja=37817,Ka=37818,ja=37819,Qa=37820,to=37821,$s=36492,eo=36494,no=36495,hc=36283,io=36284,so=36285,ro=36286,md=2200,gd=2201,_d=2202,ir=2300,ao=2301,ba=2302,Ci=2400,Ri=2401,sr=2402,yo=2500,uc=2501,Qf=0,tp=1,ep=2,xd=3200,vd=3201,np=3202,ip=3203,ri=0,yd=1,Fn="",Ye="srgb",Hi="srgb-linear",xr="linear",oe="srgb",sp=0,wi=7680,rp=7681,ap=7682,op=7683,lp=34055,cp=34056,hp=5386,up=512,dp=513,fp=514,pp=515,mp=516,gp=517,_p=518,Hl=519,Md=512,Sd=513,bd=514,dc=515,Ed=516,wd=517,Ad=518,Td=519,rr=35044,xp=35048,vp=35040,yp=35045,Mp=35049,Sp=35041,bp=35046,Ep=35050,wp=35042,Ap="100",Gl="300 es",bn=2e3,ar=2001;let Tn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}};const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Kc=1234567;const Ui=Math.PI/180,vs=180/Math.PI;function en(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[r&255]+Le[r>>8&255]+Le[r>>16&255]+Le[r>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function me(r,t,e){return Math.max(t,Math.min(e,r))}function fc(r,t){return(r%t+t)%t}function Tp(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function Cp(r,t,e){return r!==t?(e-r)/(t-r):0}function Js(r,t,e){return(1-e)*r+e*t}function Rp(r,t,e,n){return Js(r,t,1-Math.exp(-e*n))}function Pp(r,t=1){return t-Math.abs(fc(r,t*2)-t)}function Ip(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Lp(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Dp(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Up(r,t){return r+Math.random()*(t-r)}function Np(r){return r*(.5-Math.random())}function Op(r){r!==void 0&&(Kc=r);let t=Kc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fp(r){return r*Ui}function Bp(r){return r*vs}function zp(r){return(r&r-1)===0&&r!==0}function kp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Vp(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Hp(r,t,e,n,i){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),m=a((n-t)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ze(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xt(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Cd={DEG2RAD:Ui,RAD2DEG:vs,generateUUID:en,clamp:me,euclideanModulo:fc,mapLinear:Tp,inverseLerp:Cp,lerp:Js,damp:Rp,pingpong:Pp,smoothstep:Ip,smootherstep:Lp,randInt:Dp,randFloat:Up,randFloatSpread:Np,seededRandom:Op,degToRad:Fp,radToDeg:Bp,isPowerOfTwo:zp,ceilPowerOfTwo:kp,floorPowerOfTwo:Vp,setQuaternionFromProperEuler:Hp,normalize:Xt,denormalize:ze};class Z{constructor(t=0,e=0){Z.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,i,s,a,o,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=i[0],g=i[3],p=i[6],y=i[1],v=i[4],x=i[7],I=i[2],A=i[5],C=i[8];return s[0]=a*_+o*y+l*I,s[3]=a*g+o*v+l*A,s[6]=a*p+o*x+l*C,s[1]=c*_+h*y+u*I,s[4]=c*g+h*v+u*A,s[7]=c*p+h*x+u*C,s[2]=d*_+f*y+m*I,s[5]=d*g+f*v+m*A,s[8]=d*p+f*x+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(qo.makeScale(t,e)),this}rotate(t){return this.premultiply(qo.makeRotation(-t)),this}translate(t,e){return this.premultiply(qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const qo=new Wt;function Rd(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}const Gp={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function fs(r,t){return new Gp[r](t)}function or(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Pd(){const r=or("canvas");return r.style.display="block",r}const jc={};function Vs(r){r in jc||(jc[r]=!0,console.warn(r))}function Wp(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Xp(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function qp(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(r.r=Hn(r.r),r.g=Hn(r.g),r.b=Hn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(r.r=_s(r.r),r.g=_s(r.g),r.b=_s(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Fn?xr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Hn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function _s(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Qc=[.64,.33,.3,.6,.15,.06],th=[.2126,.7152,.0722],eh=[.3127,.329],nh=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ih=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Hi]:{primaries:Qc,whitePoint:eh,transfer:xr,toXYZ:nh,fromXYZ:ih,luminanceCoefficients:th,workingColorSpaceConfig:{unpackColorSpace:Ye},outputColorSpaceConfig:{drawingBufferColorSpace:Ye}},[Ye]:{primaries:Qc,whitePoint:eh,transfer:oe,toXYZ:nh,fromXYZ:ih,luminanceCoefficients:th,outputColorSpaceConfig:{drawingBufferColorSpace:Ye}}});let Zi;class Id{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=or("canvas")),Zi.width=t.width,Zi.height=t.height;const n=Zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=or("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Hn(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yp=0;class Pi{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=en(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Yo(i[a].image)):s.push(Yo(i[a]))}else s=Yo(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Yo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Id.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zp=0;class ge extends Tn{constructor(t=ge.DEFAULT_IMAGE,e=ge.DEFAULT_MAPPING,n=an,i=an,s=Me,a=Sn,o=ke,l=An,c=ge.DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=en(),this.name="",this.source=new Pi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==fo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case er:t.x=t.x-Math.floor(t.x);break;case an:t.x=t.x<0?0:1;break;case nr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case er:t.y=t.y-Math.floor(t.y);break;case an:t.y=t.y<0?0:1;break;case nr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ge.DEFAULT_IMAGE=null;ge.DEFAULT_MAPPING=fo;ge.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,i=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(f+1)/2,I=(p+1)/2,A=(h+d)/4,C=(u+_)/4,R=(m+g)/4;return v>x&&v>I?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=A/n,s=C/n):x>I?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=A/i,s=R/i):I<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(I),n=C/s,i=R/s),this.set(n,i,s,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ld extends Tn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Me,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new ge(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pi(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends Ld{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mo extends ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $p extends fn{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Mo(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class pc extends ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jp extends fn{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new pc(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class Ne{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==m){let g=1-o;const p=l*d+c*f+h*m+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const I=Math.sqrt(v),A=Math.atan2(I,p*y);g=Math.sin(g*A)/I,o=Math.sin(o*A)/I}const x=o*y;if(l=l*g+d*x,c=c*g+f*x,h=h*g+m*x,u=u*g+_*x,g===1-o){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return t[e]=o*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-o*f,t[e+2]=c*m+h*f+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,n=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zo.copy(this).projectOnVector(t),this.sub(Zo)}reflect(t){return this.sub(Zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zo=new w,sh=new Ne;class we{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,cn):cn.fromBufferAttribute(s,a),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rs),Rr.subVectors(this.max,Rs),$i.subVectors(t.a,Rs),Ji.subVectors(t.b,Rs),Ki.subVectors(t.c,Rs),$n.subVectors(Ji,$i),Jn.subVectors(Ki,Ji),hi.subVectors($i,Ki);let e=[0,-$n.z,$n.y,0,-Jn.z,Jn.y,0,-hi.z,hi.y,$n.z,0,-$n.x,Jn.z,0,-Jn.x,hi.z,0,-hi.x,-$n.y,$n.x,0,-Jn.y,Jn.x,0,-hi.y,hi.x,0];return!$o(e,$i,Ji,Ki,Rr)||(e=[1,0,0,0,1,0,0,0,1],!$o(e,$i,Ji,Ki,Rr))?!1:(Pr.crossVectors($n,Jn),e=[Pr.x,Pr.y,Pr.z],$o(e,$i,Ji,Ki,Rr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new w,new w,new w,new w,new w,new w,new w,new w],cn=new w,Cr=new we,$i=new w,Ji=new w,Ki=new w,$n=new w,Jn=new w,hi=new w,Rs=new w,Rr=new w,Pr=new w,ui=new w;function $o(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ui.fromArray(r,s);const o=i.x*Math.abs(ui.x)+i.y*Math.abs(ui.y)+i.z*Math.abs(ui.z),l=t.dot(ui),c=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Kp=new we,Ps=new w,Jo=new w;class Ae{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Kp.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ps.subVectors(t,this.center);const e=Ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ps.copy(t.center).add(Jo)),this.expandByPoint(Ps.copy(t.center).sub(Jo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new w,Ko=new w,Ir=new w,Kn=new w,jo=new w,Lr=new w,Qo=new w;class Gi{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ko.copy(t).add(e).multiplyScalar(.5),Ir.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Ko);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ir),o=Kn.dot(this.direction),l=-Kn.dot(Ir),c=Kn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ko).addScaledVector(Ir,d),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),i=In.dot(In)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,i,s){jo.subVectors(e,t),Lr.subVectors(n,t),Qo.crossVectors(jo,Lr);let a=this.direction.dot(Qo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);const l=o*this.direction.dot(Lr.crossVectors(Kn,Lr));if(l<0)return null;const c=o*this.direction.dot(jo.cross(Kn));if(c<0||l+c>a)return null;const h=-o*Kn.dot(Qo);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zt{constructor(t,e,n,i,s,a,o,l,c,h,u,d,f,m,_,g){zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,u,d,f,m,_,g)}set(t,e,n,i,s,a,o,l,c,h,u,d,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ji.setFromMatrixColumn(t,0).length(),s=1/ji.setFromMatrixColumn(t,1).length(),a=1/ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d+_*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d-_*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jp,t,Qp)}lookAt(t,e,n){const i=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),jn.crossVectors(n,je),jn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),jn.crossVectors(n,je)),jn.normalize(),Dr.crossVectors(je,jn),i[0]=jn.x,i[4]=Dr.x,i[8]=je.x,i[1]=jn.y,i[5]=Dr.y,i[9]=je.y,i[2]=jn.z,i[6]=Dr.z,i[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],v=n[7],x=n[11],I=n[15],A=i[0],C=i[4],R=i[8],b=i[12],M=i[1],L=i[5],V=i[9],B=i[13],H=i[2],j=i[6],X=i[10],it=i[14],W=i[3],ht=i[7],ft=i[11],bt=i[15];return s[0]=a*A+o*M+l*H+c*W,s[4]=a*C+o*L+l*j+c*ht,s[8]=a*R+o*V+l*X+c*ft,s[12]=a*b+o*B+l*it+c*bt,s[1]=h*A+u*M+d*H+f*W,s[5]=h*C+u*L+d*j+f*ht,s[9]=h*R+u*V+d*X+f*ft,s[13]=h*b+u*B+d*it+f*bt,s[2]=m*A+_*M+g*H+p*W,s[6]=m*C+_*L+g*j+p*ht,s[10]=m*R+_*V+g*X+p*ft,s[14]=m*b+_*B+g*it+p*bt,s[3]=y*A+v*M+x*H+I*W,s[7]=y*C+v*L+x*j+I*ht,s[11]=y*R+v*V+x*X+I*ft,s[15]=y*b+v*B+x*it+I*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+_*(+e*l*f-e*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+g*(+e*c*u-e*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],y=u*g*c-_*d*c+_*l*f-o*g*f-u*l*p+o*d*p,v=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,x=h*_*c-m*u*c+m*o*f-a*_*f-h*o*p+a*u*p,I=m*u*l-h*_*l-m*o*d+a*_*d+h*o*g-a*u*g,A=e*y+n*v+i*x+s*I;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=y*C,t[1]=(_*d*s-u*g*s-_*i*f+n*g*f+u*i*p-n*d*p)*C,t[2]=(o*g*s-_*l*s+_*i*c-n*g*c-o*i*p+n*l*p)*C,t[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*C,t[4]=v*C,t[5]=(h*g*s-m*d*s+m*i*f-e*g*f-h*i*p+e*d*p)*C,t[6]=(m*l*s-a*g*s-m*i*c+e*g*c+a*i*p-e*l*p)*C,t[7]=(a*d*s-h*l*s+h*i*c-e*d*c-a*i*f+e*l*f)*C,t[8]=x*C,t[9]=(m*u*s-h*_*s-m*n*f+e*_*f+h*n*p-e*u*p)*C,t[10]=(a*_*s-m*o*s+m*n*c-e*_*c-a*n*p+e*o*p)*C,t[11]=(h*o*s-a*u*s-h*n*c+e*u*c+a*n*f-e*o*f)*C,t[12]=I*C,t[13]=(h*_*i-m*u*i+m*n*d-e*_*d-h*n*g+e*u*g)*C,t[14]=(m*o*i-a*_*i-m*n*l+e*_*l+a*n*g-e*o*g)*C,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,m=s*u,_=a*h,g=a*u,p=o*u,y=l*c,v=l*h,x=l*u,I=n.x,A=n.y,C=n.z;return i[0]=(1-(_+p))*I,i[1]=(f+x)*I,i[2]=(m-v)*I,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(g+y)*A,i[7]=0,i[8]=(m+v)*C,i[9]=(g-y)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ji.set(i[0],i[1],i[2]).length();const a=ji.set(i[4],i[5],i[6]).length(),o=ji.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],hn.copy(this);const c=1/s,h=1/a,u=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=bn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,m;if(o===bn)f=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===ar)f=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=bn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-s),d=(e+t)*c,f=(n+i)*h;let m,_;if(o===bn)m=(a+s)*u,_=-2*u;else if(o===ar)m=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ji=new w,hn=new zt,jp=new w(0,0,0),Qp=new w(1,1,1),jn=new w,Dr=new w,je=new w,rh=new zt,ah=new Ne;class nn{constructor(t=0,e=0,n=0,i=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ah.setFromEuler(this),this.setFromQuaternion(ah,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class So{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tm=0;const oh=new w,Qi=new Ne,Ln=new zt,Ur=new w,Is=new w,em=new w,nm=new Ne,lh=new w(1,0,0),ch=new w(0,1,0),hh=new w(0,0,1),uh={type:"added"},im={type:"removed"},ts={type:"childadded",child:null},tl={type:"childremoved",child:null};class ne extends Tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ne.DEFAULT_UP.clone();const t=new w,e=new nn,n=new Ne,i=new w(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zt},normalMatrix:{value:new Wt}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new So,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(lh,t)}rotateY(t){return this.rotateOnAxis(ch,t)}rotateZ(t){return this.rotateOnAxis(hh,t)}translateOnAxis(t,e){return oh.copy(t).applyQuaternion(this.quaternion),this.position.add(oh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lh,t)}translateY(t){return this.translateOnAxis(ch,t)}translateZ(t){return this.translateOnAxis(hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Is,Ur,this.up):Ln.lookAt(Ur,Is,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Qi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uh),ts.child=t,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(im),tl.child=t,this.dispatchEvent(tl),tl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uh),ts.child=t,this.dispatchEvent(ts),ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,em),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,nm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ne.DEFAULT_UP=new w(0,1,0);ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new w,Dn=new w,el=new w,Un=new w,es=new w,ns=new w,dh=new w,nl=new w,il=new w,sl=new w,rl=new Jt,al=new Jt,ol=new Jt;class Ze{constructor(t=new w,e=new w,n=new w){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),un.subVectors(t,e),i.cross(un);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){un.subVectors(i,e),Dn.subVectors(n,e),el.subVectors(t,e);const a=un.dot(un),o=un.dot(Dn),l=un.dot(el),c=Dn.dot(Dn),h=Dn.dot(el),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return rl.setScalar(0),al.setScalar(0),ol.setScalar(0),rl.fromBufferAttribute(t,e),al.fromBufferAttribute(t,n),ol.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(rl,s.x),a.addScaledVector(al,s.y),a.addScaledVector(ol,s.z),a}static isFrontFacing(t,e,n,i){return un.subVectors(n,e),Dn.subVectors(t,e),un.cross(Dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),un.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return Ze.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;es.subVectors(i,n),ns.subVectors(s,n),nl.subVectors(t,n);const l=es.dot(nl),c=ns.dot(nl);if(l<=0&&c<=0)return e.copy(n);il.subVectors(t,i);const h=es.dot(il),u=ns.dot(il);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(es,a);sl.subVectors(t,s);const f=es.dot(sl),m=ns.dot(sl);if(m>=0&&f<=m)return e.copy(s);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(ns,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return dh.subVectors(s,i),o=(u-h)/(u-h+(f-m)),e.copy(i).addScaledVector(dh,o);const p=1/(g+_+d);return a=_*p,o=d*p,e.copy(n).addScaledVector(es,a).addScaledVector(ns,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function ll(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=fc(t,1),e=me(e,0,1),n=me(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=ll(a,s,t+1/3),this.g=ll(a,s,t),this.b=ll(a,s,t-1/3)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ye){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ye){const n=Dd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ye){return Qt.fromWorkingColorSpace(De.copy(this),t),Math.round(me(De.r*255,0,255))*65536+Math.round(me(De.g*255,0,255))*256+Math.round(me(De.b*255,0,255))}getHexString(t=Ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(De.copy(this),e);const n=De.r,i=De.g,s=De.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ye){Qt.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==Ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(Nr);const n=Js(Qn.h,Nr.h,e),i=Js(Qn.s,Nr.s,e),s=Js(Qn.l,Nr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new xt;xt.NAMES=Dd;let sm=0;class Oe extends Tn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=en(),this.name="",this.blending=Li,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=Aa,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xt(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Li&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Aa&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ai extends Oe{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=gr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Bn=rm();function rm(){const r=new ArrayBuffer(4),t=new Float32Array(r),e=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function qe(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=me(r,-65504,65504),Bn.floatView[0]=r;const t=Bn.uint32View[0],e=t>>23&511;return Bn.baseTable[e]+((t&8388607)>>Bn.shiftTable[e])}function Hs(r){const t=r>>10;return Bn.uint32View[0]=Bn.mantissaTable[Bn.offsetTable[t]+(r&1023)]+Bn.exponentTable[t],Bn.floatView[0]}const am={toHalfFloat:qe,fromHalfFloat:Hs},ve=new w,Or=new Z;class le{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=rr,this.updateRanges=[],this.gpuType=$e,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Or.fromBufferAttribute(this,e),Or.applyMatrix3(t),this.setXY(e,Or.x,Or.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ze(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ze(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ze(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ze(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ze(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rr&&(t.usage=this.usage),t}}class om extends le{constructor(t,e,n){super(new Int8Array(t),e,n)}}class lm extends le{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class cm extends le{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class hm extends le{constructor(t,e,n){super(new Int16Array(t),e,n)}}class mc extends le{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class um extends le{constructor(t,e,n){super(new Int32Array(t),e,n)}}class gc extends le{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class dm extends le{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=Hs(this.array[t*this.itemSize]);return this.normalized&&(e=ze(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize]=qe(e),this}getY(t){let e=Hs(this.array[t*this.itemSize+1]);return this.normalized&&(e=ze(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+1]=qe(e),this}getZ(t){let e=Hs(this.array[t*this.itemSize+2]);return this.normalized&&(e=ze(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+2]=qe(e),this}getW(t){let e=Hs(this.array[t*this.itemSize+3]);return this.normalized&&(e=ze(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xt(e,this.array)),this.array[t*this.itemSize+3]=qe(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array)),this.array[t+0]=qe(e),this.array[t+1]=qe(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.array[t+0]=qe(e),this.array[t+1]=qe(n),this.array[t+2]=qe(i),this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[t+0]=qe(e),this.array[t+1]=qe(n),this.array[t+2]=qe(i),this.array[t+3]=qe(s),this}}class At extends le{constructor(t,e,n){super(new Float32Array(t),e,n)}}let fm=0;const rn=new zt,cl=new ne,is=new w,Qe=new we,Ls=new we,Ee=new w;class Zt extends Tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rd(t)?gc:mc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Wt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,n){return rn.makeTranslation(t,e,n),this.applyMatrix4(rn),this}scale(t,e,n){return rn.makeScale(t,e,n),this.applyMatrix4(rn),this}lookAt(t){return cl.lookAt(t),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new we);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Qe.setFromBufferAttribute(s),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ae);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors(Qe.min,Ls.min),Qe.expandByPoint(Ee),Ee.addVectors(Qe.max,Ls.max),Qe.expandByPoint(Ee)):(Qe.expandByPoint(Ls.min),Qe.expandByPoint(Ls.max))}Qe.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Ee.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ee));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(is.fromBufferAttribute(t,c),Ee.add(is)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new le(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new w,l[R]=new w;const c=new w,h=new w,u=new w,d=new Z,f=new Z,m=new Z,_=new w,g=new w;function p(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,b),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(L),o[R].add(_),o[b].add(_),o[M].add(_),l[R].add(g),l[b].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,b=y.length;R<b;++R){const M=y[R],L=M.start,V=M.count;for(let B=L,H=L+V;B<H;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const v=new w,x=new w,I=new w,A=new w;function C(R){I.fromBufferAttribute(i,R),A.copy(I);const b=o[R];v.copy(b),v.sub(I.multiplyScalar(I.dot(b))).normalize(),x.crossVectors(A,b);const L=x.dot(l[R])<0?-1:1;a.setXYZW(R,v.x,v.y,v.z,L)}for(let R=0,b=y.length;R<b;++R){const M=y[R],L=M.start,V=M.count;for(let B=L,H=L+V;B<H;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new le(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new w,s=new w,a=new w,o=new w,l=new w,c=new w,h=new w,u=new w;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new le(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Zt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fh=new zt,di=new Gi,Fr=new Ae,ph=new w,Br=new w,zr=new w,kr=new w,hl=new w,Vr=new w,mh=new w,Hr=new w;class xe extends ne{constructor(t=new Zt,e=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){Vr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(hl.fromBufferAttribute(u,t),a?Vr.addScaledVector(hl,h):Vr.addScaledVector(hl.sub(e),h))}e.add(Vr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(s),di.copy(t.ray).recast(t.near),!(Fr.containsPoint(di.origin)===!1&&(di.intersectSphere(Fr,ph)===null||di.origin.distanceToSquared(ph)>(t.far-t.near)**2))&&(fh.copy(s).invert(),di.copy(t.ray).applyMatrix4(fh),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,I=v;x<I;x+=3){const A=o.getX(x),C=o.getX(x+1),R=o.getX(x+2);i=Gr(this,p,t,n,c,h,u,A,C,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),v=o.getX(g+1),x=o.getX(g+2);i=Gr(this,a,t,n,c,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,I=v;x<I;x+=3){const A=x,C=x+1,R=x+2;i=Gr(this,p,t,n,c,h,u,A,C,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,v=g+1,x=g+2;i=Gr(this,a,t,n,c,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function pm(r,t,e,n,i,s,a,o){let l;if(t.side===Ve?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===Gn,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Hr);return c<e.near||c>e.far?null:{distance:c,point:Hr.clone(),object:r}}function Gr(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Br),r.getVertexPosition(l,zr),r.getVertexPosition(c,kr);const h=pm(r,t,e,n,Br,zr,kr,mh);if(h){const u=new w;Ze.getBarycoord(mh,Br,zr,kr,u),i&&(h.uv=Ze.getInterpolatedAttribute(i,o,l,c,u,new Z)),s&&(h.uv1=Ze.getInterpolatedAttribute(s,o,l,c,u,new Z)),a&&(h.normal=Ze.getInterpolatedAttribute(a,o,l,c,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new w,materialIndex:0};Ze.getNormal(Br,zr,kr,d.normal),h.face=d,h.barycoord=u}return h}class Wi extends Zt{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,s,0),m("z","y","x",1,-1,n,e,-t,a,s,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(h,3)),this.setAttribute("uv",new At(u,2));function m(_,g,p,y,v,x,I,A,C,R,b){const M=x/C,L=I/R,V=x/2,B=I/2,H=A/2,j=C+1,X=R+1;let it=0,W=0;const ht=new w;for(let ft=0;ft<X;ft++){const bt=ft*L-B;for(let Ht=0;Ht<j;Ht++){const te=Ht*M-V;ht[_]=te*y,ht[g]=bt*v,ht[p]=H,c.push(ht.x,ht.y,ht.z),ht[_]=0,ht[g]=0,ht[p]=A>0?1:-1,h.push(ht.x,ht.y,ht.z),u.push(Ht/C),u.push(1-ft/R),it+=1}}for(let ft=0;ft<R;ft++)for(let bt=0;bt<C;bt++){const Ht=d+bt+j*ft,te=d+bt+j*(ft+1),J=d+(bt+1)+j*(ft+1),at=d+(bt+1)+j*ft;l.push(Ht,te,at),l.push(te,J,at),W+=6}o.addGroup(f,W,b),f+=W,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ys(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(r){const t={};for(let e=0;e<r.length;e++){const n=ys(r[e]);for(const i in n)t[i]=n[i]}return t}function mm(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Ud(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const oo={clone:ys,merge:Be};var gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_m=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class on extends Oe{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gm,this.fragmentShader=_m,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=mm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class bo extends ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new w,gh=new Z,_h=new Z;class ye extends bo{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ui*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(Ui*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,gh,_h),e.subVectors(_h,gh)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ui*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ss=-90,rs=1;class Nd extends ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ye(ss,rs,t,e);i.layers=this.layers,this.add(i);const s=new ye(ss,rs,t,e);s.layers=this.layers,this.add(s);const a=new ye(ss,rs,t,e);a.layers=this.layers,this.add(a);const o=new ye(ss,rs,t,e);o.layers=this.layers,this.add(o);const l=new ye(ss,rs,t,e);l.layers=this.layers,this.add(l);const c=new ye(ss,rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class vr extends ge{constructor(t,e,n,i,s,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Wn,super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Od extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new vr(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Me}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Wi(5,5,5),s=new on({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:kn});s.uniforms.tEquirect.value=e;const a=new xe(i,s),o=e.minFilter;return e.minFilter===Sn&&(e.minFilter=Me),new Nd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const ul=new w,xm=new w,vm=new Wt;class On{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ul.subVectors(n,e).cross(xm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ul),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||vm.getNormalMatrix(t),i=this.coplanarPoint(ul).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Ae,Wr=new w;class yr{constructor(t=new On,e=new On,n=new On,i=new On,s=new On,a=new On){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn){const n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],_=i[10],g=i[11],p=i[12],y=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-s,d-c,g-f,x-p).normalize(),n[1].setComponents(l+s,d+c,g+f,x+p).normalize(),n[2].setComponents(l+a,d+h,g+m,x+y).normalize(),n[3].setComponents(l-a,d-h,g-m,x-y).normalize(),n[4].setComponents(l-o,d-u,g-_,x-v).normalize(),e===bn)n[5].setComponents(l+o,d+u,g+_,x+v).normalize();else if(e===ar)n[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Wr.x=i.normal.x>0?t.max.x:t.min.x,Wr.y=i.normal.y>0?t.max.y:t.min.y,Wr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fd(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function ym(r){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class Es extends Zt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const y=p*d-a;for(let v=0;v<c;v++){const x=v*u-s;m.push(x,-y,0),_.push(0,0,1),g.push(v/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const v=y+c*p,x=y+c*(p+1),I=y+1+c*(p+1),A=y+1+c*p;f.push(v,x,A),f.push(x,I,A)}this.setIndex(f),this.setAttribute("position",new At(m,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.width,t.height,t.widthSegments,t.heightSegments)}}var Mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Em=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Am=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Pm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Im=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Um=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,km=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Km="gl_FragColor = linearToOutputTexel( gl_FragColor );",jm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,eg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ug=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ng=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$g=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,e_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,s_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,r_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,a_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,l_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,c_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,h_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,p_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,m_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,g_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,x_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,v_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,T_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,C_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,R_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,N_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,z_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,V_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,X_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,J_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,j_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:Mm,alphahash_pars_fragment:Sm,alphamap_fragment:bm,alphamap_pars_fragment:Em,alphatest_fragment:wm,alphatest_pars_fragment:Am,aomap_fragment:Tm,aomap_pars_fragment:Cm,batching_pars_vertex:Rm,batching_vertex:Pm,begin_vertex:Im,beginnormal_vertex:Lm,bsdfs:Dm,iridescence_fragment:Um,bumpmap_pars_fragment:Nm,clipping_planes_fragment:Om,clipping_planes_pars_fragment:Fm,clipping_planes_pars_vertex:Bm,clipping_planes_vertex:zm,color_fragment:km,color_pars_fragment:Vm,color_pars_vertex:Hm,color_vertex:Gm,common:Wm,cube_uv_reflection_fragment:Xm,defaultnormal_vertex:qm,displacementmap_pars_vertex:Ym,displacementmap_vertex:Zm,emissivemap_fragment:$m,emissivemap_pars_fragment:Jm,colorspace_fragment:Km,colorspace_pars_fragment:jm,envmap_fragment:Qm,envmap_common_pars_fragment:tg,envmap_pars_fragment:eg,envmap_pars_vertex:ng,envmap_physical_pars_fragment:fg,envmap_vertex:ig,fog_vertex:sg,fog_pars_vertex:rg,fog_fragment:ag,fog_pars_fragment:og,gradientmap_pars_fragment:lg,lightmap_pars_fragment:cg,lights_lambert_fragment:hg,lights_lambert_pars_fragment:ug,lights_pars_begin:dg,lights_toon_fragment:pg,lights_toon_pars_fragment:mg,lights_phong_fragment:gg,lights_phong_pars_fragment:_g,lights_physical_fragment:xg,lights_physical_pars_fragment:vg,lights_fragment_begin:yg,lights_fragment_maps:Mg,lights_fragment_end:Sg,logdepthbuf_fragment:bg,logdepthbuf_pars_fragment:Eg,logdepthbuf_pars_vertex:wg,logdepthbuf_vertex:Ag,map_fragment:Tg,map_pars_fragment:Cg,map_particle_fragment:Rg,map_particle_pars_fragment:Pg,metalnessmap_fragment:Ig,metalnessmap_pars_fragment:Lg,morphinstance_vertex:Dg,morphcolor_vertex:Ug,morphnormal_vertex:Ng,morphtarget_pars_vertex:Og,morphtarget_vertex:Fg,normal_fragment_begin:Bg,normal_fragment_maps:zg,normal_pars_fragment:kg,normal_pars_vertex:Vg,normal_vertex:Hg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:Xg,clearcoat_pars_fragment:qg,iridescence_pars_fragment:Yg,opaque_fragment:Zg,packing:$g,premultiplied_alpha_fragment:Jg,project_vertex:Kg,dithering_fragment:jg,dithering_pars_fragment:Qg,roughnessmap_fragment:t_,roughnessmap_pars_fragment:e_,shadowmap_pars_fragment:n_,shadowmap_pars_vertex:i_,shadowmap_vertex:s_,shadowmask_pars_fragment:r_,skinbase_vertex:a_,skinning_pars_vertex:o_,skinning_vertex:l_,skinnormal_vertex:c_,specularmap_fragment:h_,specularmap_pars_fragment:u_,tonemapping_fragment:d_,tonemapping_pars_fragment:f_,transmission_fragment:p_,transmission_pars_fragment:m_,uv_pars_fragment:g_,uv_pars_vertex:__,uv_vertex:x_,worldpos_vertex:v_,background_vert:y_,background_frag:M_,backgroundCube_vert:S_,backgroundCube_frag:b_,cube_vert:E_,cube_frag:w_,depth_vert:A_,depth_frag:T_,distanceRGBA_vert:C_,distanceRGBA_frag:R_,equirect_vert:P_,equirect_frag:I_,linedashed_vert:L_,linedashed_frag:D_,meshbasic_vert:U_,meshbasic_frag:N_,meshlambert_vert:O_,meshlambert_frag:F_,meshmatcap_vert:B_,meshmatcap_frag:z_,meshnormal_vert:k_,meshnormal_frag:V_,meshphong_vert:H_,meshphong_frag:G_,meshphysical_vert:W_,meshphysical_frag:X_,meshtoon_vert:q_,meshtoon_frag:Y_,points_vert:Z_,points_frag:$_,shadow_vert:J_,shadow_frag:K_,sprite_vert:j_,sprite_frag:Q_},ut={common:{diffuse:{value:new xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new xt(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},dn={basic:{uniforms:Be([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Be([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new xt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Be([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new xt(0)},specular:{value:new xt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Be([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Be([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new xt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Be([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Be([ut.points,ut.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Be([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Be([ut.common,ut.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Be([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Be([ut.sprite,ut.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Be([ut.common,ut.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Be([ut.lights,ut.fog,{color:{value:new xt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};dn.physical={uniforms:Be([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new xt(0)},specularColor:{value:new xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Xr={r:0,b:0,g:0},pi=new nn,t0=new zt;function e0(r,t,e,n,i,s,a){const o=new xt(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const x=m(y);x===null?p(o,l):x&&x.isColor&&(p(x,1),v=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(y,v){const x=m(v);x&&(x.isCubeTexture||x.mapping===Ss)?(h===void 0&&(h=new xe(new Wi(1,1,1),new on({name:"BackgroundCubeMaterial",uniforms:ys(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(v.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(t0.makeRotationFromEuler(pi)),h.material.toneMapped=Qt.getTransfer(x.colorSpace)!==oe,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new xe(new Es(2,2),new on({name:"BackgroundMaterial",uniforms:ys(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(Xr,Ud(r)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:_,addToRenderList:g}}function n0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(M,L,V,B,H){let j=!1;const X=u(B,V,L);s!==X&&(s=X,c(s.object)),j=f(M,B,V,H),j&&m(M,B,V,H),H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,x(M,L,V,B),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,L,V){const B=V.wireframe===!0;let H=n[M.id];H===void 0&&(H={},n[M.id]=H);let j=H[L.id];j===void 0&&(j={},H[L.id]=j);let X=j[B];return X===void 0&&(X=d(l()),j[B]=X),X}function d(M){const L=[],V=[],B=[];for(let H=0;H<e;H++)L[H]=0,V[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,L,V,B){const H=s.attributes,j=L.attributes;let X=0;const it=V.getAttributes();for(const W in it)if(it[W].location>=0){const ft=H[W];let bt=j[W];if(bt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(bt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(bt=M.instanceColor)),ft===void 0||ft.attribute!==bt||bt&&ft.data!==bt.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function m(M,L,V,B){const H={},j=L.attributes;let X=0;const it=V.getAttributes();for(const W in it)if(it[W].location>=0){let ft=j[W];ft===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));const bt={};bt.attribute=ft,ft&&ft.data&&(bt.data=ft.data),H[W]=bt,X++}s.attributes=H,s.attributesNum=X,s.index=B}function _(){const M=s.newAttributes;for(let L=0,V=M.length;L<V;L++)M[L]=0}function g(M){p(M,0)}function p(M,L){const V=s.newAttributes,B=s.enabledAttributes,H=s.attributeDivisors;V[M]=1,B[M]===0&&(r.enableVertexAttribArray(M),B[M]=1),H[M]!==L&&(r.vertexAttribDivisor(M,L),H[M]=L)}function y(){const M=s.newAttributes,L=s.enabledAttributes;for(let V=0,B=L.length;V<B;V++)L[V]!==M[V]&&(r.disableVertexAttribArray(V),L[V]=0)}function v(M,L,V,B,H,j,X){X===!0?r.vertexAttribIPointer(M,L,V,H,j):r.vertexAttribPointer(M,L,V,B,H,j)}function x(M,L,V,B){_();const H=B.attributes,j=V.getAttributes(),X=L.defaultAttributeValues;for(const it in j){const W=j[it];if(W.location>=0){let ht=H[it];if(ht===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ht!==void 0){const ft=ht.normalized,bt=ht.itemSize,Ht=t.get(ht);if(Ht===void 0)continue;const te=Ht.buffer,J=Ht.type,at=Ht.bytesPerElement,wt=J===r.INT||J===r.UNSIGNED_INT||ht.gpuType===po;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Dt=lt.stride,Vt=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let Bt=0;Bt<W.locationSize;Bt++)p(W.location+Bt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Bt=0;Bt<W.locationSize;Bt++)g(W.location+Bt);r.bindBuffer(r.ARRAY_BUFFER,te);for(let Bt=0;Bt<W.locationSize;Bt++)v(W.location+Bt,bt/W.locationSize,J,ft,Dt*at,(Vt+bt/W.locationSize*Bt)*at,wt)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<W.locationSize;lt++)p(W.location+lt,ht.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<W.locationSize;lt++)g(W.location+lt);r.bindBuffer(r.ARRAY_BUFFER,te);for(let lt=0;lt<W.locationSize;lt++)v(W.location+lt,bt/W.locationSize,J,ft,bt*at,bt/W.locationSize*lt*at,wt)}}else if(X!==void 0){const ft=X[it];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(W.location,ft);break;case 3:r.vertexAttrib3fv(W.location,ft);break;case 4:r.vertexAttrib4fv(W.location,ft);break;default:r.vertexAttrib1fv(W.location,ft)}}}}y()}function I(){R();for(const M in n){const L=n[M];for(const V in L){const B=L[V];for(const H in B)h(B[H].object),delete B[H];delete L[V]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const V in L){const B=L[V];for(const H in B)h(B[H].object),delete B[H];delete L[V]}delete n[M.id]}function C(M){for(const L in n){const V=n[L];if(V[M.id]===void 0)continue;const B=V[M.id];for(const H in B)h(B[H].object),delete B[H];delete V[M.id]}}function R(){b(),a=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function i0(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];e.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function s0(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==ke&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const R=C===bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==$e&&!R)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:I,maxSamples:A}}function r0(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new On,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{const y=s?0:n,v=y*4;let x=p.clippingState||null;l.value=x,x=h(m,d,v,f);for(let I=0;I!==v;++I)x[I]=e[I];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)a.copy(u[v]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function a0(r){let t=new WeakMap;function e(a,o){return o===Qs?a.mapping=Wn:o===tr&&(a.mapping=ii),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Qs||o===tr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Od(l.height);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ni extends bo{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ps=4,xh=[.125,.215,.35,.446,.526,.582],Ti=20,dl=new Ni,vh=new xt;let fl=null,pl=0,ml=0,gl=!1;const Ai=(1+Math.sqrt(5))/2,as=1/Ai,yh=[new w(-Ai,as,0),new w(Ai,as,0),new w(-as,0,Ai),new w(as,0,Ai),new w(0,Ai,-as),new w(0,Ai,as),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wn||t.mapping===ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Me,minFilter:Me,generateMipmaps:!1,type:bs,format:ke,colorSpace:Hi,depthBuffer:!1},i=Mh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mh(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(s)),this._blurMaterial=l0(s,t,e)}return i}_compileMaterial(t){const e=new xe(this._lodPlanes[0],t);this._renderer.compile(e,dl)}_sceneToCubeUV(t,e,n,i){const o=new ye(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(vh),h.toneMapping=Vn,h.autoClear=!1;const f=new ai({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),m=new xe(new Wi,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(vh),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const v=this._cubeSize;qr(i,y*v,p>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Wn||t.mapping===ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new xe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;qr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,dl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=yh[(i-s-1)%yh.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new xe(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ti-1),_=s/m,g=isFinite(s)?1+Math.floor(h*_):Ti;g>Ti&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ti}`);const p=[];let y=0;for(let C=0;C<Ti;++C){const R=C/_,b=Math.exp(-R*R/2);p.push(b),C===0?y+=b:C<g&&(y+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;const x=this._sizeLods[i],I=3*x*(i>v-ps?i-v+ps:0),A=4*(this._cubeSize-x);qr(e,I,A,3*x,2*x),l.setRenderTarget(e),l.render(u,dl)}}function o0(r){const t=[],e=[],n=[];let i=r;const s=r-ps+1+xh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-ps?l=xh[a-r+ps-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),v=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,R=A>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];y.set(b,_*m*A),v.set(d,g*m*A);const M=[A,A,A,A,A,A];x.set(M,p*m*A)}const I=new Zt;I.setAttribute("position",new le(y,_)),I.setAttribute("uv",new le(v,g)),I.setAttribute("faceIndex",new le(x,p)),t.push(I),i>ps&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Mh(r,t,e){const n=new fn(r,t,e);return n.texture.mapping=Ss,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function l0(r,t,e){const n=new Float32Array(Ti),i=new w(0,1,0);return new on({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Sh(){return new on({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function bh(){return new on({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function c0(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Qs||l===tr,h=l===Wn||l===ii;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Wl(r)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Wl(r)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function h0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Vs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function u0(r,t,e,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)t.update(d[m],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){const I=y[v+0],A=y[v+1],C=y[v+2];d.push(I,A,A,C,C,I)}}else if(m!==void 0){const y=m.array;_=m.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const I=v+0,A=v+1,C=v+2;d.push(I,A,A,C,C,I)}}else return;const g=new(Rd(d)?gc:mc)(d,1);g.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function d0(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),e.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function f0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function p0(r,t,e){const n=new WeakMap,i=new Jt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let x=o.attributes.position.count*v,I=1;x>t.maxTextureSize&&(I=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const A=new Float32Array(x*I*4*u),C=new Mo(A,x,I,u);C.type=$e,C.needsUpdate=!0;const R=v*4;for(let M=0;M<u;M++){const L=g[M],V=p[M],B=y[M],H=x*I*4*M;for(let j=0;j<L.count;j++){const X=j*R;f===!0&&(i.fromBufferAttribute(L,j),A[H+X+0]=i.x,A[H+X+1]=i.y,A[H+X+2]=i.z,A[H+X+3]=0),m===!0&&(i.fromBufferAttribute(V,j),A[H+X+4]=i.x,A[H+X+5]=i.y,A[H+X+6]=i.z,A[H+X+7]=0),_===!0&&(i.fromBufferAttribute(B,j),A[H+X+8]=i.x,A[H+X+9]=i.y,A[H+X+10]=i.z,A[H+X+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new Z(x,I)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function m0(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class xc extends ge{constructor(t,e,n,i,s,a,o,l,c,h=Di){if(h!==Di&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Di&&(n=Xn),n===void 0&&h===ki&&(n=zi),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ie,this.minFilter=l!==void 0?l:Ie,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Bd=new ge,Eh=new xc(1,1),zd=new Mo,kd=new pc,Vd=new vr,wh=[],Ah=[],Th=new Float32Array(16),Ch=new Float32Array(9),Rh=new Float32Array(4);function ws(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=wh[i];if(s===void 0&&(s=new Float32Array(i),wh[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Se(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function be(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Eo(r,t){let e=Ah[t];e===void 0&&(e=new Int32Array(t),Ah[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function g0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function _0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;r.uniform2fv(this.addr,t),be(e,t)}}function x0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;r.uniform3fv(this.addr,t),be(e,t)}}function v0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;r.uniform4fv(this.addr,t),be(e,t)}}function y0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Rh.set(n),r.uniformMatrix2fv(this.addr,!1,Rh),be(e,n)}}function M0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Ch.set(n),r.uniformMatrix3fv(this.addr,!1,Ch),be(e,n)}}function S0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Th.set(n),r.uniformMatrix4fv(this.addr,!1,Th),be(e,n)}}function b0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function E0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;r.uniform2iv(this.addr,t),be(e,t)}}function w0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;r.uniform3iv(this.addr,t),be(e,t)}}function A0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;r.uniform4iv(this.addr,t),be(e,t)}}function T0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function C0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;r.uniform2uiv(this.addr,t),be(e,t)}}function R0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;r.uniform3uiv(this.addr,t),be(e,t)}}function P0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;r.uniform4uiv(this.addr,t),be(e,t)}}function I0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Eh.compareFunction=dc,s=Eh):s=Bd,e.setTexture2D(t||s,i)}function L0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||kd,i)}function D0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Vd,i)}function U0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||zd,i)}function N0(r){switch(r){case 5126:return g0;case 35664:return _0;case 35665:return x0;case 35666:return v0;case 35674:return y0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return w0;case 35669:case 35673:return A0;case 5125:return T0;case 36294:return C0;case 36295:return R0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}function O0(r,t){r.uniform1fv(this.addr,t)}function F0(r,t){const e=ws(t,this.size,2);r.uniform2fv(this.addr,e)}function B0(r,t){const e=ws(t,this.size,3);r.uniform3fv(this.addr,e)}function z0(r,t){const e=ws(t,this.size,4);r.uniform4fv(this.addr,e)}function k0(r,t){const e=ws(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function V0(r,t){const e=ws(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function H0(r,t){const e=ws(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function G0(r,t){r.uniform1iv(this.addr,t)}function W0(r,t){r.uniform2iv(this.addr,t)}function X0(r,t){r.uniform3iv(this.addr,t)}function q0(r,t){r.uniform4iv(this.addr,t)}function Y0(r,t){r.uniform1uiv(this.addr,t)}function Z0(r,t){r.uniform2uiv(this.addr,t)}function $0(r,t){r.uniform3uiv(this.addr,t)}function J0(r,t){r.uniform4uiv(this.addr,t)}function K0(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Se(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Bd,s[a])}function j0(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Se(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||kd,s[a])}function Q0(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Se(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Vd,s[a])}function tx(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Se(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||zd,s[a])}function ex(r){switch(r){case 5126:return O0;case 35664:return F0;case 35665:return B0;case 35666:return z0;case 35674:return k0;case 35675:return V0;case 35676:return H0;case 5124:case 35670:return G0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return Z0;case 36295:return $0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return j0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return tx}}class nx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=N0(e.type)}}class ix{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ex(e.type)}}class sx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const _l=/(\w+)(\])?(\[|\.)?/g;function Ph(r,t){r.seq.push(t),r.map[t.id]=t}function rx(r,t,e){const n=r.name,i=n.length;for(_l.lastIndex=0;;){const s=_l.exec(n),a=_l.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ph(e,c===void 0?new nx(o,r,t):new ix(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new sx(o),Ph(e,u)),e=u}}}class Ea{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);rx(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ih(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const ax=37297;let ox=0;function lx(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Lh=new Wt;function cx(r){Qt._getMatrix(Lh,Qt.workingColorSpace,r);const t=`mat3( ${Lh.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(r)){case xr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Dh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+lx(r.getShaderSource(t),a)}else return i}function hx(r,t){const e=cx(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ux(r,t){let e;switch(t){case od:e="Linear";break;case ld:e="Reinhard";break;case cd:e="Cineon";break;case hd:e="ACESFilmic";break;case dd:e="AgX";break;case fd:e="Neutral";break;case ud:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Yr=new w;function dx(){Qt.getLuminanceCoefficients(Yr);const r=Yr.x.toFixed(4),t=Yr.y.toFixed(4),e=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function px(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function mx(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function Gs(r){return r!==""}function Uh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xl(r){return r.replace(gx,xx)}const _x=new Map;function xx(r,t){let e=Yt[t];if(e===void 0){const n=_x.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xl(e)}const vx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oh(r){return r.replace(vx,yx)}function yx(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Fh(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Mx(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===tc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===ku?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===vn&&(t="SHADOWMAP_TYPE_VSM"),t}function Sx(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Wn:case ii:t="ENVMAP_TYPE_CUBE";break;case Ss:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bx(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ii:t="ENVMAP_MODE_REFRACTION";break}return t}function Ex(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case gr:t="ENVMAP_BLENDING_MULTIPLY";break;case rd:t="ENVMAP_BLENDING_MIX";break;case ad:t="ENVMAP_BLENDING_ADD";break}return t}function wx(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Ax(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Mx(e),c=Sx(e),h=bx(e),u=Ex(e),d=wx(e),f=fx(e),m=px(s),_=i.createProgram();let g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Gs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Gs).join(`
`),p.length>0&&(p+=`
`)):(g=[Fh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),p=[Fh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?ux("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,hx("linearToOutputTexel",e.outputColorSpace),dx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),a=Xl(a),a=Uh(a,e),a=Nh(a,e),o=Xl(o),o=Uh(o,e),o=Nh(o,e),a=Oh(a),o=Oh(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+g+a,x=y+p+o,I=Ih(i,i.VERTEX_SHADER,v),A=Ih(i,i.FRAGMENT_SHADER,x);i.attachShader(_,I),i.attachShader(_,A),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(L){if(r.debug.checkShaderErrors){const V=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(I).trim(),H=i.getShaderInfoLog(A).trim();let j=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,I,A);else{const it=Dh(i,I,"vertex"),W=Dh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+it+`
`+W)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||H==="")&&(X=!1);X&&(L.diagnostics={runnable:j,programLog:V,vertexShader:{log:B,prefix:g},fragmentShader:{log:H,prefix:p}})}i.deleteShader(I),i.deleteShader(A),R=new Ea(i,_),b=mx(i,_)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,ax)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ox++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=A,this}let Tx=0;class Cx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Rx(t),e.set(t,n)),n}}class Rx{constructor(t){this.id=Tx++,this.code=t,this.usedTimes=0}}function Px(r,t,e,n,i,s,a){const o=new So,l=new Cx,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,L,V,B){const H=V.fog,j=B.geometry,X=b.isMeshStandardMaterial?V.environment:null,it=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),W=it&&it.mapping===Ss?it.image.height:null,ht=m[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ft=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,bt=ft!==void 0?ft.length:0;let Ht=0;j.morphAttributes.position!==void 0&&(Ht=1),j.morphAttributes.normal!==void 0&&(Ht=2),j.morphAttributes.color!==void 0&&(Ht=3);let te,J,at,wt;if(ht){const jt=dn[ht];te=jt.vertexShader,J=jt.fragmentShader}else te=b.vertexShader,J=b.fragmentShader,l.update(b),at=l.getVertexShaderID(b),wt=l.getFragmentShaderID(b);const lt=r.getRenderTarget(),Dt=r.state.buffers.depth.getReversed(),Vt=B.isInstancedMesh===!0,Bt=B.isBatchedMesh===!0,Kt=!!b.map,Q=!!b.matcap,rt=!!it,P=!!b.aoMap,Ct=!!b.lightMap,et=!!b.bumpMap,vt=!!b.normalMap,ct=!!b.displacementMap,Nt=!!b.emissiveMap,yt=!!b.metalnessMap,T=!!b.roughnessMap,S=b.anisotropy>0,F=b.clearcoat>0,q=b.dispersion>0,tt=b.iridescence>0,$=b.sheen>0,Tt=b.transmission>0,dt=S&&!!b.anisotropyMap,Mt=F&&!!b.clearcoatMap,$t=F&&!!b.clearcoatNormalMap,nt=F&&!!b.clearcoatRoughnessMap,Et=tt&&!!b.iridescenceMap,Ft=tt&&!!b.iridescenceThicknessMap,kt=$&&!!b.sheenColorMap,St=$&&!!b.sheenRoughnessMap,U=!!b.specularMap,Y=!!b.specularColorMap,pt=!!b.specularIntensityMap,D=Tt&&!!b.transmissionMap,st=Tt&&!!b.thicknessMap,G=!!b.gradientMap,K=!!b.alphaMap,gt=b.alphaTest>0,mt=!!b.alphaHash,Ot=!!b.extensions;let ie=Vn;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(ie=r.toneMapping);const fe={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:te,fragmentShader:J,defines:b.defines,customVertexShaderID:at,customFragmentShaderID:wt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&B._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&B.instanceColor!==null,instancingMorph:Vt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?r.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Hi,alphaToCoverage:!!b.alphaToCoverage,map:Kt,matcap:Q,envMap:rt,envMapMode:rt&&it.mapping,envMapCubeUVHeight:W,aoMap:P,lightMap:Ct,bumpMap:et,normalMap:vt,displacementMap:d&&ct,emissiveMap:Nt,normalMapObjectSpace:vt&&b.normalMapType===yd,normalMapTangentSpace:vt&&b.normalMapType===ri,metalnessMap:yt,roughnessMap:T,anisotropy:S,anisotropyMap:dt,clearcoat:F,clearcoatMap:Mt,clearcoatNormalMap:$t,clearcoatRoughnessMap:nt,dispersion:q,iridescence:tt,iridescenceMap:Et,iridescenceThicknessMap:Ft,sheen:$,sheenColorMap:kt,sheenRoughnessMap:St,specularMap:U,specularColorMap:Y,specularIntensityMap:pt,transmission:Tt,transmissionMap:D,thicknessMap:st,gradientMap:G,opaque:b.transparent===!1&&b.blending===Li&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:gt,alphaHash:mt,combine:b.combine,mapUv:Kt&&_(b.map.channel),aoMapUv:P&&_(b.aoMap.channel),lightMapUv:Ct&&_(b.lightMap.channel),bumpMapUv:et&&_(b.bumpMap.channel),normalMapUv:vt&&_(b.normalMap.channel),displacementMapUv:ct&&_(b.displacementMap.channel),emissiveMapUv:Nt&&_(b.emissiveMap.channel),metalnessMapUv:yt&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:dt&&_(b.anisotropyMap.channel),clearcoatMapUv:Mt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(b.sheenRoughnessMap.channel),specularMapUv:U&&_(b.specularMap.channel),specularColorMapUv:Y&&_(b.specularColorMap.channel),specularIntensityMapUv:pt&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:st&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(vt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(Kt||K),fog:!!H,useFog:b.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:ie,decodeVideoTexture:Kt&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===oe,decodeVideoTextureEmissive:Nt&&b.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(b.emissiveMap.colorSpace)===oe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===yn,flipSided:b.side===Ve,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ot&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&b.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return fe.vertexUv1s=c.has(1),fe.vertexUv2s=c.has(2),fe.vertexUv3s=c.has(3),c.clear(),fe}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(y(M,b),v(M,b),M.push(r.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=m[b.type];let L;if(M){const V=dn[M];L=oo.clone(V.uniforms)}else L=b.uniforms;return L}function I(b,M){let L;for(let V=0,B=h.length;V<B;V++){const H=h[V];if(H.cacheKey===M){L=H,++L.usedTimes;break}}return L===void 0&&(L=new Ax(r,M,b,s),h.push(L)),L}function A(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:I,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:R}}function Ix(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Lx(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Bh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function zh(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,m,_,g){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function o(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Lx),n.length>1&&n.sort(d||Bh),i.length>1&&i.sort(d||Bh)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Dx(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new zh,r.set(n,[a])):i>=s.length?(a=new zh,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function Ux(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new xt};break;case"SpotLight":e={position:new w,direction:new w,color:new xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new xt,groundColor:new xt};break;case"RectAreaLight":e={color:new xt,position:new w,halfWidth:new w,halfHeight:new w};break}return r[t.id]=e,e}}}function Nx(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Ox=0;function Fx(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Bx(r){const t=new Ux,e=Nx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);const i=new w,s=new zt,a=new zt;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,v=0,x=0,I=0,A=0,C=0;c.sort(Fx);for(let b=0,M=c.length;b<M;b++){const L=c[b],V=L.color,B=L.intensity,H=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=V.r*B,u+=V.g*B,d+=V.b*B;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],B);C++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const it=L.shadow,W=e.get(L);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=j,n.directionalShadowMatrix[f]=L.shadow.matrix,y++}n.directional[f]=X,f++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(V).multiplyScalar(B),X.distance=H,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[_]=X;const it=L.shadow;if(L.map&&(n.spotLightMap[I]=L.map,I++,it.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=it.matrix,L.castShadow){const W=e.get(L);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=j,x++}_++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(V).multiplyScalar(B),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=X,g++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const it=L.shadow,W=e.get(L);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,W.shadowCameraNear=it.camera.near,W.shadowCameraFar=it.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=j,n.pointShadowMatrix[m]=L.shadow.matrix,v++}n.point[m]=X,m++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(B),X.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==I||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+I-A,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,R.directionalLength=f,R.pointLength=m,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=I,R.numLightProbes=C,n.version=Ox++)}function l(c,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const v=c[p];if(v.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(v.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(v.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function kh(r){const t=new Bx(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function zx(r){let t=new WeakMap;function e(i,s=0){const a=t.get(i);let o;return a===void 0?(o=new kh(r),t.set(i,[o])):s>=a.length?(o=new kh(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class vc extends Oe{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class yc extends Oe{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hx(r,t,e){let n=new yr;const i=new Z,s=new Z,a=new Jt,o=new vc({depthPacking:vd}),l=new yc,c={},h=e.maxTextureSize,u={[Gn]:Ve,[Ve]:Gn,[yn]:yn},d=new on({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:kx,fragmentShader:Vx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Zt;m.setAttribute("position",new le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xe(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tc;let p=this.type;this.render=function(A,C,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=r.getRenderTarget(),M=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),V=r.state;V.setBlending(kn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=p!==vn&&this.type===vn,H=p===vn&&this.type!==vn;for(let j=0,X=A.length;j<X;j++){const it=A[j],W=it.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ht=W.getFrameExtents();if(i.multiply(ht),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ht.x),i.x=s.x*ht.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ht.y),i.y=s.y*ht.y,W.mapSize.y=s.y)),W.map===null||B===!0||H===!0){const bt=this.type!==vn?{minFilter:Ie,magFilter:Ie}:{};W.map!==null&&W.map.dispose(),W.map=new fn(i.x,i.y,bt),W.map.texture.name=it.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const ft=W.getViewportCount();for(let bt=0;bt<ft;bt++){const Ht=W.getViewport(bt);a.set(s.x*Ht.x,s.y*Ht.y,s.x*Ht.z,s.y*Ht.w),V.viewport(a),W.updateMatrices(it,bt),n=W.getFrustum(),x(C,R,W.camera,it,this.type)}W.isPointLightShadow!==!0&&this.type===vn&&y(W,R),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(b,M,L)};function y(A,C){const R=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(C,null,R,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(C,null,R,f,_,null)}function v(A,C,R,b){let M=null;const L=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)M=L;else if(M=R.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const V=M.uuid,B=C.uuid;let H=c[V];H===void 0&&(H={},c[V]=H);let j=H[B];j===void 0&&(j=M.clone(),H[B]=j,C.addEventListener("dispose",I)),M=j}if(M.visible=C.visible,M.wireframe=C.wireframe,b===vn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=r.properties.get(M);V.light=R}return M}function x(A,C,R,b,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===vn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const B=t.update(A),H=A.material;if(Array.isArray(H)){const j=B.groups;for(let X=0,it=j.length;X<it;X++){const W=j[X],ht=H[W.materialIndex];if(ht&&ht.visible){const ft=v(A,ht,b,M);A.onBeforeShadow(r,A,C,R,B,ft,W),r.renderBufferDirect(R,null,B,ft,A,W),A.onAfterShadow(r,A,C,R,B,ft,W)}}}else if(H.visible){const j=v(A,H,b,M);A.onBeforeShadow(r,A,C,R,B,j,null),r.renderBufferDirect(R,null,B,j,A,null),A.onAfterShadow(r,A,C,R,B,j,null)}}const V=A.children;for(let B=0,H=V.length;B<H;B++)x(V[B],C,R,b,M)}function I(A){A.target.removeEventListener("dispose",I);for(const R in c){const b=c[R],M=A.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const Gx={[Ta]:Ca,[Ra]:La,[Pa]:Da,[Bi]:Ia,[Ca]:Ta,[La]:Ra,[Da]:Pa,[Ia]:Bi};function Wx(r,t){function e(){let D=!1;const st=new Jt;let G=null;const K=new Jt(0,0,0,0);return{setMask:function(gt){G!==gt&&!D&&(r.colorMask(gt,gt,gt,gt),G=gt)},setLocked:function(gt){D=gt},setClear:function(gt,mt,Ot,ie,fe){fe===!0&&(gt*=ie,mt*=ie,Ot*=ie),st.set(gt,mt,Ot,ie),K.equals(st)===!1&&(r.clearColor(gt,mt,Ot,ie),K.copy(st))},reset:function(){D=!1,G=null,K.set(-1,0,0,0)}}}function n(){let D=!1,st=!1,G=null,K=null,gt=null;return{setReversed:function(mt){if(st!==mt){const Ot=t.get("EXT_clip_control");st?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT);const ie=gt;gt=null,this.setClear(ie)}st=mt},getReversed:function(){return st},setTest:function(mt){mt?lt(r.DEPTH_TEST):Dt(r.DEPTH_TEST)},setMask:function(mt){G!==mt&&!D&&(r.depthMask(mt),G=mt)},setFunc:function(mt){if(st&&(mt=Gx[mt]),K!==mt){switch(mt){case Ta:r.depthFunc(r.NEVER);break;case Ca:r.depthFunc(r.ALWAYS);break;case Ra:r.depthFunc(r.LESS);break;case Bi:r.depthFunc(r.LEQUAL);break;case Pa:r.depthFunc(r.EQUAL);break;case Ia:r.depthFunc(r.GEQUAL);break;case La:r.depthFunc(r.GREATER);break;case Da:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=mt}},setLocked:function(mt){D=mt},setClear:function(mt){gt!==mt&&(st&&(mt=1-mt),r.clearDepth(mt),gt=mt)},reset:function(){D=!1,G=null,K=null,gt=null,st=!1}}}function i(){let D=!1,st=null,G=null,K=null,gt=null,mt=null,Ot=null,ie=null,fe=null;return{setTest:function(jt){D||(jt?lt(r.STENCIL_TEST):Dt(r.STENCIL_TEST))},setMask:function(jt){st!==jt&&!D&&(r.stencilMask(jt),st=jt)},setFunc:function(jt,Te,Ge){(G!==jt||K!==Te||gt!==Ge)&&(r.stencilFunc(jt,Te,Ge),G=jt,K=Te,gt=Ge)},setOp:function(jt,Te,Ge){(mt!==jt||Ot!==Te||ie!==Ge)&&(r.stencilOp(jt,Te,Ge),mt=jt,Ot=Te,ie=Ge)},setLocked:function(jt){D=jt},setClear:function(jt){fe!==jt&&(r.clearStencil(jt),fe=jt)},reset:function(){D=!1,st=null,G=null,K=null,gt=null,mt=null,Ot=null,ie=null,fe=null}}}const s=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,I=null,A=null,C=new xt(0,0,0),R=0,b=!1,M=null,L=null,V=null,B=null,H=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,it=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=it>=2);let ht=null,ft={};const bt=r.getParameter(r.SCISSOR_BOX),Ht=r.getParameter(r.VIEWPORT),te=new Jt().fromArray(bt),J=new Jt().fromArray(Ht);function at(D,st,G,K){const gt=new Uint8Array(4),mt=r.createTexture();r.bindTexture(D,mt),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ot=0;Ot<G;Ot++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(st,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,gt):r.texImage2D(st+Ot,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,gt);return mt}const wt={};wt[r.TEXTURE_2D]=at(r.TEXTURE_2D,r.TEXTURE_2D,1),wt[r.TEXTURE_CUBE_MAP]=at(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[r.TEXTURE_2D_ARRAY]=at(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),wt[r.TEXTURE_3D]=at(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(r.DEPTH_TEST),a.setFunc(Bi),et(!1),vt(Fl),lt(r.CULL_FACE),P(kn);function lt(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Dt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Vt(D,st){return u[D]!==st?(r.bindFramebuffer(D,st),u[D]=st,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=st),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=st),!0):!1}function Bt(D,st){let G=f,K=!1;if(D){G=d.get(st),G===void 0&&(G=[],d.set(st,G));const gt=D.textures;if(G.length!==gt.length||G[0]!==r.COLOR_ATTACHMENT0){for(let mt=0,Ot=gt.length;mt<Ot;mt++)G[mt]=r.COLOR_ATTACHMENT0+mt;G.length=gt.length,K=!0}}else G[0]!==r.BACK&&(G[0]=r.BACK,K=!0);K&&r.drawBuffers(G)}function Kt(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const Q={[ni]:r.FUNC_ADD,[Hu]:r.FUNC_SUBTRACT,[Gu]:r.FUNC_REVERSE_SUBTRACT};Q[Wu]=r.MIN,Q[Xu]=r.MAX;const rt={[qu]:r.ZERO,[Yu]:r.ONE,[Zu]:r.SRC_COLOR,[wa]:r.SRC_ALPHA,[td]:r.SRC_ALPHA_SATURATE,[ju]:r.DST_COLOR,[Ju]:r.DST_ALPHA,[$u]:r.ONE_MINUS_SRC_COLOR,[Aa]:r.ONE_MINUS_SRC_ALPHA,[Qu]:r.ONE_MINUS_DST_COLOR,[Ku]:r.ONE_MINUS_DST_ALPHA,[ed]:r.CONSTANT_COLOR,[nd]:r.ONE_MINUS_CONSTANT_COLOR,[id]:r.CONSTANT_ALPHA,[sd]:r.ONE_MINUS_CONSTANT_ALPHA};function P(D,st,G,K,gt,mt,Ot,ie,fe,jt){if(D===kn){_===!0&&(Dt(r.BLEND),_=!1);return}if(_===!1&&(lt(r.BLEND),_=!0),D!==Vu){if(D!==g||jt!==b){if((p!==ni||x!==ni)&&(r.blendEquation(r.FUNC_ADD),p=ni,x=ni),jt)switch(D){case Li:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bl:r.blendFunc(r.ONE,r.ONE);break;case zl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case kl:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Li:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bl:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case zl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case kl:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,v=null,I=null,A=null,C.set(0,0,0),R=0,g=D,b=jt}return}gt=gt||st,mt=mt||G,Ot=Ot||K,(st!==p||gt!==x)&&(r.blendEquationSeparate(Q[st],Q[gt]),p=st,x=gt),(G!==y||K!==v||mt!==I||Ot!==A)&&(r.blendFuncSeparate(rt[G],rt[K],rt[mt],rt[Ot]),y=G,v=K,I=mt,A=Ot),(ie.equals(C)===!1||fe!==R)&&(r.blendColor(ie.r,ie.g,ie.b,fe),C.copy(ie),R=fe),g=D,b=!1}function Ct(D,st){D.side===yn?Dt(r.CULL_FACE):lt(r.CULL_FACE);let G=D.side===Ve;st&&(G=!G),et(G),D.blending===Li&&D.transparent===!1?P(kn):P(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;o.setTest(K),K&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?lt(r.SAMPLE_ALPHA_TO_COVERAGE):Dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function vt(D){D!==Bu?(lt(r.CULL_FACE),D!==L&&(D===Fl?r.cullFace(r.BACK):D===zu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Dt(r.CULL_FACE),L=D}function ct(D){D!==V&&(X&&r.lineWidth(D),V=D)}function Nt(D,st,G){D?(lt(r.POLYGON_OFFSET_FILL),(B!==st||H!==G)&&(r.polygonOffset(st,G),B=st,H=G)):Dt(r.POLYGON_OFFSET_FILL)}function yt(D){D?lt(r.SCISSOR_TEST):Dt(r.SCISSOR_TEST)}function T(D){D===void 0&&(D=r.TEXTURE0+j-1),ht!==D&&(r.activeTexture(D),ht=D)}function S(D,st,G){G===void 0&&(ht===null?G=r.TEXTURE0+j-1:G=ht);let K=ft[G];K===void 0&&(K={type:void 0,texture:void 0},ft[G]=K),(K.type!==D||K.texture!==st)&&(ht!==G&&(r.activeTexture(G),ht=G),r.bindTexture(D,st||wt[D]),K.type=D,K.texture=st)}function F(){const D=ft[ht];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $t(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function kt(D){te.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),te.copy(D))}function St(D){J.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),J.copy(D))}function U(D,st){let G=c.get(st);G===void 0&&(G=new WeakMap,c.set(st,G));let K=G.get(D);K===void 0&&(K=r.getUniformBlockIndex(st,D.name),G.set(D,K))}function Y(D,st){const K=c.get(st).get(D);l.get(st)!==K&&(r.uniformBlockBinding(st,K,D.__bindingPointIndex),l.set(st,K))}function pt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ht=null,ft={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,I=null,A=null,C=new xt(0,0,0),R=0,b=!1,M=null,L=null,V=null,B=null,H=null,te.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:lt,disable:Dt,bindFramebuffer:Vt,drawBuffers:Bt,useProgram:Kt,setBlending:P,setMaterial:Ct,setFlipSided:et,setCullFace:vt,setLineWidth:ct,setPolygonOffset:Nt,setScissorTest:yt,activeTexture:T,bindTexture:S,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:tt,texImage2D:Et,texImage3D:Ft,updateUBOMapping:U,uniformBlockBinding:Y,texStorage2D:$t,texStorage3D:nt,texSubImage2D:$,texSubImage3D:Tt,compressedTexSubImage2D:dt,compressedTexSubImage3D:Mt,scissor:kt,viewport:St,reset:pt}}function Xx(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function qx(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function Yx(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function ql(r,t,e,n){const i=Zx(n);switch(e){case rc:return r*t;case oc:return r*t;case lc:return r*t*2;case _o:return r*t/i.components*i.byteLength;case _r:return r*t/i.components*i.byteLength;case cc:return r*t*2/i.components*i.byteLength;case xo:return r*t*2/i.components*i.byteLength;case ac:return r*t*3/i.components*i.byteLength;case ke:return r*t*4/i.components*i.byteLength;case vo:return r*t*4/i.components*i.byteLength;case Xs:case qs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ys:case Zs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Na:case Fa:return Math.max(r,16)*Math.max(t,8)/4;case Ua:case Oa:return Math.max(r,8)*Math.max(t,8)/2;case Ba:case za:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ka:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case qa:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Za:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ja:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Qa:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case to:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case $s:case eo:case no:return Math.ceil(r/4)*Math.ceil(t/4)*16;case hc:case io:return Math.ceil(r/4)*Math.ceil(t/4)*8;case so:case ro:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zx(r){switch(r){case An:case nc:return{byteLength:1,components:1};case xs:case ic:case bs:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case Xn:case po:case $e:return{byteLength:4,components:1};case sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}const $x={contain:Xx,cover:qx,fill:Yx,getByteLength:ql};function Jx(r,t,e,n,i,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Z,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,S){return f?new OffscreenCanvas(T,S):or("canvas")}function _(T,S,F){let q=1;const tt=yt(T);if((tt.width>F||tt.height>F)&&(q=F/Math.max(tt.width,tt.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(q*tt.width),Tt=Math.floor(q*tt.height);u===void 0&&(u=m($,Tt));const dt=S?m($,Tt):u;return dt.width=$,dt.height=Tt,dt.getContext("2d").drawImage(T,0,0,$,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+$+"x"+Tt+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){r.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?r.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(T,S,F,q,tt=!1){if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=S;if(S===r.RED&&(F===r.FLOAT&&($=r.R32F),F===r.HALF_FLOAT&&($=r.R16F),F===r.UNSIGNED_BYTE&&($=r.R8)),S===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&($=r.R8UI),F===r.UNSIGNED_SHORT&&($=r.R16UI),F===r.UNSIGNED_INT&&($=r.R32UI),F===r.BYTE&&($=r.R8I),F===r.SHORT&&($=r.R16I),F===r.INT&&($=r.R32I)),S===r.RG&&(F===r.FLOAT&&($=r.RG32F),F===r.HALF_FLOAT&&($=r.RG16F),F===r.UNSIGNED_BYTE&&($=r.RG8)),S===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&($=r.RG8UI),F===r.UNSIGNED_SHORT&&($=r.RG16UI),F===r.UNSIGNED_INT&&($=r.RG32UI),F===r.BYTE&&($=r.RG8I),F===r.SHORT&&($=r.RG16I),F===r.INT&&($=r.RG32I)),S===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&($=r.RGB8UI),F===r.UNSIGNED_SHORT&&($=r.RGB16UI),F===r.UNSIGNED_INT&&($=r.RGB32UI),F===r.BYTE&&($=r.RGB8I),F===r.SHORT&&($=r.RGB16I),F===r.INT&&($=r.RGB32I)),S===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&($=r.RGBA8UI),F===r.UNSIGNED_SHORT&&($=r.RGBA16UI),F===r.UNSIGNED_INT&&($=r.RGBA32UI),F===r.BYTE&&($=r.RGBA8I),F===r.SHORT&&($=r.RGBA16I),F===r.INT&&($=r.RGBA32I)),S===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),S===r.RGBA){const Tt=tt?xr:Qt.getTransfer(q);F===r.FLOAT&&($=r.RGBA32F),F===r.HALF_FLOAT&&($=r.RGBA16F),F===r.UNSIGNED_BYTE&&($=Tt===oe?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(T,S){let F;return T?S===null||S===Xn||S===zi?F=r.DEPTH24_STENCIL8:S===$e?F=r.DEPTH32F_STENCIL8:S===xs&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Xn||S===zi?F=r.DEPTH_COMPONENT24:S===$e?F=r.DEPTH_COMPONENT32F:S===xs&&(F=r.DEPTH_COMPONENT16),F}function I(T,S){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ie&&T.minFilter!==Me?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function A(T){const S=T.target;S.removeEventListener("dispose",A),R(S),S.isVideoTexture&&h.delete(S)}function C(T){const S=T.target;S.removeEventListener("dispose",C),M(S)}function R(T){const S=n.get(T);if(S.__webglInit===void 0)return;const F=T.source,q=d.get(F);if(q){const tt=q[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&b(T),Object.keys(q).length===0&&d.delete(F)}n.remove(T)}function b(T){const S=n.get(T);r.deleteTexture(S.__webglTexture);const F=T.source,q=d.get(F);delete q[S.__cacheKey],a.memory.textures--}function M(T){const S=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let tt=0;tt<S.__webglFramebuffer[q].length;tt++)r.deleteFramebuffer(S.__webglFramebuffer[q][tt]);else r.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)r.deleteFramebuffer(S.__webglFramebuffer[q]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=T.textures;for(let q=0,tt=F.length;q<tt;q++){const $=n.get(F[q]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(T)}let L=0;function V(){L=0}function B(){const T=L;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),L+=1,T}function H(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function j(T,S){const F=n.get(T);if(T.isVideoTexture&&ct(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(F,T,S);return}}e.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+S)}function X(T,S){const F=n.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+S)}function it(T,S){const F=n.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,S);return}e.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+S)}function W(T,S){const F=n.get(T);if(T.version>0&&F.__version!==T.version){at(F,T,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+S)}const ht={[er]:r.REPEAT,[an]:r.CLAMP_TO_EDGE,[nr]:r.MIRRORED_REPEAT},ft={[Ie]:r.NEAREST,[ec]:r.NEAREST_MIPMAP_NEAREST,[ds]:r.NEAREST_MIPMAP_LINEAR,[Me]:r.LINEAR,[Ws]:r.LINEAR_MIPMAP_NEAREST,[Sn]:r.LINEAR_MIPMAP_LINEAR},bt={[Md]:r.NEVER,[Td]:r.ALWAYS,[Sd]:r.LESS,[dc]:r.LEQUAL,[bd]:r.EQUAL,[Ad]:r.GEQUAL,[Ed]:r.GREATER,[wd]:r.NOTEQUAL};function Ht(T,S){if(S.type===$e&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Me||S.magFilter===Ws||S.magFilter===ds||S.magFilter===Sn||S.minFilter===Me||S.minFilter===Ws||S.minFilter===ds||S.minFilter===Sn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(T,r.TEXTURE_WRAP_S,ht[S.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,ht[S.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,ht[S.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,ft[S.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,ft[S.minFilter]),S.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,bt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ie||S.minFilter!==ds&&S.minFilter!==Sn||S.type===$e&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");r.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(T,S){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));const q=S.source;let tt=d.get(q);tt===void 0&&(tt={},d.set(q,tt));const $=H(S);if($!==T.__cacheKey){tt[$]===void 0&&(tt[$]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,F=!0),tt[$].usedTimes++;const Tt=tt[T.__cacheKey];Tt!==void 0&&(tt[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&b(S)),T.__cacheKey=$,T.__webglTexture=tt[$].texture}return F}function J(T,S,F){let q=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=r.TEXTURE_3D);const tt=te(T,S),$=S.source;e.bindTexture(q,T.__webglTexture,r.TEXTURE0+F);const Tt=n.get($);if($.version!==Tt.__version||tt===!0){e.activeTexture(r.TEXTURE0+F);const dt=Qt.getPrimaries(Qt.workingColorSpace),Mt=S.colorSpace===Fn?null:Qt.getPrimaries(S.colorSpace),$t=S.colorSpace===Fn||dt===Mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let nt=_(S.image,!1,i.maxTextureSize);nt=Nt(S,nt);const Et=s.convert(S.format,S.colorSpace),Ft=s.convert(S.type);let kt=v(S.internalFormat,Et,Ft,S.colorSpace,S.isVideoTexture);Ht(q,S);let St;const U=S.mipmaps,Y=S.isVideoTexture!==!0,pt=Tt.__version===void 0||tt===!0,D=$.dataReady,st=I(S,nt);if(S.isDepthTexture)kt=x(S.format===ki,S.type),pt&&(Y?e.texStorage2D(r.TEXTURE_2D,1,kt,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,kt,nt.width,nt.height,0,Et,Ft,null));else if(S.isDataTexture)if(U.length>0){Y&&pt&&e.texStorage2D(r.TEXTURE_2D,st,kt,U[0].width,U[0].height);for(let G=0,K=U.length;G<K;G++)St=U[G],Y?D&&e.texSubImage2D(r.TEXTURE_2D,G,0,0,St.width,St.height,Et,Ft,St.data):e.texImage2D(r.TEXTURE_2D,G,kt,St.width,St.height,0,Et,Ft,St.data);S.generateMipmaps=!1}else Y?(pt&&e.texStorage2D(r.TEXTURE_2D,st,kt,nt.width,nt.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,Et,Ft,nt.data)):e.texImage2D(r.TEXTURE_2D,0,kt,nt.width,nt.height,0,Et,Ft,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Y&&pt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,st,kt,U[0].width,U[0].height,nt.depth);for(let G=0,K=U.length;G<K;G++)if(St=U[G],S.format!==ke)if(Et!==null)if(Y){if(D)if(S.layerUpdates.size>0){const gt=ql(St.width,St.height,S.format,S.type);for(const mt of S.layerUpdates){const Ot=St.data.subarray(mt*gt/St.data.BYTES_PER_ELEMENT,(mt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,G,0,0,mt,St.width,St.height,1,Et,Ot)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,G,0,0,0,St.width,St.height,nt.depth,Et,St.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,G,kt,St.width,St.height,nt.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Y?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,G,0,0,0,St.width,St.height,nt.depth,Et,Ft,St.data):e.texImage3D(r.TEXTURE_2D_ARRAY,G,kt,St.width,St.height,nt.depth,0,Et,Ft,St.data)}else{Y&&pt&&e.texStorage2D(r.TEXTURE_2D,st,kt,U[0].width,U[0].height);for(let G=0,K=U.length;G<K;G++)St=U[G],S.format!==ke?Et!==null?Y?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,G,0,0,St.width,St.height,Et,St.data):e.compressedTexImage2D(r.TEXTURE_2D,G,kt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Y?D&&e.texSubImage2D(r.TEXTURE_2D,G,0,0,St.width,St.height,Et,Ft,St.data):e.texImage2D(r.TEXTURE_2D,G,kt,St.width,St.height,0,Et,Ft,St.data)}else if(S.isDataArrayTexture)if(Y){if(pt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,st,kt,nt.width,nt.height,nt.depth),D)if(S.layerUpdates.size>0){const G=ql(nt.width,nt.height,S.format,S.type);for(const K of S.layerUpdates){const gt=nt.data.subarray(K*G/nt.data.BYTES_PER_ELEMENT,(K+1)*G/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,nt.width,nt.height,1,Et,Ft,gt)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Et,Ft,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,kt,nt.width,nt.height,nt.depth,0,Et,Ft,nt.data);else if(S.isData3DTexture)Y?(pt&&e.texStorage3D(r.TEXTURE_3D,st,kt,nt.width,nt.height,nt.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Et,Ft,nt.data)):e.texImage3D(r.TEXTURE_3D,0,kt,nt.width,nt.height,nt.depth,0,Et,Ft,nt.data);else if(S.isFramebufferTexture){if(pt)if(Y)e.texStorage2D(r.TEXTURE_2D,st,kt,nt.width,nt.height);else{let G=nt.width,K=nt.height;for(let gt=0;gt<st;gt++)e.texImage2D(r.TEXTURE_2D,gt,kt,G,K,0,Et,Ft,null),G>>=1,K>>=1}}else if(U.length>0){if(Y&&pt){const G=yt(U[0]);e.texStorage2D(r.TEXTURE_2D,st,kt,G.width,G.height)}for(let G=0,K=U.length;G<K;G++)St=U[G],Y?D&&e.texSubImage2D(r.TEXTURE_2D,G,0,0,Et,Ft,St):e.texImage2D(r.TEXTURE_2D,G,kt,Et,Ft,St);S.generateMipmaps=!1}else if(Y){if(pt){const G=yt(nt);e.texStorage2D(r.TEXTURE_2D,st,kt,G.width,G.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et,Ft,nt)}else e.texImage2D(r.TEXTURE_2D,0,kt,Et,Ft,nt);g(S)&&p(q),Tt.__version=$.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function at(T,S,F){if(S.image.length!==6)return;const q=te(T,S),tt=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+F);const $=n.get(tt);if(tt.version!==$.__version||q===!0){e.activeTexture(r.TEXTURE0+F);const Tt=Qt.getPrimaries(Qt.workingColorSpace),dt=S.colorSpace===Fn?null:Qt.getPrimaries(S.colorSpace),Mt=S.colorSpace===Fn||Tt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const $t=S.isCompressedTexture||S.image[0].isCompressedTexture,nt=S.image[0]&&S.image[0].isDataTexture,Et=[];for(let K=0;K<6;K++)!$t&&!nt?Et[K]=_(S.image[K],!0,i.maxCubemapSize):Et[K]=nt?S.image[K].image:S.image[K],Et[K]=Nt(S,Et[K]);const Ft=Et[0],kt=s.convert(S.format,S.colorSpace),St=s.convert(S.type),U=v(S.internalFormat,kt,St,S.colorSpace),Y=S.isVideoTexture!==!0,pt=$.__version===void 0||q===!0,D=tt.dataReady;let st=I(S,Ft);Ht(r.TEXTURE_CUBE_MAP,S);let G;if($t){Y&&pt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,st,U,Ft.width,Ft.height);for(let K=0;K<6;K++){G=Et[K].mipmaps;for(let gt=0;gt<G.length;gt++){const mt=G[gt];S.format!==ke?kt!==null?Y?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,mt.width,mt.height,kt,mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,U,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,mt.width,mt.height,kt,St,mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,U,mt.width,mt.height,0,kt,St,mt.data)}}}else{if(G=S.mipmaps,Y&&pt){G.length>0&&st++;const K=yt(Et[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,st,U,K.width,K.height)}for(let K=0;K<6;K++)if(nt){Y?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Et[K].width,Et[K].height,kt,St,Et[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,U,Et[K].width,Et[K].height,0,kt,St,Et[K].data);for(let gt=0;gt<G.length;gt++){const Ot=G[gt].image[K].image;Y?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Ot.width,Ot.height,kt,St,Ot.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,U,Ot.width,Ot.height,0,kt,St,Ot.data)}}else{Y?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,kt,St,Et[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,U,kt,St,Et[K]);for(let gt=0;gt<G.length;gt++){const mt=G[gt];Y?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,kt,St,mt.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,U,kt,St,mt.image[K])}}}g(S)&&p(r.TEXTURE_CUBE_MAP),$.__version=tt.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function wt(T,S,F,q,tt,$){const Tt=s.convert(F.format,F.colorSpace),dt=s.convert(F.type),Mt=v(F.internalFormat,Tt,dt,F.colorSpace),$t=n.get(S),nt=n.get(F);if(nt.__renderTarget=S,!$t.__hasExternalTextures){const Et=Math.max(1,S.width>>$),Ft=Math.max(1,S.height>>$);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,$,Mt,Et,Ft,S.depth,0,Tt,dt,null):e.texImage2D(tt,$,Mt,Et,Ft,0,Tt,dt,null)}e.bindFramebuffer(r.FRAMEBUFFER,T),vt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,tt,nt.__webglTexture,0,et(S)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,tt,nt.__webglTexture,$),e.bindFramebuffer(r.FRAMEBUFFER,null)}function lt(T,S,F){if(r.bindRenderbuffer(r.RENDERBUFFER,T),S.depthBuffer){const q=S.depthTexture,tt=q&&q.isDepthTexture?q.type:null,$=x(S.stencilBuffer,tt),Tt=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=et(S);vt(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,dt,$,S.width,S.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,$,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,$,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Tt,r.RENDERBUFFER,T)}else{const q=S.textures;for(let tt=0;tt<q.length;tt++){const $=q[tt],Tt=s.convert($.format,$.colorSpace),dt=s.convert($.type),Mt=v($.internalFormat,Tt,dt,$.colorSpace),$t=et(S);F&&vt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,$t,Mt,S.width,S.height):vt(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$t,Mt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Mt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Dt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),j(S.depthTexture,0);const tt=q.__webglTexture,$=et(S);if(S.depthTexture.format===Di)vt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(S.depthTexture.format===ki)vt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Vt(T){const S=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){const tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",tt)};q.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=q}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Dt(S.__webglFramebuffer,T)}else if(F){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=r.createRenderbuffer(),lt(S.__webglDepthbuffer[q],T,!1);else{const tt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,$)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),lt(S.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(T,S,F){const q=n.get(T);S!==void 0&&wt(q.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&Vt(T)}function Kt(T){const S=T.texture,F=n.get(T),q=n.get(S);T.addEventListener("dispose",C);const tt=T.textures,$=T.isWebGLCubeRenderTarget===!0,Tt=tt.length>1;if(Tt||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=S.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)F.__webglFramebuffer[dt][Mt]=r.createFramebuffer()}else F.__webglFramebuffer[dt]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let dt=0;dt<S.mipmaps.length;dt++)F.__webglFramebuffer[dt]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(Tt)for(let dt=0,Mt=tt.length;dt<Mt;dt++){const $t=n.get(tt[dt]);$t.__webglTexture===void 0&&($t.__webglTexture=r.createTexture(),a.memory.textures++)}if(T.samples>0&&vt(T)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let dt=0;dt<tt.length;dt++){const Mt=tt[dt];F.__webglColorRenderbuffer[dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[dt]);const $t=s.convert(Mt.format,Mt.colorSpace),nt=s.convert(Mt.type),Et=v(Mt.internalFormat,$t,nt,Mt.colorSpace,T.isXRRenderTarget===!0),Ft=et(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ft,Et,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,F.__webglColorRenderbuffer[dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),lt(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,S);for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)wt(F.__webglFramebuffer[dt][Mt],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else wt(F.__webglFramebuffer[dt],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(S)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let dt=0,Mt=tt.length;dt<Mt;dt++){const $t=tt[dt],nt=n.get($t);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),Ht(r.TEXTURE_2D,$t),wt(F.__webglFramebuffer,T,$t,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,0),g($t)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let dt=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(dt,q.__webglTexture),Ht(dt,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)wt(F.__webglFramebuffer[Mt],T,S,r.COLOR_ATTACHMENT0,dt,Mt);else wt(F.__webglFramebuffer,T,S,r.COLOR_ATTACHMENT0,dt,0);g(S)&&p(dt),e.unbindTexture()}T.depthBuffer&&Vt(T)}function Q(T){const S=T.textures;for(let F=0,q=S.length;F<q;F++){const tt=S[F];if(g(tt)){const $=y(T),Tt=n.get(tt).__webglTexture;e.bindTexture($,Tt),p($),e.unbindTexture()}}}const rt=[],P=[];function Ct(T){if(T.samples>0){if(vt(T)===!1){const S=T.textures,F=T.width,q=T.height;let tt=r.COLOR_BUFFER_BIT;const $=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Tt=n.get(T),dt=S.length>1;if(dt)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(r.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Tt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),dt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const $t=n.get(S[Mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$t,0)}r.blitFramebuffer(0,0,F,q,0,0,F,q,tt,r.NEAREST),l===!0&&(rt.length=0,P.length=0,rt.push(r.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(rt.push($),P.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,P)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),dt)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(r.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const $t=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Tt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,$t,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const S=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function et(T){return Math.min(i.maxSamples,T.samples)}function vt(T){const S=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ct(T){const S=a.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function Nt(T,S){const F=T.colorSpace,q=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Hi&&F!==Fn&&(Qt.getTransfer(F)===oe?(q!==ke||tt!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function yt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=it,this.setTextureCube=W,this.rebindTextures=Bt,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=vt}function Hd(r,t){function e(n,i=Fn){let s;const a=Qt.getTransfer(i);if(n===An)return r.UNSIGNED_BYTE;if(n===mo)return r.UNSIGNED_SHORT_4_4_4_4;if(n===go)return r.UNSIGNED_SHORT_5_5_5_1;if(n===sc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===nc)return r.BYTE;if(n===ic)return r.SHORT;if(n===xs)return r.UNSIGNED_SHORT;if(n===po)return r.INT;if(n===Xn)return r.UNSIGNED_INT;if(n===$e)return r.FLOAT;if(n===bs)return r.HALF_FLOAT;if(n===rc)return r.ALPHA;if(n===ac)return r.RGB;if(n===ke)return r.RGBA;if(n===oc)return r.LUMINANCE;if(n===lc)return r.LUMINANCE_ALPHA;if(n===Di)return r.DEPTH_COMPONENT;if(n===ki)return r.DEPTH_STENCIL;if(n===_o)return r.RED;if(n===_r)return r.RED_INTEGER;if(n===cc)return r.RG;if(n===xo)return r.RG_INTEGER;if(n===vo)return r.RGBA_INTEGER;if(n===Xs||n===qs||n===Ys||n===Zs)if(a===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Xs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Xs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ys)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ua||n===Na||n===Oa||n===Fa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ua)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Na)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===za||n===ka)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ba||n===za)return a===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ka)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===ja||n===Qa||n===to)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Va)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ha)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ga)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xa)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ya)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Za)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ja)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ka)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qa)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===to)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$s||n===eo||n===no)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===$s)return a===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===eo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===no)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hc||n===io||n===so||n===ro)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===$s)return s.COMPRESSED_RED_RGTC1_EXT;if(n===io)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===so)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ro)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Gd extends ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ms extends ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kx={type:"move"};class xl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Kx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ms;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const jx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ge,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new on({vertexShader:jx,fragmentShader:Qx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new Es(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ev extends Tn{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const _=new tv,g=e.getContextAttributes();let p=null,y=null;const v=[],x=[],I=new Z;let A=null;const C=new ye;C.viewport=new Jt;const R=new ye;R.viewport=new Jt;const b=[C,R],M=new Gd;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let at=v[J];return at===void 0&&(at=new xl,v[J]=at),at.getTargetRaySpace()},this.getControllerGrip=function(J){let at=v[J];return at===void 0&&(at=new xl,v[J]=at),at.getGripSpace()},this.getHand=function(J){let at=v[J];return at===void 0&&(at=new xl,v[J]=at),at.getHandSpace()};function B(J){const at=x.indexOf(J.inputSource);if(at===-1)return;const wt=v[at];wt!==void 0&&(wt.update(J.inputSource,J.frame,c||a),wt.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",j);for(let J=0;J<v.length;J++){const at=x[J];at!==null&&(x[J]=null,v[J].disconnect(at))}L=null,V=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",H),i.addEventListener("inputsourceschange",j),g.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(I),i.renderState.layers===void 0){const at={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,at),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new fn(f.framebufferWidth,f.framebufferHeight,{format:ke,type:An,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let at=null,wt=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=g.stencil?ki:Di,wt=g.stencil?zi:Xn);const Dt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new fn(d.textureWidth,d.textureHeight,{format:ke,type:An,depthTexture:new xc(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(J){for(let at=0;at<J.removed.length;at++){const wt=J.removed[at],lt=x.indexOf(wt);lt>=0&&(x[lt]=null,v[lt].disconnect(wt))}for(let at=0;at<J.added.length;at++){const wt=J.added[at];let lt=x.indexOf(wt);if(lt===-1){for(let Vt=0;Vt<v.length;Vt++)if(Vt>=x.length){x.push(wt),lt=Vt;break}else if(x[Vt]===null){x[Vt]=wt,lt=Vt;break}if(lt===-1)break}const Dt=v[lt];Dt&&Dt.connect(wt)}}const X=new w,it=new w;function W(J,at,wt){X.setFromMatrixPosition(at.matrixWorld),it.setFromMatrixPosition(wt.matrixWorld);const lt=X.distanceTo(it),Dt=at.projectionMatrix.elements,Vt=wt.projectionMatrix.elements,Bt=Dt[14]/(Dt[10]-1),Kt=Dt[14]/(Dt[10]+1),Q=(Dt[9]+1)/Dt[5],rt=(Dt[9]-1)/Dt[5],P=(Dt[8]-1)/Dt[0],Ct=(Vt[8]+1)/Vt[0],et=Bt*P,vt=Bt*Ct,ct=lt/(-P+Ct),Nt=ct*-P;if(at.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Nt),J.translateZ(ct),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Dt[10]===-1)J.projectionMatrix.copy(at.projectionMatrix),J.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const yt=Bt+ct,T=Kt+ct,S=et-Nt,F=vt+(lt-Nt),q=Q*Kt/T*yt,tt=rt*Kt/T*yt;J.projectionMatrix.makePerspective(S,F,q,tt,yt,T),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ht(J,at){at===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(at.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let at=J.near,wt=J.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(wt=_.depthFar)),M.near=R.near=C.near=at,M.far=R.far=C.far=wt,(L!==M.near||V!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,V=M.far),C.layers.mask=J.layers.mask|2,R.layers.mask=J.layers.mask|4,M.layers.mask=C.layers.mask|R.layers.mask;const lt=J.parent,Dt=M.cameras;ht(M,lt);for(let Vt=0;Vt<Dt.length;Vt++)ht(Dt[Vt],lt);Dt.length===2?W(M,C,R):M.projectionMatrix.copy(C.projectionMatrix),ft(J,M,lt)};function ft(J,at,wt){wt===null?J.matrix.copy(at.matrixWorld):(J.matrix.copy(wt.matrixWorld),J.matrix.invert(),J.matrix.multiply(at.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(at.projectionMatrix),J.projectionMatrixInverse.copy(at.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=vs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let bt=null;function Ht(J,at){if(h=at.getViewerPose(c||a),m=at,h!==null){const wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let lt=!1;wt.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let Vt=0;Vt<wt.length;Vt++){const Bt=wt[Vt];let Kt=null;if(f!==null)Kt=f.getViewport(Bt);else{const rt=u.getViewSubImage(d,Bt);Kt=rt.viewport,Vt===0&&(t.setRenderTargetTextures(y,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(y))}let Q=b[Vt];Q===void 0&&(Q=new ye,Q.layers.enable(Vt),Q.viewport=new Jt,b[Vt]=Q),Q.matrix.fromArray(Bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Vt===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(Q)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const Vt=u.getDepthInformation(wt[0]);Vt&&Vt.isValid&&Vt.texture&&_.init(t,Vt,i.renderState)}}for(let wt=0;wt<v.length;wt++){const lt=x[wt],Dt=v[wt];lt!==null&&Dt!==void 0&&Dt.update(lt,at,c||a)}bt&&bt(J,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),m=null}const te=new Fd;te.setAnimationLoop(Ht),this.setAnimationLoop=function(J){bt=J},this.dispose=function(){}}}const mi=new nn,nv=new zt;function iv(r,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Ud(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ve&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ve&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(g.envMap.value=v,mi.copy(x),mi.x*=-1,mi.y*=-1,mi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),g.envMapRotation.value.setFromMatrix4(nv.makeRotationFromEuler(mi)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sv(r,t,e,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=i[y.id];x===void 0&&(m(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",g));const I=v.program;n.updateUBOMapping(y,I);const A=t.render.frame;s[y.id]!==A&&(d(y),s[y.id]=A)}function h(y){const v=u();y.__bindingPointIndex=v;const x=r.createBuffer(),I=y.__size,A=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,I,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=i[y.id],x=y.uniforms,I=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let A=0,C=x.length;A<C;A++){const R=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,M=R.length;b<M;b++){const L=R[b];if(f(L,A,b,I)===!0){const V=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let j=0;j<B.length;j++){const X=B[j],it=_(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,V+H,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,H),H+=it.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,v,x,I){const A=y.value,C=v+"_"+x;if(I[C]===void 0)return typeof A=="number"||typeof A=="boolean"?I[C]=A:I[C]=A.clone(),!0;{const R=I[C];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return I[C]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function m(y){const v=y.uniforms;let x=0;const I=16;for(let C=0,R=v.length;C<R;C++){const b=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,L=b.length;M<L;M++){const V=b[M],B=Array.isArray(V.value)?V.value:[V.value];for(let H=0,j=B.length;H<j;H++){const X=B[H],it=_(X),W=x%I,ht=W%it.boundary,ft=W+ht;x+=ht,ft!==0&&I-ft<it.storage&&(x+=I-ft),V.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=it.storage}}}const A=x%I;return A>0&&(x+=I-A),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){const v=y.target;v.removeEventListener("dispose",g);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}class rv{constructor(t={}){const{canvas:e=Pd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this.toneMapping=Vn,this.toneMappingExposure=1;const x=this;let I=!1,A=0,C=0,R=null,b=-1,M=null;const L=new Jt,V=new Jt;let B=null;const H=new xt(0);let j=0,X=e.width,it=e.height,W=1,ht=null,ft=null;const bt=new Jt(0,0,X,it),Ht=new Jt(0,0,X,it);let te=!1;const J=new yr;let at=!1,wt=!1;const lt=new zt,Dt=new zt,Vt=new w,Bt=new Jt,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function rt(){return R===null?W:1}let P=n;function Ct(E,N){return e.getContext(E,N)}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),P===null){const N="webgl2";if(P=Ct(N,E),P===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let et,vt,ct,Nt,yt,T,S,F,q,tt,$,Tt,dt,Mt,$t,nt,Et,Ft,kt,St,U,Y,pt,D;function st(){et=new h0(P),et.init(),Y=new Hd(P,et),vt=new s0(P,et,t,Y),ct=new Wx(P,et),vt.reverseDepthBuffer&&d&&ct.buffers.depth.setReversed(!0),Nt=new f0(P),yt=new Ix,T=new Jx(P,et,ct,yt,vt,Y,Nt),S=new a0(x),F=new c0(x),q=new ym(P),pt=new n0(P,q),tt=new u0(P,q,Nt,pt),$=new m0(P,tt,q,Nt),kt=new p0(P,vt,T),nt=new r0(yt),Tt=new Px(x,S,F,et,vt,pt,nt),dt=new iv(x,yt),Mt=new Dx,$t=new zx(et),Ft=new e0(x,S,F,ct,$,f,l),Et=new Hx(x,$,vt),D=new sv(P,Nt,vt,ct),St=new i0(P,et,Nt),U=new d0(P,et,Nt),Nt.programs=Tt.programs,x.capabilities=vt,x.extensions=et,x.properties=yt,x.renderLists=Mt,x.shadowMap=Et,x.state=ct,x.info=Nt}st();const G=new ev(x,P);this.xr=G,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=et.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=et.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(X,it,!1))},this.getSize=function(E){return E.set(X,it)},this.setSize=function(E,N,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,it=N,e.width=Math.floor(E*W),e.height=Math.floor(N*W),z===!0&&(e.style.width=E+"px",e.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(X*W,it*W).floor()},this.setDrawingBufferSize=function(E,N,z){X=E,it=N,W=z,e.width=Math.floor(E*z),e.height=Math.floor(N*z),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(bt)},this.setViewport=function(E,N,z,k){E.isVector4?bt.set(E.x,E.y,E.z,E.w):bt.set(E,N,z,k),ct.viewport(L.copy(bt).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(Ht)},this.setScissor=function(E,N,z,k){E.isVector4?Ht.set(E.x,E.y,E.z,E.w):Ht.set(E,N,z,k),ct.scissor(V.copy(Ht).multiplyScalar(W).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(E){ct.setScissorTest(te=E)},this.setOpaqueSort=function(E){ht=E},this.setTransparentSort=function(E){ft=E},this.getClearColor=function(E){return E.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(E=!0,N=!0,z=!0){let k=0;if(E){let O=!1;if(R!==null){const ot=R.texture.format;O=ot===vo||ot===xo||ot===_r}if(O){const ot=R.texture.type,_t=ot===An||ot===Xn||ot===xs||ot===zi||ot===mo||ot===go,Rt=Ft.getClearColor(),Pt=Ft.getClearAlpha(),Gt=Rt.r,qt=Rt.g,It=Rt.b;_t?(m[0]=Gt,m[1]=qt,m[2]=It,m[3]=Pt,P.clearBufferuiv(P.COLOR,0,m)):(_[0]=Gt,_[1]=qt,_[2]=It,_[3]=Pt,P.clearBufferiv(P.COLOR,0,_))}else k|=P.COLOR_BUFFER_BIT}N&&(k|=P.DEPTH_BUFFER_BIT),z&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),Mt.dispose(),$t.dispose(),yt.dispose(),S.dispose(),F.dispose(),$.dispose(),pt.dispose(),D.dispose(),Tt.dispose(),G.dispose(),G.removeEventListener("sessionstart",Gc),G.removeEventListener("sessionend",Wc),ci.stop()};function K(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const E=Nt.autoReset,N=Et.enabled,z=Et.autoUpdate,k=Et.needsUpdate,O=Et.type;st(),Nt.autoReset=E,Et.enabled=N,Et.autoUpdate=z,Et.needsUpdate=k,Et.type=O}function mt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ot(E){const N=E.target;N.removeEventListener("dispose",Ot),ie(N)}function ie(E){fe(E),yt.remove(E)}function fe(E){const N=yt.get(E).programs;N!==void 0&&(N.forEach(function(z){Tt.releaseProgram(z)}),E.isShaderMaterial&&Tt.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,z,k,O,ot){N===null&&(N=Kt);const _t=O.isMesh&&O.matrixWorld.determinant()<0,Rt=Gf(E,N,z,k,O);ct.setMaterial(k,_t);let Pt=z.index,Gt=1;if(k.wireframe===!0){if(Pt=tt.getWireframeAttribute(z),Pt===void 0)return;Gt=2}const qt=z.drawRange,It=z.attributes.position;let se=qt.start*Gt,ce=(qt.start+qt.count)*Gt;ot!==null&&(se=Math.max(se,ot.start*Gt),ce=Math.min(ce,(ot.start+ot.count)*Gt)),Pt!==null?(se=Math.max(se,0),ce=Math.min(ce,Pt.count)):It!=null&&(se=Math.max(se,0),ce=Math.min(ce,It.count));const he=ce-se;if(he<0||he===1/0)return;pt.setup(O,k,Rt,z,Pt);let We,re=St;if(Pt!==null&&(We=q.get(Pt),re=U,re.setIndex(We)),O.isMesh)k.wireframe===!0?(ct.setLineWidth(k.wireframeLinewidth*rt()),re.setMode(P.LINES)):re.setMode(P.TRIANGLES);else if(O.isLine){let Lt=k.linewidth;Lt===void 0&&(Lt=1),ct.setLineWidth(Lt*rt()),O.isLineSegments?re.setMode(P.LINES):O.isLineLoop?re.setMode(P.LINE_LOOP):re.setMode(P.LINE_STRIP)}else O.isPoints?re.setMode(P.POINTS):O.isSprite&&re.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)re.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))re.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Lt=O._multiDrawStarts,Rn=O._multiDrawCounts,ae=O._multiDrawCount,ln=Pt?q.get(Pt).bytesPerElement:1,Yi=yt.get(k).currentProgram.getUniforms();for(let Ke=0;Ke<ae;Ke++)Yi.setValue(P,"_gl_DrawID",Ke),re.render(Lt[Ke]/ln,Rn[Ke])}else if(O.isInstancedMesh)re.renderInstances(se,he,O.count);else if(z.isInstancedBufferGeometry){const Lt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Rn=Math.min(z.instanceCount,Lt);re.renderInstances(se,he,Rn)}else re.render(se,he)};function jt(E,N,z){E.transparent===!0&&E.side===yn&&E.forceSinglePass===!1?(E.side=Ve,E.needsUpdate=!0,Tr(E,N,z),E.side=Gn,E.needsUpdate=!0,Tr(E,N,z),E.side=yn):Tr(E,N,z)}this.compile=function(E,N,z=null){z===null&&(z=E),p=$t.get(z),p.init(N),v.push(p),z.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==z&&E.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const k=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ot=O.material;if(ot)if(Array.isArray(ot))for(let _t=0;_t<ot.length;_t++){const Rt=ot[_t];jt(Rt,z,O),k.add(Rt)}else jt(ot,z,O),k.add(ot)}),v.pop(),p=null,k},this.compileAsync=function(E,N,z=null){const k=this.compile(E,N,z);return new Promise(O=>{function ot(){if(k.forEach(function(_t){yt.get(_t).currentProgram.isReady()&&k.delete(_t)}),k.size===0){O(E);return}setTimeout(ot,10)}et.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Te=null;function Ge(E){Te&&Te(E)}function Gc(){ci.stop()}function Wc(){ci.start()}const ci=new Fd;ci.setAnimationLoop(Ge),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(E){Te=E,G.setAnimationLoop(E),E===null?ci.stop():ci.start()},G.addEventListener("sessionstart",Gc),G.addEventListener("sessionend",Wc),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(N),N=G.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,R),p=$t.get(E,v.length),p.init(N),v.push(p),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),J.setFromProjectionMatrix(Dt),wt=this.localClippingEnabled,at=nt.init(this.clippingPlanes,wt),g=Mt.get(E,y.length),g.init(),y.push(g),G.enabled===!0&&G.isPresenting===!0){const ot=x.xr.getDepthSensingMesh();ot!==null&&Xo(ot,N,-1/0,x.sortObjects)}Xo(E,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ht,ft),Q=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Q&&Ft.addToRenderList(g,E),this.info.render.frame++,at===!0&&nt.beginShadows();const z=p.state.shadowsArray;Et.render(z,E,N),at===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,O=g.transmissive;if(p.setupLights(),N.isArrayCamera){const ot=N.cameras;if(O.length>0)for(let _t=0,Rt=ot.length;_t<Rt;_t++){const Pt=ot[_t];qc(k,O,E,Pt)}Q&&Ft.render(E);for(let _t=0,Rt=ot.length;_t<Rt;_t++){const Pt=ot[_t];Xc(g,E,Pt,Pt.viewport)}}else O.length>0&&qc(k,O,E,N),Q&&Ft.render(E),Xc(g,E,N);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,N),pt.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],at===!0&&nt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Xo(E,N,z,k){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||J.intersectsSprite(E)){k&&Bt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Dt);const _t=$.update(E),Rt=E.material;Rt.visible&&g.push(E,_t,Rt,z,Bt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||J.intersectsObject(E))){const _t=$.update(E),Rt=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Bt.copy(E.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Bt.copy(_t.boundingSphere.center)),Bt.applyMatrix4(E.matrixWorld).applyMatrix4(Dt)),Array.isArray(Rt)){const Pt=_t.groups;for(let Gt=0,qt=Pt.length;Gt<qt;Gt++){const It=Pt[Gt],se=Rt[It.materialIndex];se&&se.visible&&g.push(E,_t,se,z,Bt.z,It)}}else Rt.visible&&g.push(E,_t,Rt,z,Bt.z,null)}}const ot=E.children;for(let _t=0,Rt=ot.length;_t<Rt;_t++)Xo(ot[_t],N,z,k)}function Xc(E,N,z,k){const O=E.opaque,ot=E.transmissive,_t=E.transparent;p.setupLightsView(z),at===!0&&nt.setGlobalState(x.clippingPlanes,z),k&&ct.viewport(L.copy(k)),O.length>0&&Ar(O,N,z),ot.length>0&&Ar(ot,N,z),_t.length>0&&Ar(_t,N,z),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function qc(E,N,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new fn(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?bs:An,minFilter:Sn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[k.id],_t=k.viewport||L;ot.setSize(_t.z,_t.w);const Rt=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(H),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),Q&&Ft.render(z);const Pt=x.toneMapping;x.toneMapping=Vn;const Gt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),at===!0&&nt.setGlobalState(x.clippingPlanes,k),Ar(E,z,k),T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot),et.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let It=0,se=N.length;It<se;It++){const ce=N[It],he=ce.object,We=ce.geometry,re=ce.material,Lt=ce.group;if(re.side===yn&&he.layers.test(k.layers)){const Rn=re.side;re.side=Ve,re.needsUpdate=!0,Yc(he,z,k,We,re,Lt),re.side=Rn,re.needsUpdate=!0,qt=!0}}qt===!0&&(T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot))}x.setRenderTarget(Rt),x.setClearColor(H,j),Gt!==void 0&&(k.viewport=Gt),x.toneMapping=Pt}function Ar(E,N,z){const k=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ot=E.length;O<ot;O++){const _t=E[O],Rt=_t.object,Pt=_t.geometry,Gt=k===null?_t.material:k,qt=_t.group;Rt.layers.test(z.layers)&&Yc(Rt,N,z,Pt,Gt,qt)}}function Yc(E,N,z,k,O,ot){E.onBeforeRender(x,N,z,k,O,ot),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,N,z,k,E,ot),O.transparent===!0&&O.side===yn&&O.forceSinglePass===!1?(O.side=Ve,O.needsUpdate=!0,x.renderBufferDirect(z,N,k,O,E,ot),O.side=Gn,O.needsUpdate=!0,x.renderBufferDirect(z,N,k,O,E,ot),O.side=yn):x.renderBufferDirect(z,N,k,O,E,ot),E.onAfterRender(x,N,z,k,O,ot)}function Tr(E,N,z){N.isScene!==!0&&(N=Kt);const k=yt.get(E),O=p.state.lights,ot=p.state.shadowsArray,_t=O.state.version,Rt=Tt.getParameters(E,O.state,ot,N,z),Pt=Tt.getProgramCacheKey(Rt);let Gt=k.programs;k.environment=E.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(E.isMeshStandardMaterial?F:S).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Gt===void 0&&(E.addEventListener("dispose",Ot),Gt=new Map,k.programs=Gt);let qt=Gt.get(Pt);if(qt!==void 0){if(k.currentProgram===qt&&k.lightsStateVersion===_t)return $c(E,Rt),qt}else Rt.uniforms=Tt.getUniforms(E),E.onBeforeCompile(Rt,x),qt=Tt.acquireProgram(Rt,Pt),Gt.set(Pt,qt),k.uniforms=Rt.uniforms;const It=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=nt.uniform),$c(E,Rt),k.needsLights=Xf(E),k.lightsStateVersion=_t,k.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),k.currentProgram=qt,k.uniformsList=null,qt}function Zc(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=Ea.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function $c(E,N){const z=yt.get(E);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Gf(E,N,z,k,O){N.isScene!==!0&&(N=Kt),T.resetTextureUnits();const ot=N.fog,_t=k.isMeshStandardMaterial?N.environment:null,Rt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Hi,Pt=(k.isMeshStandardMaterial?F:S).get(k.envMap||_t),Gt=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,qt=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),It=!!z.morphAttributes.position,se=!!z.morphAttributes.normal,ce=!!z.morphAttributes.color;let he=Vn;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(he=x.toneMapping);const We=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=We!==void 0?We.length:0,Lt=yt.get(k),Rn=p.state.lights;if(at===!0&&(wt===!0||E!==M)){const sn=E===M&&k.id===b;nt.setState(k,E,sn)}let ae=!1;k.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Rn.state.version||Lt.outputColorSpace!==Rt||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==Pt||k.fog===!0&&Lt.fog!==ot||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==nt.numPlanes||Lt.numIntersection!==nt.numIntersection)||Lt.vertexAlphas!==Gt||Lt.vertexTangents!==qt||Lt.morphTargets!==It||Lt.morphNormals!==se||Lt.morphColors!==ce||Lt.toneMapping!==he||Lt.morphTargetsCount!==re)&&(ae=!0):(ae=!0,Lt.__version=k.version);let ln=Lt.currentProgram;ae===!0&&(ln=Tr(k,N,O));let Yi=!1,Ke=!1,Ts=!1;const ue=ln.getUniforms(),gn=Lt.uniforms;if(ct.useProgram(ln.program)&&(Yi=!0,Ke=!0,Ts=!0),k.id!==b&&(b=k.id,Ke=!0),Yi||M!==E){ct.buffers.depth.getReversed()?(lt.copy(E.projectionMatrix),Xp(lt),qp(lt),ue.setValue(P,"projectionMatrix",lt)):ue.setValue(P,"projectionMatrix",E.projectionMatrix),ue.setValue(P,"viewMatrix",E.matrixWorldInverse);const Yn=ue.map.cameraPosition;Yn!==void 0&&Yn.setValue(P,Vt.setFromMatrixPosition(E.matrixWorld)),vt.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ue.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Ke=!0,Ts=!0)}if(O.isSkinnedMesh){ue.setOptional(P,O,"bindMatrix"),ue.setOptional(P,O,"bindMatrixInverse");const sn=O.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),ue.setValue(P,"boneTexture",sn.boneTexture,T))}O.isBatchedMesh&&(ue.setOptional(P,O,"batchingTexture"),ue.setValue(P,"batchingTexture",O._matricesTexture,T),ue.setOptional(P,O,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",O._indirectTexture,T),ue.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",O._colorsTexture,T));const Cs=z.morphAttributes;if((Cs.position!==void 0||Cs.normal!==void 0||Cs.color!==void 0)&&kt.update(O,z,ln),(Ke||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,ue.setValue(P,"receiveShadow",O.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(gn.envMap.value=Pt,gn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(gn.envMapIntensity.value=N.environmentIntensity),Ke&&(ue.setValue(P,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Wf(gn,Ts),ot&&k.fog===!0&&dt.refreshFogUniforms(gn,ot),dt.refreshMaterialUniforms(gn,k,W,it,p.state.transmissionRenderTarget[E.id]),Ea.upload(P,Zc(Lt),gn,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ea.upload(P,Zc(Lt),gn,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ue.setValue(P,"center",O.center),ue.setValue(P,"modelViewMatrix",O.modelViewMatrix),ue.setValue(P,"normalMatrix",O.normalMatrix),ue.setValue(P,"modelMatrix",O.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const sn=k.uniformsGroups;for(let Yn=0,Zn=sn.length;Yn<Zn;Yn++){const Jc=sn[Yn];D.update(Jc,ln),D.bind(Jc,ln)}}return ln}function Wf(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function Xf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,N,z){yt.get(E.texture).__webglTexture=N,yt.get(E.depthTexture).__webglTexture=z;const k=yt.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=z===void 0,k.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,N){const z=yt.get(E);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(E,N=0,z=0){R=E,A=N,C=z;let k=!0,O=null,ot=!1,_t=!1;if(E){const Pt=yt.get(E);if(Pt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(Pt.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(Pt.__hasExternalTextures)T.rebindTextures(E,yt.get(E.texture).__webglTexture,yt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const It=E.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&yt.has(It)&&(E.width!==It.image.width||E.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}const Gt=E.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(_t=!0);const qt=yt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(qt[N])?O=qt[N][z]:O=qt[N],ot=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?O=yt.get(E).__webglMultisampledFramebuffer:Array.isArray(qt)?O=qt[z]:O=qt,L.copy(E.viewport),V.copy(E.scissor),B=E.scissorTest}else L.copy(bt).multiplyScalar(W).floor(),V.copy(Ht).multiplyScalar(W).floor(),B=te;if(ct.bindFramebuffer(P.FRAMEBUFFER,O)&&k&&ct.drawBuffers(E,O),ct.viewport(L),ct.scissor(V),ct.setScissorTest(B),ot){const Pt=yt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Pt.__webglTexture,z)}else if(_t){const Pt=yt.get(E.texture),Gt=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pt.__webglTexture,z||0,Gt)}b=-1},this.readRenderTargetPixels=function(E,N,z,k,O,ot,_t){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){ct.bindFramebuffer(P.FRAMEBUFFER,Rt);try{const Pt=E.texture,Gt=Pt.format,qt=Pt.type;if(!vt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!vt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-k&&z>=0&&z<=E.height-O&&P.readPixels(N,z,k,O,Y.convert(Gt),Y.convert(qt),ot)}finally{const Pt=R!==null?yt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(E,N,z,k,O,ot,_t){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){const Pt=E.texture,Gt=Pt.format,qt=Pt.type;if(!vt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!vt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=E.width-k&&z>=0&&z<=E.height-O){ct.bindFramebuffer(P.FRAMEBUFFER,Rt);const It=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(N,z,k,O,Y.convert(Gt),Y.convert(qt),0);const se=R!==null?yt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,se);const ce=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Wp(P,ce,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(It),P.deleteSync(ce),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,N=null,z=0){E.isTexture!==!0&&(Vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,E=arguments[1]);const k=Math.pow(2,-z),O=Math.floor(E.image.width*k),ot=Math.floor(E.image.height*k),_t=N!==null?N.x:0,Rt=N!==null?N.y:0;T.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,_t,Rt,O,ot),ct.unbindTexture()},this.copyTextureToTexture=function(E,N,z=null,k=null,O=0){E.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],N=arguments[2],O=arguments[3]||0,z=null);let ot,_t,Rt,Pt,Gt,qt,It,se,ce;const he=E.isCompressedTexture?E.mipmaps[O]:E.image;z!==null?(ot=z.max.x-z.min.x,_t=z.max.y-z.min.y,Rt=z.isBox3?z.max.z-z.min.z:1,Pt=z.min.x,Gt=z.min.y,qt=z.isBox3?z.min.z:0):(ot=he.width,_t=he.height,Rt=he.depth||1,Pt=0,Gt=0,qt=0),k!==null?(It=k.x,se=k.y,ce=k.z):(It=0,se=0,ce=0);const We=Y.convert(N.format),re=Y.convert(N.type);let Lt;N.isData3DTexture?(T.setTexture3D(N,0),Lt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Lt=P.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Lt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const Rn=P.getParameter(P.UNPACK_ROW_LENGTH),ae=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ln=P.getParameter(P.UNPACK_SKIP_PIXELS),Yi=P.getParameter(P.UNPACK_SKIP_ROWS),Ke=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,qt);const Ts=E.isDataArrayTexture||E.isData3DTexture,ue=N.isDataArrayTexture||N.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const gn=yt.get(E),Cs=yt.get(N),sn=yt.get(gn.__renderTarget),Yn=yt.get(Cs.__renderTarget);ct.bindFramebuffer(P.READ_FRAMEBUFFER,sn.__webglFramebuffer),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let Zn=0;Zn<Rt;Zn++)Ts&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(E).__webglTexture,O,qt+Zn),E.isDepthTexture?(ue&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(N).__webglTexture,O,ce+Zn),P.blitFramebuffer(Pt,Gt,ot,_t,It,se,ot,_t,P.DEPTH_BUFFER_BIT,P.NEAREST)):ue?P.copyTexSubImage3D(Lt,O,It,se,ce+Zn,Pt,Gt,ot,_t):P.copyTexSubImage2D(Lt,O,It,se,ce+Zn,Pt,Gt,ot,_t);ct.bindFramebuffer(P.READ_FRAMEBUFFER,null),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ue?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(Lt,O,It,se,ce,ot,_t,Rt,We,re,he.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Lt,O,It,se,ce,ot,_t,Rt,We,he.data):P.texSubImage3D(Lt,O,It,se,ce,ot,_t,Rt,We,re,he):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,O,It,se,ot,_t,We,re,he.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,O,It,se,he.width,he.height,We,he.data):P.texSubImage2D(P.TEXTURE_2D,O,It,se,ot,_t,We,re,he);P.pixelStorei(P.UNPACK_ROW_LENGTH,Rn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ln),P.pixelStorei(P.UNPACK_SKIP_ROWS,Yi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ke),O===0&&N.generateMipmaps&&P.generateMipmap(Lt),ct.unbindTexture()},this.copyTextureToTexture3D=function(E,N,z=null,k=null,O=0){return E.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,k=arguments[1]||null,E=arguments[2],N=arguments[3],O=arguments[4]||0),Vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,N,z,k,O)},this.initRenderTarget=function(E){yt.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),ct.unbindTexture()},this.resetState=function(){A=0,C=0,R=null,ct.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class wo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new xt(t),this.density=e}clone(){return new wo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ao{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new xt(t),this.near=e,this.far=n}clone(){return new Ao(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wd extends ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class To{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=rr,this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new w;class tn{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ze(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Xt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Xt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Xt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Xt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ze(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ze(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ze(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ze(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Xt(e,this.array),n=Xt(n,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new le(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new tn(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Mc extends Oe{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let os;const Ds=new w,ls=new w,cs=new w,hs=new Z,Us=new Z,Xd=new zt,Zr=new w,Ns=new w,$r=new w,Vh=new Z,vl=new Z,Hh=new Z;class qd extends ne{constructor(t=new Mc){if(super(),this.isSprite=!0,this.type="Sprite",os===void 0){os=new Zt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new To(e,5);os.setIndex([0,1,2,0,2,3]),os.setAttribute("position",new tn(n,3,0,!1)),os.setAttribute("uv",new tn(n,2,3,!1))}this.geometry=os,this.material=t,this.center=new Z(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ls.setFromMatrixScale(this.matrixWorld),Xd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),cs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ls.multiplyScalar(-cs.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Jr(Zr.set(-.5,-.5,0),cs,a,ls,i,s),Jr(Ns.set(.5,-.5,0),cs,a,ls,i,s),Jr($r.set(.5,.5,0),cs,a,ls,i,s),Vh.set(0,0),vl.set(1,0),Hh.set(1,1);let o=t.ray.intersectTriangle(Zr,Ns,$r,!1,Ds);if(o===null&&(Jr(Ns.set(-.5,.5,0),cs,a,ls,i,s),vl.set(0,1),o=t.ray.intersectTriangle(Zr,$r,Ns,!1,Ds),o===null))return;const l=t.ray.origin.distanceTo(Ds);l<t.near||l>t.far||e.push({distance:l,point:Ds.clone(),uv:Ze.getInterpolation(Ds,Zr,Ns,$r,Vh,vl,Hh,new Z),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Jr(r,t,e,n,i,s){hs.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Us.x=s*hs.x-i*hs.y,Us.y=i*hs.x+s*hs.y):Us.copy(hs),r.copy(t),r.x+=Us.x,r.y+=Us.y,r.applyMatrix4(Xd)}const Kr=new w,Gh=new w;class Yd extends ne{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,i=e.length;n<i;n++){const s=e[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const i=this.levels;let s;for(s=0;s<i.length&&!(e<i[s].distance);s++);return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let s=e[n].distance;if(e[n].object.visible&&(s-=s*e[n].hysteresis),t<s)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){Kr.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(Kr);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Kr.setFromMatrixPosition(t.matrixWorld),Gh.setFromMatrixPosition(this.matrixWorld);const n=Kr.distanceTo(Gh)/t.zoom;e[0].object.visible=!0;let i,s;for(i=1,s=e.length;i<s;i++){let a=e[i].distance;if(e[i].object.visible&&(a-=a*e[i].hysteresis),n>=a)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];e.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}}const Wh=new w,Xh=new Jt,qh=new Jt,av=new w,Yh=new zt,jr=new w,yl=new Ae,Zh=new zt,Ml=new Gi;class Zd extends xe{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vl,this.bindMatrix=new zt,this.bindMatrixInverse=new zt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new we),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,jr),this.boundingBox.expandByPoint(jr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ae),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,jr),this.boundingSphere.expandByPoint(jr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yl.copy(this.boundingSphere),yl.applyMatrix4(i),t.ray.intersectsSphere(yl)!==!1&&(Zh.copy(i).invert(),Ml.copy(t.ray).applyMatrix4(Zh),!(this.boundingBox!==null&&Ml.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ml)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Jt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Vl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===pd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Xh.fromBufferAttribute(i.attributes.skinIndex,t),qh.fromBufferAttribute(i.attributes.skinWeight,t),Wh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const a=qh.getComponent(s);if(a!==0){const o=Xh.getComponent(s);Yh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(av.copy(Wh).applyMatrix4(Yh),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Sc extends ne{constructor(){super(),this.isBone=!0,this.type="Bone"}}class En extends ge{constructor(t=null,e=1,n=1,i,s,a,o,l,c=Ie,h=Ie,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $h=new zt,ov=new zt;class Co{constructor(t=[],e=[]){this.uuid=en(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new zt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new zt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=t.length;s<a;s++){const o=t[s]?t[s].matrixWorld:ov;$h.multiplyMatrices(o,e[s]),$h.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Co(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new En(e,t,t,ke,$e);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let a=e[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Sc),this.bones.push(a),this.boneInverses.push(new zt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class Ms extends le{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const us=new zt,Jh=new zt,Qr=[],Kh=new we,lv=new zt,Os=new xe,Fs=new Ae;class $d extends xe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ms(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,lv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new we),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Kh.copy(t.boundingBox).applyMatrix4(us),this.boundingBox.union(Kh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ae),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Fs.copy(t.boundingSphere).applyMatrix4(us),this.boundingSphere.union(Fs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(n),t.ray.intersectsSphere(Fs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,us),Jh.multiplyMatrices(n,us),Os.matrixWorld=Jh,Os.raycast(t,Qr);for(let a=0,o=Qr.length;a<o;a++){const l=Qr[a];l.instanceId=s,l.object=this,e.push(l)}Qr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ms(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new En(new Float32Array(i*this.count),i,this.count,_o,$e));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Sl(r,t){return r-t}function cv(r,t){return r.z-t.z}function hv(r,t){return t.z-r.z}class uv{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=t,o.count=e,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const Xe=new zt,dv=new xt(1,1,1),bl=new yr,ta=new we,gi=new Ae,Bs=new w,jh=new w,fv=new w,El=new uv,Ue=new xe,ea=[];function pv(r,t,e=0){const n=t.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==t.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)t.setComponent(s+e,a,r.getComponent(s,a))}else t.array.set(r.array,e*n);t.needsUpdate=!0}function _i(r,t){if(r.constructor!==t.constructor){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++)t[n]=r[n]}else{const e=Math.min(r.length,t.length);t.set(new r.constructor(r.buffer,0,e))}}class Jd extends xe{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(t,e,n=e*2,i){super(new Zt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new En(e,t,t,ke,$e);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new En(e,t,t,_r,Xn);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new En(e,t,t,ke,$e);n.colorSpace=Qt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in t.attributes){const a=t.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,h=new o.constructor(n*l),u=new le(h,l,c);e.setAttribute(s,u)}if(t.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new le(s,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),s=e.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new we);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,Xe),this.getBoundingBoxAt(s,ta).applyMatrix4(Xe),t.union(ta)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ae);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,Xe),this.getBoundingSphereAt(s,gi).applyMatrix4(Xe),t.union(gi)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Sl),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Xe.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(dv.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const a=t.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Sl),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=e.getIndex(),o=this._geometryInfo[t];if(i&&a.count>o.reservedIndexCount||e.attributes.position.count>o.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const u=e.getAttribute(h),d=n.getAttribute(h);pv(u,d,l);const f=u.itemSize;for(let m=u.count,_=c;m<_;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=o.indexStart,u=o.reservedIndexCount;o.indexCount=e.getIndex().count;for(let d=0;d<a.count;d++)s.setX(h+d,l+a.getX(d));for(let d=a.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,e.boundingBox!==null&&(o.boundingBox=e.boundingBox.clone()),o.boundingSphere=null,e.boundingSphere!==null&&(o.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?this:(e[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this)}optimize(){let t=0,e=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==e){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,m=f.array,_=t-u;for(let g=h;g<h+d;g++)m[g]=m[g]+_;f.array.copyWithin(e,h,h+d),f.addUpdateRange(e,d),c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const m=d[f],{array:_,itemSize:g}=m;_.copyWithin(t*g,h*g,(h+u)*g),m.addUpdateRange(t*g,u*g)}c.vertexStart=t}t+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){const s=new we,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;a&&(h=a.getX(h)),s.expandByPoint(Bs.fromBufferAttribute(o,h))}i.boundingBox=s}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){const s=new Ae;this.getBoundingBoxAt(t,ta),ta.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;a&&(u=a.getX(u)),Bs.fromBufferAttribute(o,u),l=Math.max(l,s.center.distanceToSquared(Bs))}s.radius=Math.sqrt(l),i.boundingSphere=s}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(s,t*16),i.needsUpdate=!0,this)}getMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return t>=s.length||s[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){const n=this._colorsTexture.image.data,i=this._instanceInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){const n=this._instanceInfo;return t>=n.length||n[t].active===!1||n[t].visible===e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}setGeometryIdAt(t,e){const n=this._instanceInfo,i=this._geometryInfo;return t>=n.length||n[t].active===!1||e>=i.length||i[e].active===!1?null:(n[t].geometryIndex=e,this)}getGeometryIdAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?-1:e[t].geometryIndex}getGeometryRangeAt(t,e={}){if(t<0||t>=this._geometryCount)return null;const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(Sl);e[e.length-1]===n.length;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const i=new Int32Array(t),s=new Int32Array(t);_i(this._multiDrawCounts,i),_i(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=t;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),_i(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),_i(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),_i(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Zt,this._initializeGeometry(s));const a=this.geometry;s.index&&_i(s.index.array,a.index.array);for(const o in s.attributes)_i(s.attributes[o].array,a.attributes[o].array)}raycast(t,e){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;Ue.material=this.material,Ue.geometry.index=a.index,Ue.geometry.attributes=a.attributes,Ue.geometry.boundingBox===null&&(Ue.geometry.boundingBox=new we),Ue.geometry.boundingSphere===null&&(Ue.geometry.boundingSphere=new Ae);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,h=i[c];Ue.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,Ue.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Ue.geometry.boundingBox),this.getBoundingSphereAt(c,Ue.geometry.boundingSphere),Ue.raycast(t,ea);for(let u=0,d=ea.length;u<d;u++){const f=ea[u];f.object=this,f.batchId=o,e.push(f)}ea.length=0}Ue.material=null,Ue.geometry.index=null,Ue.geometry.attributes={},Ue.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data;d&&(Xe.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),bl.setFromProjectionMatrix(Xe,t.coordinateSystem));let _=0;if(this.sortObjects){Xe.copy(this.matrixWorld).invert(),Bs.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Xe),jh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Xe);for(let y=0,v=l.length;y<v;y++)if(l[y].visible&&l[y].active){const x=l[y].geometryIndex;this.getMatrixAt(y,Xe),this.getBoundingSphereAt(x,gi).applyMatrix4(Xe);let I=!1;if(d&&(I=!bl.intersectsSphere(gi)),!I){const A=u[x],C=fv.subVectors(gi.center,Bs).dot(jh);El.push(A.start,A.count,C,y)}}const g=El.list,p=this.customSort;p===null?g.sort(s.transparent?hv:cv):p.call(this,g,n);for(let y=0,v=g.length;y<v;y++){const x=g[y];c[_]=x.start*o,h[_]=x.count,m[_]=x.index,_++}El.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){const y=l[g].geometryIndex;let v=!1;if(d&&(this.getMatrixAt(g,Xe),this.getBoundingSphereAt(y,gi).applyMatrix4(Xe),v=!bl.intersectsSphere(gi)),!v){const x=u[y];c[_]=x.start*o,h[_]=x.count,m[_]=g,_++}}f.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,s,a){this.onBeforeRender(t,null,i,s,a)}}class He extends Oe{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lo=new w,co=new w,Qh=new zt,zs=new Gi,na=new Ae,wl=new w,tu=new w;class si extends ne{constructor(t=new Zt,e=new He){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)lo.fromBufferAttribute(e,i-1),co.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=lo.distanceTo(co);t.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(i),na.radius+=s,t.ray.intersectsSphere(na)===!1)return;Qh.copy(i).invert(),zs.copy(t.ray).applyMatrix4(Qh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=h.getX(_),y=h.getX(_+1),v=ia(this,t,zs,l,p,y);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=ia(this,t,zs,l,_,g);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=ia(this,t,zs,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=ia(this,t,zs,l,m-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ia(r,t,e,n,i,s){const a=r.geometry.attributes.position;if(lo.fromBufferAttribute(a,i),co.fromBufferAttribute(a,s),e.distanceSqToSegment(lo,co,wl,tu)>n)return;wl.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(wl);if(!(l<t.near||l>t.far))return{distance:l,point:tu.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const eu=new w,nu=new w;class Cn extends si{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)eu.fromBufferAttribute(e,i),nu.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+eu.distanceTo(nu);t.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kd extends si{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class bc extends Oe{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new xt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const iu=new zt,Yl=new Gi,sa=new Ae,ra=new w;class jd extends ne{constructor(t=new Zt,e=new bc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(i),sa.radius+=s,t.ray.intersectsSphere(sa)===!1)return;iu.copy(i).invert(),Yl.copy(t.ray).applyMatrix4(iu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);ra.fromBufferAttribute(u,g),su(ra,g,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,_=f;m<_;m++)ra.fromBufferAttribute(u,m),su(ra,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function su(r,t,e,n,i,s,a){const o=Yl.distanceSqToPoint(r);if(o<e){const l=new w;Yl.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class mv extends ge{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:Me,this.magFilter=s!==void 0?s:Me,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class gv extends ge{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Ie,this.minFilter=Ie,this.generateMipmaps=!1,this.needsUpdate=!0}}class Ro extends ge{constructor(t,e,n,i,s,a,o,l,c,h,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class _v extends Ro{constructor(t,e,n,i,s,a){super(t,e,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=an,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xv extends Ro{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Wn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class vv extends ge{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new Z:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new w,i=[],s=[],a=[],o=new w,l=new zt;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new w)}s[0]=new w,a[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(me(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(me(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Po extends pn{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Z){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Qd extends Po{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ec(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+t*s+e*a+n*o}}}const aa=new w,Al=new Ec,Tl=new Ec,Cl=new Ec;class tf extends pn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new w){const n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(aa.subVectors(i[0],i[1]).add(i[0]),c=aa);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(aa.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=aa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Al.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,_,g),Tl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,_,g),Cl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(Al.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Tl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Cl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Al.calc(l),Tl.calc(l),Cl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new w().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ru(r,t,e,n,i){const s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function yv(r,t){const e=1-r;return e*e*t}function Mv(r,t){return 2*(1-r)*r*t}function Sv(r,t){return r*r*t}function Ks(r,t,e,n){return yv(r,t)+Mv(r,e)+Sv(r,n)}function bv(r,t){const e=1-r;return e*e*e*t}function Ev(r,t){const e=1-r;return 3*e*e*r*t}function wv(r,t){return 3*(1-r)*r*r*t}function Av(r,t){return r*r*r*t}function js(r,t,e,n,i){return bv(r,t)+Ev(r,e)+wv(r,n)+Av(r,i)}class wc extends pn{constructor(t=new Z,e=new Z,n=new Z,i=new Z){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Z){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(js(t,i.x,s.x,a.x,o.x),js(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ef extends pn{constructor(t=new w,e=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new w){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(js(t,i.x,s.x,a.x,o.x),js(t,i.y,s.y,a.y,o.y),js(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ac extends pn{constructor(t=new Z,e=new Z){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nf extends pn{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tc extends pn{constructor(t=new Z,e=new Z,n=new Z){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Z){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(Ks(t,i.x,s.x,a.x),Ks(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cc extends pn{constructor(t=new w,e=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new w){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(Ks(t,i.x,s.x,a.x),Ks(t,i.y,s.y,a.y),Ks(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rc extends pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Z){const n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(ru(o,l.x,c.x,h.x,u.x),ru(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Z().fromArray(i))}return this}}var ho=Object.freeze({__proto__:null,ArcCurve:Qd,CatmullRomCurve3:tf,CubicBezierCurve:wc,CubicBezierCurve3:ef,EllipseCurve:Po,LineCurve:Ac,LineCurve3:nf,QuadraticBezierCurve:Tc,QuadraticBezierCurve3:Cc,SplineCurve:Rc});class sf extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ho[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ho[i.type]().fromJSON(i))}return this}}class lr extends sf{constructor(t){super(),this.type="Path",this.currentPoint=new Z,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ac(this.currentPoint.clone(),new Z(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Tc(this.currentPoint.clone(),new Z(t,e),new Z(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){const o=new wc(this.currentPoint.clone(),new Z(t,e),new Z(n,i),new Z(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Rc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,a,o,l),this}absellipse(t,e,n,i,s,a,o,l){const c=new Po(t,e,n,i,s,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Mr extends Zt{constructor(t=[new Z(0,-.5),new Z(.5,0),new Z(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=me(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],h=1/e,u=new w,d=new Z,f=new w,m=new w,_=new w;let g=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:g=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:g=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(m)}for(let y=0;y<=e;y++){const v=n+y*h*i,x=Math.sin(v),I=Math.cos(v);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*x,u.y=t[A].y,u.z=t[A].x*I,a.push(u.x,u.y,u.z),d.x=y/e,d.y=A/(t.length-1),o.push(d.x,d.y);const C=l[3*A+0]*x,R=l[3*A+1],b=l[3*A+0]*I;c.push(C,R,b)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){const x=v+y*t.length,I=x,A=x+t.length,C=x+t.length+1,R=x+1;s.push(I,A,R),s.push(C,R,A)}this.setIndex(s),this.setAttribute("position",new At(a,3)),this.setAttribute("uv",new At(o,2)),this.setAttribute("normal",new At(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.points,t.segments,t.phiStart,t.phiLength)}}class Io extends Mr{constructor(t=1,e=1,n=4,i=8){const s=new lr;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Io(t.radius,t.length,t.capSegments,t.radialSegments)}}class Lo extends Zt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new w,h=new Z;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new At(a,3)),this.setAttribute("normal",new At(o,3)),this.setAttribute("uv",new At(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class As extends Zt{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new At(u,3)),this.setAttribute("normal",new At(d,3)),this.setAttribute("uv",new At(f,2));function y(){const x=new w,I=new w;let A=0;const C=(e-t)/n;for(let R=0;R<=s;R++){const b=[],M=R/s,L=M*(e-t)+t;for(let V=0;V<=i;V++){const B=V/i,H=B*l+o,j=Math.sin(H),X=Math.cos(H);I.x=L*j,I.y=-M*n+g,I.z=L*X,u.push(I.x,I.y,I.z),x.set(j,C,X).normalize(),d.push(x.x,x.y,x.z),f.push(B,1-M),b.push(m++)}_.push(b)}for(let R=0;R<i;R++)for(let b=0;b<s;b++){const M=_[b][R],L=_[b+1][R],V=_[b+1][R+1],B=_[b][R+1];(t>0||b!==0)&&(h.push(M,L,B),A+=3),(e>0||b!==s-1)&&(h.push(L,V,B),A+=3)}c.addGroup(p,A,0),p+=A}function v(x){const I=m,A=new Z,C=new w;let R=0;const b=x===!0?t:e,M=x===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const L=m;for(let V=0;V<=i;V++){const H=V/i*l+o,j=Math.cos(H),X=Math.sin(H);C.x=b*X,C.y=g*M,C.z=b*j,u.push(C.x,C.y,C.z),d.push(0,M,0),A.x=j*.5+.5,A.y=X*.5*M+.5,f.push(A.x,A.y),m++}for(let V=0;V<i;V++){const B=I+V,H=L+V;x===!0?h.push(H,H+1,B):h.push(H+1,H,B),R+=3}c.addGroup(p,R,x===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Do extends As{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Do(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oi extends Zt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new At(s,3)),this.setAttribute("normal",new At(s.slice(),3)),this.setAttribute("uv",new At(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const v=new w,x=new w,I=new w;for(let A=0;A<e.length;A+=3)f(e[A+0],v),f(e[A+1],x),f(e[A+2],I),l(v,x,I,y)}function l(y,v,x,I){const A=I+1,C=[];for(let R=0;R<=A;R++){C[R]=[];const b=y.clone().lerp(x,R/A),M=v.clone().lerp(x,R/A),L=A-R;for(let V=0;V<=L;V++)V===0&&R===A?C[R][V]=b:C[R][V]=b.clone().lerp(M,V/L)}for(let R=0;R<A;R++)for(let b=0;b<2*(A-R)-1;b++){const M=Math.floor(b/2);b%2===0?(d(C[R][M+1]),d(C[R+1][M]),d(C[R][M])):(d(C[R][M+1]),d(C[R+1][M+1]),d(C[R+1][M]))}}function c(y){const v=new w;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(y),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function h(){const y=new w;for(let v=0;v<s.length;v+=3){y.x=s[v+0],y.y=s[v+1],y.z=s[v+2];const x=g(y)/2/Math.PI+.5,I=p(y)/Math.PI+.5;a.push(x,1-I)}m(),u()}function u(){for(let y=0;y<a.length;y+=6){const v=a[y+0],x=a[y+2],I=a[y+4],A=Math.max(v,x,I),C=Math.min(v,x,I);A>.9&&C<.1&&(v<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),I<.2&&(a[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,v){const x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function m(){const y=new w,v=new w,x=new w,I=new w,A=new Z,C=new Z,R=new Z;for(let b=0,M=0;b<s.length;b+=9,M+=6){y.set(s[b+0],s[b+1],s[b+2]),v.set(s[b+3],s[b+4],s[b+5]),x.set(s[b+6],s[b+7],s[b+8]),A.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),I.copy(y).add(v).add(x).divideScalar(3);const L=g(I);_(A,M+0,y,L),_(C,M+2,v,L),_(R,M+4,x,L)}}function _(y,v,x,I){I<0&&y.x===1&&(a[v]=y.x-1),x.x===0&&x.z===0&&(a[v]=I/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oi(t.vertices,t.indices,t.radius,t.details)}}class Uo extends oi{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Uo(t.radius,t.detail)}}const oa=new w,la=new w,Rl=new w,ca=new Ze;class rf extends Zt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(Ui*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:p}=ca;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ca.getNormal(Rl),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){const v=(y+1)%3,x=u[y],I=u[v],A=ca[h[y]],C=ca[h[v]],R=`${x}_${I}`,b=`${I}_${x}`;b in d&&d[b]?(Rl.dot(d[b].normal)<=s&&(f.push(A.x,A.y,A.z),f.push(C.x,C.y,C.z)),d[b]=null):R in d||(d[R]={index0:c[y],index1:c[v],normal:Rl.clone()})}}for(const m in d)if(d[m]){const{index0:_,index1:g}=d[m];oa.fromBufferAttribute(o,_),la.fromBufferAttribute(o,g),f.push(oa.x,oa.y,oa.z),f.push(la.x,la.y,la.z)}this.setAttribute("position",new At(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Oi extends lr{constructor(t){super(t),this.uuid=en(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new lr().fromJSON(i))}return this}}const Tv={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=af(r,0,i,e,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,f;if(n&&(s=Lv(r,t,s,e)),r.length>80*e){o=c=r[0],l=h=r[1];for(let m=e;m<i;m+=e)u=r[m],d=r[m+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return cr(s,a,e,o,l,f,0),a}};function af(r,t,e,n,i){let s,a;if(i===Gv(r,t,e,n)>0)for(s=t;s<e;s+=n)a=au(s,r[s],r[s+1],a);else for(s=e-n;s>=t;s-=n)a=au(s,r[s],r[s+1],a);return a&&No(a,a.next)&&(ur(a),a=a.next),a}function Vi(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(No(e,e.next)||de(e.prev,e,e.next)===0)){if(ur(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function cr(r,t,e,n,i,s,a){if(!r)return;!a&&s&&Fv(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Rv(r,n,i,s):Cv(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),ur(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=Pv(Vi(r),t,e),cr(r,t,e,n,i,s,2)):a===2&&Iv(r,t,e,n,i,s):cr(Vi(r),t,e,n,i,s,1);break}}}function Cv(r){const t=r.prev,e=r,n=r.next;if(de(t,e,n)>=0)return!1;const i=t.x,s=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&gs(i,o,s,l,a,c,m.x,m.y)&&de(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Rv(r,t,e,n){const i=r.prev,s=r,a=r.next;if(de(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=Zl(f,m,t,e,n),y=Zl(_,g,t,e,n);let v=r.prevZ,x=r.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&gs(o,h,l,u,c,d,v.x,v.y)&&de(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&gs(o,h,l,u,c,d,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&gs(o,h,l,u,c,d,v.x,v.y)&&de(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&gs(o,h,l,u,c,d,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Pv(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!No(i,s)&&of(i,n,n.next,s)&&hr(i,s)&&hr(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),ur(n),ur(n.next),n=r=s),n=n.next}while(n!==r);return Vi(n)}function Iv(r,t,e,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&kv(a,o)){let l=lf(a,o);a=Vi(a,a.next),l=Vi(l,l.next),cr(a,t,e,n,i,s,0),cr(l,t,e,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function Lv(r,t,e,n){const i=[];let s,a,o,l,c;for(s=0,a=t.length;s<a;s++)o=t[s]*n,l=s<a-1?t[s+1]*n:r.length,c=af(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(zv(c));for(i.sort(Dv),s=0;s<i.length;s++)e=Uv(i[s],e);return e}function Dv(r,t){return r.x-t.x}function Uv(r,t){const e=Nv(r,t);if(!e)return t;const n=lf(e,r);return Vi(n,n.next),Vi(e,e.next)}function Nv(r,t){let e=t,n=-1/0,i;const s=r.x,a=r.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&gs(a<c?s:n,a,l,c,a<c?n:s,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(s-e.x),hr(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&Ov(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function Ov(r,t){return de(r.prev,r,t.prev)<0&&de(t.next,r,r.next)<0}function Fv(r,t,e,n){let i=r;do i.z===0&&(i.z=Zl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Bv(i)}function Bv(r){let t,e,n,i,s,a,o,l,c=1;do{for(e=r,r=null,s=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(a>1);return r}function Zl(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function zv(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function gs(r,t,e,n,i,s,a,o){return(i-a)*(t-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(i-a)*(n-o)}function kv(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Vv(r,t)&&(hr(r,t)&&hr(t,r)&&Hv(r,t)&&(de(r.prev,r,t.prev)||de(r,t.prev,t))||No(r,t)&&de(r.prev,r,r.next)>0&&de(t.prev,t,t.next)>0)}function de(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function No(r,t){return r.x===t.x&&r.y===t.y}function of(r,t,e,n){const i=ua(de(r,t,e)),s=ua(de(r,t,n)),a=ua(de(e,n,r)),o=ua(de(e,n,t));return!!(i!==s&&a!==o||i===0&&ha(r,e,t)||s===0&&ha(r,n,t)||a===0&&ha(e,r,n)||o===0&&ha(e,t,n))}function ha(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function ua(r){return r>0?1:r<0?-1:0}function Vv(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&of(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function hr(r,t){return de(r.prev,r,r.next)<0?de(r,t,r.next)>=0&&de(r,r.prev,t)>=0:de(r,t,r.prev)<0||de(r,r.next,t)<0}function Hv(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function lf(r,t){const e=new $l(r.i,r.x,r.y),n=new $l(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function au(r,t,e,n){const i=new $l(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ur(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function $l(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gv(r,t,e,n){let i=0;for(let s=t,a=e-n;s<e;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class wn{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return wn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];ou(t),lu(n,t);let a=t.length;e.forEach(ou);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,lu(n,e[l]);const o=Tv.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ou(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function lu(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Oo extends Zt{constructor(t=new Oi([new Z(.5,.5),new Z(-.5,.5),new Z(-.5,-.5),new Z(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new At(i,3)),this.setAttribute("uv",new At(s,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Wv;let v,x=!1,I,A,C,R;p&&(v=p.getSpacedPoints(h),x=!0,d=!1,I=p.computeFrenetFrames(h,!1),A=new w,C=new w,R=new w),d||(g=0,f=0,m=0,_=0);const b=o.extractPoints(c);let M=b.shape;const L=b.holes;if(!wn.isClockWise(M)){M=M.reverse();for(let Q=0,rt=L.length;Q<rt;Q++){const P=L[Q];wn.isClockWise(P)&&(L[Q]=P.reverse())}}const B=wn.triangulateShape(M,L),H=M;for(let Q=0,rt=L.length;Q<rt;Q++){const P=L[Q];M=M.concat(P)}function j(Q,rt,P){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(rt,P)}const X=M.length,it=B.length;function W(Q,rt,P){let Ct,et,vt;const ct=Q.x-rt.x,Nt=Q.y-rt.y,yt=P.x-Q.x,T=P.y-Q.y,S=ct*ct+Nt*Nt,F=ct*T-Nt*yt;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(S),tt=Math.sqrt(yt*yt+T*T),$=rt.x-Nt/q,Tt=rt.y+ct/q,dt=P.x-T/tt,Mt=P.y+yt/tt,$t=((dt-$)*T-(Mt-Tt)*yt)/(ct*T-Nt*yt);Ct=$+ct*$t-Q.x,et=Tt+Nt*$t-Q.y;const nt=Ct*Ct+et*et;if(nt<=2)return new Z(Ct,et);vt=Math.sqrt(nt/2)}else{let q=!1;ct>Number.EPSILON?yt>Number.EPSILON&&(q=!0):ct<-Number.EPSILON?yt<-Number.EPSILON&&(q=!0):Math.sign(Nt)===Math.sign(T)&&(q=!0),q?(Ct=-Nt,et=ct,vt=Math.sqrt(S)):(Ct=ct,et=Nt,vt=Math.sqrt(S/2))}return new Z(Ct/vt,et/vt)}const ht=[];for(let Q=0,rt=H.length,P=rt-1,Ct=Q+1;Q<rt;Q++,P++,Ct++)P===rt&&(P=0),Ct===rt&&(Ct=0),ht[Q]=W(H[Q],H[P],H[Ct]);const ft=[];let bt,Ht=ht.concat();for(let Q=0,rt=L.length;Q<rt;Q++){const P=L[Q];bt=[];for(let Ct=0,et=P.length,vt=et-1,ct=Ct+1;Ct<et;Ct++,vt++,ct++)vt===et&&(vt=0),ct===et&&(ct=0),bt[Ct]=W(P[Ct],P[vt],P[ct]);ft.push(bt),Ht=Ht.concat(bt)}for(let Q=0;Q<g;Q++){const rt=Q/g,P=f*Math.cos(rt*Math.PI/2),Ct=m*Math.sin(rt*Math.PI/2)+_;for(let et=0,vt=H.length;et<vt;et++){const ct=j(H[et],ht[et],Ct);lt(ct.x,ct.y,-P)}for(let et=0,vt=L.length;et<vt;et++){const ct=L[et];bt=ft[et];for(let Nt=0,yt=ct.length;Nt<yt;Nt++){const T=j(ct[Nt],bt[Nt],Ct);lt(T.x,T.y,-P)}}}const te=m+_;for(let Q=0;Q<X;Q++){const rt=d?j(M[Q],Ht[Q],te):M[Q];x?(C.copy(I.normals[0]).multiplyScalar(rt.x),A.copy(I.binormals[0]).multiplyScalar(rt.y),R.copy(v[0]).add(C).add(A),lt(R.x,R.y,R.z)):lt(rt.x,rt.y,0)}for(let Q=1;Q<=h;Q++)for(let rt=0;rt<X;rt++){const P=d?j(M[rt],Ht[rt],te):M[rt];x?(C.copy(I.normals[Q]).multiplyScalar(P.x),A.copy(I.binormals[Q]).multiplyScalar(P.y),R.copy(v[Q]).add(C).add(A),lt(R.x,R.y,R.z)):lt(P.x,P.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){const rt=Q/g,P=f*Math.cos(rt*Math.PI/2),Ct=m*Math.sin(rt*Math.PI/2)+_;for(let et=0,vt=H.length;et<vt;et++){const ct=j(H[et],ht[et],Ct);lt(ct.x,ct.y,u+P)}for(let et=0,vt=L.length;et<vt;et++){const ct=L[et];bt=ft[et];for(let Nt=0,yt=ct.length;Nt<yt;Nt++){const T=j(ct[Nt],bt[Nt],Ct);x?lt(T.x,T.y+v[h-1].y,v[h-1].x+P):lt(T.x,T.y,u+P)}}}J(),at();function J(){const Q=i.length/3;if(d){let rt=0,P=X*rt;for(let Ct=0;Ct<it;Ct++){const et=B[Ct];Dt(et[2]+P,et[1]+P,et[0]+P)}rt=h+g*2,P=X*rt;for(let Ct=0;Ct<it;Ct++){const et=B[Ct];Dt(et[0]+P,et[1]+P,et[2]+P)}}else{for(let rt=0;rt<it;rt++){const P=B[rt];Dt(P[2],P[1],P[0])}for(let rt=0;rt<it;rt++){const P=B[rt];Dt(P[0]+X*h,P[1]+X*h,P[2]+X*h)}}n.addGroup(Q,i.length/3-Q,0)}function at(){const Q=i.length/3;let rt=0;wt(H,rt),rt+=H.length;for(let P=0,Ct=L.length;P<Ct;P++){const et=L[P];wt(et,rt),rt+=et.length}n.addGroup(Q,i.length/3-Q,1)}function wt(Q,rt){let P=Q.length;for(;--P>=0;){const Ct=P;let et=P-1;et<0&&(et=Q.length-1);for(let vt=0,ct=h+g*2;vt<ct;vt++){const Nt=X*vt,yt=X*(vt+1),T=rt+Ct+Nt,S=rt+et+Nt,F=rt+et+yt,q=rt+Ct+yt;Vt(T,S,F,q)}}}function lt(Q,rt,P){l.push(Q),l.push(rt),l.push(P)}function Dt(Q,rt,P){Bt(Q),Bt(rt),Bt(P);const Ct=i.length/3,et=y.generateTopUV(n,i,Ct-3,Ct-2,Ct-1);Kt(et[0]),Kt(et[1]),Kt(et[2])}function Vt(Q,rt,P,Ct){Bt(Q),Bt(rt),Bt(Ct),Bt(rt),Bt(P),Bt(Ct);const et=i.length/3,vt=y.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);Kt(vt[0]),Kt(vt[1]),Kt(vt[3]),Kt(vt[1]),Kt(vt[2]),Kt(vt[3])}function Bt(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function Kt(Q){s.push(Q.x),s.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Xv(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,a=t.shapes.length;s<a;s++){const o=e[t.shapes[s]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ho[i.type]().fromJSON(i)),new Oo(n,t.options)}}const Wv={generateTopUV:function(r,t,e,n,i){const s=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Z(s,a),new Z(o,l),new Z(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],m=t[i*3+2],_=t[s*3],g=t[s*3+1],p=t[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Z(a,1-l),new Z(c,1-u),new Z(d,1-m),new Z(_,1-p)]:[new Z(o,1-l),new Z(h,1-u),new Z(f,1-m),new Z(g,1-p)]}};function Xv(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Fo extends oi{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Fo(t.radius,t.detail)}}class Sr extends oi{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Sr(t.radius,t.detail)}}class Bo extends Zt{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new w,m=new Z;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const p=s+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,v=y,x=y+n+1,I=y+n+2,A=y+1;o.push(v,x,A),o.push(x,I,A)}}this.setIndex(o),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class zo extends Zt{constructor(t=new Oi([new Z(0,.5),new Z(-.5,-.5),new Z(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new At(i,3)),this.setAttribute("normal",new At(s,3)),this.setAttribute("uv",new At(a,2));function c(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const m=d.holes;wn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];wn.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=wn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],v=y[0]+u,x=y[1]+u,I=y[2]+u;n.push(v,x,I),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return qv(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const a=e[t.shapes[i]];n.push(a)}return new zo(n,t.curveSegments)}}function qv(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class br extends Zt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new w,d=new w,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let I=0;I<=e;I++){const A=I/e;u.x=-t*Math.cos(i+A*s)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(i+A*s)*Math.sin(a+v*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(A+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],x=h[p][y],I=h[p+1][y],A=h[p+1][y+1];(p!==0||a>0)&&f.push(v,x,A),(p!==n-1||l<Math.PI)&&f.push(x,I,A)}this.setIndex(f),this.setAttribute("position",new At(m,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new br(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ko extends oi{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ko(t.radius,t.detail)}}class Vo extends Zt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new w,u=new w,d=new w;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const _=m/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const _=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;a.push(_,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new At(o,3)),this.setAttribute("normal",new At(l,3)),this.setAttribute("uv",new At(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ho extends Zt{constructor(t=1,e=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],h=[],u=new w,d=new w,f=new w,m=new w,_=new w,g=new w,p=new w;for(let v=0;v<=n;++v){const x=v/n*s*Math.PI*2;y(x,s,a,t,f),y(x+.01,s,a,t,m),g.subVectors(m,f),p.addVectors(m,f),_.crossVectors(g,p),p.crossVectors(_,g),_.normalize(),p.normalize();for(let I=0;I<=i;++I){const A=I/i*Math.PI*2,C=-e*Math.cos(A),R=e*Math.sin(A);u.x=f.x+(C*p.x+R*_.x),u.y=f.y+(C*p.y+R*_.y),u.z=f.z+(C*p.z+R*_.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(v/n),h.push(I/i)}}for(let v=1;v<=n;v++)for(let x=1;x<=i;x++){const I=(i+1)*(v-1)+(x-1),A=(i+1)*v+(x-1),C=(i+1)*v+x,R=(i+1)*(v-1)+x;o.push(I,A,R),o.push(A,C,R)}this.setIndex(o),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(h,2));function y(v,x,I,A,C){const R=Math.cos(v),b=Math.sin(v),M=I/x*v,L=Math.cos(M);C.x=A*(2+L)*.5*R,C.y=A*(2+L)*b*.5,C.z=A*Math.sin(M)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ho(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Go extends Zt{constructor(t=new Cc(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new w,l=new w,c=new Z;let h=new w;const u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new At(u,3)),this.setAttribute("normal",new At(d,3)),this.setAttribute("uv",new At(f,2));function _(){for(let v=0;v<e;v++)g(v);g(s===!1?e:0),y(),p()}function g(v){h=t.getPointAt(v/e,h);const x=a.normals[v],I=a.binormals[v];for(let A=0;A<=i;A++){const C=A/i*Math.PI*2,R=Math.sin(C),b=-Math.cos(C);l.x=b*x.x+R*I.x,l.y=b*x.y+R*I.y,l.z=b*x.z+R*I.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let v=1;v<=e;v++)for(let x=1;x<=i;x++){const I=(i+1)*(v-1)+(x-1),A=(i+1)*v+(x-1),C=(i+1)*v+x,R=(i+1)*(v-1)+x;m.push(I,A,R),m.push(A,C,R)}}function y(){for(let v=0;v<=e;v++)for(let x=0;x<=i;x++)c.x=v/e,c.y=x/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Go(new ho[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Pc extends Zt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new w,s=new w;if(t.index!==null){const a=t.attributes.position,o=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){const p=o.getX(m+g),y=o.getX(m+(g+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,y),cu(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{const a=t.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),cu(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new At(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function cu(r,t,e){const n=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var hu=Object.freeze({__proto__:null,BoxGeometry:Wi,CapsuleGeometry:Io,CircleGeometry:Lo,ConeGeometry:Do,CylinderGeometry:As,DodecahedronGeometry:Uo,EdgesGeometry:rf,ExtrudeGeometry:Oo,IcosahedronGeometry:Fo,LatheGeometry:Mr,OctahedronGeometry:Sr,PlaneGeometry:Es,PolyhedronGeometry:oi,RingGeometry:Bo,ShapeGeometry:zo,SphereGeometry:br,TetrahedronGeometry:ko,TorusGeometry:Vo,TorusKnotGeometry:Ho,TubeGeometry:Go,WireframeGeometry:Pc});class cf extends Oe{static get type(){return"ShadowMaterial"}constructor(t){super(),this.isShadowMaterial=!0,this.color=new xt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class hf extends on{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Ic extends Oe{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class uf extends Ic{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class df extends Oe{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new xt(16777215),this.specular=new xt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=gr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ff extends Oe{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new xt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class pf extends Oe{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class mf extends Oe{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=gr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gf extends Oe{static get type(){return"MeshMatcapMaterial"}constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new xt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ri,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _f extends He{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function Ii(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function xf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function vf(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Jl(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=e[s]*t;for(let l=0;l!==t;++l)i[a++]=r[o+l]}return i}function Lc(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(t.push(s.time),e.push.apply(e,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(t.push(s.time),a.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(t.push(s.time),e.push(a)),s=r[i++];while(s!==void 0)}function Yv(r,t,e,n,i=30){const s=r.clone();s.name=t;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<e||m>=n)){u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}}u.length!==0&&(c.times=Ii(u,c.times.constructor),c.values=Ii(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function Zv(r,t=0,e=r,n=30){n<=0&&(n=30);const i=e.tracks.length,s=t/n;for(let a=0;a<i;++a){const o=e.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=o.times.length-1;let _;if(s<=o.times[0]){const p=h,y=u-h;_=o.values.slice(p,y)}else if(s>=o.times[m]){const p=m*u+h,y=p+u-h;_=o.values.slice(p,y)}else{const p=o.createInterpolant(),y=h,v=u-h;p.evaluate(s),_=p.resultBuffer.slice(y,v)}l==="quaternion"&&new Ne().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let p=0;p<g;++p){const y=p*f+d;if(l==="quaternion")Ne.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{const v=f-d*2;for(let x=0;x<v;++x)c.values[y+x]-=_[x]}}}return r.blendMode=uc,r}const $v={convertArray:Ii,isTypedArray:xf,getKeyframeOrder:vf,sortedArray:Jl,flattenJSON:Lc,subclip:Yv,makeClipAdditive:Zv};class Er{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=s)){const o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class yf extends Er{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ci,endingEnd:Ci}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ri:s=t,o=2*e-n;break;case sr:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ri:a=t,l=2*n-e;break;case sr:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let I=0;I!==o;++I)s[I]=p*a[h+I]+y*a[c+I]+v*a[l+I]+x*a[u+I];return s}}class Dc extends Er{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class Mf extends Er{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class mn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ii(e,this.TimeBufferType),this.values=Ii(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ii(t.times,Array),values:Ii(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Mf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Dc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new yf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ir:e=this.InterpolantFactoryMethodDiscrete;break;case ao:e=this.InterpolantFactoryMethodLinear;break;case ba:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return ao;case this.InterpolantFactoryMethodSmooth:return ba}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&xf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ba,s=t.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=ao;class Xi extends mn{constructor(t,e,n){super(t,e,n)}}Xi.prototype.ValueTypeName="bool";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ir;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;class Uc extends mn{}Uc.prototype.ValueTypeName="color";class dr extends mn{}dr.prototype.ValueTypeName="number";class Sf extends Er{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e);let c=t*o;for(let h=c+o;c!==h;c+=4)Ne.slerpFlat(s,0,a,c-o,a,c,l);return s}}class wr extends mn{InterpolantFactoryMethodLinear(t){return new Sf(this.times,this.values,this.getValueSize(),t)}}wr.prototype.ValueTypeName="quaternion";wr.prototype.InterpolantFactoryMethodSmooth=void 0;class qi extends mn{constructor(t,e,n){super(t,e,n)}}qi.prototype.ValueTypeName="string";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=ir;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;class fr extends mn{}fr.prototype.ValueTypeName="vector";class pr{constructor(t="",e=-1,n=[],i=yo){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=en(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Kv(n[a]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,a=n.length;s!==a;++s)e.push(mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=vf(l);l=Jl(l,1,h),c=Jl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new dr(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){const c=t[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const g=[],p=[];Lc(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},i=[],s=t.name||"default",a=t.fps||30,o=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const v=d[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}i.push(new dr(".morphTargetInfluence["+_+"]",g,p))}l=f.length*a}else{const f=".bones["+e[u].name+"]";n(fr,f+".position",d,"pos",i),n(wr,f+".quaternion",d,"rot",i),n(fr,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Jv(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return dr;case"vector":case"vector2":case"vector3":case"vector4":return fr;case"color":return Uc;case"quaternion":return wr;case"bool":case"boolean":return Xi;case"string":return qi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Kv(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Jv(r.type);if(r.times===void 0){const e=[],n=[];Lc(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const zn={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Nc{constructor(t,e,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const bf=new Nc;class Je{constructor(t){this.manager=t!==void 0?t:bf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Je.DEFAULT_MATERIAL_NAME="__DEFAULT";const Nn={};class jv extends Error{constructor(t,e){super(t),this.response=e}}class qn extends Je{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=zn.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Nn[t]!==void 0){Nn[t].push({onLoad:e,onProgress:n,onError:i});return}Nn[t]=[],Nn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Nn[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:v,value:x})=>{if(v)p.close();else{_+=x.byteLength;const I=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,C=h.length;A<C;A++){const R=h[A];R.onProgress&&R.onProgress(I)}p.enqueue(x),y()}},v=>{p.error(v)})}}});return new Response(g)}else throw new jv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{zn.add(t,c);const h=Nn[t];delete Nn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Nn[t];if(h===void 0)throw this.manager.itemError(t),c;delete Nn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Qv extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new qn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=pr.parse(t[n]);e.push(i)}return e}}class ty extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=[],o=new Ro,l=new qn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(t[u],function(d){const f=s.parse(d,!0);a[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Me),o.image=a,o.format=f.format,o.needsUpdate=!0,e&&e(o))},n,i)}if(Array.isArray(t))for(let u=0,d=t.length;u<d;++u)h(u);else l.load(t,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){a[m]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)a[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+_]),a[m].format=d.format,a[m].width=d.width,a[m].height=d.height}o.image=a}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Me),o.format=d.format,o.needsUpdate=!0,e&&e(o)},n,i);return o}}class mr extends Je{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=zn.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=or("img");function l(){h(),zn.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class ey extends Je{constructor(t){super(t)}load(t,e,n,i){const s=new vr;s.colorSpace=Ye;const a=new mr(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(t[c],function(h){s.images[c]=h,o++,o===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return s}}class ny extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new En,o=new qn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(t,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:an,a.wrapT=c.wrapT!==void 0?c.wrapT:an,a.magFilter=c.magFilter!==void 0?c.magFilter:Me,a.minFilter=c.minFilter!==void 0?c.minFilter:Me,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=Sn),c.mipmapCount===1&&(a.minFilter=Me),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,e&&e(a,c)},n,i),a}}class iy extends Je{constructor(t){super(t)}load(t,e,n,i){const s=new ge,a=new mr(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class li extends ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ef extends li{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Pl=new zt,uu=new w,du=new w;class Oc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.map=null,this.mapPass=null,this.matrix=new zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yr,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;uu.setFromMatrixPosition(t.matrixWorld),e.position.copy(uu),du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(du),e.updateMatrixWorld(),Pl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Pl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sy extends Oc{constructor(){super(new ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=vs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class wf extends li{constructor(t,e,n=0,i=Math.PI/3,s=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.target=new ne,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new sy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const fu=new zt,ks=new w,Il=new w;class ry extends Oc{constructor(){super(new ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Z(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(ks),Il.copy(n.position),Il.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Il),n.updateMatrixWorld(),i.makeTranslation(-ks.x,-ks.y,-ks.z),fu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fu)}}class Af extends li{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ry}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ay extends Oc{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tf extends li{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.target=new ne,this.shadow=new ay}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Cf extends li{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Rf extends li{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class Pf{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new w)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,a=this.coefficients;return e.copy(a[0]).multiplyScalar(.282095),e.addScaledVector(a[1],.488603*i),e.addScaledVector(a[2],.488603*s),e.addScaledVector(a[3],.488603*n),e.addScaledVector(a[4],1.092548*(n*i)),e.addScaledVector(a[5],1.092548*(i*s)),e.addScaledVector(a[6],.315392*(3*s*s-1)),e.addScaledVector(a[7],1.092548*(n*s)),e.addScaledVector(a[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,a=this.coefficients;return e.copy(a[0]).multiplyScalar(.886227),e.addScaledVector(a[1],2*.511664*i),e.addScaledVector(a[2],2*.511664*s),e.addScaledVector(a[3],2*.511664*n),e.addScaledVector(a[4],2*.429043*n*i),e.addScaledVector(a[5],2*.429043*i*s),e.addScaledVector(a[6],.743125*s*s-.247708),e.addScaledVector(a[7],2*.429043*n*s),e.addScaledVector(a[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}class If extends li{constructor(t=new Pf,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class Wo extends Je{constructor(t){super(t),this.textures={}}load(t,e,n,i){const s=this,a=new qn(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=this.textures;function n(s){return e[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),e[s]}const i=this.createMaterialFromType(t.type);if(t.uuid!==void 0&&(i.uuid=t.uuid),t.name!==void 0&&(i.name=t.name),t.color!==void 0&&i.color!==void 0&&i.color.setHex(t.color),t.roughness!==void 0&&(i.roughness=t.roughness),t.metalness!==void 0&&(i.metalness=t.metalness),t.sheen!==void 0&&(i.sheen=t.sheen),t.sheenColor!==void 0&&(i.sheenColor=new xt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(i.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(t.emissive),t.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(t.specular),t.specularIntensity!==void 0&&(i.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(i.shininess=t.shininess),t.clearcoat!==void 0&&(i.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(i.dispersion=t.dispersion),t.iridescence!==void 0&&(i.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(i.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(i.transmission=t.transmission),t.thickness!==void 0&&(i.thickness=t.thickness),t.attenuationDistance!==void 0&&(i.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(i.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(i.fog=t.fog),t.flatShading!==void 0&&(i.flatShading=t.flatShading),t.blending!==void 0&&(i.blending=t.blending),t.combine!==void 0&&(i.combine=t.combine),t.side!==void 0&&(i.side=t.side),t.shadowSide!==void 0&&(i.shadowSide=t.shadowSide),t.opacity!==void 0&&(i.opacity=t.opacity),t.transparent!==void 0&&(i.transparent=t.transparent),t.alphaTest!==void 0&&(i.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(i.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(i.depthFunc=t.depthFunc),t.depthTest!==void 0&&(i.depthTest=t.depthTest),t.depthWrite!==void 0&&(i.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(i.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(i.blendSrc=t.blendSrc),t.blendDst!==void 0&&(i.blendDst=t.blendDst),t.blendEquation!==void 0&&(i.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(i.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(i.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(i.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(i.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(i.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(i.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(i.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(i.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(i.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(i.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(i.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(i.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(i.rotation=t.rotation),t.linewidth!==void 0&&(i.linewidth=t.linewidth),t.dashSize!==void 0&&(i.dashSize=t.dashSize),t.gapSize!==void 0&&(i.gapSize=t.gapSize),t.scale!==void 0&&(i.scale=t.scale),t.polygonOffset!==void 0&&(i.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(i.dithering=t.dithering),t.alphaToCoverage!==void 0&&(i.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(i.forceSinglePass=t.forceSinglePass),t.visible!==void 0&&(i.visible=t.visible),t.toneMapped!==void 0&&(i.toneMapped=t.toneMapped),t.userData!==void 0&&(i.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),t.uniforms!==void 0)for(const s in t.uniforms){const a=t.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new xt().setHex(a.value);break;case"v2":i.uniforms[s].value=new Z().fromArray(a.value);break;case"v3":i.uniforms[s].value=new w().fromArray(a.value);break;case"v4":i.uniforms[s].value=new Jt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new Wt().fromArray(a.value);break;case"m4":i.uniforms[s].value=new zt().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(t.defines!==void 0&&(i.defines=t.defines),t.vertexShader!==void 0&&(i.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(i.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(i.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)i.extensions[s]=t.extensions[s];if(t.lights!==void 0&&(i.lights=t.lights),t.clipping!==void 0&&(i.clipping=t.clipping),t.size!==void 0&&(i.size=t.size),t.sizeAttenuation!==void 0&&(i.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(i.map=n(t.map)),t.matcap!==void 0&&(i.matcap=n(t.matcap)),t.alphaMap!==void 0&&(i.alphaMap=n(t.alphaMap)),t.bumpMap!==void 0&&(i.bumpMap=n(t.bumpMap)),t.bumpScale!==void 0&&(i.bumpScale=t.bumpScale),t.normalMap!==void 0&&(i.normalMap=n(t.normalMap)),t.normalMapType!==void 0&&(i.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new Z().fromArray(s)}return t.displacementMap!==void 0&&(i.displacementMap=n(t.displacementMap)),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(i.roughnessMap=n(t.roughnessMap)),t.metalnessMap!==void 0&&(i.metalnessMap=n(t.metalnessMap)),t.emissiveMap!==void 0&&(i.emissiveMap=n(t.emissiveMap)),t.emissiveIntensity!==void 0&&(i.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(i.specularMap=n(t.specularMap)),t.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(t.specularIntensityMap)),t.specularColorMap!==void 0&&(i.specularColorMap=n(t.specularColorMap)),t.envMap!==void 0&&(i.envMap=n(t.envMap)),t.envMapRotation!==void 0&&i.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(i.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(i.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(i.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(i.lightMap=n(t.lightMap)),t.lightMapIntensity!==void 0&&(i.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(i.aoMap=n(t.aoMap)),t.aoMapIntensity!==void 0&&(i.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(i.gradientMap=n(t.gradientMap)),t.clearcoatMap!==void 0&&(i.clearcoatMap=n(t.clearcoatMap)),t.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),t.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),t.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new Z().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(i.iridescenceMap=n(t.iridescenceMap)),t.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(t.iridescenceThicknessMap)),t.transmissionMap!==void 0&&(i.transmissionMap=n(t.transmissionMap)),t.thicknessMap!==void 0&&(i.thicknessMap=n(t.thicknessMap)),t.anisotropyMap!==void 0&&(i.anisotropyMap=n(t.anisotropyMap)),t.sheenColorMap!==void 0&&(i.sheenColorMap=n(t.sheenColorMap)),t.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return Wo.createMaterialFromType(t)}static createMaterialFromType(t){const e={ShadowMaterial:cf,SpriteMaterial:Mc,RawShaderMaterial:hf,ShaderMaterial:on,PointsMaterial:bc,MeshPhysicalMaterial:uf,MeshStandardMaterial:Ic,MeshPhongMaterial:df,MeshToonMaterial:ff,MeshNormalMaterial:pf,MeshLambertMaterial:mf,MeshDepthMaterial:vc,MeshDistanceMaterial:yc,MeshBasicMaterial:ai,MeshMatcapMaterial:gf,LineDashedMaterial:_f,LineBasicMaterial:He,Material:Oe};return new e[t]}}class Kl{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Fc extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Lf extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new qn(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e={},n={};function i(f,m){if(e[m]!==void 0)return e[m];const g=f.interleavedBuffers[m],p=s(f,g.buffer),y=fs(g.type,p),v=new To(y,g.stride);return v.uuid=g.uuid,e[m]=v,v}function s(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const a=t.isInstancedBufferGeometry?new Fc:new Zt,o=t.data.index;if(o!==void 0){const f=fs(o.type,o.array);a.setIndex(new le(f,1))}const l=t.data.attributes;for(const f in l){const m=l[f];let _;if(m.isInterleavedBufferAttribute){const g=i(t.data,m.data);_=new tn(g,m.itemSize,m.offset,m.normalized)}else{const g=fs(m.type,m.array),p=m.isInstancedBufferAttribute?Ms:le;_=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(_.name=m.name),m.usage!==void 0&&_.setUsage(m.usage),a.setAttribute(f,_)}const c=t.data.morphAttributes;if(c)for(const f in c){const m=c[f],_=[];for(let g=0,p=m.length;g<p;g++){const y=m[g];let v;if(y.isInterleavedBufferAttribute){const x=i(t.data,y.data);v=new tn(x,y.itemSize,y.offset,y.normalized)}else{const x=fs(y.type,y.array);v=new le(x,y.itemSize,y.normalized)}y.name!==void 0&&(v.name=y.name),_.push(v)}a.morphAttributes[f]=_}t.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const u=t.data.groups||t.data.drawcalls||t.data.offsets;if(u!==void 0)for(let f=0,m=u.length;f!==m;++f){const _=u[f];a.addGroup(_.start,_.count,_.materialIndex)}const d=t.data.boundingSphere;if(d!==void 0){const f=new w;d.center!==void 0&&f.fromArray(d.center),a.boundingSphere=new Ae(f,d.radius)}return t.name&&(a.name=t.name),t.userData&&(a.userData=t.userData),a}}class oy extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=this.path===""?Kl.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||a;const o=new qn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+t+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),console.error("THREE.ObjectLoader: Can't load "+t);return}s.parse(c,e)},n,i)}async loadAsync(t,e){const n=this,i=this.path===""?Kl.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const s=new qn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(t,e),o=JSON.parse(a),l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(o)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),a=this.parseImages(t.images,function(){e!==void 0&&e(c)}),o=this.parseTextures(t.textures,a),l=this.parseMaterials(t.materials,o),c=this.parseObject(t.object,s,l,o,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let u=!1;for(const d in a)if(a[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&e(c)}return c}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),a=this.parseTextures(t.textures,s),o=this.parseMaterials(t.materials,a),l=this.parseObject(t.object,i,o,a,e),c=this.parseSkeletons(t.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(t){const e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){const s=new Oi().fromJSON(t[n]);e[s.uuid]=s}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),t!==void 0)for(let s=0,a=t.length;s<a;s++){const o=new Co().fromJSON(t[s],i);n[o.uuid]=o}return n}parseGeometries(t,e){const n={};if(t!==void 0){const i=new Lf;for(let s=0,a=t.length;s<a;s++){let o;const l=t[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in hu?o=hu[l.type].fromJSON(l,e):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(t,e){const n={},i={};if(t!==void 0){const s=new Wo;s.setTextures(e);for(let a=0,o=t.length;a<o;a++){const l=t[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(t){const e={};if(t!==void 0)for(let n=0;n<t.length;n++){const i=t[n],s=pr.parse(i);e[s.uuid]=s}return e}parseImages(t,e){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(h)}else return l.data?{data:fs(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){const l=new Nc(e);s=new mr(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=t.length;c<h;c++){const u=t[c],d=u.url;if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new En(p.data,p.width,p.height)))}i[u.uuid]=new Pi(f)}else{const f=o(u.url);i[u.uuid]=new Pi(f)}}}return i}async parseImagesAsync(t){const e=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:e.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:fs(a.type,a.data),width:a.width,height:a.height}:null}if(t!==void 0&&t.length>0){i=new mr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=t.length;a<o;a++){const l=t[a],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=await s(f);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new En(m.data,m.width,m.height)))}n[l.uuid]=new Pi(h)}else{const h=await s(l.url);n[l.uuid]=new Pi(h)}}}return n}parseTextures(t,e){function n(s,a){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(t!==void 0)for(let s=0,a=t.length;s<a;s++){const o=t[s];o.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',o.uuid),e[o.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",o.image);const l=e[o.image],c=l.data;let h;Array.isArray(c)?(h=new vr,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new En:h=new ge,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,ly)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],pu),h.wrapT=n(o.wrap[1],pu)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,mu)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,mu)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(t,e,n,i,s){let a;function o(d){return e[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),e[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(t.type){case"Scene":a=new Wd,t.background!==void 0&&(Number.isInteger(t.background)?a.background=new xt(t.background):a.background=c(t.background)),t.environment!==void 0&&(a.environment=c(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?a.fog=new Ao(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(a.fog=new wo(t.fog.color,t.fog.density)),t.fog.name!==""&&(a.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(a.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(a.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&a.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":a=new ye(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(a.focus=t.focus),t.zoom!==void 0&&(a.zoom=t.zoom),t.filmGauge!==void 0&&(a.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(a.filmOffset=t.filmOffset),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"OrthographicCamera":a=new Ni(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(a.zoom=t.zoom),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"AmbientLight":a=new Cf(t.color,t.intensity);break;case"DirectionalLight":a=new Tf(t.color,t.intensity),a.target=t.target||"";break;case"PointLight":a=new Af(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":a=new Rf(t.color,t.intensity,t.width,t.height);break;case"SpotLight":a=new wf(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),a.target=t.target||"";break;case"HemisphereLight":a=new Ef(t.color,t.groundColor,t.intensity);break;case"LightProbe":a=new If().fromJSON(t);break;case"SkinnedMesh":h=o(t.geometry),u=l(t.material),a=new Zd(h,u),t.bindMode!==void 0&&(a.bindMode=t.bindMode),t.bindMatrix!==void 0&&a.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(a.skeleton=t.skeleton);break;case"Mesh":h=o(t.geometry),u=l(t.material),a=new xe(h,u);break;case"InstancedMesh":h=o(t.geometry),u=l(t.material);const d=t.count,f=t.instanceMatrix,m=t.instanceColor;a=new $d(h,u,d),a.instanceMatrix=new Ms(new Float32Array(f.array),16),m!==void 0&&(a.instanceColor=new Ms(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":h=o(t.geometry),u=l(t.material),a=new Jd(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,u),a.geometry=h,a.perObjectFrustumCulled=t.perObjectFrustumCulled,a.sortObjects=t.sortObjects,a._drawRanges=t.drawRanges,a._reservedRanges=t.reservedRanges,a._visibility=t.visibility,a._active=t.active,a._bounds=t.bounds.map(_=>{const g=new we;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const p=new Ae;return p.radius=_.sphereRadius,p.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:p}}),a._maxInstanceCount=t.maxInstanceCount,a._maxVertexCount=t.maxVertexCount,a._maxIndexCount=t.maxIndexCount,a._geometryInitialized=t.geometryInitialized,a._geometryCount=t.geometryCount,a._matricesTexture=c(t.matricesTexture.uuid),t.colorsTexture!==void 0&&(a._colorsTexture=c(t.colorsTexture.uuid));break;case"LOD":a=new Yd;break;case"Line":a=new si(o(t.geometry),l(t.material));break;case"LineLoop":a=new Kd(o(t.geometry),l(t.material));break;case"LineSegments":a=new Cn(o(t.geometry),l(t.material));break;case"PointCloud":case"Points":a=new jd(o(t.geometry),l(t.material));break;case"Sprite":a=new qd(l(t.material));break;case"Group":a=new ms;break;case"Bone":a=new Sc;break;default:a=new ne}if(a.uuid=t.uuid,t.name!==void 0&&(a.name=t.name),t.matrix!==void 0?(a.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=t.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(t.position!==void 0&&a.position.fromArray(t.position),t.rotation!==void 0&&a.rotation.fromArray(t.rotation),t.quaternion!==void 0&&a.quaternion.fromArray(t.quaternion),t.scale!==void 0&&a.scale.fromArray(t.scale)),t.up!==void 0&&a.up.fromArray(t.up),t.castShadow!==void 0&&(a.castShadow=t.castShadow),t.receiveShadow!==void 0&&(a.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(a.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(a.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(a.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(a.shadow.radius=t.shadow.radius),t.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(a.visible=t.visible),t.frustumCulled!==void 0&&(a.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(a.renderOrder=t.renderOrder),t.userData!==void 0&&(a.userData=t.userData),t.layers!==void 0&&(a.layers.mask=t.layers),t.children!==void 0){const d=t.children;for(let f=0;f<d.length;f++)a.add(this.parseObject(d[f],e,n,i,s))}if(t.animations!==void 0){const d=t.animations;for(let f=0;f<d.length;f++){const m=d[f];a.animations.push(s[m])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(a.autoUpdate=t.autoUpdate);const d=t.levels;for(let f=0;f<d.length;f++){const m=d[f],_=a.getObjectByProperty("uuid",m.object);_!==void 0&&a.addLevel(_,m.distance,m.hysteresis)}}return a}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=e[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new ne}})}}const ly={UVMapping:fo,CubeReflectionMapping:Wn,CubeRefractionMapping:ii,EquirectangularReflectionMapping:Qs,EquirectangularRefractionMapping:tr,CubeUVReflectionMapping:Ss},pu={RepeatWrapping:er,ClampToEdgeWrapping:an,MirroredRepeatWrapping:nr},mu={NearestFilter:Ie,NearestMipmapNearestFilter:ec,NearestMipmapLinearFilter:ds,LinearFilter:Me,LinearMipmapNearestFilter:Ws,LinearMipmapLinearFilter:Sn};class cy extends Je{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=zn.get(t);if(a!==void 0){if(s.manager.itemStart(t),a.then){a.then(c=>{e&&e(c),s.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(t,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return zn.add(t,c),e&&e(c),s.manager.itemEnd(t),c}).catch(function(c){i&&i(c),zn.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});zn.add(t,l),s.manager.itemStart(t)}}let da;class Bc{static getContext(){return da===void 0&&(da=new(window.AudioContext||window.webkitAudioContext)),da}static setContext(t){da=t}}class hy extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new qn(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){try{const c=l.slice(0);Bc.getContext().decodeAudioData(c,function(u){e(u)}).catch(o)}catch(c){o(c)}},n,i);function o(l){i?i(l):console.error(l),s.manager.itemError(t)}}}const gu=new zt,_u=new zt,xi=new zt;class uy{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new ye,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new ye,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,xi.copy(t.projectionMatrix);const i=e.eyeSep/2,s=i*e.near/e.focus,a=e.near*Math.tan(Ui*e.fov*.5)/e.zoom;let o,l;_u.elements[12]=-i,gu.elements[12]=i,o=-a*e.aspect+s,l=a*e.aspect+s,xi.elements[0]=2*e.near/(l-o),xi.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(xi),o=-a*e.aspect-s,l=a*e.aspect-s,xi.elements[0]=2*e.near/(l-o),xi.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(xi)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(_u),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(gu)}}class Df{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=xu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=xu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function xu(){return performance.now()}const vi=new w,vu=new Ne,dy=new w,yi=new w;class fy extends ne{constructor(){super(),this.type="AudioListener",this.context=Bc.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Df}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(vi,vu,dy),yi.set(0,0,-1).applyQuaternion(vu),e.positionX){const i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(vi.x,i),e.positionY.linearRampToValueAtTime(vi.y,i),e.positionZ.linearRampToValueAtTime(vi.z,i),e.forwardX.linearRampToValueAtTime(yi.x,i),e.forwardY.linearRampToValueAtTime(yi.y,i),e.forwardZ.linearRampToValueAtTime(yi.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(vi.x,vi.y,vi.z),e.setOrientation(yi.x,yi.y,yi.z,n.x,n.y,n.z)}}class Uf extends ne{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const Mi=new w,yu=new Ne,py=new w,Si=new w;class my extends Uf{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Mi,yu,py),Si.set(0,0,1).applyQuaternion(yu);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Mi.x,n),e.positionY.linearRampToValueAtTime(Mi.y,n),e.positionZ.linearRampToValueAtTime(Mi.z,n),e.orientationX.linearRampToValueAtTime(Si.x,n),e.orientationY.linearRampToValueAtTime(Si.y,n),e.orientationZ.linearRampToValueAtTime(Si.z,n)}else e.setPosition(Mi.x,Mi.y,Mi.z),e.setOrientation(Si.x,Si.y,Si.z)}}class gy{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class Nf{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,a;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,a=i;s!==a;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){Ne.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const a=this._workIndex*s;Ne.multiplyQuaternionsFlat(t,a,t,e,t,n),Ne.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,s){for(let a=0;a!==s;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const zc="\\[\\]\\.:\\/",_y=new RegExp("["+zc+"]","g"),kc="[^"+zc+"]",xy="[^"+zc.replace("\\.","")+"]",vy=/((?:WC+[\/:])*)/.source.replace("WC",kc),yy=/(WCOD+)?/.source.replace("WCOD",xy),My=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kc),Sy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kc),by=new RegExp("^"+vy+yy+My+Sy+"$"),Ey=["material","materials","bones","map"];class wy{constructor(t,e,n){const i=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ee{constructor(t,e,n){this.path=e,this.parsedPath=n||ee.parseTrackName(e),this.node=ee.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ee.Composite(t,e,n):new ee(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_y,"")}static parseTrackName(t){const e=by.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Ey.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===e||o.uuid===e)return o;const l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ee.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const a=t[i];if(a===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ee.Composite=wy;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ay{constructor(){this.isAnimationObjectGroup=!0,this.uuid=en(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=t.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let m=e[f];if(m===void 0){m=l++,e[f]=m,t.push(d);for(let _=0,g=a;_!==g;++_)s[_].push(new ee(d,n[_],i[_]))}else if(m<c){o=t[m];const _=--c,g=t[_];e[g.uuid]=m,t[m]=g,e[f]=_,t[_]=d;for(let p=0,y=a;p!==y;++p){const v=s[p],x=v[_];let I=v[m];v[m]=x,I===void 0&&(I=new ee(d,n[p],i[p])),v[_]=I}}else t[m]!==o&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,h=e[c];if(h!==void 0&&h>=s){const u=s++,d=t[u];e[d.uuid]=h,t[h]=d,e[c]=u,t[u]=l;for(let f=0,m=i;f!==m;++f){const _=n[f],g=_[u],p=_[h];_[h]=g,_[u]=p}}}this.nCachedObjects_=s}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=t.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],h=c.uuid,u=e[h];if(u!==void 0)if(delete e[h],u<s){const d=--s,f=t[d],m=--a,_=t[m];e[f.uuid]=u,t[u]=f,e[_.uuid]=d,t[d]=_,t.pop();for(let g=0,p=i;g!==p;++g){const y=n[g],v=y[d],x=y[m];y[u]=v,y[d]=x,y.pop()}}else{const d=--a,f=t[d];d>0&&(e[f.uuid]=u),t[u]=f,t.pop();for(let m=0,_=i;m!==_;++m){const g=n[m];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[t]=i,a.push(t),o.push(e),s.push(u);for(let d=h,f=l.length;d!==f;++d){const m=l[d];u[d]=new ee(m,t,e)}return u}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=t[o];e[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class Of{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,a=s.length,o=new Array(a),l={endingStart:Ci,endingEnd:Ci};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=gd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,a=s/i,o=i/s;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case uc:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case yo:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const a=n===_d;if(t===0)return s===-1?i:a&&(s&1)===1?e-i:i;if(n===md){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Ri,i.endingEnd=Ri):(t?i.endingStart=this.zeroSlopeAtStart?Ri:Ci:i.endingStart=sr,e?i.endingEnd=this.zeroSlopeAtEnd?Ri:Ci:i.endingEnd=sr)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=e,o[1]=s+t,l[1]=n,this}}const Ty=new Float32Array(1);class Cy extends Tn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;m=new Nf(ee.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let a=s[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Dc(new Float32Array(2),new Float32Array(2),1,Ty),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let a=typeof t=="string"?pr.findByName(i,t):t;const o=a!==null?a.uuid:t,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=yo),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new Of(this,a,e,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?pr.findByName(n,t):t,a=s?s.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Vc{constructor(t){this.value=t}clone(){return new Vc(this.value.clone===void 0?this.value:this.value.clone())}}let Ry=0;class Py extends Tn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Ry++}),this.name="",this.usage=rr,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){const s=Array.isArray(e[n])?e[n]:[e[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class uo extends To{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class Iy{constructor(t,e,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const Mu=new zt;class Ly{constructor(t,e,n=0,i=1/0){this.ray=new Gi(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new So,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Mu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mu),this}intersectObject(t,e=!0,n=[]){return jl(t,this,n,e),n.sort(Su),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)jl(t[i],this,n,e);return n.sort(Su),n}}function Su(r,t){return r.distance-t.distance}function jl(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)jl(s[a],t,e,!0)}}class Ql{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(me(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Dy{constructor(t=1,e=0,n=0){return this.radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class Hc{constructor(t,e,n,i){Hc.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}const bu=new Z;class Uy{constructor(t=new Z(1/0,1/0),e=new Z(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=bu.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bu).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Eu=new w,fa=new w;class Ff{constructor(t=new w,e=new w){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Eu.subVectors(t,this.start),fa.subVectors(this.end,this.start);const n=fa.dot(fa);let s=fa.dot(Eu)/n;return e&&(s=me(s,0,1)),s}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const wu=new w;class Ny extends ne{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const n=new Zt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new At(i,3));const s=new He({fog:!1,toneMapped:!1});this.cone=new Cn(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),wu.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(wu),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ei=new w,pa=new zt,Ll=new zt;class Oy extends Cn{constructor(t){const e=Bf(t),n=new Zt,i=[],s=[],a=new xt(0,0,1),o=new xt(0,1,0);for(let c=0;c<e.length;c++){const h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(a.r,a.g,a.b),s.push(o.r,o.g,o.b))}n.setAttribute("position",new At(i,3)),n.setAttribute("color",new At(s,3));const l=new He({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");Ll.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<e.length;s++){const o=e[s];o.parent&&o.parent.isBone&&(pa.multiplyMatrices(Ll,o.matrixWorld),ei.setFromMatrixPosition(pa),i.setXYZ(a,ei.x,ei.y,ei.z),pa.multiplyMatrices(Ll,o.parent.matrixWorld),ei.setFromMatrixPosition(pa),i.setXYZ(a+1,ei.x,ei.y,ei.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Bf(r){const t=[];r.isBone===!0&&t.push(r);for(let e=0;e<r.children.length;e++)t.push.apply(t,Bf(r.children[e]));return t}class Fy extends xe{constructor(t,e,n){const i=new br(e,4,2),s=new ai({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const By=new w,Au=new xt,Tu=new xt;class zy extends ne{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Sr(e);i.rotateY(Math.PI*.5),this.material=new ai({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new le(a,3)),this.add(new xe(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");Au.copy(this.light.color),Tu.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){const s=n<i/2?Au:Tu;e.setXYZ(n,s.r,s.g,s.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(By.setFromMatrixPosition(this.light.matrixWorld).negate())}}class ky extends Cn{constructor(t=10,e=10,n=4473924,i=8947848){n=new xt(n),i=new xt(i);const s=e/2,a=t/e,o=t/2,l=[],c=[];for(let d=0,f=0,m=-o;d<=e;d++,m+=a){l.push(-o,0,m,o,0,m),l.push(m,0,-o,m,0,o);const _=d===s?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const h=new Zt;h.setAttribute("position",new At(l,3)),h.setAttribute("color",new At(c,3));const u=new He({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Vy extends Cn{constructor(t=10,e=16,n=8,i=64,s=4473924,a=8947848){s=new xt(s),a=new xt(a);const o=[],l=[];if(e>1)for(let u=0;u<e;u++){const d=u/e*(Math.PI*2),f=Math.sin(d)*t,m=Math.cos(d)*t;o.push(0,0,0),o.push(f,0,m);const _=u&1?s:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){const d=u&1?s:a,f=t-t/n*u;for(let m=0;m<i;m++){let _=m/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f;o.push(g,0,p),l.push(d.r,d.g,d.b),_=(m+1)/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f,o.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new Zt;c.setAttribute("position",new At(o,3)),c.setAttribute("color",new At(l,3));const h=new He({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Cu=new w,ma=new w,Ru=new w;class Hy extends ne{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Zt;i.setAttribute("position",new At([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const s=new He({fog:!1,toneMapped:!1});this.lightPlane=new si(i,s),this.add(this.lightPlane),i=new Zt,i.setAttribute("position",new At([0,0,0,0,0,1],3)),this.targetLine=new si(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Cu.setFromMatrixPosition(this.light.matrixWorld),ma.setFromMatrixPosition(this.light.target.matrixWorld),Ru.subVectors(ma,Cu),this.lightPlane.lookAt(ma),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(ma),this.targetLine.scale.z=Ru.length()}}const ga=new w,pe=new bo;class Gy extends Cn{constructor(t){const e=new Zt,n=new He({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(m,_){l(m),l(_)}function l(m){i.push(0,0,0),s.push(0,0,0),a[m]===void 0&&(a[m]=[]),a[m].push(i.length/3-1)}e.setAttribute("position",new At(i,3)),e.setAttribute("color",new At(s,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new xt(16755200),h=new xt(16711680),u=new xt(43775),d=new xt(16777215),f=new xt(3355443);this.setColors(c,h,u,d,f)}setColors(t,e,n,i,s){const o=this.geometry.getAttribute("color");o.setXYZ(0,t.r,t.g,t.b),o.setXYZ(1,t.r,t.g,t.b),o.setXYZ(2,t.r,t.g,t.b),o.setXYZ(3,t.r,t.g,t.b),o.setXYZ(4,t.r,t.g,t.b),o.setXYZ(5,t.r,t.g,t.b),o.setXYZ(6,t.r,t.g,t.b),o.setXYZ(7,t.r,t.g,t.b),o.setXYZ(8,t.r,t.g,t.b),o.setXYZ(9,t.r,t.g,t.b),o.setXYZ(10,t.r,t.g,t.b),o.setXYZ(11,t.r,t.g,t.b),o.setXYZ(12,t.r,t.g,t.b),o.setXYZ(13,t.r,t.g,t.b),o.setXYZ(14,t.r,t.g,t.b),o.setXYZ(15,t.r,t.g,t.b),o.setXYZ(16,t.r,t.g,t.b),o.setXYZ(17,t.r,t.g,t.b),o.setXYZ(18,t.r,t.g,t.b),o.setXYZ(19,t.r,t.g,t.b),o.setXYZ(20,t.r,t.g,t.b),o.setXYZ(21,t.r,t.g,t.b),o.setXYZ(22,t.r,t.g,t.b),o.setXYZ(23,t.r,t.g,t.b),o.setXYZ(24,e.r,e.g,e.b),o.setXYZ(25,e.r,e.g,e.b),o.setXYZ(26,e.r,e.g,e.b),o.setXYZ(27,e.r,e.g,e.b),o.setXYZ(28,e.r,e.g,e.b),o.setXYZ(29,e.r,e.g,e.b),o.setXYZ(30,e.r,e.g,e.b),o.setXYZ(31,e.r,e.g,e.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0}update(){const t=this.geometry,e=this.pointMap,n=1,i=1;pe.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),_e("c",e,t,pe,0,0,-1),_e("t",e,t,pe,0,0,1),_e("n1",e,t,pe,-n,-i,-1),_e("n2",e,t,pe,n,-i,-1),_e("n3",e,t,pe,-n,i,-1),_e("n4",e,t,pe,n,i,-1),_e("f1",e,t,pe,-n,-i,1),_e("f2",e,t,pe,n,-i,1),_e("f3",e,t,pe,-n,i,1),_e("f4",e,t,pe,n,i,1),_e("u1",e,t,pe,n*.7,i*1.1,-1),_e("u2",e,t,pe,-n*.7,i*1.1,-1),_e("u3",e,t,pe,0,i*2,-1),_e("cf1",e,t,pe,-n,0,1),_e("cf2",e,t,pe,n,0,1),_e("cf3",e,t,pe,0,-i,1),_e("cf4",e,t,pe,0,i,1),_e("cn1",e,t,pe,-n,0,-1),_e("cn2",e,t,pe,n,0,-1),_e("cn3",e,t,pe,0,-i,-1),_e("cn4",e,t,pe,0,i,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function _e(r,t,e,n,i,s,a){ga.set(i,s,a).unproject(n);const o=t[r];if(o!==void 0){const l=e.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],ga.x,ga.y,ga.z)}}const _a=new we;class Wy extends Cn{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new Zt;s.setIndex(new le(n,1)),s.setAttribute("position",new le(i,3)),super(s,new He({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&_a.setFromObject(this.object),_a.isEmpty())return;const e=_a.min,n=_a.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=e.x,s[4]=n.y,s[5]=n.z,s[6]=e.x,s[7]=e.y,s[8]=n.z,s[9]=n.x,s[10]=e.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=e.z,s[15]=e.x,s[16]=n.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=n.x,s[22]=e.y,s[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Xy extends Cn{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Zt;s.setIndex(new le(n,1)),s.setAttribute("position",new At(i,3)),super(s,new He({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class qy extends si{constructor(t,e=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new Zt;a.setAttribute("position",new At(s,3)),a.computeBoundingSphere(),super(a,new He({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Zt;l.setAttribute("position",new At(o,3)),l.computeBoundingSphere(),this.add(new xe(l,new ai({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Pu=new w;let xa,Dl;class Yy extends ne{constructor(t=new w(0,0,1),e=new w(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",xa===void 0&&(xa=new Zt,xa.setAttribute("position",new At([0,0,0,0,1,0],3)),Dl=new As(0,.5,1,5,1),Dl.translate(0,-.5,0)),this.position.copy(e),this.line=new si(xa,new He({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new xe(Dl,new ai({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Pu.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Pu,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Zy extends Cn{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Zt;i.setAttribute("position",new At(e,3)),i.setAttribute("color",new At(n,3));const s=new He({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(t,e,n){const i=new xt,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class $y{constructor(){this.type="ShapePath",this.color=new xt,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new lr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,a){return this.currentPath.bezierCurveTo(t,e,n,i,s,a),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(p){const y=[];for(let v=0,x=p.length;v<x;v++){const I=p[v],A=new Oi;A.curves=I.curves,y.push(A)}return y}function n(p,y){const v=y.length;let x=!1;for(let I=v-1,A=0;A<v;I=A++){let C=y[I],R=y[A],b=R.x-C.x,M=R.y-C.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(C=y[A],b=-b,R=y[I],M=-M),p.y<C.y||p.y>R.y)continue;if(p.y===C.y){if(p.x===C.x)return!0}else{const L=M*(p.x-C.x)-b*(p.y-C.y);if(L===0)return!0;if(L<0)continue;x=!x}}else{if(p.y!==C.y)continue;if(R.x<=p.x&&p.x<=C.x||C.x<=p.x&&p.x<=R.x)return!0}}return x}const i=wn.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new Oi,l.curves=o.curves,c.push(l),c;let h=!i(s[0].getPoints());h=t?!h:h;const u=[],d=[];let f=[],m=0,_;d[m]=void 0,f[m]=[];for(let p=0,y=s.length;p<y;p++)o=s[p],_=o.getPoints(),a=i(_),a=t?!a:a,a?(!h&&d[m]&&m++,d[m]={s:new Oi,p:_},d[m].s.curves=o.curves,h&&m++,f[m]=[]):f[m].push({h:o,p:_[0]});if(!d[0])return e(s);if(d.length>1){let p=!1,y=0;for(let v=0,x=d.length;v<x;v++)u[v]=[];for(let v=0,x=d.length;v<x;v++){const I=f[v];for(let A=0;A<I.length;A++){const C=I[A];let R=!0;for(let b=0;b<d.length;b++)n(C.p,d[b].p)&&(v!==b&&y++,R?(R=!1,u[b].push(C)):p=!0);R&&u[v].push(C)}}y>0&&p===!1&&(f=u)}let g;for(let p=0,y=d.length;p<y;p++){l=d[p].s,c.push(l),g=f[p];for(let v=0,x=g.length;v<x;v++)l.holes.push(g[v].h)}return c}}class Jy extends Tn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class Ky extends fn{constructor(t=1,e=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(t,e,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");const hM=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:hd,AddEquation:ni,AddOperation:ad,AdditiveAnimationBlendMode:uc,AdditiveBlending:Bl,AgXToneMapping:dd,AlphaFormat:rc,AlwaysCompare:Td,AlwaysDepth:Ca,AlwaysStencilFunc:Hl,AmbientLight:Cf,AnimationAction:Of,AnimationClip:pr,AnimationLoader:Qv,AnimationMixer:Cy,AnimationObjectGroup:Ay,AnimationUtils:$v,ArcCurve:Qd,ArrayCamera:Gd,ArrowHelper:Yy,AttachedBindMode:Vl,Audio:Uf,AudioAnalyser:gy,AudioContext:Bc,AudioListener:fy,AudioLoader:hy,AxesHelper:Zy,BackSide:Ve,BasicDepthPacking:xd,BasicShadowMap:Yf,BatchedMesh:Jd,Bone:Sc,BooleanKeyframeTrack:Xi,Box2:Uy,Box3:we,Box3Helper:Xy,BoxGeometry:Wi,BoxHelper:Wy,BufferAttribute:le,BufferGeometry:Zt,BufferGeometryLoader:Lf,ByteType:nc,Cache:zn,Camera:bo,CameraHelper:Gy,CanvasTexture:vv,CapsuleGeometry:Io,CatmullRomCurve3:tf,CineonToneMapping:cd,CircleGeometry:Lo,ClampToEdgeWrapping:an,Clock:Df,Color:xt,ColorKeyframeTrack:Uc,ColorManagement:Qt,CompressedArrayTexture:_v,CompressedCubeTexture:xv,CompressedTexture:Ro,CompressedTextureLoader:ty,ConeGeometry:Do,ConstantAlphaFactor:id,ConstantColorFactor:ed,Controls:Jy,CubeCamera:Nd,CubeReflectionMapping:Wn,CubeRefractionMapping:ii,CubeTexture:vr,CubeTextureLoader:ey,CubeUVReflectionMapping:Ss,CubicBezierCurve:wc,CubicBezierCurve3:ef,CubicInterpolant:yf,CullFaceBack:Fl,CullFaceFront:zu,CullFaceFrontBack:qf,CullFaceNone:Bu,Curve:pn,CurvePath:sf,CustomBlending:Vu,CustomToneMapping:ud,CylinderGeometry:As,Cylindrical:Dy,Data3DTexture:pc,DataArrayTexture:Mo,DataTexture:En,DataTextureLoader:ny,DataUtils:am,DecrementStencilOp:op,DecrementWrapStencilOp:cp,DefaultLoadingManager:bf,DepthFormat:Di,DepthStencilFormat:ki,DepthTexture:xc,DetachedBindMode:pd,DirectionalLight:Tf,DirectionalLightHelper:Hy,DiscreteInterpolant:Mf,DodecahedronGeometry:Uo,DoubleSide:yn,DstAlphaFactor:Ju,DstColorFactor:ju,DynamicCopyUsage:Ep,DynamicDrawUsage:xp,DynamicReadUsage:Mp,EdgesGeometry:rf,EllipseCurve:Po,EqualCompare:bd,EqualDepth:Pa,EqualStencilFunc:fp,EquirectangularReflectionMapping:Qs,EquirectangularRefractionMapping:tr,Euler:nn,EventDispatcher:Tn,ExtrudeGeometry:Oo,FileLoader:qn,Float16BufferAttribute:dm,Float32BufferAttribute:At,FloatType:$e,Fog:Ao,FogExp2:wo,FramebufferTexture:gv,FrontSide:Gn,Frustum:yr,GLBufferAttribute:Iy,GLSL1:Ap,GLSL3:Gl,GreaterCompare:Ed,GreaterDepth:La,GreaterEqualCompare:Ad,GreaterEqualDepth:Ia,GreaterEqualStencilFunc:_p,GreaterStencilFunc:mp,GridHelper:ky,Group:ms,HalfFloatType:bs,HemisphereLight:Ef,HemisphereLightHelper:zy,IcosahedronGeometry:Fo,ImageBitmapLoader:cy,ImageLoader:mr,ImageUtils:Id,IncrementStencilOp:ap,IncrementWrapStencilOp:lp,InstancedBufferAttribute:Ms,InstancedBufferGeometry:Fc,InstancedInterleavedBuffer:uo,InstancedMesh:$d,Int16BufferAttribute:hm,Int32BufferAttribute:um,Int8BufferAttribute:om,IntType:po,InterleavedBuffer:To,InterleavedBufferAttribute:tn,Interpolant:Er,InterpolateDiscrete:ir,InterpolateLinear:ao,InterpolateSmooth:ba,InvertStencilOp:hp,KeepStencilOp:wi,KeyframeTrack:mn,LOD:Yd,LatheGeometry:Mr,Layers:So,LessCompare:Sd,LessDepth:Ra,LessEqualCompare:dc,LessEqualDepth:Bi,LessEqualStencilFunc:pp,LessStencilFunc:dp,Light:li,LightProbe:If,Line:si,Line3:Ff,LineBasicMaterial:He,LineCurve:Ac,LineCurve3:nf,LineDashedMaterial:_f,LineLoop:Kd,LineSegments:Cn,LinearFilter:Me,LinearInterpolant:Dc,LinearMipMapLinearFilter:Kf,LinearMipMapNearestFilter:Jf,LinearMipmapLinearFilter:Sn,LinearMipmapNearestFilter:Ws,LinearSRGBColorSpace:Hi,LinearToneMapping:od,LinearTransfer:xr,Loader:Je,LoaderUtils:Kl,LoadingManager:Nc,LoopOnce:md,LoopPingPong:_d,LoopRepeat:gd,LuminanceAlphaFormat:lc,LuminanceFormat:oc,MOUSE:bi,Material:Oe,MaterialLoader:Wo,MathUtils:Cd,Matrix2:Hc,Matrix3:Wt,Matrix4:zt,MaxEquation:Xu,Mesh:xe,MeshBasicMaterial:ai,MeshDepthMaterial:vc,MeshDistanceMaterial:yc,MeshLambertMaterial:mf,MeshMatcapMaterial:gf,MeshNormalMaterial:pf,MeshPhongMaterial:df,MeshPhysicalMaterial:uf,MeshStandardMaterial:Ic,MeshToonMaterial:ff,MinEquation:Wu,MirroredRepeatWrapping:nr,MixOperation:rd,MultiplyBlending:kl,MultiplyOperation:gr,NearestFilter:Ie,NearestMipMapLinearFilter:$f,NearestMipMapNearestFilter:Zf,NearestMipmapLinearFilter:ds,NearestMipmapNearestFilter:ec,NeutralToneMapping:fd,NeverCompare:Md,NeverDepth:Ta,NeverStencilFunc:up,NoBlending:kn,NoColorSpace:Fn,NoToneMapping:Vn,NormalAnimationBlendMode:yo,NormalBlending:Li,NotEqualCompare:wd,NotEqualDepth:Da,NotEqualStencilFunc:gp,NumberKeyframeTrack:dr,Object3D:ne,ObjectLoader:oy,ObjectSpaceNormalMap:yd,OctahedronGeometry:Sr,OneFactor:Yu,OneMinusConstantAlphaFactor:sd,OneMinusConstantColorFactor:nd,OneMinusDstAlphaFactor:Ku,OneMinusDstColorFactor:Qu,OneMinusSrcAlphaFactor:Aa,OneMinusSrcColorFactor:$u,OrthographicCamera:Ni,PCFShadowMap:tc,PCFSoftShadowMap:ku,PMREMGenerator:Wl,Path:lr,PerspectiveCamera:ye,Plane:On,PlaneGeometry:Es,PlaneHelper:qy,PointLight:Af,PointLightHelper:Fy,Points:jd,PointsMaterial:bc,PolarGridHelper:Vy,PolyhedronGeometry:oi,PositionalAudio:my,PropertyBinding:ee,PropertyMixer:Nf,QuadraticBezierCurve:Tc,QuadraticBezierCurve3:Cc,Quaternion:Ne,QuaternionKeyframeTrack:wr,QuaternionLinearInterpolant:Sf,RED_GREEN_RGTC2_Format:so,RED_RGTC1_Format:hc,REVISION:"170",RGBADepthPacking:vd,RGBAFormat:ke,RGBAIntegerFormat:vo,RGBA_ASTC_10x10_Format:ja,RGBA_ASTC_10x5_Format:$a,RGBA_ASTC_10x6_Format:Ja,RGBA_ASTC_10x8_Format:Ka,RGBA_ASTC_12x10_Format:Qa,RGBA_ASTC_12x12_Format:to,RGBA_ASTC_4x4_Format:Va,RGBA_ASTC_5x4_Format:Ha,RGBA_ASTC_5x5_Format:Ga,RGBA_ASTC_6x5_Format:Wa,RGBA_ASTC_6x6_Format:Xa,RGBA_ASTC_8x5_Format:qa,RGBA_ASTC_8x6_Format:Ya,RGBA_ASTC_8x8_Format:Za,RGBA_BPTC_Format:$s,RGBA_ETC2_EAC_Format:ka,RGBA_PVRTC_2BPPV1_Format:Fa,RGBA_PVRTC_4BPPV1_Format:Oa,RGBA_S3TC_DXT1_Format:qs,RGBA_S3TC_DXT3_Format:Ys,RGBA_S3TC_DXT5_Format:Zs,RGBDepthPacking:np,RGBFormat:ac,RGBIntegerFormat:jf,RGB_BPTC_SIGNED_Format:eo,RGB_BPTC_UNSIGNED_Format:no,RGB_ETC1_Format:Ba,RGB_ETC2_Format:za,RGB_PVRTC_2BPPV1_Format:Na,RGB_PVRTC_4BPPV1_Format:Ua,RGB_S3TC_DXT1_Format:Xs,RGDepthPacking:ip,RGFormat:cc,RGIntegerFormat:xo,RawShaderMaterial:hf,Ray:Gi,Raycaster:Ly,RectAreaLight:Rf,RedFormat:_o,RedIntegerFormat:_r,ReinhardToneMapping:ld,RenderTarget:Ld,RepeatWrapping:er,ReplaceStencilOp:rp,ReverseSubtractEquation:Gu,RingGeometry:Bo,SIGNED_RED_GREEN_RGTC2_Format:ro,SIGNED_RED_RGTC1_Format:io,SRGBColorSpace:Ye,SRGBTransfer:oe,Scene:Wd,ShaderChunk:Yt,ShaderLib:dn,ShaderMaterial:on,ShadowMaterial:cf,Shape:Oi,ShapeGeometry:zo,ShapePath:$y,ShapeUtils:wn,ShortType:ic,Skeleton:Co,SkeletonHelper:Oy,SkinnedMesh:Zd,Source:Pi,Sphere:Ae,SphereGeometry:br,Spherical:Ql,SphericalHarmonics3:Pf,SplineCurve:Rc,SpotLight:wf,SpotLightHelper:Ny,Sprite:qd,SpriteMaterial:Mc,SrcAlphaFactor:wa,SrcAlphaSaturateFactor:td,SrcColorFactor:Zu,StaticCopyUsage:bp,StaticDrawUsage:rr,StaticReadUsage:yp,StereoCamera:uy,StreamCopyUsage:wp,StreamDrawUsage:vp,StreamReadUsage:Sp,StringKeyframeTrack:qi,SubtractEquation:Hu,SubtractiveBlending:zl,TOUCH:Ei,TangentSpaceNormalMap:ri,TetrahedronGeometry:ko,Texture:ge,TextureLoader:iy,TextureUtils:$x,TorusGeometry:Vo,TorusKnotGeometry:Ho,Triangle:Ze,TriangleFanDrawMode:ep,TriangleStripDrawMode:tp,TrianglesDrawMode:Qf,TubeGeometry:Go,UVMapping:fo,Uint16BufferAttribute:mc,Uint32BufferAttribute:gc,Uint8BufferAttribute:lm,Uint8ClampedBufferAttribute:cm,Uniform:Vc,UniformsGroup:Py,UniformsLib:ut,UniformsUtils:oo,UnsignedByteType:An,UnsignedInt248Type:zi,UnsignedInt5999Type:sc,UnsignedIntType:Xn,UnsignedShort4444Type:mo,UnsignedShort5551Type:go,UnsignedShortType:xs,VSMShadowMap:vn,Vector2:Z,Vector3:w,Vector4:Jt,VectorKeyframeTrack:fr,VideoTexture:mv,WebGL3DRenderTarget:Jp,WebGLArrayRenderTarget:$p,WebGLCoordinateSystem:bn,WebGLCubeRenderTarget:Od,WebGLMultipleRenderTargets:Ky,WebGLRenderTarget:fn,WebGLRenderer:rv,WebGLUtils:Hd,WebGPUCoordinateSystem:ar,WireframeGeometry:Pc,WrapAroundEnding:sr,ZeroCurvatureEnding:Ci,ZeroFactor:qu,ZeroSlopeEnding:Ri,ZeroStencilOp:sp,createCanvasElement:Pd},Symbol.toStringTag,{value:"Module"})),zf=parseInt("170".replace(/\D+/g,"")),kf=zf>=125?"uv1":"uv2";var jy=Object.defineProperty,Qy=(r,t,e)=>t in r?jy(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,tM=(r,t,e)=>(Qy(r,t+"",e),e);class eM{constructor(){tM(this,"_listeners")}addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}var nM=Object.defineProperty,iM=(r,t,e)=>t in r?nM(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Ut=(r,t,e)=>(iM(r,typeof t!="symbol"?t+"":t,e),e);const va=new Gi,Iu=new On,sM=Math.cos(70*(Math.PI/180)),Lu=(r,t)=>(r%t+t)%t;class uM extends eM{constructor(t,e){super(),Ut(this,"object"),Ut(this,"domElement"),Ut(this,"enabled",!0),Ut(this,"target",new w),Ut(this,"minDistance",0),Ut(this,"maxDistance",1/0),Ut(this,"minZoom",0),Ut(this,"maxZoom",1/0),Ut(this,"minPolarAngle",0),Ut(this,"maxPolarAngle",Math.PI),Ut(this,"minAzimuthAngle",-1/0),Ut(this,"maxAzimuthAngle",1/0),Ut(this,"enableDamping",!1),Ut(this,"dampingFactor",.05),Ut(this,"enableZoom",!0),Ut(this,"zoomSpeed",1),Ut(this,"enableRotate",!0),Ut(this,"rotateSpeed",1),Ut(this,"enablePan",!0),Ut(this,"panSpeed",1),Ut(this,"screenSpacePanning",!0),Ut(this,"keyPanSpeed",7),Ut(this,"zoomToCursor",!1),Ut(this,"autoRotate",!1),Ut(this,"autoRotateSpeed",2),Ut(this,"reverseOrbit",!1),Ut(this,"reverseHorizontalOrbit",!1),Ut(this,"reverseVerticalOrbit",!1),Ut(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),Ut(this,"mouseButtons",{LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN}),Ut(this,"touches",{ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN}),Ut(this,"target0"),Ut(this,"position0"),Ut(this,"zoom0"),Ut(this,"_domElementKeyEvents",null),Ut(this,"getPolarAngle"),Ut(this,"getAzimuthalAngle"),Ut(this,"setPolarAngle"),Ut(this,"setAzimuthalAngle"),Ut(this,"getDistance"),Ut(this,"getZoomScale"),Ut(this,"listenToKeyEvents"),Ut(this,"stopListenToKeyEvents"),Ut(this,"saveState"),Ut(this,"reset"),Ut(this,"update"),Ut(this,"connect"),Ut(this,"dispose"),Ut(this,"dollyIn"),Ut(this,"dollyOut"),Ut(this,"getScale"),Ut(this,"setScale"),this.object=t,this.domElement=e,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>h.phi,this.getAzimuthalAngle=()=>h.theta,this.setPolarAngle=U=>{let Y=Lu(U,2*Math.PI),pt=h.phi;pt<0&&(pt+=2*Math.PI),Y<0&&(Y+=2*Math.PI);let D=Math.abs(Y-pt);2*Math.PI-D<D&&(Y<pt?Y+=2*Math.PI:pt+=2*Math.PI),u.phi=Y-pt,n.update()},this.setAzimuthalAngle=U=>{let Y=Lu(U,2*Math.PI),pt=h.theta;pt<0&&(pt+=2*Math.PI),Y<0&&(Y+=2*Math.PI);let D=Math.abs(Y-pt);2*Math.PI-D<D&&(Y<pt?Y+=2*Math.PI:pt+=2*Math.PI),u.theta=Y-pt,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=U=>{U.addEventListener("keydown",dt),this._domElementKeyEvents=U},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",dt),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=o.NONE},this.update=(()=>{const U=new w,Y=new w(0,1,0),pt=new Ne().setFromUnitVectors(t.up,Y),D=pt.clone().invert(),st=new w,G=new Ne,K=2*Math.PI;return function(){const mt=n.object.position;pt.setFromUnitVectors(t.up,Y),D.copy(pt).invert(),U.copy(mt).sub(n.target),U.applyQuaternion(pt),h.setFromVector3(U),n.autoRotate&&l===o.NONE&&H(V()),n.enableDamping?(h.theta+=u.theta*n.dampingFactor,h.phi+=u.phi*n.dampingFactor):(h.theta+=u.theta,h.phi+=u.phi);let Ot=n.minAzimuthAngle,ie=n.maxAzimuthAngle;isFinite(Ot)&&isFinite(ie)&&(Ot<-Math.PI?Ot+=K:Ot>Math.PI&&(Ot-=K),ie<-Math.PI?ie+=K:ie>Math.PI&&(ie-=K),Ot<=ie?h.theta=Math.max(Ot,Math.min(ie,h.theta)):h.theta=h.theta>(Ot+ie)/2?Math.max(Ot,h.theta):Math.min(ie,h.theta)),h.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,h.phi)),h.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.zoomToCursor&&b||n.object.isOrthographicCamera?h.radius=te(h.radius):h.radius=te(h.radius*d),U.setFromSpherical(h),U.applyQuaternion(D),mt.copy(n.target).add(U),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0));let fe=!1;if(n.zoomToCursor&&b){let jt=null;if(n.object instanceof ye&&n.object.isPerspectiveCamera){const Te=U.length();jt=te(Te*d);const Ge=Te-jt;n.object.position.addScaledVector(C,Ge),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Te=new w(R.x,R.y,0);Te.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),fe=!0;const Ge=new w(R.x,R.y,0);Ge.unproject(n.object),n.object.position.sub(Ge).add(Te),n.object.updateMatrixWorld(),jt=U.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;jt!==null&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(jt).add(n.object.position):(va.origin.copy(n.object.position),va.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(va.direction))<sM?t.lookAt(n.target):(Iu.setFromNormalAndCoplanarPoint(n.object.up,n.target),va.intersectPlane(Iu,n.target))))}else n.object instanceof Ni&&n.object.isOrthographicCamera&&(fe=d!==1,fe&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix()));return d=1,b=!1,fe||st.distanceToSquared(n.object.position)>c||8*(1-G.dot(n.object.quaternion))>c?(n.dispatchEvent(i),st.copy(n.object.position),G.copy(n.object.quaternion),fe=!1,!0):!1}})(),this.connect=U=>{n.domElement=U,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",nt),n.domElement.addEventListener("pointerdown",S),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",Tt)},this.dispose=()=>{var U,Y,pt,D,st,G;n.domElement&&(n.domElement.style.touchAction="auto"),(U=n.domElement)==null||U.removeEventListener("contextmenu",nt),(Y=n.domElement)==null||Y.removeEventListener("pointerdown",S),(pt=n.domElement)==null||pt.removeEventListener("pointercancel",q),(D=n.domElement)==null||D.removeEventListener("wheel",Tt),(st=n.domElement)==null||st.ownerDocument.removeEventListener("pointermove",F),(G=n.domElement)==null||G.ownerDocument.removeEventListener("pointerup",q),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",dt)};const n=this,i={type:"change"},s={type:"start"},a={type:"end"},o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=o.NONE;const c=1e-6,h=new Ql,u=new Ql;let d=1;const f=new w,m=new Z,_=new Z,g=new Z,p=new Z,y=new Z,v=new Z,x=new Z,I=new Z,A=new Z,C=new w,R=new Z;let b=!1;const M=[],L={};function V(){return 2*Math.PI/60/60*n.autoRotateSpeed}function B(){return Math.pow(.95,n.zoomSpeed)}function H(U){n.reverseOrbit||n.reverseHorizontalOrbit?u.theta+=U:u.theta-=U}function j(U){n.reverseOrbit||n.reverseVerticalOrbit?u.phi+=U:u.phi-=U}const X=(()=>{const U=new w;return function(pt,D){U.setFromMatrixColumn(D,0),U.multiplyScalar(-pt),f.add(U)}})(),it=(()=>{const U=new w;return function(pt,D){n.screenSpacePanning===!0?U.setFromMatrixColumn(D,1):(U.setFromMatrixColumn(D,0),U.crossVectors(n.object.up,U)),U.multiplyScalar(pt),f.add(U)}})(),W=(()=>{const U=new w;return function(pt,D){const st=n.domElement;if(st&&n.object instanceof ye&&n.object.isPerspectiveCamera){const G=n.object.position;U.copy(G).sub(n.target);let K=U.length();K*=Math.tan(n.object.fov/2*Math.PI/180),X(2*pt*K/st.clientHeight,n.object.matrix),it(2*D*K/st.clientHeight,n.object.matrix)}else st&&n.object instanceof Ni&&n.object.isOrthographicCamera?(X(pt*(n.object.right-n.object.left)/n.object.zoom/st.clientWidth,n.object.matrix),it(D*(n.object.top-n.object.bottom)/n.object.zoom/st.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function ht(U){n.object instanceof ye&&n.object.isPerspectiveCamera||n.object instanceof Ni&&n.object.isOrthographicCamera?d=U:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ft(U){ht(d/U)}function bt(U){ht(d*U)}function Ht(U){if(!n.zoomToCursor||!n.domElement)return;b=!0;const Y=n.domElement.getBoundingClientRect(),pt=U.clientX-Y.left,D=U.clientY-Y.top,st=Y.width,G=Y.height;R.x=pt/st*2-1,R.y=-(D/G)*2+1,C.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function te(U){return Math.max(n.minDistance,Math.min(n.maxDistance,U))}function J(U){m.set(U.clientX,U.clientY)}function at(U){Ht(U),x.set(U.clientX,U.clientY)}function wt(U){p.set(U.clientX,U.clientY)}function lt(U){_.set(U.clientX,U.clientY),g.subVectors(_,m).multiplyScalar(n.rotateSpeed);const Y=n.domElement;Y&&(H(2*Math.PI*g.x/Y.clientHeight),j(2*Math.PI*g.y/Y.clientHeight)),m.copy(_),n.update()}function Dt(U){I.set(U.clientX,U.clientY),A.subVectors(I,x),A.y>0?ft(B()):A.y<0&&bt(B()),x.copy(I),n.update()}function Vt(U){y.set(U.clientX,U.clientY),v.subVectors(y,p).multiplyScalar(n.panSpeed),W(v.x,v.y),p.copy(y),n.update()}function Bt(U){Ht(U),U.deltaY<0?bt(B()):U.deltaY>0&&ft(B()),n.update()}function Kt(U){let Y=!1;switch(U.code){case n.keys.UP:W(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:W(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:W(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:W(-n.keyPanSpeed,0),Y=!0;break}Y&&(U.preventDefault(),n.update())}function Q(){if(M.length==1)m.set(M[0].pageX,M[0].pageY);else{const U=.5*(M[0].pageX+M[1].pageX),Y=.5*(M[0].pageY+M[1].pageY);m.set(U,Y)}}function rt(){if(M.length==1)p.set(M[0].pageX,M[0].pageY);else{const U=.5*(M[0].pageX+M[1].pageX),Y=.5*(M[0].pageY+M[1].pageY);p.set(U,Y)}}function P(){const U=M[0].pageX-M[1].pageX,Y=M[0].pageY-M[1].pageY,pt=Math.sqrt(U*U+Y*Y);x.set(0,pt)}function Ct(){n.enableZoom&&P(),n.enablePan&&rt()}function et(){n.enableZoom&&P(),n.enableRotate&&Q()}function vt(U){if(M.length==1)_.set(U.pageX,U.pageY);else{const pt=St(U),D=.5*(U.pageX+pt.x),st=.5*(U.pageY+pt.y);_.set(D,st)}g.subVectors(_,m).multiplyScalar(n.rotateSpeed);const Y=n.domElement;Y&&(H(2*Math.PI*g.x/Y.clientHeight),j(2*Math.PI*g.y/Y.clientHeight)),m.copy(_)}function ct(U){if(M.length==1)y.set(U.pageX,U.pageY);else{const Y=St(U),pt=.5*(U.pageX+Y.x),D=.5*(U.pageY+Y.y);y.set(pt,D)}v.subVectors(y,p).multiplyScalar(n.panSpeed),W(v.x,v.y),p.copy(y)}function Nt(U){const Y=St(U),pt=U.pageX-Y.x,D=U.pageY-Y.y,st=Math.sqrt(pt*pt+D*D);I.set(0,st),A.set(0,Math.pow(I.y/x.y,n.zoomSpeed)),ft(A.y),x.copy(I)}function yt(U){n.enableZoom&&Nt(U),n.enablePan&&ct(U)}function T(U){n.enableZoom&&Nt(U),n.enableRotate&&vt(U)}function S(U){var Y,pt;n.enabled!==!1&&(M.length===0&&((Y=n.domElement)==null||Y.ownerDocument.addEventListener("pointermove",F),(pt=n.domElement)==null||pt.ownerDocument.addEventListener("pointerup",q)),Et(U),U.pointerType==="touch"?Mt(U):tt(U))}function F(U){n.enabled!==!1&&(U.pointerType==="touch"?$t(U):$(U))}function q(U){var Y,pt,D;Ft(U),M.length===0&&((Y=n.domElement)==null||Y.releasePointerCapture(U.pointerId),(pt=n.domElement)==null||pt.ownerDocument.removeEventListener("pointermove",F),(D=n.domElement)==null||D.ownerDocument.removeEventListener("pointerup",q)),n.dispatchEvent(a),l=o.NONE}function tt(U){let Y;switch(U.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case bi.DOLLY:if(n.enableZoom===!1)return;at(U),l=o.DOLLY;break;case bi.ROTATE:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enablePan===!1)return;wt(U),l=o.PAN}else{if(n.enableRotate===!1)return;J(U),l=o.ROTATE}break;case bi.PAN:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enableRotate===!1)return;J(U),l=o.ROTATE}else{if(n.enablePan===!1)return;wt(U),l=o.PAN}break;default:l=o.NONE}l!==o.NONE&&n.dispatchEvent(s)}function $(U){if(n.enabled!==!1)switch(l){case o.ROTATE:if(n.enableRotate===!1)return;lt(U);break;case o.DOLLY:if(n.enableZoom===!1)return;Dt(U);break;case o.PAN:if(n.enablePan===!1)return;Vt(U);break}}function Tt(U){n.enabled===!1||n.enableZoom===!1||l!==o.NONE&&l!==o.ROTATE||(U.preventDefault(),n.dispatchEvent(s),Bt(U),n.dispatchEvent(a))}function dt(U){n.enabled===!1||n.enablePan===!1||Kt(U)}function Mt(U){switch(kt(U),M.length){case 1:switch(n.touches.ONE){case Ei.ROTATE:if(n.enableRotate===!1)return;Q(),l=o.TOUCH_ROTATE;break;case Ei.PAN:if(n.enablePan===!1)return;rt(),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(n.touches.TWO){case Ei.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ct(),l=o.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;et(),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&n.dispatchEvent(s)}function $t(U){switch(kt(U),l){case o.TOUCH_ROTATE:if(n.enableRotate===!1)return;vt(U),n.update();break;case o.TOUCH_PAN:if(n.enablePan===!1)return;ct(U),n.update();break;case o.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;yt(U),n.update();break;case o.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;T(U),n.update();break;default:l=o.NONE}}function nt(U){n.enabled!==!1&&U.preventDefault()}function Et(U){M.push(U)}function Ft(U){delete L[U.pointerId];for(let Y=0;Y<M.length;Y++)if(M[Y].pointerId==U.pointerId){M.splice(Y,1);return}}function kt(U){let Y=L[U.pointerId];Y===void 0&&(Y=new Z,L[U.pointerId]=Y),Y.set(U.pageX,U.pageY)}function St(U){const Y=U.pointerId===M[0].pointerId?M[1]:M[0];return L[Y.pointerId]}this.dollyIn=(U=B())=>{bt(U),n.update()},this.dollyOut=(U=B())=>{ft(U),n.update()},this.getScale=()=>d,this.setScale=U=>{ht(U),n.update()},this.getZoomScale=()=>B(),e!==void 0&&this.connect(e),this.update()}}const Du=new we,ya=new w;class Vf extends Fc{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new At(t,3)),this.setAttribute("uv",new At(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new uo(e,6,1);return this.setAttribute("instanceStart",new tn(n,3,0)),this.setAttribute("instanceEnd",new tn(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t,e=3){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new uo(n,e*2,1);return this.setAttribute("instanceColorStart",new tn(i,e,0)),this.setAttribute("instanceColorEnd",new tn(i,e,e)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Pc(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new we);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Du.setFromBufferAttribute(e),this.boundingBox.union(Du))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ae),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)ya.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ya)),ya.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(ya));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class rM extends Vf{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,n=new Float32Array(2*e);for(let i=0;i<e;i+=3)n[2*i]=t[i],n[2*i+1]=t[i+1],n[2*i+2]=t[i+2],n[2*i+3]=t[i+3],n[2*i+4]=t[i+4],n[2*i+5]=t[i+5];return super.setPositions(n),this}setColors(t,e=3){const n=t.length-e,i=new Float32Array(2*n);if(e===3)for(let s=0;s<n;s+=e)i[2*s]=t[s],i[2*s+1]=t[s+1],i[2*s+2]=t[s+2],i[2*s+3]=t[s+3],i[2*s+4]=t[s+4],i[2*s+5]=t[s+5];else for(let s=0;s<n;s+=e)i[2*s]=t[s],i[2*s+1]=t[s+1],i[2*s+2]=t[s+2],i[2*s+3]=t[s+3],i[2*s+4]=t[s+4],i[2*s+5]=t[s+5],i[2*s+6]=t[s+6],i[2*s+7]=t[s+7];return super.setColors(i,e),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}class Hf extends on{constructor(t){super({type:"LineMaterial",uniforms:oo.clone(oo.merge([ut.common,ut.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Z(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${zf>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}}const Ul=new Jt,Uu=new w,Nu=new w,Ce=new Jt,Re=new Jt,_n=new Jt,Nl=new w,Ol=new zt,Pe=new Ff,Ou=new w,Ma=new we,Sa=new Ae,xn=new Jt;let Mn,Fi;function Fu(r,t,e){return xn.set(0,0,-t,1).applyMatrix4(r.projectionMatrix),xn.multiplyScalar(1/xn.w),xn.x=Fi/e.width,xn.y=Fi/e.height,xn.applyMatrix4(r.projectionMatrixInverse),xn.multiplyScalar(1/xn.w),Math.abs(Math.max(xn.x,xn.y))}function aM(r,t){const e=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){Pe.start.fromBufferAttribute(i,o),Pe.end.fromBufferAttribute(s,o),Pe.applyMatrix4(e);const c=new w,h=new w;Mn.distanceSqToSegment(Pe.start,Pe.end,h,c),h.distanceTo(c)<Fi*.5&&t.push({point:h,pointOnLine:c,distance:Mn.origin.distanceTo(h),object:r,face:null,faceIndex:o,uv:null,[kf]:null})}}function oM(r,t,e){const n=t.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),u=-t.near;Mn.at(1,_n),_n.w=1,_n.applyMatrix4(t.matrixWorldInverse),_n.applyMatrix4(n),_n.multiplyScalar(1/_n.w),_n.x*=s.x/2,_n.y*=s.y/2,_n.z=0,Nl.copy(_n),Ol.multiplyMatrices(t.matrixWorldInverse,a);for(let d=0,f=h;d<f;d++){if(Ce.fromBufferAttribute(l,d),Re.fromBufferAttribute(c,d),Ce.w=1,Re.w=1,Ce.applyMatrix4(Ol),Re.applyMatrix4(Ol),Ce.z>u&&Re.z>u)continue;if(Ce.z>u){const v=Ce.z-Re.z,x=(Ce.z-u)/v;Ce.lerp(Re,x)}else if(Re.z>u){const v=Re.z-Ce.z,x=(Re.z-u)/v;Re.lerp(Ce,x)}Ce.applyMatrix4(n),Re.applyMatrix4(n),Ce.multiplyScalar(1/Ce.w),Re.multiplyScalar(1/Re.w),Ce.x*=s.x/2,Ce.y*=s.y/2,Re.x*=s.x/2,Re.y*=s.y/2,Pe.start.copy(Ce),Pe.start.z=0,Pe.end.copy(Re),Pe.end.z=0;const _=Pe.closestPointToPointParameter(Nl,!0);Pe.at(_,Ou);const g=Cd.lerp(Ce.z,Re.z,_),p=g>=-1&&g<=1,y=Nl.distanceTo(Ou)<Fi*.5;if(p&&y){Pe.start.fromBufferAttribute(l,d),Pe.end.fromBufferAttribute(c,d),Pe.start.applyMatrix4(a),Pe.end.applyMatrix4(a);const v=new w,x=new w;Mn.distanceSqToSegment(Pe.start,Pe.end,x,v),e.push({point:x,pointOnLine:v,distance:Mn.origin.distanceTo(x),object:r,face:null,faceIndex:d,uv:null,[kf]:null})}}}class lM extends xe{constructor(t=new Vf,e=new Hf({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let a=0,o=0,l=e.count;a<l;a++,o+=2)Uu.fromBufferAttribute(e,a),Nu.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+Uu.distanceTo(Nu);const s=new uo(i,2,1);return t.setAttribute("instanceDistanceStart",new tn(s,1,0)),t.setAttribute("instanceDistanceEnd",new tn(s,1,1)),this}raycast(t,e){const n=this.material.worldUnits,i=t.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Mn=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Fi=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),Sa.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Fi*.5;else{const u=Math.max(i.near,Sa.distanceToPoint(Mn.origin));c=Fu(i,u,l.resolution)}if(Sa.radius+=c,Mn.intersectsSphere(Sa)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Ma.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Fi*.5;else{const u=Math.max(i.near,Ma.distanceToPoint(Mn.origin));h=Fu(i,u,l.resolution)}Ma.expandByScalar(h),Mn.intersectsBox(Ma)!==!1&&(n?aM(this,e):oM(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Ul),this.material.uniforms.resolution.value.set(Ul.z,Ul.w))}}class dM extends lM{constructor(t=new rM,e=new Hf({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}}export{hd as A,Yf as B,bo as C,En as D,rf as E,So as L,Ie as N,Ni as O,ye as P,ke as R,Ye as S,hM as T,An as U,w as V,rv as W,yn as a,Z as b,Ly as c,Wd as d,ku as e,vn as f,tc as g,Vn as h,Df as i,lM as j,dM as k,Hf as l,Vf as m,rM as n,Jt as o,xt as p,uM as q,Es as r,le as s};
