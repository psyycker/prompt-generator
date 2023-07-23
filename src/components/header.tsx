import {
    createStyles,
    Header as MantineHeader,
    Container,
    Group,
    Button,
    rem,
} from '@mantine/core';
import NextLink from 'next/link'
import {useDisclosure} from '@mantine/hooks';
import CreateFormModal from "@modal/create-form-modal";
import FormNamesSelect from "@components/form-names-select";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.primary[3],
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0
    },
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
}));

type Link = { link: string; label: string; }


const links: Link[] = [
    {link: "/", label: "Forms"},
    {link: "/form/edit", label: "Edit a form"},
    {link: "/history", label: "History"}
]

const Header = () => {
    const [modalOpened, {open, close}] = useDisclosure(false);
    const {classes} = useStyles();
    const items = links.map((link) => {
        return (
            <NextLink key={link.label} href={link.link}>
                {link.label}
            </NextLink>
        )
    });

    return (
        <MantineHeader className={classes.header} height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
            <Container className={classes.inner} fluid>
                <Group/>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group>
                    <FormNamesSelect/>
                    <Button onClick={open} color="gray">Create a form</Button>
                </Group>
            </Container>
            <CreateFormModal opened={modalOpened} close={close}/>
        </MantineHeader>
    );
}

export default Header
