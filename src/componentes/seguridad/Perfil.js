import {
  Avatar,
  Button,
  Container,
  Card,
  Divider,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { useStateValue } from "../../contexto/store";
import { v4 as uuidv4 } from "uuid";
import { actualizarUsuario } from "../../actions/UsuarioAction";
import { withRouter } from "react-router-dom";

const Perfil = (props) => {
  const imagenDefault =
    "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    imagen: "",
    password: "",
    file: "",
    imagenTemporal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (sesionUsuario) {
      setUsuario(sesionUsuario.usuario);
    }
  }, [sesionUsuario]);

  const subirImagen = (imagenes) => {
    let foto = imagenes[0];
    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (e) {
      console.log(e);
    }

    setUsuario((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    actualizarUsuario(sesionUsuario.usuario.id, usuario, dispatch).then(
      (response) => {
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          props.history.push("/");
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Errores actualizando el perfil de usuario",
            },
          });
        }
      }
    );
  };

  const keyImage = uuidv4();
  const classes = useStyles();
  const verDetalles = () => {
    const idCompra = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    props.history.push("/ordenCompra/" + idCompra);
  };
  return (
    <Container className={classes.containermt}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Card className={classes.card} align="center">
            <Typography variant="h6" className={classes.text_title}>
              PERFIL DE USUARIO
            </Typography>
            <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
              <ImageUploader
                key={keyImage}
                onChange={subirImagen}
                withIcon={false}
                buttonStyles={{
                  borderRadius: "50%",
                  padding: 10,
                  margin: 0,
                  position: "absolute",
                  bottom: 15,
                  left: 15,
                }}
                className={classes.imageUploader}
                buttonText={<Icon>add_a_photo</Icon>}
                label={
                  <Avatar
                    alt="Mi Perfil"
                    className={classes.avatarPefil}
                    src={
                      usuario.imagenTemporal
                        ? usuario.imagenTemporal
                        : usuario.imagen
                        ? usuario.imagen
                        : imagenDefault
                    }
                  />
                }
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
              <TextField
                label="Nombre"
                variant="standard"
                fullWidth
                className={classes.gridmb}
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
              />
              <TextField
                label="Apellidos"
                variant="standard"
                fullWidth
                className={classes.gridmb}
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
              />
              <TextField
                label="Correo Electronico"
                variant="standard"
                fullWidth
                className={classes.gridmb}
                value={usuario.email}
                name="email"
                onChange={handleChange}
              />
              <Divider className={classes.divider} />
              <TextField
                label="Password"
                variant="standard"
                fullWidth
                className={classes.gridmb}
                name="password"
              />
              <TextField
                label="Confirmar Password"
                variant="standard"
                fullWidth
                className={classes.gridmb}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={guardarUsuario}
                className={classes.button}
              >
                ACTUALIZAR
              </Button>
            </form>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant="h6" className={classes.text_title}>
            MIS PEDIDOS
          </Typography>
          <TableContainer className={classes.form}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAGADO</TableCell>
                  <TableCell>ENTREGADO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed</TableCell>
                  <TableCell>2020-12-15</TableCell>
                  <TableCell>60.00</TableCell>
                  <TableCell>2020-12-15</TableCell>
                  <TableCell>
                    {/* <Icon className={classes.iconNotDelivered}>
                                            clear
                                        </Icon> */}
                    <Icon className={classes.iconDelivered}>check</Icon>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={verDetalles}
                      color="primary"
                      className={classes.button}
                    >
                      DETALLES
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Perfil);
