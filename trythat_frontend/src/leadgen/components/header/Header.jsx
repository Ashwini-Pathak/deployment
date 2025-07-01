import React from "react";
import "./Header.scss";
import { Layout, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../Assets/Images/logo.png";
const { Header } = Layout;

export default function TopHeader() {
  const dispatch = useDispatch();
  const { searchQuery, showSearchBar } = useSelector((state) => state.search);

  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery]);

  return (
    <Header className="header">
      <div className="header__items">
        <div className="header__left">
          <div className="header__logo">
            <img src={logo} />
          </div>
          <div className="header__actions">
            {showSearchBar && (
              <Form name="customized_form_controls" layout="inline">
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  type="primary"
                  onClick={() => dispatch(setSearchQuery(search))}
                >
                  Search
                </Button>
              </Form>
            )}
          </div>
        </div>
        <div className="header__right">
       
          <Button className="header__btn__download">Download your CIBIL</Button>
        </div>
      </div>

    </Header>
  );
}
