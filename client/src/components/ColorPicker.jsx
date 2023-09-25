/* eslint-disable react/no-unknown-property */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import chroma from "chroma-js";
import tw from "twin.macro";
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function useMousemove(ref, callback) {
  const cb = React.useRef();
  React.useEffect(() => {
    cb.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const el = ref.current;
    const onmousemove = (e) => {
      e.preventDefault();
      cb.current(e);
    };
    const onmousedown = (e) => {
      e.preventDefault();
      window.addEventListener("mousemove", onmousemove);
      window.addEventListener("mouseup", onmouseup);
      cb.current(e);
    };
    const onmouseup = (e) => {
      e.preventDefault();
      window.removeEventListener("mousemove", onmousemove);
    };
    el.addEventListener("mousedown", onmousedown);
    return () => {
      el.removeEventListener("mousedown", onmousedown);
      window.removeEventListener("mousemove", onmousemove);
      window.removeEventListener("mouseup", onmouseup);
    };
  }, [ref]);
}
function useCombinedRefs(...refs) {
  const targetRef = React.useRef();
  React.useEffect(() => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    }
  }, [refs]);
  return targetRef;
}
export const App = React.forwardRef(
  ({ onChange, defaultValue = "#ff0000", ...props }, ref) => {
    const picker = useCombinedRefs(React.useRef(), ref);
    const palette = React.useRef();
    const alpha = React.useRef();
    const hue = React.useRef();
    const result = React.useRef();
    const resultText = React.useRef();
    const handleChange = React.useRef();
    React.useEffect(() => {
      handleChange.current = onChange;
    }, [onChange]);
    const onchange = React.useCallback(() => {
      if (handleChange.current) {
        const root = picker.current;
        const alpha = parseFloat(
          root.style.getPropertyValue("--selected-alpha"),
        );
        const color = chroma(
          root.style.getPropertyValue("--selected-color"),
        ).alpha(alpha);
        handleChange.current(color.alpha(alpha));
      }
    }, [picker]);
    const updateText = React.useCallback(() => {
      const el = resultText.current;
      const root = picker.current;
      const alpha = parseFloat(root.style.getPropertyValue("--selected-alpha"));
      const color = chroma(
        root.style.getPropertyValue("--selected-color"),
      ).alpha(alpha);
      switch (el.dataset["type"]) {
        case "hex":
          el.innerText = color.alpha(alpha).hex();
          break;
        case "rgba":
          el.innerText = color.alpha(alpha).css();
          break;
        case "hsla":
          el.innerText = color.alpha(alpha).css("hsl");
          break;
      }
      const bg = chroma("#1a202c");
      if (chroma.scale([bg, color])(alpha).luminance() > 0.5) {
        result.current.style.setProperty("--result-text-color", "#1a202c");
      } else {
        result.current.style.setProperty("--result-text-color", " #f7fafc");
      }
    }, [picker]);
    React.useEffect(() => {
      const root = picker.current;
      const c =
        typeof defaultValue === "string" ? chroma(defaultValue) : defaultValue;
      const h = c.get("hsl.h") || 0;
      root.style.setProperty("--selected-hue", chroma.hsl(h, 1, 0.5).hex());
      root.style.setProperty("--selected-color", c.hex());
      const el = palette.current;
      const elRect = el.getBoundingClientRect();
      root.style.setProperty(
        "--palette-marker-x",
        (elRect.width * c.get("hsv.s")).toString(),
      );
      root.style.setProperty(
        "--palette-marker-y",
        (elRect.height * (1 - c.get("hsv.v"))).toString(),
      );
      root.style.setProperty(
        "--hue-slider-y",
        ((h / 360) * elRect.height).toString(),
      );
      root.style.setProperty("--selected-alpha", c.alpha().toString());
      root.style.setProperty(
        "--alpha-slider-y",
        (elRect.height * (1 - c.alpha())).toString(),
      );
      resultText.current.dataset["type"] = "hex";
      updateText();
    }, [picker, updateText, defaultValue]);
    useMousemove(palette, (e) => {
      const el = palette.current;
      const root = picker.current;
      const elRect = el.getBoundingClientRect();
      let x = clamp(e.clientX - elRect.left, 0, elRect.width);
      if (e.ctrlKey) {
        x = parseFloat(root.style.getPropertyValue("--palette-marker-x"));
      }
      let y = clamp(e.clientY - elRect.top, 0, elRect.height);
      if (e.shiftKey) {
        y = parseFloat(root.style.getPropertyValue("--palette-marker-y"));
      }
      const h = chroma(root.style.getPropertyValue("--selected-hue")).get(
        "hsv.h",
      );
      const selectedColor = chroma.hsv(
        h,
        x / elRect.width,
        1 - y / elRect.height,
      );
      root.style.setProperty("--selected-color", selectedColor.hex());
      root.style.setProperty("--palette-marker-x", x.toString());
      root.style.setProperty("--palette-marker-y", y.toString());
      updateText();
      onchange();
    });
    useMousemove(hue, (e) => {
      const el = hue.current;
      const root = picker.current;
      const pl = palette.current;
      const elRect = el.getBoundingClientRect();
      const y = clamp(e.clientY - elRect.top, 0, elRect.height);
      const selectedHue = chroma.hsl((y / elRect.height) * 360, 1, 0.5);
      root.style.setProperty("--selected-hue", selectedHue.css("hsl"));
      root.style.setProperty("--hue-slider-y", y.toString());
      const plRect = pl.getBoundingClientRect();
      const px = root.style.getPropertyValue("--palette-marker-x");
      const py = root.style.getPropertyValue("--palette-marker-y");
      const c1 = chroma.mix(
        "#fff",
        "#000",
        parseFloat(py) / plRect.height,
        "rgb",
      );
      const c2 = chroma.mix(
        selectedHue,
        "#000",
        parseFloat(py) / plRect.height,
        "rgb",
      );
      const selectedColor = chroma.mix(
        c1,
        c2,
        parseFloat(px) / plRect.width,
        "rgb",
      );
      root.style.setProperty("--selected-color", selectedColor.hex());
      updateText();
      onchange();
    });
    useMousemove(alpha, (e) => {
      const el = alpha.current;
      const root = picker.current;
      const elRect = el.getBoundingClientRect();
      const y = clamp(e.clientY - elRect.top, 0, elRect.height);
      const selectedAlpha = 1 - y / elRect.height;
      root.style.setProperty("--selected-alpha", selectedAlpha.toString());
      root.style.setProperty("--alpha-slider-y", y.toString());
      updateText();
      onchange();
    });
    function changeText() {
      const el = resultText.current;
      const root = picker.current;
      const color = chroma(root.style.getPropertyValue("--selected-color"));
      const alpha = parseFloat(root.style.getPropertyValue("--selected-alpha"));
      switch (el.dataset["type"]) {
        case "hex":
          el.dataset["type"] = "rgba";
          el.innerText = color.alpha(alpha).css();
          break;
        case "rgba":
          el.dataset["type"] = "hsla";
          el.innerText = color.alpha(alpha).css("hsl");
          break;
        case "hsla":
          el.dataset["type"] = "hex";
          el.innerText = color.alpha(alpha).hex();
          break;
      }
    }
    return (
      <div
        aria-label="color-picker"
        ref={picker}
        tw="p-3"
        css={css`
          --selected-color: #ffffff;
          --selected-hue: #ff0000;
          --palette-marker-x: 0;
          --palette-marker-y: 0;
          --hue-slider-y: 0;
          --alpha-slider-y: 0;
          width: 340px;
          box-shadow:
            rgba(0, 0, 0, 0.3) 0px 0px 2px,
            rgba(0, 0, 0, 0.3) 0px 4px 8px;
          background: var(--color-picker-background);
        `}
        {...props}
      >
        <div
          aria-label="result"
          ref={result}
          tw="relative h-12"
          css={css`
            color: var(--result-text-color);
          `}
        >
          <div
            tw="w-full h-full absolute"
            css={css`
              background-image: linear-gradient(
                  45deg,
                  #888 25%,
                  transparent 25%
                ),
                linear-gradient(-45deg, #888 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #888 75%),
                linear-gradient(-45deg, transparent 75%, #888 75%);
              background-size: 16px 16px;
              background-position:
                0 0,
                0 8px,
                8px -8px,
                -8px 0px;
            `}
          />
          <div
            tw="w-full h-full absolute"
            css={css`
              background: var(--selected-color);
              opacity: var(--selected-alpha);
            `}
          />
          <div tw="absolute w-full h-full flex items-center justify-center select-text">
            <div ref={resultText} />
            <button
              onClick={changeText}
              tw="px-2 rounded-lg"
              css={css`
                :focus {
                  ${tw`outline-none`}
                }
                :hover {
                  ${tw`text-gray-600`}
                }
              `}
            >
              <svg
                id="i-options"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="16"
                height="16"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M28 6 L4 6 M28 16 L4 16 M28 26 L4 26 M24 3 L24 9 M8 13 L8 19 M20 23 L20 29" />
              </svg>
            </button>
          </div>
        </div>
        <div
          aria-label="panel"
          tw="mt-3 grid gap-3 h-48"
          css={css`
            grid-template-columns: 1fr 50px 50px;
          `}
        >
          <div aria-label="palette" tw="relative bg-white" ref={palette}>
            <div
              tw="w-full h-full absolute"
              css={css`
                background: var(--selected-hue);
              `}
            >
              <div
                tw="w-full h-full absolute"
                css={css`
                  background: linear-gradient(
                    to right,
                    #fff 0%,
                    transparent 100%
                  );
                `}
              />
              <div
                tw="w-full h-full absolute"
                css={css`
                  background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 100%
                  );
                `}
              />
              <div
                tw="w-full h-full absolute"
                css={css`
                  background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 100%
                  );
                `}
              />
            </div>
            <div
              aria-label="marker"
              tw="absolute w-4 h-4 rounded-full"
              css={css`
                border-color: #f7fafc;
                background-color: var(--selected-color);
                border-width: 2px;
                transform: translate(
                  calc(var(--palette-marker-x, 0) * 1px - 8px),
                  calc(var(--palette-marker-y, 0) * 1px - 8px)
                );
              `}
            />
          </div>
          <div aria-label="alpha" ref={alpha} tw="relative h-full bg-white">
            <div
              tw="w-full h-full absolute"
              css={css`
                background-image: linear-gradient(
                    45deg,
                    #888 25%,
                    transparent 25%
                  ),
                  linear-gradient(-45deg, #888 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #888 75%),
                  linear-gradient(-45deg, transparent 75%, #888 75%);
                background-size: 16px 16px;
                background-position:
                  0 0,
                  0 8px,
                  8px -8px,
                  -8px 0px;
              `}
            />
            <div
              tw="w-full h-full absolute"
              css={css`
                background: linear-gradient(
                  to bottom,
                  var(--selected-color) 0%,
                  transparent 100%
                );
              `}
            />
            <div
              aria-label="slider"
              tw="absolute rounded-full"
              css={css`
                border-color: #f7fafc;
                border-width: 2px;
                width: calc(100% + 4px);
                left: -2px;
                height: 10px;
                transform: translate(
                  0px,
                  calc(var(--alpha-slider-y, 0) * 1px - 5px)
                );
              `}
            />
          </div>
          <div aria-label="hue" ref={hue} tw="relative bg-white">
            <div
              tw="w-full h-full absolute"
              css={css`
                background: linear-gradient(
                  to bottom,
                  hsl(0, 100%, 50%),
                  hsl(60, 100%, 50%),
                  hsl(120, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(240, 100%, 50%),
                  hsl(300, 100%, 50%),
                  hsl(360, 100%, 50%)
                );
              `}
            />
            <div
              aria-label="slider"
              tw="absolute rounded-full"
              css={css`
                border-color: #f7fafc;
                background-color: var(--selected-hue);
                border-width: 2px;
                width: calc(100% + 4px);
                left: -2px;
                height: 10px;
                transform: translate(
                  0px,
                  calc(var(--hue-slider-y, 0) * 1px - 5px)
                );
              `}
            />
          </div>
        </div>
      </div>
    );
  },
);
