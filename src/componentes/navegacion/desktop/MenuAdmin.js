import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ListItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import useStyles from "../../../theme/useStyles";
import { useStateValue } from "../../../contexto/store";

const MenuAdmin = (props) => {
  console.log("#aw2");
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClick1 = (e) => {
    setAnchorEl1(e.currentTarget);
  };
  const imagenDefault =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const salirSesion1 = (e) => {
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
      <Button
        color="inherit"
        className={classes.buttonIcon}
        onClick={handleClick1}
      >
        <div className={classes.linkAppBarDesktop}>
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
          {sesionUsuario
            ? sesionUsuario.autenticado
              ? sesionUsuario.usuario.nombre +
                " " +
                sesionUsuario.usuario.apellido
              : "No sesion"
            : "No sesion"}
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </Button>
      <Button
        color="inherit"
        className={classes.buttonIcon}
        onClick={handleClick}
      >
        <div className={classes.linkAppBarDesktop}>
          <Icon className={classes.mr}>admin_panel_settings</Icon>
          ADMIN
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </Button>

      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        {" "}
        <MenuItem className={classes.listItem} onClick={handleClose1}>
          <Link className={classes.linkAppBarMobile} to="/perfil">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText>Mi Perfil</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose1}>
          <Link className={classes.linkAppBarMobile} to="/">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>exit_to_app</Icon>
            </ListItemIcon>

            <ListItem button onClick={salirSesion1}>
              <ListItemText>Cerrar Sesion</ListItemText>
            </ListItem>
          </Link>
        </MenuItem>{" "}
      </Menu>
      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/usuarios">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>group</Icon>
            </ListItemIcon>
            <ListItemText>Usuarios</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaProductos">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>storefront</Icon>
            </ListItemIcon>
            <ListItemText>Productos</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>shopping_cart</Icon>
            </ListItemIcon>
            <ListItemText>Pedidos</ListItemText>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(MenuAdmin);
