import React from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

interface Props{
    openForm:()=>void;
}

export default function NavBar(props:Props){
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    Reactivites
                </Menu.Item>
                <Menu.Item name='Activities'>
                </Menu.Item>
                <Menu.Item name='Activities'>
                    <Button onClick={props.openForm} positive content='Create Ativity' />
                </Menu.Item>
            </Container>
        </Menu>

    )
}