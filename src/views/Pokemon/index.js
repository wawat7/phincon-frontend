import {
  Button,
  Layout,
  Space,
  Table,
} from "antd";
import {
  getPokemon,
  getAllPokemon,
} from "../../service/pokemon.js";
import React, { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout.js";
import { pokemonBaseUrl } from "../../config/common.config.js";
import { Link } from "react-router-dom";

const App = () => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => <img src={imageUrl}></img>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/detail/${record.key}`}>
            <Button type="primary">Detail</Button>
          </Link>
        </>
      ),
    },
  ];

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(pokemonBaseUrl);
      await loadPokemon(response.results);
    }
    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = mapDataPokemon(await getPokemon(pokemon));
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const mapDataPokemon = (data) => {
    return {
      key: data.id,
      name: data.name,
      weight: data.weight,
      image: data.sprites.front_default,
    };
  };

  return (
    <>
      <Layout>
        <Space wrap>
          <Link to="/my-list-pokemon">
            <Button type="primary">List My Pokemon</Button>
          </Link>
        </Space>
        <Content>
          <Layout>
            <Table columns={columns} dataSource={pokemonData} />
          </Layout>
        </Content>
      </Layout>
    </>
  );
};
export default App;
