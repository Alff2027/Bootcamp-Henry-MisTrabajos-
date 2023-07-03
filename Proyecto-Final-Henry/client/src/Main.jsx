/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import getRecipes from "./actions/getRecipes";
import getTypes from "./actions/getTypes";
import {
  filterByDiet,
  filterCreated,
  orderByTitle,
  orderByScore,
} from "./actions";
import Pagination from "./pagination/pagination.jsx";

import Card from './components/Card'

import {Cards} from './styles/Main'

export default function Main() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipesLoaded)
  const dietas = useSelector((state) => state.types)

  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage] = useState(9)
  const [order, setOrder] = useState('')
  
  const lastRecipe = currentPage * recipesPerPage
  const firstRecipe = lastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)
  
  useEffect(() => {
    dispatch(getRecipes(""));
    dispatch(getTypes());
  }, [dispatch]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleClickGet = (e) => {
    e.preventDefault()
    dispatch(getRecipes(''))
  }

  const handleFilterDiet = (e) => {
    console.log("despachando", e.target.value);
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  const handleSortTitle = (e) => {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }

  const handleSortScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }


  return(
    <>
      <Cards>
        {
          currentRecipes
            ? (currentRecipes.map((recipe) => {
              console.log(recipe)
              return (
                <div key = {recipe.id}>
                  <Card
                    recipe={recipe}
                    id={recipe.id}
                    title={recipe.title}
                    summary={recipe.summary}
                    score={recipe.score}
                    healthScore={recipe.healthScore}
                    image={recipe.image}
                    diets={recipe.diets}
                  />
                </div>
            )
            }))
            : (
              <h2>Loading...</h2>
            )
        }
      </Cards>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginate={paginate}
      />
    </>
  )
}