import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";

import "keen-slider/keen-slider.min.css";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => setCollections(response.data))
      .catch((err) => console.error(err));
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width:1200px)": { slides: { perView: 3, spacing: 16 } },
      "(max-width:1000px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width:700px)": { slides: { perView: 1, spacing: 16 } },
    },
  });

  const SKELETON_COLS = [
    "col-xl-3 col-lg-4 col-md-6 col-12",
    "col-xl-3 col-lg-4 col-md-6 d-none d-md-block",
    "col-xl-3 col-lg-4 d-none d-lg-block",
    "col-xl-3 d-none d-xl-block",
  ];
  return (
    <section
      id="section-collections"
      className="no-bottom"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {collections.length > 0 ? (
            <div className="position-relative">
              <div
                className="keen-slider"
                ref={sliderRef}
              >
                {collections.map((collection) => (
                  <div
                    className="keen-slider__slide"
                    key={collection.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="owl-prev"
                onClick={() => instanceRef.current?.prev()}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                className="owl-next"
                onClick={() => instanceRef.current?.next()}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          ) : (
            SKELETON_COLS.map((cols, index) => (
              <div
                className={cols}
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton
                      width="100%"
                      height="200px"
                    />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                    />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton
                      width="100px"
                      height="20px"
                    />
                    <Skeleton
                      width="60px"
                      height="20px"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
