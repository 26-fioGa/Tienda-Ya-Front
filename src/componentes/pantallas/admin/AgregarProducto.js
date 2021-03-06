import {
  Avatar,
  Button,
  Container,
  Grid,
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { registrarProducto } from "../../../actions/ProductoAction";
import { v4 as uuidv4 } from "uuid";

const AgregarProducto = (props) => {
  const imagenDefault =
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-c0adb.appspot.com/o/images%2Fdefault.png?alt=media&token=122c101e-9ecd-48e6-9c21-3af821371de8";
  const [producto, setProducto] = React.useState({
    id: 0,
    nombre: "",
    descripcion: "",
    stock: 0,
    marcaId: 0,
    categoriaId: 0,
    precio: 0.0,
    imagen: "",
    file: "",
    imagenTemporal: null,
  });

  const [categoria, setCategoria] = React.useState("");
  const [marca, setMarca] = React.useState("");

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const guardarProducto = async () => {
    producto.categoriaId = categoria;
    producto.marcaId = marca;

    const resultado = await registrarProducto(producto);

    props.history.push("/admin/listaProductos");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subirImagen = (imagenes) => {
    let foto = imagenes[0];

    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (e) {
      console.log(e);
    }

    setProducto((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const classes = useStyles();

  const keyImage = uuidv4();

  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            AGREGAR PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre Producto"
              variant="standard"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
            <TextField
              label="Precio"
              variant="standard"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="precio"
              value={producto.precio}
              onChange={handleChange}
            />

            <TextField
              label="Stock"
              variant="standard"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="stock"
              value={producto.stock}
              onChange={handleChange}
            />
            <TextField
              label="Descripcion"
              variant="standard"
              multiline
              rows={4}
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="marca-select-label">Marca</InputLabel>
              <Select
                labelId="marca-select-label"
                id="marca-select"
                value={marca}
                onChange={handleMarcaChange}
              >
                <MenuItem value={1}>Nike</MenuItem>
                <MenuItem value={2}>Adidas</MenuItem>
                <MenuItem value={3}>Maldiva</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="categoria-select-label">Categoria</InputLabel>
              <Select
                labelId="categoria-select-label"
                id="categoria-select"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                <MenuItem value={1}>Verano</MenuItem>
                <MenuItem value={2}>Invierno</MenuItem>
                <MenuItem value={3}>Primavera</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <ImageUploader
                  withIcon={true}
                  singleImage={true}
                  key={keyImage}
                  buttonText="Buscar Imagen"
                  imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                  maxFileSize={5242880} /* bytes */
                  onChange={subirImagen}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Avatar
                  variant="square"
                  className={classes.avatarProducto}
                  src={
                    producto.imagenTemporal
                      ? producto.imagenTemporal
                      : imagenDefault
                  }
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={guardarProducto}
              className={classes.button}
            >
              AGREGAR
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgregarProducto;
