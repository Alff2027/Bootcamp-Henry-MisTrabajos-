import {expect} from 'chai';
import sinon from 'sinon';
import path from 'path';
import fs from 'fs';

const readFile = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, contents) => {
            if (err) return reject(err);
            resolve(contents);
        });
    });
};

// La siguiente linea debería añadir una función .map al objeto de es6-promise Promise
// ... la cual va ser el sistema a testear.
// Notece que no estamos utilizando un valor exportado.

require('../../extra-credit/promise-map');

describe('▒▒▒ Extra Credit tests ▒▒▒', function () {

    describe('Promise.map', () => {

        beforeEach('Remueve Promise.all', () => {
            // Promise.all hace trivial algunas partes de este desafio
            // Este beforeEach busca remover su existencia.
            // No uses Promise.all en tu implementacion!
            Promise.all = null;
        });

        xit('Es una función que retorna una promesa', () => {
            expect(Promise.map).to.be.a('function');
            const returnValue = Promise.map(['./package.json'], () => true);
            expect(returnValue).to.be.an.instanceof(Promise);
        });

        describe('promesa retornada', () => {

            xit('resuelve a elementos del arreglo ingresado transformado por iterador dado', () => {

                const returnedPromise = Promise.map(
                    ['./package.json', './README.md'],
                    fileName => fileName.toUpperCase()
                );

                return returnedPromise.then(fileNamesInCaps => {
                    expect(fileNamesInCaps.length).to.be.equal(2);
                    expect(fileNamesInCaps[0]).to.be.equal('./PACKAGE.JSON');
                    expect(fileNamesInCaps[1]).to.be.equal('./README.MD');
                });

            });

            xit('rechaza con el error arrojado por el primer iterador que arroje un error', () => {

                const returnedPromise = Promise.map(
                    ['./package.json', './README.md', './.gitignore'],
                    fileName => {

                        if (fileName === './README.md') {
                            throw new Error('World exploded!!!');
                        }

                        return fileName.toUpperCase();

                    }
                );

                return returnedPromise.then(() => {
                    throw new Error('This should have errored!');
                }, err => {
                    expect(err.message).to.be.equal('World exploded!!!');
                });

            });

        });

        describe('retornando una promesa del iterador', () => {

            let filePaths;

            beforeEach(() => {
                filePaths = ['1.txt', '2.txt', '3.txt'].map(
                    filePath => path.join(__dirname, filePath)
                );
            });

            xit('el valor transoformado es el valor resuelto por la promesa', () => {

                const mapPromise = Promise.map(filePaths, filePath => {
                    return readFile(filePath)
                        .then(fileContents => fileContents.toString());
                });

                return mapPromise.then(files => {
                    expect(files).to.include('one');
                    expect(files).to.include('two');
                    expect(files).to.include('three');
                });

            });

            xit('mantiene el orden del arreglo de entrada', () => {

                const mapPromise = Promise.map(filePaths, filePath => {
                    return readFile(filePath)
                        .then(fileContents => fileContents.toString());
                });

                return mapPromise.then(files => {
                    expect(files[0]).to.be.equal('one');
                    expect(files[1]).to.be.equal('two');
                    expect(files[2]).to.be.equal('three');
                });

            });

            xit('rechaza la promesa del map si el iterador retorna una promesa que es rechazada', () => {

                filePaths.push('LOLTOTALLYNOTAFILE!!.txt');

                const mapPromise = Promise.map(filePaths, filePath => {
                    return readFile(filePath)
                        .then(fileContents => fileContents.toString());
                });

                return mapPromise.then(() => {
                    throw new Error('This should have errored!');
                }, err => {
                    expect(err).to.be.an.instanceof(Error);
                    expect(err.code).to.be.equal('ENOENT');
                    expect(err.path).to.be.equal('LOLTOTALLYNOTAFILE!!.txt');
                });

            });

        });

        describe('promesas en el arreglo de entrada', () => {

            let filePaths;

            beforeEach(() => {

                filePaths = [];

                // A promise for a read of 1.txt as a string
                filePaths.push(
                    readFile(path.join(__dirname, './1.txt')).then(fileContents => fileContents.toString())
                );

                // A string that is the path of 2.txt
                filePaths.push(path.join(__dirname, './2.txt'));

                // A promise for a read of 3.txt as a string
                filePaths.push(
                    readFile(path.join(__dirname, './3.txt')).then(fileContents => fileContents.toString())
                );

            });

            xit('llama al iterador de la función con el valor resuelto de la promesa', () => {

                const spy = sinon.spy();

                const mapPromise = Promise.map(filePaths, file => {

                    spy(file);

                    if (file.search('.txt') !== -1) {
                        return readFile(file)
                            .then(fileContents => fileContents.toString().toUpperCase());
                    } else {
                        return file.toUpperCase();
                    }

                });

                return mapPromise.then(files => {

                    expect(spy.calledWith('one')).to.be.equal(true);
                    expect(spy.calledWith(path.join(__dirname, './2.txt'))).to.be.equal(true);
                    expect(spy.calledWith('three')).to.be.equal(true);

                    expect(files).to.be.deep.equal(['ONE', 'TWO', 'THREE']);

                });

            });

            xit('rechaza la promesa de map si una promesa del arreglo de entrada es rechazada', () => {

                const rejectError = new Error('World exploded!!!');

                filePaths.push(Promise.reject(rejectError));

                const mapPromise = Promise.map(filePaths, () => true);

                return mapPromise.then(() => {
                    throw new Error('This should have errored!');
                }, err => {
                    expect(err).to.be.equal(rejectError);
                });

            });

        });

    });

});

