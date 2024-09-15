import { ImageResponse } from "next/og";
import type { FontMap } from "./fonts";

interface OpenGraphImageParams {
  title: string;
  tag: string;
  name?: string;
  image?: string;
}

export const generateOgImage = (
  { title, tag, name, image }: OpenGraphImageParams,
  fonts: FontMap,
) => {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Inter-SemiBold",
          color: "#212121",
          padding: "40px",
          backgroundColor: "#fcf6f1",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="line-clamp-1"
            style={{
              marginRight: "auto",
              marginBottom: "40px",
              color: "#fcf6f1",
              background: "#212121",
              padding: "5px 10px",
              fontWeight: "600",
              letterSpacing: "-0.05em",
              display: "flex",
              gap: "4px",
            }}
          >
            <span>#{tag}</span>
          </div>
          <div
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              //   lineHeight: "6rem",
              padding: "0 0 100px 0",
              letterSpacing: "-0.025em",
              color: "#212121",
              fontFamily: "Inter-SemiBold",
              // not working in the preview
              lineClamp: 3,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
            tw="capitalize"
            className="line-clamp-3"
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div tw="flex items-center">
            <img
              alt={`${name}'s profile avatar`}
              src={image || `https://avatar.vercel.sh/${name}?size=30`}
              width={36}
              height={36}
              tw="rounded-full"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "10px",
              }}
            >
              <span tw="text-sm">by</span>
              <p tw="capitalize">{name}</p>
            </div>
          </div>
          <p style={{ fontSize: "18px" }}>quillstash.com</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [fonts["inter-semibold"], fonts["inter-regular"]],
    },
  );
};
