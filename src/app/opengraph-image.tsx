import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ahmad T Chaudhry — Engineering Smart Systems For The Real World";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at top, rgba(64, 12, 30, 0.65) 0%, rgba(8, 2, 6, 0) 65%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "18%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "420px",
                        height: "420px",
                        background: "rgba(255, 216, 155, 0.22)",
                        borderRadius: "50%",
                        filter: "blur(90px)",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "48px 56px",
                        textAlign: "center",
                        maxWidth: "1000px",
                    }}
                >
                    <div
                        style={{
                            fontSize: 14,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(255, 216, 155, 0.95)",
                            marginBottom: 24,
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 999,
                            padding: "10px 18px",
                            background: "rgba(255,255,255,0.05)",
                        }}
                    >
                        Software Engineer · Embedded · IoT · AI
                    </div>
                    <div
                        style={{
                            fontSize: 56,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            color: "#ededed",
                            marginBottom: 20,
                        }}
                    >
                        Engineering Smart Systems
                    </div>
                    <div
                        style={{
                            fontSize: 56,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            color: "rgb(255, 216, 155)",
                            marginBottom: 28,
                        }}
                    >
                        For The Real World
                    </div>
                    <div
                        style={{
                            fontSize: 22,
                            lineHeight: 1.45,
                            color: "rgba(237, 237, 237, 0.72)",
                            maxWidth: "780px",
                        }}
                    >
                        Developing scalable full-stack applications, smart embedded systems, and
                        AI-powered technologies that solve real-world problems.
                    </div>
                    <div
                        style={{
                            marginTop: 36,
                            fontSize: 18,
                            color: "rgba(255, 216, 155, 0.85)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        Ahmad T Chaudhry
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
