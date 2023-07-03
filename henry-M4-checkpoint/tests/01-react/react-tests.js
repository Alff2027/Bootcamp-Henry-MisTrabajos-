import React from 'react';
import {createStore} from 'redux';
import {range, last} from 'lodash';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import faker from 'faker';

import Message from '../../react/components/Message';
import Inbox from '../../react/components/Inbox';
import NewMessageForm from '../../react/components/NewMessageForm';
import rootReducer from '../../react/redux/reducer';
import actualStore from '../../react/redux/store';
import {MESSAGES_RECEIVED, MESSAGES_LOADING, NEW_MESSAGE} from '../../react/redux/constants';
import {createLoadingAction, createMessagesReceivedAction, createNewMessageAction} from '../../react/redux/actions';

const createRandomMessages = amount => {
    return range(0, amount).map(index => {
        return {
            id: index + 1,
            from: {email: faker.internet.email()},
            to: {email: faker.internet.email()},
            subject: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
        };
    });
};
const testUtilities = {
    createRandomMessages,
    createOneRandomMessage: () => createRandomMessages(1)[0]
};

// NOTA: Estos specs usan vanilla React & Redux, no react-redux

describe('▒▒▒ Frontend tests ▒▒▒', function () {

    describe('Message', () => {

        describe('contenido visual', () => {

            // Antes de cada `it` spec, instanciamos un nuevo componente de React `Message`
            // `Message` viene del archivo `react/components/Message.js
            // Este componente va a recibir algo de data en su prop `fullMessage`
            // Guardamos este componente en un wrapper testeable `messageWrapper`

            let messageData, messageWrapper;
            beforeEach('Crea un wrapper para <Message /> ', () => {
                messageData = {
                    id: 5,
                    from: {email: 'guille@plataforma5.la'},
                    to: {email: 'toni@plataforma5.la'},
                    subject: 're: curriculum updates',
                    body: 'Deberíamos enseñar React!'
                };
                // crea el wrapper testeable del componente
                messageWrapper = shallow(<Message fullMessage={messageData} />);
            });
            // Estos tests son relativamente prometedores - todo lo que pedimos es que
            // hagas es completar cada JSX tag (h1, h2, etc.) en el método render
            // para que matchie el string HTML mostrado. Podés pasar esto en una 
            // manera "trivial", pero mira más o menos 5 tests abajo para entender el giro... 
     
            xit('incluye el "FROM" como un h1', () => {
                expect(messageWrapper.find('h1')).to.have.html('<h1>From: <span>guille@plataforma5.la</span></h1>');
            });

            xit('incluye el "TO" como un h2', () => {
                expect(messageWrapper.find('h2')).to.have.html('<h2>To: <span>toni@plataforma5.la</span></h2>');
            });

            xit('incluye el "SUBJECT" como un h3', () => {
                expect(messageWrapper.find('h3')).to.have.html('<h3>Subject: <span>re: curriculum updates</span></h3>');
            });

            xit('incluye el "BODY" como un p', () => {
                expect(messageWrapper.find('p')).to.have.html('<p>Deberíamos enseñar React!</p>');
            });

            // Estos tests requieren mayor entendimiento de JSX / React.
            // Aquí estamos demostrando que tu método `render` no debería
            // siempre retornar el mismo exacto string en su JSX, en cambio, el resultado
            // debería variar basado en la data pasada. ¿De dónde proviene esa data?
            // ¿Cómo obtenes acceso a él? Volve al `beforeEach` block para verlo.

            xit('no esta harcodeado', () => {
                const aDifferentMessage = {
                    id: 6,
                    from: {email: 'toni@plataforma5.la'},
                    to: {email: 'guille@plarafroma5.la'},
                    subject: 'Re: In re: curriculum updates',
                    body: 'Joyaaa!'
                };
                // Hacemos un nuevo componente con distinta data, y chequeamos su contenido
                const differentMessageWrapper = shallow(<Message fullMessage={aDifferentMessage} />);
                expect(differentMessageWrapper.find('h1')).to.have.html('<h1>From: <span>toni@plataforma5.la</span></h1>');
                expect(differentMessageWrapper.find('h2')).to.have.html('<h2>To: <span>guille@platafroma5.la</span></h2>');
                expect(differentMessageWrapper.find('h3')).to.have.html('<h3>Subject: <span>Re: In re: curriculum updates</span></h3>');
                expect(differentMessageWrapper.find('p')).to.have.html('<p>Joyaaa!</p>');
            });

        });

        describe('interactividad', () => {

            // Ahora construimos un componente `Message` con multiples props.
            // Le estamos pasando una función *spy* dentro de el `markAsRead`
            // prop. Los espias nos permiten testear como una función se utiliza.

            let messageData, messageWrapper, markAsReadSpy;
            beforeEach('Crea <Message />', () => {
                messageData = testUtilities.createOneRandomMessage();
                // http://sinonjs.org/docs/#spies
                markAsReadSpy = spy();
                messageWrapper = shallow(<Message fullMessage={messageData} markAsRead={markAsReadSpy} />);
            });
            // Lee ambas, la descripción y los `expect`s cuidadosamente. Deberías saber
            // como agregar un click handler que llame a la función con los argumentos
            // específicos

            xit('cuando clickeamos, invoca una función pasada como la propiedad markAsRead con el id del mensaje', () => {

                // La función pasada al `markAsRead` no debería ser llamada inmediatamente.
                expect(markAsReadSpy).not.to.have.been.called; // eslint-disable-line

                // Esto va a disparar los onClick handlers registrados en el componente
                messageWrapper.simulate('click');

                // Cuando el componente es clickeado, queremos que la función pasada a
                // `markAsRead` sea invocada.
                expect(markAsReadSpy).to.have.been.called; // eslint-disable-line
                // No solo invocada, pero invocada con los argumentos correctos. No te 
                // pongas terco - continua si estas teniendo problemas.
                expect(markAsReadSpy).to.have.been.calledWith(messageData.id);

            });

        });

    });

    describe('Inbox', () => {

        let randomMessages;
        beforeEach('Crea ejemplos aleatorios de mensajes', () => {
            randomMessages = testUtilities.createRandomMessages(10)
        });
        // Otra vez, estamos haciendo un componente de React testeable. Esta vez,
        // es nuestro componente `Inbox`.

        let inboxWrapper;
        beforeEach('Crea <Inbox />', () => {
            inboxWrapper = shallow(<Inbox />, {context: {store: actualStore}});
            // estamos simulando el montado del componente simplemente llamando el método `componentDidMount` para este componente (si haz definido uno)
            if (inboxWrapper.instance().componentDidMount) {
                inboxWrapper.instance().componentDidMount();
            }
        });

        // ¿Cómo (o dónde) definís el estado inicial de un componente de React?

        xit('empieza con un estado inicial de un arreglo vacío de mensajes', () => {
            const currentState = inboxWrapper.state();
            expect(currentState.messages).to.be.deep.equal([]);
        });

        describe('contenido visual', () => {

            // No te preocupes sobre `markAsRead`, Esto no corresponde a este a estos tests

            xit('esta compuesto de componentes <Message /> (NOTA: no es necesario un prop `markAsRead`)  basado en que es colocado en el estado', () => {

                // Esto va a alterar el *estado local* del componente (`this.state`).
                inboxWrapper.setState({messages: randomMessages});
                // Debería haber ahora un montón de componentes `Message` en el output.
                expect(inboxWrapper.find(Message)).to.have.length(10);

                // El primer mensaje mostrado en el inbox debería estar basado en el
                // primer elemento del arreglo randomMessages.
                const firstMessage = inboxWrapper.find(Message).at(0);
                expect(firstMessage.equals(<Message fullMessage={randomMessages[0]} />)).to.be.true; // eslint-disable-line

                // Este va a setear el estado local del componente.
                inboxWrapper.setState({messages: randomMessages.slice(4)});
                expect(inboxWrapper.find(Message)).to.have.length(6);

            });

        });

    });

    describe('NewMessageForm', () => {

        let sendSpy;
        beforeEach('Crea la función spy para que sea pasada', () => {
            sendSpy = spy();
        });

        let newMessageFormWrapper;
        beforeEach('Crea <NewMessageForm /> wrapper', () => {
            // fijate: estamos haciendo un NewMessageForm con un prop `onSend`,
            // seteado a la función.
            newMessageFormWrapper = shallow(<NewMessageForm onSend={sendSpy} />);
        });

        xit('setea el estado local cuando el input cambia', () => {

            expect(newMessageFormWrapper.state()).to.be.deep.equal({
                recipient: '',
                subject: '',
                body: ''
            });

            // Recordás los forms? Tenemos algunos elementos los cuales estan cambiando. ¿Cómo:
            // 1) detectas y reaccionas a un cambio en el elemento de un formulario?
            // 2) tomás el valor del evento resultante?
            // 3) actualizas el estado del componente apropiadamente?

            // El test spec esta buscando un campo del form específico
            const recipientInput = newMessageFormWrapper.find('#recipient-field');
            // Ahora causamos un cambio, con nueva data
            recipientInput.simulate('change', {target: {value: 'facu@plataforma5.la', name: 'recipient'}});
            // El estado debería haber actualizado su estado correctamente
            expect(newMessageFormWrapper.state()).to.have.property('recipient', 'facu@plataforma5.la')
            expect(newMessageFormWrapper.state()).to.have.property('subject', '')
            expect(newMessageFormWrapper.state()).to.have.property('body', '')

            const subjectInput = newMessageFormWrapper.find('#subject-field');
            subjectInput.simulate('change', {target: {value: 'Hola?', name: 'subject'}});
            expect(newMessageFormWrapper.state()).to.have.property('recipient', 'facu@plataforma5.la')
            expect(newMessageFormWrapper.state()).to.have.property('subject', 'Hola?')
            expect(newMessageFormWrapper.state()).to.have.property('body', '')

            const bodyInput = newMessageFormWrapper.find('#body-field');
            bodyInput.simulate('change', {target: {value: `Ya todos bajaron a comer?`, name: 'body'}});
            expect(newMessageFormWrapper.state()).to.have.property('recipient', 'facu@plataforma5.la')
            expect(newMessageFormWrapper.state()).to.have.property('subject', 'Hola?')
            expect(newMessageFormWrapper.state()).to.have.property('body', `Ya todos bajaron a comer?`)

        });

        // El siguiente spec va a causar que el formulario se "submitié". Cuando eso
        // pase, el componente debería 1) invocar el prop `onSend`, y 2) pasar
        // el estado actual del componente. state.

        xit('invoca la función `onSent` pasada con el estado local cuando el formulario se submitea', () => {

            const formInfo = {
                recipient: 'santi@plaraforma5.la',
                subject: 'Hola Santi!',
                body: 'Hola.'
            };

            newMessageFormWrapper.setState(formInfo);

            // Esto va a disparar cualquier onSubmit handler registrado en el componente.
            newMessageFormWrapper.simulate('submit', {preventDefault: () => {}});

            expect(newMessageFormWrapper.find('form').prop('onSubmit')).to.be.a('function');
            expect(sendSpy).to.have.been.called; // eslint-disable-line
            expect(sendSpy).to.have.been.calledWith(formInfo);
            expect(sendSpy.calledOnce).to.be.equal(true);

        });

    });

    describe('Arquitectura Redux', () => {

        describe('action creators', () => {

            // Action creators son funciones que retornan objetos de acciones.

            describe('createMessagesReceivedAction', () => {

                xit('retorna la descripción de la accion esperada', () => {

                    const messages = testUtilities.createRandomMessages(5);

                    // Aquí llamamos la acción `createMessagesReceivedAction`
                    // con un grupo de mensaje.
                    const actionDescriptor = createMessagesReceivedAction(messages);

                    // El action creator debería haber retornado un objeto de acción
                    // como este objeto literal:
                    expect(actionDescriptor).to.be.deep.equal({
                        type: MESSAGES_RECEIVED,
                        messages: messages
                    });

                });

            });

            describe('createLoadingAction', () => {

                xit('retorna la descripción de la acción esperada', () => {

                    const actionDescriptor = createLoadingAction();

                    expect(actionDescriptor).to.be.deep.equal({
                        type: MESSAGES_LOADING
                    });

                });

            });

            describe('createNewMessageAction', () => {

                xit('retorna la descripción de la acción esperada', () => {

                    const message = testUtilities.createOneRandomMessage();

                    const actionDescriptor = createNewMessageAction(message);

                    expect(actionDescriptor).to.be.deep.equal({
                        type: NEW_MESSAGE,
                        message: message
                    });

                });

            });

        });

        // Recuerda, reducers reciben el viejo estado y el objeto de una acción, y
        // retorna un nuevo estado.

        describe('store/reducer', () => {

            let testingStore;
            beforeEach('crea un store para testear el reducer', () => {
                testingStore = createStore(rootReducer);
            });

            xit('tiene un estado inicial como el descripto', () => {
                const currentStoreState = testingStore.getState();
                // Nuestro estado inicial tiene dos propiedades como se muestran.
                expect(currentStoreState.messagesLoading).to.be.equal(false);
                expect(currentStoreState.messages).to.be.deep.equal([]);
            });

            // "en MESSAGES_LOADING" significa cuando una acción de ese tipo es dispatcheada

            describe('reducer en MESSAGES_LOADING', () => {

                xit('afecta el estado seteando messagesLoading a true y messages a un arreglo vacío', () => {

                    // una acción es dispatcheada...
                    testingStore.dispatch({
                        type: MESSAGES_LOADING
                    });

                    const newState = testingStore.getState();

                    // y uola, el estaedo ha cambiado! La función reducer es
                    // responsable de generar el nuevo estado.
                    expect(newState.messagesLoading).to.be.true; // eslint-disable-line
                    expect(newState.messages).to.be.deep.equal([]);

                });

                xit('crea un NUEVO objeto de estado en cualquier acción dispatcheada', () => {

                    const currentStoreState = testingStore.getState();

                    testingStore.dispatch({
                        type: MESSAGES_LOADING
                    });

                    const subsequentStoreState = testingStore.getState();

                    // Recordas como copiar propiedades a un nuevo objeto?
                    // Deberías no estar modificando el estado previo de Redux!

                    expect(currentStoreState).to.not.be.equal(subsequentStoreState);

                });

            });

            describe('reducer en MESSAGES_RECEIVED', () => {

                beforeEach('inicializa el store para que cargue mensajes', () => {
                    testingStore.replaceReducer(() => ({...testingStore.getState(), messagesLoading: false}));
                    testingStore.dispatch({type: 'INITIALIZE_FOR_MESSAGES_RECEIVED_TEST'});
                    testingStore.replaceReducer(rootReducer);
                });

                xit('afecta el estado seteando messagesLoading a false y los messages a  losmensajes dispatcheados', () => {

                    const randomMessages = testUtilities.createRandomMessages(10);

                    testingStore.dispatch({
                        type: MESSAGES_RECEIVED,
                        messages: randomMessages
                    });

                    const newState = testingStore.getState();

                    expect(newState.messagesLoading).to.be.false; // eslint-disable-line
                    expect(newState.messages).to.be.deep.equal(randomMessages);

                });

            });

            describe('reducer en NEW_MESSAGE', () => {

                let existingRandomMessages;
                beforeEach(() => {
                    existingRandomMessages = testUtilities.createRandomMessages(5);
                    testingStore = createStore(
                        rootReducer,
                        // esto solo setea el estado incial de nuestro store.
                        {messagesLoading: false, messages: existingRandomMessages}
                    );
                });

                xit('afecta el estado al añadir al final el mensaje dispatcheado al estado de messages', () => {

                    const dispatchedMessage = testUtilities.createOneRandomMessage();

                    testingStore.dispatch({
                        type: NEW_MESSAGE,
                        message: dispatchedMessage
                    });

                    const newState = testingStore.getState();
                    const lastMessageOnState = last(newState.messages);

                    // the NEW_MESSAGE action, when reduced, results in a
                    // message being added to the redux state's `messages` arr.
                    expect(newState.messages).to.have.length(6);
                    expect(lastMessageOnState).to.be.deep.equal(dispatchedMessage);

                });

                xit('setea messages a un arreglo diferente al del estado previo', () => {

                    const originalState = testingStore.getState();
                    const dispatchedMessage = testUtilities.createOneRandomMessage();

                    testingStore.dispatch({
                        type: NEW_MESSAGE,
                        message: dispatchedMessage
                    });

                    const newState = testingStore.getState();

                    // Una vez mas, no mutes data vieja! Genera nueva data
                    // que se vea de la forma que quieres. Hay muchas formas de
                    // hacer esto con arreglos.
                    expect(newState.messages).to.not.be.equal(originalState.messages);
                    expect(originalState.messages).to.have.length(5);

                });

            });

        });

        describe('EXTRA CREDITO', () => {

            describe('conexión del componente', () => {

                /*  --- EXTRA CREDITO ---
                 *   Las assertions en este bloque de describe asume que TODOS LOS OTROS han pasado.
                 *   Por favor solo continuá con esta porción una vez que todos los specs estén pasando.
                 */

                describe('<Inbox />', () => {

                    let inboxWrapper;
                    beforeEach('Get an <Inbox />', () => {
                        inboxWrapper = shallow(<Inbox />, {context: {store: actualStore}});
                        // estamos simulando el montado del componente simplemente llamando el método `componentDidMount` de este componente (si haz definido uno)
                        if (inboxWrapper.instance().componentDidMount) {
                            inboxWrapper.instance().componentDidMount();
                        }
                    });

                    // ¿Dónde/cómo inicializas el estado local? ¿Cómo obtenes
                    // el estado el store?

                    xit('tiene un estado local inicial que refleja el estado actual del store', () => {
                        const componentState = inboxWrapper.state();
                        expect(componentState.messagesLoading).to.be.false; // eslint-disable-line
                        expect(componentState.messages).to.be.deep.equal([]);
                    });

                    xit('se subscribe a cambios del store de redux y siempre refleja el estado de forma correcta', () => {

                        actualStore.dispatch(createLoadingAction());

                        let currentComponentState = inboxWrapper.state();

                        expect(currentComponentState.messagesLoading).to.be.true; // eslint-disable-line
                        expect(currentComponentState.messages).to.be.deep.equal([]);

                        const randomMessages = testUtilities.createRandomMessages(10);
                        actualStore.dispatch(createMessagesReceivedAction(randomMessages));

                        currentComponentState = inboxWrapper.state();

                        expect(currentComponentState.messagesLoading).to.be.false; // eslint-disable-line
                        expect(currentComponentState.messages).to.be.deep.equal(randomMessages);

                        const randomNewMessage = testUtilities.createOneRandomMessage();

                        actualStore.dispatch(createNewMessageAction(randomNewMessage));

                        currentComponentState = inboxWrapper.state();

                        expect(currentComponentState.messages).to.be.deep.equal([...randomMessages, randomNewMessage]);

                    });

                });

            });

        });


   });

});
