import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {
  const {
    title,
    image,
    price,
    rating,
    id,
    onLikeButtonClick,
    onRemoveFromSelected,
    likedProducts,
    product
  } = props;
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    let like = JSON.parse(localStorage.getItem('liked'));
    if (!like) {
     setLiked(like);
    }
  }, []);

  const handleClick = () => {
    navigate(`/singleproduct/${id}`);
  };

  const handleLikeClick = () => {
    if (!liked) {
      onLikeButtonClick(product);
    } else {
      onRemoveFromSelected(product);
    }
    setLiked(!liked);
  };

  return (
    <div className="card flex flex-col justify-center items-start p-5 cursor-pointer w-[450px] h-[507px] bg-white rounded-[30px] shadow-xl">
      {liked ? (
        <i
          className="ri-heart-fill text-[30px] text-black flex"
          onClick={handleLikeClick}
        />
      ) : (
        <i
          className="ri-heart-line text-[30px] text-black flex"
          onClick={handleLikeClick}
        />
      )}
      <div className="card flex flex-col justify-center items-center ">
        <img
          src={image}
          alt=""
          className="w-[280px] h-[300px]"
          onClick={handleClick}
        />
        <div className="flex flex-col justify-center items-start w-full">
          <div className="w-full flex items-center justify-between mt-10">
            <h4 className="text-[#1C1C27] text-[24px] font-[600]">
              {title.slice(0, 20)}
            </h4>
            <h4 className="text-[#FFA542] text-[24px] font-[600]">{price}₸</h4>
          </div>
          <div className="rating flex items-start mt-10">
            <div className="flex items-center justify-center">
              <i className="ri-star-fill text-[30px] text-[#FFCE7F]" />
              <span className="text-[#838383] text-[24px] font-[600]">
                {rating.rate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
