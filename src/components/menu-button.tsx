import {Button, Menu} from '@mantine/core';

type Props = {
    onClick: (option: string) => void,
    options: string[]
}

const ButtonMenu = ({
                        onClick,
                        options
                    }: Props) => {
    return (
        <Menu
            transitionProps={{transition: 'pop-top-right'}}
            position="top-end"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <Button color="gray" pr={12}>
                    Create new...
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {options.map(item => (
                    <Menu.Item key={item}>
                        {item}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default ButtonMenu;
