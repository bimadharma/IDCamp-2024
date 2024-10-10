import { test, expect } from 'bun:test';
import sum from './index.js'; //  lokasi berkas index.js

test('sum should return 0 for non-number inputs', () => {
    expect(sum('2', 3)).toBe(0); 
    expect(sum(2, '3')).toBe(0); 
    expect(sum(null, 3)).toBe(0); 
    expect(sum(2, undefined)).toBe(0); 
    expect(sum({}, [])).toBe(0); 
});

test('sum should return 0 for negative numbers', () => {
    expect(sum(-1, 5)).toBe(0); 
    expect(sum(5, -1)).toBe(0); 
    expect(sum(-1, -1)).toBe(0); 
});

test('sum should return the sum of two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(0, 0)).toBe(0); 
    expect(sum(10, 20)).toBe(30); 
});

test('sum should handle large numbers', () => {
    expect(sum(1e6, 1e6)).toBe(2e6); 
    expect(sum(1e18, 1e18)).toBe(2e18); 
});
