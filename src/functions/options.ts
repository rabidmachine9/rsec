import {scales } from './scales'

export var options = {
    'scales': Object.keys(scales),
    'range': [4, 8, 16, 32],
    'notes': ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
    'octaves': [0 , 1, 2, 3, 4, 5, 6],
    'steps': [4, 8, 16, 32],
    'ratio': new Map<string, number>([['1', 1], ['1/2', 0.5], ['1/4', 0.25]])

}
