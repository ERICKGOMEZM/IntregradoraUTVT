/*src/app/sidebar/sidebar.jsx*/
"use client";
import React, { useState } from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    SportsSoccer,
    SportsVolleyball,
    SportsBasketball,
    SportsGymnastics,
    SportsHandball,
    CameraAlt,
    TextFields,
    TheaterComedy,
    Audiotrack,
    CalendarMonth,
} from "@mui/icons-material";
import styles from "./sidebarInstructor.module.css";

const talleres = [
    {
        titulo: "Talleres Deportivos",
        items: [
            { id: "futbol", nombre: "Fútbol", icono: <SportsSoccer /> },
            { id: "voleibol", nombre: "Voleibol", icono: <SportsVolleyball /> },
            { id: "basquetbol", nombre: "Basquetbol", icono: <SportsBasketball /> },
            { id: "activacion", nombre: "Activación Física", icono: <SportsGymnastics /> },
            { id: "tocho", nombre: "Tocho Bandera", icono: <SportsHandball /> },
        ],
    },

    {
        titulo: "Talleres Culturales",
        items: [
            { id: "artes", nombre: "Artes Visuales", icono: <CameraAlt /> },
            { id: "baile", nombre: "Danza y Baile", icono: <SportsGymnastics /> },
            { id: "Ortografia", nombre: "Ortografía y Redacción", icono: <TextFields /> },
            { id: "teatro", nombre: "Teatro", icono: <TheaterComedy /> },
            { id: "rondala", nombre: "Rondalla", icono: <Audiotrack /> },
        ],
    },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [openSections, setOpenSections] = useState({});

    const handleClick = (id) => {
        setOpenSections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div
        className={`${styles.sidebarContainer} ${isOpen ? styles.open : ""}`}
        onClick={toggleSidebar}
        >
        {talleres.map((seccion, index) => (
            <div key={index}>
                <Typography variant="h6" component="div" className={styles.sidebarTitle} sx={{ padding: 2 }} >
                    {seccion.titulo}
                </Typography>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {seccion.items.map((taller) => (
                        <div key={taller.id}>
                            <ListItemButton onClick={() => handleClick(taller.id)}>
                                <ListItemIcon>{taller.icono}</ListItemIcon>
                                <ListItemText primary={taller.nombre} />
                                {openSections[taller.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openSections[taller.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <CalendarMonth />
                                        </ListItemIcon>
                                        <ListItemText primary="Información" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </div>
        ))}
    </div>
    );
};

export default Sidebar;
