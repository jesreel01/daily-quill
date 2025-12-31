import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
    width: 180,
    height: 180,
}
export const contentType = "image/png"

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg
                    width="180"
                    height="180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#70BF72"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                    <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
