import React, { Component } from "react";
import "./navbar.css";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Menu, Dropdown, Icon, Button } from "antd";
import { store } from "../../store/store";
class Header extends Component {
  showMenu = type => {
    store.dispatch({
      type: "SHOW_MENU",
      payload: type
    });
  };

  logoutfunction = () => {
    let tokenget = localStorage.removeItem("token");

    if (!tokenget) {
      this.props.history.push("/");

      store.dispatch({
        type: "FLUSH_MENU",
        payload: []
      });
    }
  };
  render = () => {
    let gettoken = localStorage.getItem("token");
    const { nestdropdown } = this.props;
    console.log(nestdropdown);
    const { accountitem } = this.props;
    console.log(accountitem);

    const { reportingItem } = this.props;
    const { MainMenuItemName } = this.props;
    console.log(MainMenuItemName);
    const { settingItems } = this.props;
    console.log(settingItems);
    const { SubMenu } = Menu;
    const account = (
      <Menu>
        {accountitem.map(item => (
          <Menu key={item}>
            <Menu.Item>{item}</Menu.Item>
          </Menu>
        ))}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );
    const reporting = (
      <Menu>
        {reportingItem.map(item => (
          <Menu key={item}>
            <Menu.Item>{item}</Menu.Item>
          </Menu>
        ))}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );
    const setting = (
      <Menu>
        {/* {settings.map(item => <Menu key={item}><Menu.Item>{item}</Menu.Item> */}
        {/* </Menu>)} */}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );

    return (
      <div className="Navbar">
        <Row type="flex" justify="center">
          <Link
            // className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/dashboard"
          >
            <Col span={1}> {MainMenuItemName.home}</Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/accounts"
          >
            <Col span={1} onClick={this.showMenu.bind(null, "accounts")}>
              {MainMenuItemName.accounts}
              <Icon type="down" />
            </Col>
          </Link>{" "}
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/sales"
          >
            <Col span={1} style={{ color: "white" }}>
              {MainMenuItemName.sales}
            </Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/purchases"
          >
            <Col span={2} style={{ color: "white" }}>
              {MainMenuItemName.Purchase}
            </Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/reporting"
          >
            <Col
              span={2}
              onClick={this.showMenu.bind(null, "reporting")}
              style={{ color: "white" }}
            >
              {MainMenuItemName.reporting}
              <Icon type="down" />
            </Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/settings"
          >
            <Col
              span={2}
              onClick={this.showMenu.bind(null, "settings")}
              style={{ color: "white" }}
            >
              Settings
              <Icon type="down" />
            </Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/recovery"
          >
            <Col span={2}>{MainMenuItemName.recovery}></Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/expenses"
          >
            <Col span={2}>{MainMenuItemName.Expenses}</Col>
          </Link>
          {/* <a className="ant-dropdown-link" style={{ color: 'white' }} to='/expenses' href="#">{MainMenuItemName.Expenses} */}
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/salary"
          >
            <Col span={1}>{MainMenuItemName.salary}</Col>
          </Link>
          <Link
            className="ant-dropdown-link"
            style={{ color: "white" }}
            to="/profit"
          >
            <Col span={2}>{MainMenuItemName.profit}</Col>
          </Link>
          <Link to="/attendence">
            <Col span={1}>{MainMenuItemName.return} </Col>
          </Link>
          <Button onClick={this.logoutfunction}>Logout </Button>
          {/* <Col span={1}><a className="ant-dropdown-link" style={{ color: 'white' }} href="#">{MainMenuItemName.return}
            </a></Col>
            <Col span={2}><a className="ant-dropdown-link" style={{ color: 'white' }} href="#">{MainMenuItemName.stock}
            </a></Col> */}
          {/* {!this.props.auth.loggedInUser.id && (
            <Col span={2}>
              {" "}
              <Link to="/login">
                <Button type="dashed">Login</Button>
              </Link>
            </Col>
          )} */}
        </Row>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    auth: state.loginReducers,
    nestdropdown: state.dropdownReducers.nestedItem,
    accountitem: state.dropdownReducers.accounts,
    reportingItem: state.dropdownReducers.reporting,
    settingItems: state.dropdownReducers.settingItem,
    MainMenuItemName: state.dropdownReducers.MainMenuItemNames
  };
};
export default withRouter(connect(mapStateToProps)(Header));
