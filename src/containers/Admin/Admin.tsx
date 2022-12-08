import React, {useCallback, useEffect, useState} from 'react';
import "./Admin.css";
import {ContentType} from "../../types";
import axiosApi from "../../axiosApi";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import Preloader from "../../components/Preloder/Preloader";

const Admin = () => {
  const [admin, setAdmin] = useState<ContentType>({
    content: '',
    title: '',
  });
  const [category, setCategory] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const onChangeInputTextarea = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setAdmin(prev => ({...prev, [name]: value}));
  }

  const formSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.put("/pages/" + category + ".json", admin);
      navigate("/pages/" + category);
    } catch (e) {
      console.log('error',e);
    }
  }

  const fetchCategoryData = useCallback(async (category: string) => {
    setLoader(true);
    try {
      const categoryDataResponse = await axiosApi.get<ContentType>("/pages/" + category + ".json");
      setAdmin(categoryDataResponse.data);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    if (category.length) {
      fetchCategoryData(category).catch((e: AxiosError) => (console.log(e.message)));
    }
  }, [category, fetchCategoryData]);

  let content = (
    <div>
      <form className="formBox" onSubmit={formSubmit}>
        <div className="inputBox">
          <select required className="adminSelect" name="category" id="category" value={category} onChange={onChangeSelect}>
            <option hidden value="">Select?</option>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="contacts">Contacts</option>
            <option value="division">Division</option>
          </select>
        </div>
        <div className="inputBox">
          <input required className="adminTitle" name="title" type="text" onChange={onChangeInputTextarea} value={admin.title}/>
        </div>
        <div className="inputBox">
          <textarea required className="adminText" name="content" id="sd" onChange={onChangeInputTextarea} value={admin.content}/>
        </div>
        <button type="submit">add</button>
      </form>
    </div>

  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div>
      <h1>Admin</h1>
      {content}
    </div>
  );
};

export default Admin;