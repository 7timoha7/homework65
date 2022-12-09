import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {ContentType} from "../../types";
import axiosApi from "../../axiosApi";
import {AxiosError} from "axios";
import Preloader from "../../components/Preloder/Preloader";
import "./ContentContainer.css";

const ContentContainer = () => {
  const [content, setContent] = useState<ContentType | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const {pageName} = useParams();
  const location = useLocation();

  const fetchContent = useCallback(async () => {
    setLoader(true);
    try {
      const contentResponse = await axiosApi.get<ContentType>("/pages/" + pageName + ".json");
      setContent(contentResponse.data);
    } finally {
      setLoader(false);
    }
  }, [pageName]);

  useEffect(() => {
    fetchContent().catch((e: AxiosError) => (console.log(e.message)));
  }, [location, fetchContent]);

  let contentLoader = (
    <div className="contentBox">
      <div>
        <h1 className="contentH1">{content?.title.toUpperCase()}</h1>
      </div>
      <div>
        <p>{content?.content}</p>
      </div>
    </div>
  );

  if (loader) {
    contentLoader = <Preloader/>
  }

  return (
    <div className="mainContentBox">
      {contentLoader}
    </div>
  );
};

export default ContentContainer;