import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useGet } from "../../api/get";
import { NewsOffer as NewsOfferInterface } from "../../interface/Interface";
import { useParams } from "react-router-dom";
import errImage from "../../assets/img/news_detail_img_d1.jpg";
import { NewsOffer } from "../../components/NewsOffer";
import { Spin } from "antd";

export const NewsOfferDetails = () => {
  const {
    fetchGet,
    result: newsOffer,
    isLoading,
  } = useGet<NewsOfferInterface>();
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    fetchGet("newsoffer/detail/" + id);
  }, [id]);

  return (
    <Layout>
      <div className="lg:mx-32 md:mx-10 mx-5 mb-10">
        {isLoading ? (
          <div className="flex justify-center min-h-screen">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <>
            {newsOffer && (
              <div>
                <div className="py-6">
                  <h2 className="lg:text-2xl md:text-xl text-base font-medium">
                    {newsOffer.name}
                  </h2>
                </div>
                <div className="flex sm:flex-row flex-col sm:space-x-8">
                  <img
                    className="sm:w-72 w-60 h-fit rounded mx-auto"
                    src={newsOffer.img}
                    alt={newsOffer.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = errImage;
                    }}
                  />
                  <div className="sm:w-3/5 sm:mt-0 mt-5 w-full space-y-2 sm:text-base">
                    <p>
                      <b>1. Thời gian áp dụng: </b>
                      {newsOffer.date}
                    </p>
                    <div>
                      <b>
                        2. Nội dung chương trình: <br />
                      </b>
                      <ul>
                        {newsOffer.contents?.map((content) => (
                          <li>{content}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <b>3. Địa điểm áp dụng: </b>
                      {newsOffer.address}
                    </p>
                    <p>
                      <b>
                        4. Đối tượng khuyến mại: <br />
                      </b>
                      <ul>
                        {newsOffer.objects?.map((obj) => (
                          <li>{obj}</li>
                        ))}
                      </ul>
                    </p>
                    <div>
                      <b>
                        5. Điều kiện và điều khoản: <br />
                      </b>
                      <ul>
                        {newsOffer.others?.map((other) => (
                          <li>{other}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <NewsOffer />
    </Layout>
  );
};
