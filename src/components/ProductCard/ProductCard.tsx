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
}
export default function ProductCard(props: Props) {
  const { product } = props;
  return (
    <Wrapper>
      <Card
        style={{
          backgroundColor: product.color || "#f5f5f5",
          opacity: product.opacity || 1,
        }}
      >
        <CardTitle>{product.title}</CardTitle>
        <CardSubTitle>{product.subtitle}</CardSubTitle>
        <Info>{product.description}</Info>
        {/* {product.image && <CardImage style={{ backgroundImage: `url(${product.image})` }} />} */}
        {product.image && (
          <CardImage src={product.image} alt={`${product.title} 이미지`} />
        )}
      </Card>
    </Wrapper>
  );
}
