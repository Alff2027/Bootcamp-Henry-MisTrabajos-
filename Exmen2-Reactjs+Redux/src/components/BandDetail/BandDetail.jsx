/* 8️⃣ ***COMPONENTE BANDDETAIL*** 8️⃣

Implementar el componente BandDetail. En este ejercicio tendrás que renderizar las diferentes propiedades 
de la banda.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que despachar una action con el "id" de la banda cuando se monta el componente. Luego, traer esa 
información de tu estado global.

🟢 Tendrás que renderizar algunos datos de la banda correspondiente.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser funcional.
❗Tienes que usar hooks.
❗NO hacer un destructuring de los hooks, debes utilizarlos con la siguiente forma:
      -'React.useState' - 'React.useEffect';
*/


import React from 'react';
import * as actions from "./../../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const BandDetail = (props) => {
      const dispatch = useDispatch();
      const bandDetail = useSelector(state => state.BandDetail);
      const { id } = useParams();

      React.useEffect(() => {
            dispatch(actions.getBandDetail(id))
      }, [id]);

      return <div>
      <img src={bandDetail?.image} alt={bandDetail?.name} />
      <h1>{bandDetail?.name}</h1>
      <h3>{bandDetail?.description}</h3>
      <h5>Entradas disponibles: {bandDetail?.tickets}</h5>
      <h5>Fecha del evento: {bandDetail?.functionDate}</h5>
      <h5>Origen de la banda: {bandDetail?.origin}</h5>
      <h5>Integrantes: {bandDetail?.members.join(" ")} </h5>
   </div>;
};

export default BandDetail;
