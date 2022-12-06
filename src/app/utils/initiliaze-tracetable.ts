import { CardTrail } from "../model/card-trail.interface";
import { EnvironmentCard } from "../model/environment-card.interface";
import { TracetableLine } from "../model/tracetable-line.interface";

export function initializeTracetable(t: CardTrail) {
    const res: TracetableLine[] = [];
    // let's start by filling up the table from the environment
    const extractFunc = `
function getValues() {
    return {x, y, z, foo, bar }
}
getValues();    
    `;

    const { foo, bar, x, y, z } = eval(t.environmentCard.declarationsSnippet + "\n" + extractFunc);

    const emptyTemplate = {
        foo: '',
        bar: '',
        x: '',
        y: '',
        z: ''
    }
    res.push({
        ...emptyTemplate,
        foo,
    });
    res.push({
        ...emptyTemplate,
        bar
    });
    res.push({
        ...emptyTemplate,
        x
    });
    res.push({
        ...emptyTemplate,
        y
    });
    res.push({
        ...emptyTemplate,
        z
    });
    // add 100 empty lines
    for( let i = 0; i < 100; i++) {
        res.push({
            ...emptyTemplate,
        });
    }
    t.tracetable = res;
}