import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ContentType} from "../../types";
import axiosApi from "../../axiosApi";

const ContentContainer = () => {
  const [content, setContent] = useState<ContentType | null>(null);
  const {pageName} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchContent = useCallback(async () => {
    const contentResponse = await axiosApi.get<ContentType>("/pages/" + pageName + ".json");
    setContent(contentResponse.data);
  }, [pageName]);

  useEffect(() => {
    void fetchContent();
  }, [location, fetchContent]);

  return (
    <div>
      <div>
        <h1>{content?.title.toUpperCase()}</h1>
      </div>
      <div>
        <p>{content?.content}</p>
      </div>
    </div>
  );
};

export default ContentContainer;