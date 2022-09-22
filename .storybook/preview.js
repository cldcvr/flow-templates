import { html } from "lit-html";
import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";
import "@cldcvr/flow-core/dist/style.css";
import { ConfigUtil } from "@cldcvr/flow-core";
import "@cldcvr/flow-core";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  themes: {
    default: "f-dark",
    clearable: false,
    list: [
      { name: "f-dark", color: "#000" },
      { name: "f-light", color: "#fff" },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story) => {
    window.onmessage = function (e) {
      if (e.data && typeof e.data === "string") {
        const message = JSON.parse(e.data);

        if (message.event.type === "storybook-addon-themes/change") {
          ConfigUtil.setConfig({ theme: message.event.args[0] });
        }
      }
    };
    ConfigUtil.setConfig({
      iconPack: {
        ...SystemIconPack,
        ...ProductIconPack,
        ...GcpIconPack,
        ...AwsIconPack,
      },
    });
    return html`
      <style>
        .sb-show-main.sb-main-padded {
          background-color: var(--color-surface-default);
        }
        #root,
        #root-inner {
          height: 100%;
        }
        body {
          overflow: auto;
        }
      </style>
      <div
        style="background-color:var(--color-surface-default);color:var(--color-text-default);font-family:var(--flow-font);height:inherit;"
      >
        ${story()}
      </div>
    `;
  },
];
