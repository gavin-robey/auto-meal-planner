import React from "react";

interface VerificationEmailProps {
    vLink: string;
    email: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = (props) => {
    const link = props.vLink;
    const email = props.email;

    return (
        <div
            style={{
                backgroundColor: "#eff3f8",
                width: "100%",
                maxWidth: "40rem",
                height: "100%",
                margin: "auto",
                borderRadius: "10px",
                opacity: "1",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "90%",
                    margin: "auto",
                    paddingTop: "3rem",
                    paddingBottom: "1rem",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        height: "100%",
                        borderRadius: "10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        alignItems: "center",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <div
                        style={{
                            width: "auto",
                            borderRadius: "10px",
                        }}
                    >
                        <div style={{ width: "100%" }}>
                            <h3>Verify Email</h3>
                            <p style={{ color: "#64758b" }}>Confirm that this is the correct email to use for your account by clicking the button below.</p>
                        </div>

                        <div style={{ width: "60%", margin: "auto" }}>
                            <table
                                align="center"
                                width="100%"
                                border={0}
                                cellPadding={0}
                                cellSpacing="0"
                                role="presentation"
                                style={{
                                    maxWidth: "37.5em",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    boxSizing: "border-box",
                                    paddingTop: "1rem",
                                    paddingBottom: "1rem",
                                    width: "100%",
                                }}>
                                <tbody>
                                    <tr style={{ width: "100%" }}>
                                        <td>
                                            <a
                                                href={link}
                                                style={{
                                                    lineHeight: "100%",
                                                    textDecoration: "none",
                                                    display: "inline-block",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                    boxSizing: "border-box",
                                                    padding: "12px 12px 12px 12px",
                                                    fontWeight: 600,
                                                    borderRadius: "8px",
                                                    textAlign: "center",
                                                    backgroundColor: "rgb(79,102,241)",
                                                    color: "rgb(255,255,255)"
                                                }}
                                                target="_blank"
                                            ><span
                                                style={{ maxWidth: "100%", display: "inline-block", lineHeight: "120%" }}
                                            >Verify</span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
};