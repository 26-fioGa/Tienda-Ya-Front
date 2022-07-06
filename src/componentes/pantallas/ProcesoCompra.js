import {
  Button,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import { useStateValue } from "../../contexto/store";

const ProcesoCompra = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();
  const [metodoPago, setMetodoPago] = useState("PayPal");
  const [envio, setEnvio] = useState({
    direccion: "",
    ciudad: "",
    pais: "",
  });
  const handleChange1 = (event) => {
    setMetodoPago(event.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const continuarProceso = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const retrocederProceso = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const realizarPedido = () => {
    const idCompra = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    props.history.push("/ordenCompra/" + idCompra);
  };
  const miArray = sesionCarritoCompra
    ? sesionCarritoCompra.items
    : []; /*productoArray;*/
  let suma = 0;
  miArray.forEach((prod) => {
    suma += prod.precio * prod.cantidad;
  });

  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Registrarse</StepLabel>
        </Step>

        <Step>
          <StepLabel>Envio</StepLabel>
        </Step>

        <Step>
          <StepLabel>Metodo de Pago</StepLabel>
        </Step>

        <Step>
          <StepLabel>Realizar Pedido</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 1 ? (
        <Grid md={6} xs={12} className={classes.gridPC}>
          <Typography variant="h6" className={classes.text_title}>
            ENVIO DEL PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Direccion"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="direccion"
                  value={envio.direccion}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ciudad"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="ciudad"
                  value={envio.ciudad}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pais"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="pais"
                  value={envio.pais}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={continuarProceso}
                >
                  CONTINUAR
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : activeStep === 2 ? (
        <Grid md={3} xs={12} className={classes.gridPC}>
          <Typography variant="h6" className={classes.text_title}>
            METODO DE PAGO
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <FormLabel>Seleccione Metodo</FormLabel>
                <RadioGroup
                  name="metodo"
                  value={metodoPago}
                  onChange={handleChange1}
                >
                  <FormControlLabel
                    value="PayPal"
                    control={<Radio color="primary" />}
                    label="PayPal"
                  />
                  <FormControlLabel
                    value="Tarjeta"
                    control={<Radio color="primary" />}
                    label="Tarjeta"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonAnterior}
                onClick={retrocederProceso}
              >
                ANTERIOR
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={continuarProceso}
              >
                CONTINUAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : activeStep === 3 ? (
        <Grid container className={classes.gridPC}>
          <Grid item md={8} xs={12} className={classes.gridLR}>
            <Typography variant="h6" className={classes.text_title}>
              ENVIO
            </Typography>
            <Typography>
              Direccion: {envio.direccion}, {envio.ciudad}, {envio.pais}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.text_title}>
              METODO DE PAGO
            </Typography>
            <Typography>Metodo: {metodoPago}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.text_title}>
              PRODUCTOS
            </Typography>
            <TableContainer className={classes.gridmb}>
              <Table>
                <TableBody>
                  {miArray.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <CardMedia
                          className={classes.imgProductoCC}
                          image={
                            item.imagen
                              ? item.imagen
                              : "https://firebasestorage.googleapis.com/v0/b/ecommerce-c0adb.appspot.com/o/images%2Fdefault.png?alt=media&token=122c101e-9ecd-48e6-9c21-3af821371de8"
                          }
                          title={item.producto}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.text_detalle}>
                          {item.producto}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.text_detalle}>
                          ${item.precio}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.text_detalle}>
                          {item.cantidad}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={retrocederProceso}
            >
              ANTERIOR
            </Button>
          </Grid>

          <Grid item md={4} xs={12}>
            <TableContainer component={Paper} square>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" className={classes.text_title}>
                        RESUMEN DEL PEDIDO
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Productos
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        ${Math.round(suma * 100) / 100}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Envio
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        $2.00
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Impuesto
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        $8.00
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        ${Math.round(suma) + 2 + 8}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={realizarPedido}
                      >
                        REALIZAR PEDIDO
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
};

export default ProcesoCompra;
