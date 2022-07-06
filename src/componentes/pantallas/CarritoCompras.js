import {
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  Select,
} from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../contexto/store";
import { productoArray } from "../../data/dataPrueba";
import useStyles from "../../theme/useStyles";

const CarritoCompras = (props) => {
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();

  console.log("sesionCarritoCompra", sesionCarritoCompra);

  const miArray = sesionCarritoCompra
    ? sesionCarritoCompra.items
    : []; /*productoArray;*/
  let suma = 0;
  miArray.forEach((prod) => {
    suma += prod.precio;
  });

  const realizarCompra = () => {
    props.history.push("/procesoCompra");
  };

  const classes = useStyles();

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        CARRITO DE COMPRAS
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <TableContainer>
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
                        ${item.cantidad}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Icon>delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Paper variant="outlined" square className={classes.paperPadding}>
            <Typography variant="h6" className={classes.text_title}>
              SUBTOTAL ({miArray.length}) PRODUCTOS
            </Typography>
            <Typography className={classes.text_title}>
              ${Math.round(suma * 100) / 100}
            </Typography>
            <Divider className={classes.gridmb} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={realizarCompra}
            >
              REALIZAR COMPRA
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarritoCompras;
