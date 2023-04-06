import { useState, ReactNode, useEffect } from "react";
import { ConfigProvider } from "antd";

export type Token = {
  colorPrimary: string;
  colorText: string;
  colorTextQuaternary: string;
  colorTextTertiary: string;
  colorTextDisabled: string;
  colorTextPlaceholder: string;
  colorTextHeading: string;
  colorTextLightSolid: string;
  colorBgContainer: string;
  colorBgElevated: string;
  colorBorderBg: string;
};

export const token: Token = {
  colorPrimary: "#1E293B",
  colorText: "white",
  colorTextQuaternary: "white",
  colorTextTertiary: "#38bdf8",
  colorTextDisabled: "#94a3b8",
  colorTextPlaceholder: "white",
  colorTextHeading: "#38bdf8",
  colorTextLightSolid: "#38bdf8",
  colorBgContainer: "#1E293B",
  colorBgElevated: "#475569",
  colorBorderBg: "#f8fafc",
};

type ThemeContextType = {
  token: Token;
};

export const themeToken: ThemeContextType = {
  token: token,
};

const ThemeProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextType>();

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      setTheme(themeToken);
    } else setTheme(undefined);
  };

  useEffect(() => {
    themeCheck();
  }, [userTheme]);

  console.log(userTheme);

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export { ThemeProvider };
