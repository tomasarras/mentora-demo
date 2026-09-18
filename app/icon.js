import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d97706",
          borderRadius: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            fill="#fff"
            d="M12 3 1 8.5l11 5.5 9-4.5V17h2V8.5L12 3Zm-7 8.18V15c0 2 3 4 7 4s7-2 7-4v-3.82l-7 3.5-7-3.5Z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
