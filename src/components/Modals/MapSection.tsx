import React from "react";
import icon_search from "../../images/modal_search.png";
import BankLocation, { Bank } from "../Maps/BankLocation";
import {
  MapContainer,
  LocationButtonContainer,
  SearchBox,
  LocationButton,
} from "./styles";

interface MapSectionProps {
  selectedBank: string | null;
  onSelectBank: (bank: Bank) => void;
}

const MapSection: React.FC<MapSectionProps> = ({
  selectedBank,
  onSelectBank,
}) => {
  return (
    <>
      <MapContainer>
        <BankLocation onSelectBank={onSelectBank} />
      </MapContainer>

      <LocationButtonContainer>
        <SearchBox>
          <input type="text" placeholder="지점을 검색하세요" />
          <img src={icon_search} alt="Search" />
        </SearchBox>
        <LocationButton>
          {selectedBank ? selectedBank : "지점을 선택하세요"}
        </LocationButton>
      </LocationButtonContainer>
    </>
  );
};

export default MapSection;
