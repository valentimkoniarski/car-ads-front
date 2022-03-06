import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

function EnviarForm(dados) {

    axios.post("http://localhost:8000/create", dados)
        .then(() => {
            console.log("Enviado com sucesso");
        })
        .catch(() => {
            console.log("Erro ao enviar");
        });
}

function Formulario() {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dados, setDados] = useState([]);


    useEffect(() => {

        axios.get("http://localhost:8000/index")
            .then(response => {

                for (let i = 0; i < response.data.rows.length; i++) {
                    setDados(dados => [...dados, response.data.rows[i].nome]);
                }

            })

            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    EnviarForm({ nome, sobrenome });
                    setDados(dados => [...dados, nome]);
                }}
            >

                <TextField
                    value={nome}
                    onChange={(event) => {
                        setNome(event.target.value);
                    }}
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    value={sobrenome}
                    onChange={(event) => {
                        setSobrenome(event.target.value);
                    }}
                    id="sobrenome"
                    label="Sobrenome"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary" refresh="true">
                    Cadastrar
                </Button>

            </form>

            <div>
                <h1>Lista</h1>
                <ul>
                    {dados.map(dado => (
                        <li key={dado}>{dado}</li>
                    ))}
                </ul>
            </div>
        </>

    );

}



export default Formulario;