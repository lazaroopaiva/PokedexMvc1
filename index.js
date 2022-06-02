
const express = require("express");
const path = require("path");
const app = express();



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Charizard",
    descricao:
      "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
  },
  {
    id: 2,
    nome: "Blastoise",
    descricao:
      "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
      tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
  },
  {
    id: 3,
    nome: "Pidgeotto",
    descricao:
      "This Pokémon is full of vitality. It constantly flies around its large territory in search of prey.",
    tipo: "Normal",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/017.png",
  },
  {
    id: 4,
    nome: "Arbok",
    descricao:
      "The frightening patterns on its belly have been studied. Six variations have been confirmed.",
    tipo: "Poison",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png",
  },
];

let pokemon = undefined;

// Rotas
app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete pokedex[id];

  res.redirect("/#cards");
});

app.listen(2000, () => console.log("Servidor rodando em Http://localhost:2000"));