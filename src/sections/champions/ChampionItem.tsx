import React from "react";
import { IChampionInformation } from "../../types/champion";
import "../../styles/sections/champions/championItem.scss";
import { Link } from "react-router-dom";
type TProp = {
  data: IChampionInformation;
};
const ChampionItem = (data: TProp): any => {
  return (
    <Link
      to={`championview/${data.data.name}`}
      className="championItem col-lg-3 col-6"
    >
      <div className="championItem__image">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data.id}_0.jpg`}
          alt=""
        />
        <div className="championItem__name">
          <span>{data.data.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default ChampionItem;
