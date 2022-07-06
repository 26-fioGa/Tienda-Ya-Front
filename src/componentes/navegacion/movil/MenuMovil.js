import {
  Avatar,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import useStyles from "../../../theme/useStyles";
import { useStateValue } from "../../../contexto/store";

const MenuMovil = (props) => {
  const imagenDefault =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  const [openCliente, setOpenCliente] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const handleClickCliente = () => {
    setOpenCliente((prevOpen) => !prevOpen);
  };

  const handleClickAdmin = () => {
    setOpenAdmin((prevOpen) => !prevOpen);
  };

  const salirSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: "SALIR_SESION",
      nuevoUsuario: null,
      autenticado: false,
    });

    props.history.push("/login");
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClickCliente}
        className={classes.listItem}
      >
        <div className={classes.linkAppBarMobile}>
          <Avatar
            alt="Mi Imagen"
            className={classes.avatarPerfilAppBar}
            src={
              sesionUsuario
                ? sesionUsuario.usuario.imagen
                  ? sesionUsuario.usuario.imagen
                  : imagenDefault
                : imagenDefault
            }
          />
          <ListItemText>
            {sesionUsuario
              ? sesionUsuario.autenticado
                ? sesionUsuario.usuario.nombre +
                  " " +
                  sesionUsuario.usuario.apellido
                : " "
              : "No sesion"}
          </ListItemText>
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </ListItem>
      <Collapse component="li" in={openCliente} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem
            button
            onClick={props.clickHandler}
            className={classes.listSubItem}
          >
            <Link className={classes.linkAppBarMobile} to="/perfil">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>person</Icon>
              </ListItemIcon>
              <ListItemText>Mi Perfil</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            onClick={props.clickHandler}
            className={classes.listSubItem}
          >
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItem button onClick={salirSesion}>
                <ListItemText>Cerrar Sesion</ListItemText>
              </ListItem>
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Collapse>

      <ListItem
        button
        onClick={props.clickHandler}
        className={classes.listItem}
      >
        <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText>Mis Pedidos</ListItemText>
        </Link>
      </ListItem>
    </>
  );
};

export default withRouter(MenuMovil);
