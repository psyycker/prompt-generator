import Header from "@components/header";
import React from "react";
import {createStyles} from "@mantine/core";

const useStyles = createStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    children: {
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        paddingTop: '80px'
    }
})


type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    const {classes} = useStyles()
    return (
        <div className={classes.container}>
            <Header/>
            <div className={classes.children}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
