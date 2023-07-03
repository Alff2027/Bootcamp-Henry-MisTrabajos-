import { useState } from 'react'

import { Input, Button } from './styles/SearchBar'

function SearchBar() {

  const [search, setSearch] = useState('')

  const handleChange = (event) => {
    setSearch(event.target.value)
    console.log(`Busqueda: ${event.target.value}`)
  }

  // const filter = search => {
  /*
    creo una variable y le aplico un .filter a la base de datos comparandolo con el termino de busqueda. Si hay un resultado retorno la receta
  */
  // }

  return (
    <>
      <Input placeholder='Busca recetas acá' value={ search} onChange={handleChange}/>
      <Button >Buscar</Button>
    </>
  )
}

export default SearchBar