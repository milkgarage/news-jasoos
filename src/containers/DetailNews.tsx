import { Divider, PageHeader, Tag } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";

const NewsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <PageHeader
        style={{
          position: "fixed",
          height: "70px",
          width: "100%",
          background: "#fff",
        }}
        className="site-page-header"
        onBack={() => navigate("/")}
        title={"Back"}
        subTitle={<Tag color="red"> {state?.date}</Tag>}
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="detail-base">
        <div className="detail-page">
          <div className="detail-headline hindi-font">{state?.heading}</div>
        </div>

        <div className="detail-img">
          <img
            src={state?.imgUrl}
            style={{ margin: "10px", width: "100%" }}
            alt={state?.heading}
          />
        </div>
        <div className="detail-meta">
          <meta about={state?.content}></meta>
          <div>
            <Tag color="blue">{state?.author}</Tag>
            <Tag color="blue">{state?.date}</Tag>
            {state?.location && <Tag color="red">{state?.location}</Tag>}
          </div>
        </div>
        <td dangerouslySetInnerHTML={{ __html: state?.detailContent }} />
        {/* <div className="detail-news hindi-font">{state?.detailContent}</div> */}
      </div>

      <Divider />
      <Home />
    </React.Fragment>
  );
};

export default NewsDetail;
