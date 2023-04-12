import {scales } from './scales'

export var options = {
    'scales': Object.keys(scales),
    'range': [4, 8, 16, 32],
    'notes': ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
    'octaves': [0 , 1, 2, 3, 4, 5, 6],
    'steps': [4, 8, 16, 32],
    'ratio': new Map<string, number>([['1', 1], ['1/2', 0.5], ['1/4', 0.25]]),
    'channels': new Map<string,number>([
        ['1', 0x90],
        ['2', 0x91],
        ['3', 0x92],
        ['4', 0x93],
        ['5', 0x94],
        ['6', 0x95],
        ['7', 0x96],
        ['8', 0x97],
        ['9', 0x98],
    ])
}
