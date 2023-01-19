import { Button, Layout, Space, Table, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendBaseUrl } from "../../config/common.config";

const mapDataPokemons = (datas) => {
  const result = [];
  datas.forEach((data) => {
    result.push({
      id: data.id,
      nickname: data.nickname,
      name: data.pokemon_data.name,
      image: data.pokemon_data.sprites.front_default,
    });
  });

  return result;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const listPokemon = async () => {
    const pokemons = await fetch(`${backendBaseUrl}/pokemons`);
    const body = await pokemons.json();
    setPokemons(mapDataPokemons(body.data));
    return pokemons;
  };

  useEffect(() => {
    listPokemon();
  }, []);

  const releasePokemon = async (pokemonId) => {
    const release = await fetch(`${backendBaseUrl}/pokemons/${pokemonId}/release`, {
        method: 'POST'
    });
    return release;
  }

  const releaseButton = async(pokemonId) => {
    const release = await releasePokemon(pokemonId);
    if (release.status === 200) {
        messageApi.success("Pokemon Release");
    }else{
        messageApi.success("Pokemon Cannot Release because ID is not Prime Number");
    }
    await listPokemon();
  };

  

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => <img src={imageUrl} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={async () => {
            await releaseButton(record.id)
        }} type="primary">
          Release
        </Button>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <Space wrap>
          <Link to="/">
            <Button type="primary">List Pokemon</Button>
          </Link>
        </Space>
        <Content>
          <Layout>
              {contextHolder}
            <Table columns={columns} dataSource={pokemons} rowKey="id" />
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default App;
