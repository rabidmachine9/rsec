if (typeof globalThis === 'undefined') {
    if (typeof window !== 'undefined') {
      globalThis = window;
    } else if (typeof self !== 'undefined') {
      globalThis = self;
    } else {
      throw new Error('Cannot find global object');
    }
  }
  
  // Import wasm_exec.js and other code here
  importScripts('wasm_exec.js');