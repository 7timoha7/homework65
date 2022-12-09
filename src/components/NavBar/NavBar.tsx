import React, {useCallback, useEffect, useState} from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import "./NavBar.css";
import axiosApi from "../../axiosApi";
import {AxiosError} from "axios";

const NavBar = () => {

  const [pagesList, setPagesList] = useState<string[]>([]);
  const location = useLocation();

  const fetchPages = useCallback(async () => {
    const pagesResponse = await axiosApi.get("/pages.json");
    const pages = Object.keys(pagesResponse.data).map(key => {
      return key;
    });
    setPagesList(pages);
  }, []);

  useEffect(() => {
    fetchPages().catch((e: AxiosError) => (console.log(e.message)));
  }, [location, fetchPages]);

  const [btnEditAdd, setBtnEditAdd] = useState<boolean>(false);
  const getBtnEditAdd = () => {
    if (btnEditAdd) {
      setBtnEditAdd(false);
    } else {
      setBtnEditAdd(true);
    }
  }

  const getBoxBtnEditAdd = () => {
    if (btnEditAdd) {
      return (
        <div className="addEditBox">
          <Link className="linkPage" to={"/pages/admin/edit"}>Edit</Link>
          <Link className="linkPage" to={"/pages/admin/add"}>Add</Link>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="navBar">
      <Link to={"/"} className="logo">My Pages</Link>
      <div className="linkBox">
        {pagesList.map(item => {
          return <NavLink className="linkPage" to={"/pages/" + item} key={Math.random()}>{item.toUpperCase()}</NavLink>
        })}
        <div className="btnBox">
          <button className="btnEditAdd" onClick={getBtnEditAdd}>Edit/Add page</button>
          {getBoxBtnEditAdd()}
        </div>
      </div>
    </div>
  );
};

export default NavBar;