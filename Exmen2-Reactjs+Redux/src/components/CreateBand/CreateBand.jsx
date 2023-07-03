/* 6️⃣ ***COMPONENTE CREATEBAND*** 6️⃣

Implementar el componente CreateBand. Este consistirá en un formulario controlado con estados de react.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Aquí tendrás que renderizar una serie de elementos HTML con distintos atibutos e información dentro.

🟢 Debes manejar cada uno de los inputs de tu formulario mediante un estado local llamado "input".

🟢 La información del formulario se debe despachar al estado global cuando se hace un submit.

🟢 Debes manejar los errores que pueden tener los inputs del formulario.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser funcional.
❗¡Puedes implementar el manejo de errores como mejor prefieras! Sólo recuerda renderizar el error apropiado en cada caso.
❗NO hacer un destructuring de los hooks, debes utilizarlos con la siguiente forma:
      - 'React.useState'
      - 'React.useEffect'
*/

import React from 'react';
import * as actions from "../../redux/actions";
import { useDispatch } from 'react-redux';

const CreateBand = () => {
      const [input, setInput] = React.useState({
            name: '',
            origin: '',
            description: '',
            tickets: 0,
      });

      const handleChange = (event) => {
            setInput({
                  ...input,
                  [event.target.name]: event.target.value,
            });
      };

      const validate = () => {
            const error = {};
            if (input.name.length > 30) error.name = 'Nombre u Origen demasiado largo';
            if (input.origin.length > 30) error.origin = 'Nombre u Origen demasiado largo';
            if (input.tickets < 0) error.tickets = 'Los tickets deben ser un numero positivo';
            return error;
      };

      const dispatch = useDispatch();

      const handleSubmit = (event) => {
            const errors = validate();
            if (Object.keys(errors).length === 0) {
                  event.preventDefault();
                  dispatch(actions.createBands(input));
            }
      };
   return (
   <div>
      <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: </label>
            <input onChange={handleChange} value={input.name} type='text' name='name'></input>
            
            <label htmlFor='origin'>Origin: </label>
            {validate().name && <p>{validate().name}</p>}
            <input onChange={handleChange} value={input.origin} type='text' name='origin'></input>

            <label htmlFor='description'>Description: </label>
            {validate().origin && <p>{validate().origin}</p>}
            <textarea onChange={handleChange} value={input.description} name='description'></textarea>

            <label htmlFor='tickets'>Tickets: </label>
            <input onChange={handleChange} value={input.tickets} type='number' name='tickets'></input>
            {validate().tickets && <p>{validate().tickets}</p>}
            <button type='submit'>Create Band</button>
      </form>
   </div>
   )
};

export default CreateBand;
