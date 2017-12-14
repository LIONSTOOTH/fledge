import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

  let toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Nav</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide out' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='Dashboard'>
              <Icon name='rocket' />
              Dashboard
            </Menu.Item>
            <Menu.Item name='App Materials'>
              <Icon name='folder' />
              App Materials
            </Menu.Item>
            <Menu.Item name='Metrics'>
              <Icon name='line graph' />
              Metrics
            </Menu.Item>
            <Menu.Item name='Profile'>
              <Icon name='user' />
              Profile
            </Menu.Item>
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    )
  }
}
}


export default Nav;
