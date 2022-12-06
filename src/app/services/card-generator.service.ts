import { Injectable } from '@angular/core';
import { EnvironmentCard } from '../model/environment-card.interface';
import { CodeCard } from '../model/code-card.interface';
import { GoalCard } from '../model/goal-card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardGeneratorService {
  constructor() { }
  variables = ["foo", "bar", "x", "y", "z"];

  comparators = ["<", "<=", ">=", ">", "!=="];

  operators = ['+', '-', '%'];

  getEnvironmentCards(): EnvironmentCard[] {
    const res: EnvironmentCard[] = [];
    // generate 50 random initial environments
    for (let i = 0; i < 52; i++) {
      res.push({
        declarationsSnippet: `
let foo = ${randomInt(0, 100)};
let bar = ${randomInt(0, 100)};
let x   = ${randomInt(0, 100)};
let y   = ${randomInt(0, 100)};
let z   = ${randomInt(0, 100)};
`
      });
    }
    return shuffleArray(res);
  }

  getGoalCards(): GoalCard[] {
    const res: GoalCard[] = [];

    // 3 vars odd/even
    for (let x of [true, false]) {
      for (let y of [true, false]) {
        for (let z of [true, false]) {
          const tmp = shuffleArray(this.variables);
          res.push({
            assertionSnippet: `
assert(${tmp[0]} % 2 ${x ? '===' : '!=='} 0  && 
       ${tmp[1]} % 2 ${y ? '===' : '!=='} 0  &&
       ${tmp[2]} % 2 ${y ? '===' : '!=='} 0, 
        "Going strong!");
            `,
            score: 1
          });
        }
      }
    }

    // 3 vars sorted
    for (let i = 0; i < 20; i++) {
      const tmp = shuffleArray(this.variables);
      res.push({
        assertionSnippet: `
assert(${tmp[0]} < ${tmp[1]} && 
       ${tmp[1]} < ${tmp[2]}, 
       "happy days :)");
        `,
        score: 2
      });
    }

    // 4 vars sorted
    for (let i = 0; i < 20; i++) {
      const tmp = shuffleArray(this.variables);
      res.push({
        assertionSnippet: `
assert(${tmp[0]} < ${tmp[1]} && 
       ${tmp[1]} < ${tmp[2]} &&
       ${tmp[2]} < ${tmp[3]}, 
       "Let's go!");
        `,
        score: 4
      });
    }

    // 3 vars have the same value
    for (let i = 0; i < 8; i++) {
      const tmp = shuffleArray(this.variables);
      res.push({
        assertionSnippet: `
assert(${tmp[0]} === ${tmp[1]} && 
       ${tmp[1]} === ${tmp[2]} &&
       ${tmp[2]} === ${tmp[3]}, 
       "Impressive!");
        `,
        score: 8
      });
    }

    return shuffleArray(res);
  }

  getCodeCards(): CodeCard[] {
    const res: CodeCard[] = [];

    // generate all var swaps, only if smaller
    let allVars = shuffleArray(this.variables);
    do {
      const el = allVars.shift();
      allVars.forEach(el2 => {
        const pivotEl = shuffleArray(this.variables.filter(v => v !== el && v!== el2))[0];
        res.push({
          title: 'Swap if smaller',
          comment: `This piece of code will swap ${el} and ${el2} but only if ${el} is smaller than ${el2}. Watch out! This will overwrite ${pivotEl}`,
          snippet: `
if (${el} < ${el2}) {
  ${pivotEl} = ${el};
  ${el} = ${el2};
  ${el2} = ${pivotEl};
}          
          `
        });
      });
    } while(allVars.length > 0);

    // generate all var swaps, only if bigger
    allVars = shuffleArray(this.variables);
    do {
      const el = allVars.shift();
      allVars.forEach(el2 => {
        const pivotEl = shuffleArray(this.variables.filter(v => v !== el && v!== el2))[0];
        res.push({
          title: 'Swap if bigger',
          comment: `This piece of code will swap ${el} and ${el2} but only if ${el} is bigger than ${el2}. Watch out! This will overwrite ${pivotEl}`,
          snippet: `
if (${el} > ${el2}) {
  ${pivotEl} = ${el};
  ${el} = ${el2};
  ${el2} = ${pivotEl};
}          
          `
        });
      });
    } while(allVars.length > 0);

    // generate if else statements that perform mathematical operations on the vars
    for (let i = 0; i < 30; i++) {
      allVars = shuffleArray(this.variables);
      res.push({
        title: 'Heavy mathematics',
        comment: 'This piece of code will perform mathematical operations on the variables depending on the condition in the if statement.',
        snippet: `
if (${allVars[0]} ${getRandomElFromArray(this.comparators)} ${allVars[1]}) {
  ${allVars.slice(0, 2).map(v => `${v} = ${v} ${getRandomElFromArray(this.operators)} ${randomInt(0, 100)};`).join('\n  ')}
}     
        `
      });
    }
    

    return shuffleArray(res);
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffleArray(array: any[]) {
  return array.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
}

function getRandomElFromArray(array: any[]) {
  return array[randomInt(0, array.length - 1)];
}