export function getUserIdFromToken(token: string | null): string {
  if (!token) return "";

  try {
    // JWT의 payload 부분을 디코딩
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);

    // JWT payload에서 userId 반환
    return payloadData.id || payloadData.sub || "";
  } catch (error) {
    console.error("Error decoding token:", error);
    return "";
  }
}
