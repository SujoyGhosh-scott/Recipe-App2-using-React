import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Recipe extends React.Component {
  state = { show: false };

  handelClick = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className="recipe">
        <div className="all-text">
          <h2>{this.props.title}</h2>
          <p>
            <b>calories: </b>
            {this.props.calories.toFixed(2)}
          </p>
          <button className="ing-button" onClick={this.handelClick}>
            <b>ingredients</b>
          </button>
          {this.state.show && (
            <ol>
              {this.props.ingredients.map((ingredient) => (
                <li>{ingredient.text}</li>
              ))}
            </ol>
          )}
        </div>
        <img src={this.props.image} alt="" />
      </div>
    );
  }
}

function App() {
  const App_Id = "b20d8375";
  const App_Key = "11d9e602372119f76ec7d91076087c1a";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  let flag = 1;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`
    );
    const data = await response.json();
    //console.log(data.hits);
    setRecipes(data.hits);
    //console.log(recipes);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    //console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Recipe App</h1>
        <div className="nav-form">
          <form className="search-form" onSubmit={getSearch}>
            <input
              className="search-bar"
              type="text"
              value={search}
              onChange={updateSearch}
              placeholder="Search Food"
            />
            <button
              type="submit"
              onClick={getRecipes}
              className="search-button"
              type="submit"
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
