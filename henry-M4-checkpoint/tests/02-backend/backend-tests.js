import db from '../../server/models';
const User = db.model('user');
const Message = db.model('message');
import app from '../../server/app';

import fsMisc from 'fs-misc';
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest';
import sinon from 'sinon';

describe('▒▒▒ Backend tests ▒▒▒', () => {

    beforeEach('Sincroniza y limpia tu base de datos', () => db.sync({force: true}));

    after('Sincroniza y limpia tu base de datos', () => db.sync({force: true}));

    describe('Modelos Sequlize', function () {

        describe('Modelo User', () => {

            // *Traducción del Assertion*:
            // Este assertion espera que el modelo User va a
            // poner una columna `email` en la tabla users.
            xit('tiene la definición de schema esperado', () => {
                expect(User.attributes.email).to.be.an('object');
            });

            describe('validaciones', () => {

                // *Traducción del Assertion*:
                // La columand `email` debería ser un campo requerido.
                xit('requiere email', () => {
                    const user = User.build();
                    return user.validate()
                        .then(() => { throw new Error('Promise should have rejected');})
                        .catch(err => {
                            expect(err).to.exist;
                            expect(err).to.be.an('error');
                            expect(err.errors).to.contain.a.thing.with.properties({
                                path: 'email',
                                type: 'notNull Violation'
                            });
                        });
                });

            });

        });

        describe('Modelo Message', () => {

            describe('definición', () => {

                // *Traducción del Assertion*:
                // Este assertion espera que el modelo Message ponga una
                // columna `subject` en la tabla messages.
                xit('tiene la definición de subject esperada', () => {
                    expect(Message.attributes.subject).to.be.an('object');
                });

                // *Traducción del Assertion*:
                // Este assertion espera que el modelo Message vaya a
                // poner la columna `body` en la tabla messages
                xit('has expected body definition', () => {
                    expect(Message.attributes.body).to.be.an('object');
                });

            });

            describe('validaciones', () => {

                xit('tiene un valor por defecto "No Subject"', () => {
                    // .build crea una instancia de un modelo
                    // sin salvar la data representada a la base de datos.
                    const message = Message.build();
                    expect(message.subject).to.be.equal('No Subject');
                });

                xit('requiere un body', () => {
                    const message = Message.build();
                    return message.validate()
                        .then(() => { throw new Error('Promise should have rejected');})
                        .catch(err => {
                            expect(err).to.exist;
                            expect(err).to.be.an('error');
                            expect(err.errors).to.contain.a.thing.with.properties({
                                path: 'body',
                                type: 'notNull Violation'
                            });
                        });
                });

            });

            describe('funcionalidad', () => {

                let annaId;
                let elsaId;
                beforeEach('Seed users', () => {
                    const users = [
                        {email: 'anna@gmail.com'},
                        {email: 'elsa@gmail.com'}
                    ];
                    return User.bulkCreate(users, {returning: true})
                        .then(createdUsers => {
                            annaId = createdUsers[0].id;
                            elsaId = createdUsers[1].id;
                        });
                });

                let annaFirstMessage;
                let elsaFirstMessage;
                let annaSecondMessage;
                beforeEach('Seed messages', () => {

                    const messages = [
                        {
                            toId: elsaId,
                            fromId: annaId,
                            subject: 'Hey Elsa!',
                            body: 'Do you wanna build a snowman?'
                        },
                        {
                            toId: annaId,
                            fromId: elsaId,
                            subject: 'Re: Hey Elsa!',
                            body: 'Go away, Anna.'
                        },
                        {
                            toId: elsaId,
                            fromId: annaId,
                            subject: 'Re: Re: Hey Elsa!',
                            body: 'Okay, bye…'
                        }
                    ];

                    return Message.bulkCreate(messages, {returning: true})
                        .then(createdMessages => {
                            annaFirstMessage = createdMessages[0].id;
                            elsaFirstMessage = createdMessages[1].id;
                            annaSecondMessage = createdMessages[2].id;
                        });

                });

                describe('métodos de clase', () => {

                    // Asegurate de leer el largo comentario en server/models/index.js
                    // antes de intentar el siguiente assertion.
                    describe('getAllWhereSender', () => {

                        xit('existe', () => {
                            expect(Message.getAllWhereSender).to.be.a('function');
                        });

                        xit('retorna una promise', () => {
                            expect(Message.getAllWhereSender(annaId).then).to.be.a('function');
                        });

                        xit('resuelve a todos los mensajes enviados por Anna', () => {
                            return Message.getAllWhereSender(annaId)
                                .then(messages => {
                                    expect(messages.length).to.be.equal(2);
                                    expect(messages).to.contain.a.thing.with.property('id', annaFirstMessage);
                                    expect(messages).to.contain.a.thing.with.property('id', annaSecondMessage);
                                });
                        });

                        xit('resuelve a todos los mensajes enviados por Elsa', () => {
                            return Message.getAllWhereSender(elsaId)
                                .then(messages => {
                                    expect(messages.length).to.be.equal(1);
                                    expect(messages[0].id).to.be.equal(elsaFirstMessage);
                                });
                        });


                        xit('Carga (EAGERLY LOADS) la información completa de ambos en remitente y el receptor', () => {

                            // http://sequelize.readthedocs.io/en/v3/docs/models-usage/#eager-loading
                            // No te olvides de aliases explicadas en server/models/index.js!

                            return Message.getAllWhereSender(elsaId)
                                .then(messages => {

                                    const theMessage = messages[0];

                                    // Espera que el primer de los mensajes encontrados tenga las propiedades `to` y `from` que son objetos
                                    expect(theMessage.to).to.be.an('object');
                                    expect(theMessage.from).to.be.an('object');

                                    // Espera que la propiedad email de esos objetos coincidan con el de
                                    // los usuarios asociados que enviaron/recibieron el mensaje
                                    expect(theMessage.to.email).to.be.equal('anna@gmail.com');
                                    expect(theMessage.from.email).to.be.equal('elsa@gmail.com');

                                });
                        });

                    });

                });

                describe('métodos de instancia', () => {

                    describe('truncateSubject', () => {

                        let testMessage;
                        beforeEach(() => {
                            testMessage = Message.build({
                                from: annaId,
                                to: elsaId,
                                subject: `I don't know if I'm elated or gassy`,
                                body: `But I'm somewhere in that zone`
                            });
                        });

                        xit('exists', () => {
                            expect(testMessage.truncateSubject).to.be.a('function');
                        });

                        xit('retorna el objeto mensaje completo pero con el texto del subject limitado basado en el número pasado para determinar su length', () => {
                            // Aquí estamos esperando que el *valor retornado* de .truncateSubject()
                            // es *la instancia completa del objeto message* con su propiedad .subject alterada.
                            const messageWithTruncatedSubject = testMessage.truncateSubject(12);
                            expect(messageWithTruncatedSubject).to.be.an('object');
                            expect(messageWithTruncatedSubject.body).to.be.equal(`But I'm somewhere in that zone`);
                            expect(messageWithTruncatedSubject.subject).to.be.equal(`I don't know`);
                        });

                        xit('agrega puntos suspensivos (...) luego del texto truncado si true es pasado como un segundo argumento', () => {
                            expect(testMessage.truncateSubject(4, true).subject).to.be.equal('I do...');
                        });

                    });

                });

            });

        });

    });

    describe('Servidor HTTP', () => {

        let agent;
        beforeEach('Setea el agente para testear', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            let obama;
            let biden;
            beforeEach('Seed users', () => {
                const users = [
                    {email: 'obama@gmail.com'},
                    {email: 'biden@gmail.com'}
                ];
                return User.bulkCreate(users, {returning: true})
                    .then(createdUsers => {
                        obama = createdUsers[0].id;
                        biden = createdUsers[1].id;
                    });
            });

            let obamaFirstMessage;
            let bidenFirstMessage;
            let obamaSecondMessage;
            beforeEach('Seed messages', () => {

                const messages = [
                    {
                        toId: biden,
                        fromId: obama,
                        body: 'HEYOOOOOOO'
                    },
                    {
                        toId: obama,
                        fromId: biden,
                        body: 'WAAASSUUUUPP??'
                    },
                    {
                        toId: biden,
                        fromId: obama,
                        body: 'nmu?'
                    }
                ];

                return Message.bulkCreate(messages, {returning: true})
                    .then(createdMessages => {
                        obamaFirstMessage = createdMessages[0].id;
                        bidenFirstMessage = createdMessages[1].id;
                        obamaSecondMessage = createdMessages[2].id;
                    });

            });

            describe('users', () => {

                xit('sirve todos los usuarios en el pedido de GET /', () => {
                    return agent
                        .get('/users')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body).to.contain.a.thing.with('id', obama);
                            expect(res.body).to.contain.a.thing.with('id', biden);
                        });
                });

                xit('actualiza un usuario en PUT /{{usersId}}, enviando un 201 como respuesta', () => {
                    return agent
                        .put(`/users/${obama}`)
                        .send({
                            email: 'potus@hotmail.com'
                        })
                        .expect(201)
                        .then(res => {
                            return User.findById(obama);
                        })
                        .then(user => {
                            expect(user.email).to.be.equal('potus@hotmail.com');
                        });
                });

            });

            describe('messages', () => {

                // encuentra todos los mensajes done el campo `to` coincida con la variable ID

                xit('sirve todos los mensajes de un usuario específico en GET /to/{{recipientId}}', () => {
                    return agent
                        .get(`/messages/to/${obama}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(1);
                            expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
                        });
                });

                // encuentra todos los mensajes donde el campo `from` coincida con la variable ID

                xit('sirve todos los mensajes de un remitente especifico en GET /from/{{senderId}}', () => {
                    return agent
                        .get(`/messages/from/${obama}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body).to.contain.a.thing.with.property('body', 'HEYOOOOOOO');
                            expect(res.body).to.contain.a.thing.with.property('body', 'nmu?');
                        });
                });

                // recuerdas eager loading?

                xit('sirve todos los mensajes completada con referencia a los usuarios específicos en GET /to/{{recipientId}}', () => {
                    return agent
                        .get(`/messages/to/${obama}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(1);
                            expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
                            expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
                        });
                });

                xit(`sirve todos los mensajes de un remitente especifico en GET /from/{{senderId}}
                    y usa el método estatico delmodelo Message getAllWhereSender en el proceso`, () => {

                    // http://sinonjs.org/docs/#spies
                    const getAllWhereSenderSpy = sinon.spy(Message, 'getAllWhereSender');

                    return agent
                        .get(`/messages/from/${obama}`)
                        .expect(200)
                        .then(res => {

                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);

                            expect(getAllWhereSenderSpy.called).to.be.equal(true);
                            expect(getAllWhereSenderSpy.calledWith(obama.toString())).to.be.equal(true);

                            getAllWhereSenderSpy.restore();

                        });

                });

                xit('agrega un nuevo mensaje en adds POST /, respondiendo con un 201 y creando el mensaje', () => {

                    return agent
                        .post('/messages')
                        .send({
                            fromId: biden,
                            toId: obama,
                            body: 'You are my best friend. I hope you know that.'
                        })
                        .expect(201)
                        .then(res => {
                            const createdMessage = res.body;
                            return Message.findById(createdMessage.id)
                        })
                        .then(foundMessage => {
                            expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
                        });

                });

            });

        });

    });

});
