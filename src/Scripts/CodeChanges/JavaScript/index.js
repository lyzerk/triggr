var recast = require("recast");
var fs = require('fs');
// print process.argv

// file1 and file2
let file1 = process.argv[2];
let file2 = process.argv[3];
let type = process.argv[4];
let name = process.argv[5];

if (type == 'function')
    type = 'FunctionDeclaration';

fs.readFile(file1, 'utf8', function (err, fileData1) {
    if (err) {
        console.log(err);
        return;
    }
    fs.readFile(file2, 'utf8', function (err, fileData2) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(compare(fileData1, fileData2));
    })
});

function search(ast, type, name) {

    for (let i = 0; i < ast.body.length; i++) {
        if (ast.body[i].type === type && ast.body[i].id.name === name)
            return ast.body[i];
        else {
            if (ast.body[i].body !== undefined)
                return search(ast.body[i].body, type, name);
        }

    }
}

function compare(data1, data2) {
    let ast1 = recast.parse(data1);
    let ast2 = recast.parse(data2);
    var node1 = search(ast1.program, type, name);
    var node2 = search(ast2.program, type, name);

    var code1 = recast.print(node1).code;
    var code2 = recast.print(node2).code;

    return code1 === code2 ? "no change" : "changed";
}
