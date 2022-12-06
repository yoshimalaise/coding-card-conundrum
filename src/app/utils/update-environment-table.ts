import { CardTrail } from "../model/card-trail.interface";
import { TracetableLine } from "../model/tracetable-line.interface";

export function updateEnvironmentTableByCode(trail: CardTrail) {
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

export function updateEnvironmentTableByTracelines(trail: CardTrail) {
    const environment:  TracetableLine = {
        foo: "",
        bar: "",
        x: "",
        y: "",
        z: ""
    } 

    trail.tracetable.forEach(line => {
        if (line.foo !== "") {
            environment.foo = line.foo;
        }
        if (line.bar !== "") {
            environment.bar = line.bar;
        }
        if (line.x !== "") {
            environment.x = line.x;
        }
        if (line.y !== "") {
            environment.y = line.y;
        }
        if (line.z !== "") {
            environment.z = line.z;
        }
    });

    trail.environment = environment;
}