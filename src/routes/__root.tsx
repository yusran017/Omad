import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const THEME_BOOT = `(function(){try{var raw=localStorage.getItem("omad-tracker-v1");var theme="dark";var lang="th";if(raw){var data=JSON.parse(raw);if(data&&data.settings&&data.settings.theme==="light")theme="light";if(data&&data.settings&&data.settings.lang==="en")lang="en";}document.documentElement.dataset.theme=theme;document.documentElement.lang=lang;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "OMAD Tracker" },
      { name: "description", content: "ติดตามการกินแบบ OMAD ส่วนตัว บันทึกเวลาไว้บนเครื่องคุณ" },
      { name: "theme-color", content: "#0e141b" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "OMAD" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/icon-192.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
