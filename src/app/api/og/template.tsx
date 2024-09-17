import { ImageResponse } from "next/og";
import type { FontMap } from "./fonts";

interface OpenGraphImageParams {
  title: string;
  name?: string;
  image?: string;
}

export const generateOgImage = (
  { title, name, image }: OpenGraphImageParams,
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
            marginBlockEnd: "10px",
          }}
        >
          <svg
            viewBox="0 0 1200 1200"
            width="50"
            height="50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: "40px" }}
          >
            <path
              d="M304 253h464l19 2 14 4 17 9 13 11 9 11 8 14 6 16 2 11v21l-3 15-6 15-7 11-12 14-168 168 438 1 17 3 14 5 13 8 11 9 9 11 7 11 5 12 4 15 1 10v9l-2 14-5 16-7 13-8 10-205 205-14 9-11 5-13 4-18 2h-464l-19-2-14-4-17-9-14-12-8-10-8-14-6-16-2-11v-21l3-15 6-15 7-11 9-10 172-172-439-1-17-3-14-5-13-8-13-11-10-13-8-16-4-13-2-15v-9l2-14 5-16 7-13 8-10 204-204 13-9 13-6 13-4z"
            />
          </svg>
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
            tw="capitalize line-clamp-3"
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
            {/* eslint-disable-next-line  @next/next/no-img-element */}
            <img
              alt={`${name}'s profile avatar`}
              src={image || `https://avatar.vercel.sh/${name}?size=30`}
              width={40}
              height={40}
              tw="rounded-full"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginLeft: "14px",
              }}
            >
              <span tw="font-semibold">by</span>
              <p tw="capitalize text-lg font-semibold">{name}</p>
            </div>
          </div>
          <p style={{ fontSize: "24px" }} tw="font-semibold">quillstash.com</p>
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
