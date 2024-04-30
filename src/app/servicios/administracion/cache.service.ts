import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, any> = new Map();

  constructor() { }

  put(key: string, data: any){
    this.cache.set(key, data)
  }

  get(key: string){
    return this.cache.get(key)
  }

  clear(key: string){
    this.cache.delete(key)
  }

  clearAll(){
    this.cache.clear()
  }
}
