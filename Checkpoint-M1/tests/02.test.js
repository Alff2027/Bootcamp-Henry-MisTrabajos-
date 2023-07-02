/* eslint-disable no-undef */
const {
    balanced
} = require('../checkpoint.js');

describe('EJERCICIO 2: balanced', function() {

    /*todo: testear que se la funcion recursiva se llamo n veces en cada caso*/

    it('Debería devolver 0 ante la exp = (5+6)-(t+2*9-(a+7)/4+(8+5*2))', function(){
        expect(balanced("(5+6)-(t+2*9-(a+7)/4+(8+5*2))")).toBe(0);
    });

    it('Debería devolver un número distinto de 0 ante la exp = 70 + (9/x - 2))', function(){
        let rta = balanced("70 + (9/x - 2))");
        expect(typeof rta).toBe("number");
        expect(rta).not.toBe(0);
    });

    it('Debería devolver 0 ante la exp = (9+10)-6*a/2+(-5)', function(){
        expect(balanced("(9+10)-6*a/2+(-5)")).toBe(0);
    });

    it('Debería devolver un número distinto de 0 ante la exp = (4))', function() {
        let rta = balanced("(4))");
        expect(typeof rta).toBe("number");
        expect(rta).not.toBe(0);
    });

    it('Debería devolver un número distinto de 0 ante la exp = (5)+(f-6+(5/6)))', function() {
        let rta = balanced("(5)+(f-6+(5/6)))");
        expect(typeof rta).toBe("number");
        expect(rta).not.toBe(0);
    });

    it('Debería devolver 0 ante la exp = (x-5)+7*y-6+()', function() {
        expect(balanced("(x-5)+7*y-6+()")).toBe(0);
    });

    it('Debería devolver 0 ante la exp = "" ', function() {
        expect(balanced("")).toBe(0);
    });

    it('Debería devolver 0 ante la exp = ()', function() {
        expect(balanced("()")).toBe(0);
    });

    it('Debería devolver un número distinto de 0 ante la exp = )(', function(){
        let rta = balanced(")(");
        expect(typeof rta).toBe("number");
        expect(rta).not.toBe(0);
    });
});

