import { ProductType } from "../../type";
import {
  Card,
  CardTitle,
  CardSubTitle,
  Info,
  Wrapper,
  CardImage,
} from "./styles";

interface Props {
  product: ProductType;
  color: string; // color 추가
  image: string; // image 추가
}

export default function ProductCard(props: Props) {
  const { product, color, image } = props;

  return (
    <Wrapper>
      <Card
        style={{
          backgroundColor: color || "#f5f5f5",
          opacity: product.opacity || 1,
        }}
      >
        <CardTitle>{product.title}</CardTitle>
        <CardSubTitle>{product.subtitle}</CardSubTitle>
        <Info>{product.description}</Info>
        {image && <CardImage src={image} alt={`${product.title} 이미지`} />}
      </Card>
    </Wrapper>
  );
}
