import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import TableCell from "@mui/material/TableCell";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import axios from "axios";

import api from "../../services/Api";

import { getUserId } from "../../services/auth";

import Aside from "../Aside";


function AddVehicles() {
  const [brands, setBrands] = useState([{}]);
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState([{}]);
  const [model, setModel] = useState("");
  const [years, setYears] = useState([{}]);
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [dataVehicle, setDataVehicle] = useState({});

  const [valueTab, setValueTab] = useState("1");

  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);

  const [baseImage, setBaseImage] = useState([]);

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 50,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: "image/*",
      maxFiles: 4,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  /////////////////////// UPLOAD DE FOTOS ///////////////////////////////
  const CLIENT_ID = "8e70e6d7d76336c";

  const doUpload = (url, options) => {
    const promiseCallback = (resolve, reject) => {
      const getFetchJson = (response) => {
        if (!response.ok) return reject(response);
        return response.json().then(resolve);
      };

      fetch(url, options).then(getFetchJson).catch(reject);
    };
    return new Promise(promiseCallback);
  };

  useEffect(() => {
    files.forEach((file, i) => {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "yhuqqzrn");

      const options = {
        method: "POST",
        body: formData,
      };

      doUpload(
        "https://api.cloudinary.com/v1_1/dk6oyeq34/image/upload",
        options
      )
        .then((res) => {
          setFilesUrl((filesUrl) => [...filesUrl, res.secure_url]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [files]);

  /////////////////////////////////////////////////////////////////////////

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    async function getBase64() {
      files.forEach(async (file) => {
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      });
    }

    getBase64();
  }, [files]);

  const handleChangeTabs = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  // CONECTA COM A API DE FIPE
  useEffect(() => {
    axios
      .get("https://parallelum.com.br/fipe/api/v1/carros/marcas")

      .then((response) => {
        setBrands(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);

    axios
      .get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${event.target.value}/modelos`
      )
      .then((response) => {
        setModels(response.data.modelos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeModel = (event) => {
    setModel(event.target.value);

    axios
      .get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${event.target.value}/anos`
      )
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);

    axios
      .get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${event.target.value}`
      )

      .then((response) => {
        setDataVehicle(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const useStyles = makeStyles({
    table: {
      display: "flex",
      overflowX: "auto",
      width: "100%",
    },
    tableHead: {
      display: "flex",
      flexDirection: "column",
      overflowX: "auto",
      width: "100%",
    },
    tableBody: {
      display: "flex",
      overflowX: "auto",
      width: "100%",
    },
    tableRow: {
      display: "flex",
      flexDirection: "column",
      overflowX: "auto",
      width: "100%",
    },
  });

  const classes = useStyles();

  const handleCreate = async (e) => {
    e.preventDefault();

    const obj = {
      marca: dataVehicle.Marca,
      modelo: dataVehicle.Modelo,
      ano: dataVehicle.Ano,
      descricao: description,
      preco: price,
      usuario: {
        id: getUserId(),
      },
      fotos: [
        { fotos: filesUrl[0], principal: "true" },
        { fotos: filesUrl[1], principal: "false" },
      ],
    };

    console.log(obj);

    await api.post("/veiculos/create", obj).then((response) => {
      console.log(response);
      alert("Veículo cadastrado com sucesso!");

      window.location.href = "/anuncios";
    });
  };

  return (
    <div className="App">
      <Aside />

      <Container
        sx={{
          maxWidth: "xl",
          width: "100%",
          padding: "0",
          margin: "0",
          marginTop: "2rem",
        }}
      >
        <form onSubmit={handleCreate}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Dados do Veículo"
                  value="1"
                  style={{
                    padding: "20px",
                  }}
                />
                <Tab label="Observações" value="2" />
                <Tab label="Fipe" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="select-brand">Marca</InputLabel>
                    <Select
                      required
                      label="Marca"
                      id="select-brand"
                      value={brand}
                      onChange={handleChangeBrand}
                    >
                      {brands.map((marca) => (
                        <MenuItem key={marca.codigo} value={marca.codigo}>
                          {marca.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="select-brand">Modelo</InputLabel>
                    <Select
                      required
                      label="Modelo"
                      id="select-brand"
                      value={model}
                      onChange={handleChangeModel}
                    >
                      {models.map((modelo) => (
                        <MenuItem key={modelo.codigo} value={modelo.codigo}>
                          {modelo.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="select-brand">Ano</InputLabel>
                    <Select
                      label="Ano"
                      id="select-brand"
                      required
                      value={year}
                      onChange={handleChangeYear}
                    >
                      {years.map((ano) => (
                        <MenuItem key={ano.codigo} value={ano.codigo}>
                          {ano.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <TextField
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    id="description"
                    label="Descrição"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                    id="price"
                    label="Preço"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={10}>
                <Grid item xs={10}>
                  <Box
                    sx={{ width: "100%" }}
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e2e2e1",
                      borderRadius: "5px",
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "10px",
                      margin: "10px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <div>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                    <aside>
                      <h4>Accepted files</h4>
                      <ul>{acceptedFileItems}</ul>
                      <h4>Rejected files</h4>
                      <ul>{fileRejectionItems}</ul>
                    </aside>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Observações"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableRow className={classes.tableHead}>
                        <TableCell align="left">Mes Referencia</TableCell>
                        <TableCell align="left">Marca</TableCell>
                        <TableCell align="left">Modelo</TableCell>
                        <TableCell align="left">Ano Modelo</TableCell>
                        <TableCell align="left">Data da Consulta</TableCell>
                        <TableCell align="left">Preço Médio</TableCell>
                      </TableRow>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell align="left">
                            {dataVehicle.MesReferencia
                              ? dataVehicle.MesReferencia
                              : "Não informado"}
                          </TableCell>
                          <TableCell align="left">
                            {dataVehicle.Marca
                              ? dataVehicle.Marca
                              : "Não informado"}
                          </TableCell>
                          <TableCell align="left">
                            {dataVehicle.Modelo
                              ? dataVehicle.Modelo
                              : "Não informado"}
                          </TableCell>
                          <TableCell align="left">
                            {dataVehicle.AnoModelo
                              ? dataVehicle.AnoModelo
                              : "Não informado"}
                          </TableCell>
                          <TableCell align="left">
                            {dataVehicle.Valor
                              ? dataVehicle.Valor
                              : "Não informado"}
                          </TableCell>
                          <TableCell align="left">
                            {dataVehicle.Valor
                              ? dataVehicle.Valor
                              : "Não informado"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            refresh="true"
            style={{
              marginTop: "50px",
            }}
          >
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddVehicles;
