import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a key in cache',() => {
    let lastKey = service.get("key")
    expect(lastKey).toBeUndefined()
    service.put("key", "value")
    let newKey = service.get("key")
    expect(newKey).toBeDefined()
    expect(newKey).toEqual("value")
  })

  it('should clear a key in cache',() => {
    service.put("key1", "value1")
    service.put("key2", "value2")
    let key1 = service.get("key1")
    expect(key1).toBeDefined()
    expect(key1).toEqual("value1")
    service.clear("key1")
    let newKey1 = service.get("key1")
    expect(newKey1).toBeUndefined()
    let newKey2 = service.get("key2")
    expect(newKey2).toBeDefined()
  })

  it('should clear all in cache',() => {
    service.put("key1", "value1")
    service.put("key2", "value2")
    let key1 = service.get("key1")
    expect(key1).toBeDefined()
    expect(key1).toEqual("value1")
    service.clearAll()
    let newKey1 = service.get("key1")
    expect(newKey1).toBeUndefined()
    let newKey2 = service.get("key2")
    expect(newKey2).toBeUndefined()
  })
});
