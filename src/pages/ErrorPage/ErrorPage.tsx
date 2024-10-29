import { Container, ImgWrapper } from "./styles";

export default function ErrorPage() {
  return (
    <Container>
      <div>
        <ImgWrapper>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dizzy%20Face.png"
            alt="Dizzy Face"
            width="100%"
            height="100%"
          />
        </ImgWrapper>
        <h4>404 Error</h4>
      </div>
    </Container>
  );
}
