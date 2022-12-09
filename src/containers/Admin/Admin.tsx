import React, {useCallback, useEffect, useState} from 'react';
import "./Admin.css";
import {ContentType} from "../../types";
import axiosApi from "../../axiosApi";
import {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Preloader from "../../components/Preloder/Preloader";
import slugify from "react-slugify";

const Admin = () => {
  const [admin, setAdmin] = useState<ContentType>({
    content: '',
    title: '',
  });
  const [category, setCategory] = useState<string>('');
  const [pagesList, setPagesList] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const {editAdd} = useParams();

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  }

  const onChangeInputTextarea = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setAdmin(prev => ({...prev, [name]: value}));
  }

  const formSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editAdd === 'edit') {
        await axiosApi.put("/pages/" + category + ".json", admin);
        navigate("/pages/" + category);
      } else {
        await axiosApi.put("/pages/" + category + ".json", admin);
        navigate("/pages/" + category);
      }
    } catch (e) {
      console.log('error', e);
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
    if (editAdd === 'edit') {
      if (category.length) {
        fetchCategoryData(category).catch((e: AxiosError) => (console.log(e.message)));
      }
    }
  }, [category, editAdd, fetchCategoryData]);

  const fetchOptions = useCallback(async () => {
    setLoader(true);
    try {
      const pageListResponse = await axiosApi.get("/pages.json");
      const pages = Object.keys(pageListResponse.data).map(key => {
        return key;
      });
      setPagesList(pages);
    } finally {
      setLoader(false);
    }
  }, [])

  useEffect(() => {
    fetchOptions().catch(console.error);
  }, [fetchOptions]);

  useEffect(() => {
    if (editAdd === "add") {
      setAdmin(prevState => ({
        ...prevState,
        title:'',
        content:'',
      }));
      setCategory('');
    }
  }, [editAdd]);

  let content = (
    <div className="addEditBigBox">
      <form className="formBox" onSubmit={formSubmit}>
        <div className="inputBox">
          {editAdd === 'edit' ?
            <div>
              <p style={{marginTop: "0"}}>Edit Page</p>
              <select
                required
                className="adminSelect"
                name="category"
                id="category"
                value={category}
                onChange={onChangeSelect}
              >
                <option hidden value="">Select?</option>
                {pagesList.map(item => {
                  return <option value={item} key={Math.random()}>{item}</option>
                })}
              </select>
            </div>
            :
            <div>
              <p style={{marginTop: "0"}}>Add Page</p>
              <input
                required
                onChange={onChangeSelect}
                value={slugify(category)}
                type="text"
                name="category"
              />
            </div>
          }
        </div>
        <div className="inputBox">
          <p style={{marginTop: "0"}}>Title:</p>
          <input
            required
            className="adminTitle"
            name="title"
            type="text"
            onChange={onChangeInputTextarea}
            value={admin.title}
          />
        </div>
        <div className="inputBox">
          <p style={{marginTop: "0"}}>Content:</p>
          <textarea
            required
            className="adminText"
            name="content"
            id="sd"
            onChange={onChangeInputTextarea}
            value={admin.content}
          />
        </div>
        <button className="btnSubmit" type="submit">Submit</button>
      </form>
    </div>

  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Admin</h1>
      {content}
    </div>
  );
};

export default Admin;