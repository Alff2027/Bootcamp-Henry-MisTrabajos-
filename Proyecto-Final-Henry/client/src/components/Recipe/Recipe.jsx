/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import prueba from '../../images/prueba.png'
import getRecipesDetails from "../../actions/getRecipesDetails"
import { useParams } from 'react-router-dom'

export default function Recipe(props) {
  const dispatch = useDispatch()
  const recipeDetail = useSelector((state) => state.recipeDetail)
  const {id} = useParams()

  useEffect(() => {
    dispatch(getRecipesDetails(id))
  }, [dispatch])

  return (
    <>
      {
        recipeDetail
          ? (<h3>Loading...</h3>)
          : (
            <div>
              <img src={prueba} alt="xd" />
            </div>
          )
      }
    </>
  )
}