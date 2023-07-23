import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from '@mantine/core';
import React from "react";
import SelectedFormProvider from "@contexts/selected-form-context";

export default function App({Component, pageProps}: AppProps) {

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: 'light',
                primaryColor: 'primary',
                colors: {
                    gray: ['#F3F2F3', '#DCDADD', '#C6C2C7', '#B0AAB1', '#99929B', '#837A85', '#69626A', '#4F4950', '#343135', '#1A181B'],
                    primary: ['#FFEBE6', '#FEC7B9', '#FDA48C', '#FC805F', '#FB5C32', '#FB3904', '#C82D04', '#962203', '#641702', '#320B01'],
                }
            }}
        >
            <SelectedFormProvider>
                <Component {...pageProps} />
            </SelectedFormProvider>
        </MantineProvider>
    )
}
