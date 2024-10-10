
import { test, expect } from 'bun:test';
import { sum } from './index.js';

test('menghitung jumlah dua angka', () => {
  // Uji kasus 1
  expect(sum(1, 2)).toBe(3);
  
  // Uji kasus 2
  expect(sum(-1, 1)).toBe(0);
  
  // Uji kasus 3
  expect(sum(0, 0)).toBe(0);
  
  // Uji kasus 4
  expect(sum(5, 5)).toBe(10);
});
