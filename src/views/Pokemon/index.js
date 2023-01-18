import { Button, Input, Layout, message, Modal, Space, Table, Tag } from "antd";
import {
  getPokemon,
  getAllPokemon,
  catchPokemon,
  savePokemon,
} from "../../service/pokemon.js";
import React, { useState, useEffect } from "react";
import { Content, Footer, Header } from "antd/es/layout/layout.js";
import { backendBaseUrl, pokemonBaseUrl } from "../../config/common.config.js";
import { Form } from "react-router-dom";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      render: (text) => <a>{text}</a>,
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
        <Button onClick={catchButton} type="primary">
          Catch
        </Button>
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

  const catchButton = () => {
    
  }

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
          <Button type="primary">List My Pokemon</Button>
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
