import { Button, Card, Input, Modal, Form, message, Row, Col, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendBaseUrl, pokemonBaseUrl } from "../../config/common.config";

const mapDataPokemon = (pokemon) => {
  return {
    name: pokemon.name,
    order: pokemon.order,
    sprites: {
      front_default: pokemon.sprites.front_default,
    },
  };
};

const App = () => {
  const { id } = useParams();
  const [detailPekemon, setDetailPokemon] = useState({});
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState(false);

  const info = () => {
    messageApi.warning("Failed Get Pokemon");
  };
  const onCreate = async (values) => {
    const save = await savePokemon({
      nickname: values.nickname,
      pokemon_data: mapDataPokemon(detailPekemon),
    });
    messageApi.success("Pokemon has been save");
    setIsModalOpen(false);
  };

  const pokemonDetail = async () => {
    const detail = await fetch(`${pokemonBaseUrl}/api/v2/pokemon/${id}`);
    setDetailPokemon(await detail.json());
    return detail;
  };

  useEffect(() => {
    pokemonDetail();
  }, []);

  const catchPokemon = async () => {
    const get = await fetch(`${backendBaseUrl}/pokemons/catch`);
    return await get.json();
  };

  const savePokemon = async (data) => {
    const pokemon = await fetch(`${backendBaseUrl}/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: data.nickname,
        pokemon_data: data.pokemon_data,
      }),
    });
    return pokemon;
  };

  const catchButton = async () => {
    setLoadings(true);
    const get = await catchPokemon();
    if (get.data.catch) {
      setIsModalOpen(true);
    } else {
      info();
    }
    setLoadings(false);
  };

  return (
    <div style={{ padding: "3%", background: "#ABC270", height: "100%" }}>
      <Space wrap>
        <Link to="/">
          <Button type="primary">List Pokemon</Button>
        </Link>
      </Space>
      <br />
      <br />
      <Row type="flex" style={{ alignItems: "center" }}>
        <Col>
          <div className="site-card-border-less-wrapper">
            <Card
              title={detailPekemon.name}
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <p>
                <img
                  src={
                    detailPekemon.sprites
                      ? detailPekemon.sprites.front_default
                      : ""
                  }
                />
              </p>
              <p>Moves:</p>
              <ul>
                {detailPekemon.moves
                  ? detailPekemon.moves
                      .slice(0, 10)
                      .map((move, index) => (
                        <li key={index}>{move.move.name}</li>
                      ))
                  : ""}
              </ul>
              <p>Types:</p>
              <ul>
                {detailPekemon.types
                  ? detailPekemon.types.map((type, index) => (
                      <li key={index}>{type.type.name}</li>
                    ))
                  : ""}
              </ul>
              <p>
                {contextHolder}
                <Button loading={loadings} onClick={catchButton}>
                  Catch
                </Button>
              </p>
            </Card>

            <Modal
              open={isModalOpen}
              title="Yeay, you get the Pokemon"
              okText="Create"
              cancelText="Cancel"
              onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    onCreate(values);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            >
              <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                  modifier: "public",
                }}
              >
                <Form.Item
                  name="nickname"
                  label="Nickname"
                  rules={[
                    {
                      required: true,
                      message: "Please input nickname!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default App;
