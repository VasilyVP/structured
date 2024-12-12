"use strict";var h=Object.defineProperty;var r=(a,e)=>h(a,"name",{value:e,configurable:!0});var c=require("crypto"),n=require("json-bigint");require("redis");function o(){throw new Error("You should call init() before")}r(o,"getClient");class d{static{r(this,"RedisMap")}constructor(e,s){this.name=e,this.ttl=s,this.name=e||c.randomBytes(8).toString("hex"),this.ttl=s,this.redis=o()}redis;async set(e,s,t){await this.redis.set(`${this.name}:${e}`,n.stringify(s),{PX:t||this.ttl})}async get(e){const s=await this.redis.get(`${this.name}:${e}`);return s?n.parse(s):null}async has(e){return!!await this.redis.exists(`${this.name}:${e}`)}async delete(e){await this.redis.del(`${this.name}:${e}`)}async*keys(){let e=0;do{const{cursor:s,keys:t}=await this.redis.scan(e,{MATCH:`${this.name}:*`,COUNT:1e3});e=s,yield t.map(i=>i.replace(`${this.name}:`,""))}while(e!==0)}async size(){let e=0,s=0;do{const{cursor:t,keys:i}=await this.redis.scan(e,{MATCH:`${this.name}:*`,COUNT:1e3});s+=i.length,e=t}while(e!==0);return s}async clear(){for await(const e of this.keys()){const s=e.map(t=>`${this.name}:${t}`);await this.redis.del(s)}}async increment(e,s=1){return Number.isInteger(s)?await this.redis.incrBy(`${this.name}:${e}`,s):await this.redis.incrByFloat(`${this.name}:${e}`,s)}async decrement(e,s=1){return Number.isInteger(s)?await this.redis.decrBy(`${this.name}:${e}`,s):await this.redis.incrByFloat(`${this.name}:${e}`,-1*s)}}exports.RedisMap=d;
