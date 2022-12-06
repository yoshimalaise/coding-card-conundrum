import { CardTrail } from "../model/card-trail.interface";

export function updateEnvironmentTable(trail: CardTrail) {
    const extractFunc = `
function getValues() {
    return {x, y, z, foo, bar }
}
getValues();    
    `;

    let script = trail.environmentCard.declarationsSnippet + "\n";
    script += trail.codeCards.map(c => c.snippet).join('\n');
    script += "\n" + extractFunc;
    const { foo, bar, x, y, z } = eval(script);
    trail.environment = {foo, bar, x, y, z};
}