import {
  AssetGuideDiv,
  AssetTitle,
  AssetDescription,
  CumulativeSum,
  CharacterIcon,
} from "./styles";
import character from "../../images/personal_asset_character.svg";

interface AssetsInfoProps {
  zoomedRange: string;
  cumulativeSum: number;
}

export default function AssetsInfo(props: AssetsInfoProps) {
  const { zoomedRange, cumulativeSum } = props;

  return (
    <AssetGuideDiv>
      <CharacterIcon src={character} />
      <AssetTitle>돈을 얼마나 썼을까?</AssetTitle>
      <AssetDescription>
        확인하고 싶은 기간을 드래그하여
        <br /> 지출 금액을 확인하세요!
      </AssetDescription>
      <CumulativeSum>
        {zoomedRange}
        <br />총 <span>{cumulativeSum.toLocaleString()}</span> 원을 쓰셨네요
      </CumulativeSum>
    </AssetGuideDiv>
  );
}
