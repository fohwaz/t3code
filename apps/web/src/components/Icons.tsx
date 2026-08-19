import React, { type SVGProps, useId } from "react";
import { cn } from "~/lib/utils";

export type Icon = React.FC<SVGProps<SVGSVGElement>>;

export const GitHubIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 1024 1024" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      transform="scale(64)"
      fill="currentColor"
    />
  </svg>
);

export const GitIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 256 256">
    <path
      d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33"
      fill="#DE4C36"
    />
  </svg>
);

export const JujutsuIcon: Icon = (props) => {
  const groupId = `${useId().replaceAll(":", "")}-jj-a`;

  return (
    <svg {...props} viewBox="0 0 1024 1024">
      <defs>
        <g id={groupId}>
          <path
            d="M380.7 632.3s-14.3 56-50.3 55.5c-12.1-.2-29-10.9-47.1-26.8-34.2 82.7-98.5 239-108.5 268.6-8.9 26.5 13 52 38.2 56 36.4 5.7 49-18.1 49-18.1s13.6 40.7 37.6 39.7c29.9-1.2 34.6-33 34.6-33s11.4 23.8 26.8 23.2c38.4-1.4 41.7-102.9 43.8-135.6 3.8-57.5 6.3-135.4 7.8-190.1-9 6.7-16.5 10.7-21.3 9.9-16.1-2.7-10.6-49.3-10.6-49.3z"
            fill="#42acde"
          />
          <path
            d="M403.7 75.1c-89.7-.3-201.5 32.6-200.6 99.6 1.3 87.4 52.2 62.4 41.2 111.2-4.9 21.6-59.9 49.8-65.5 153.8 2.8.7 5.3 1 7.2 1.2 14.2.7 29.9-26.3 29.9-26.3s9.5 38 35 38 50.7-26.3 50.7-26.3 15 30.3 39.6 32c20 1.6 34-8 34-8s.8 15 14.6 14c13.9-1.2 37.6-27.8 37.6-27.8 16.5 30.3 31.9 21 54.7 5.1 0 0 6.2 26.6 36.8 23.7 6-.6 12.3-1 18.5-1.5l.9-11.6c2-58.8-20.4-129.8-50.4-183-21.7-38.7-52.5-83.4-49.6-107.3 3.5-28.3 46.7-28.4 46.7-28.4l-48.5-16 24-37a279.7 279.7 0 0 0-56.8-5.4Z"
            fill="#2f9fdf"
          />
          <path
            d="M215.9 414.6s-15.7 27-30 26.3c-1.8-.1-4.3-.5-7-1.2l-.3 3c-2.3 52 7.7 100.3 29.7 132 35.1 50.7 92.6 112.6 122 113 36.1.6 50.4-55.4 50.4-55.4s-5.5 46.6 10.6 49.3c16 2.6 62.4-46.7 87.9-79.5 15.8-20.5 52-82.3 58.2-138.3-6.2.4-12.4 1-18.5 1.5-30.6 3-36.8-23.7-36.8-23.7-22.8 16-38.2 25.2-54.7-5 0 0-23.7 26.5-37.6 27.6-13.8 1.1-14.6-13.8-14.6-13.8s-14 9.5-34 8c-24.5-1.8-39.6-32.1-39.6-32.1s-25.2 26.3-50.7 26.3c-25.5 0-35-38-35-38z"
            fill="#0e254f"
          />
          <path
            d="M309.5 418.5a1.5 1.5 0 0 0-.7 0c-.6.2-1.1.8-1.5 1.8a34.7 34.7 0 0 0 4 16.6c5.5 10.6 12.4 22 23.3 27.6 4 2 8.5 3.5 12.5 3.3a36 36 0 0 0 12.5-2.3c4-2 7.6-3.8 10.8-6.2 6-4.4 7.6-6.5 7.6-9.8 0-3.3-2.7-3.5-7.6-.5-5 3-14.6 6.1-18.8 6.1-11.2 0-21.2-8-33.1-26.4-4.3-6.6-7.1-9.9-9-10.2zm174 5c-1.2-.2-2.4.4-3.8 1.7-2.3 2.3-2.7 4-2.6 10.7.5 9 4.8 19.2 11.8 24.6 4.4 3.3 13.2 6 20.4 5.8 6.8-1.1 18.8-6.6 15.3-10.3-2-1.6-5 .7-9.9.7-10.6 0-15.3-3.4-19.6-9-3.8-5-5.4-8.7-7.2-16.8-1.1-4.6-2.6-7.1-4.4-7.4zm-67.5 2.2a1 1 0 0 0-.4 0c-.4.1-.7.4-1.2.9-2.4 2-2.5 5.1-.2 12.6a41.4 41.4 0 0 0 25.3 22c7.6 1.7 14.5.6 20.3-2.7 3.8-2.4 5.3-5 4.4-7.3-4.8-2.9-7.7-1-13.3-1A39.5 39.5 0 0 1 424 435c-4.8-5.9-7-9.3-8-9.4zm-199 .8c-1 .3-1.4 2.7-1 7.2.3 5.3 1.3 8.2 4 12 3 4.5 11.5 11 14.7 11.7 2.5 1 6.9 2.3 10.7 2.3 3.8 0 8-.6 11.2-1.3 3.2-.7 6.8-2 10.3-4l1.3-.7c4-2.1 8-5.1 10.9-7.9l1.4-1.2c6.3-5.4 9.9-10.7 9.9-14.6 0-2.4-5.3-.5-14 5-16 9.8-31.1 13.2-40.9 9l-2.2-1.3-8.8-7.7a32.9 32.9 0 0 1-3.6-4.8c-1.4-2.2-2.5-3.4-3.3-3.7a1 1 0 0 0-.5 0z"
            fill="#71beea"
          />
          <path
            d="M221.6 468.8c-.5 0-.8.1-1.1.4-.3.2-.5.6-.6 1.2a10 10 0 0 0 .6 5.1 55 55 0 0 0 28.3 28.9 42.4 42.4 0 0 0 16.4 2c6.1-.2 12.3-1.4 16.6-3.4a48.3 48.3 0 0 0 13.7-10.6c.9-1 1.3-2 1.3-2.3 0-.6 0-.9-.3-1-.3-.3-.7-.4-1.6-.4-1.8 0-4.9.8-9.7 2.3-6.2 1.9-12.7 3-18.5 3.1-7.8.2-10.2-.4-17-3.7-4.5-2.2-12-7.7-17.7-12.8a232 232 0 0 0-7.2-6.3 63 63 0 0 0-2.4-2 12 12 0 0 0-.7-.4h-.1zm214.8 13.6c-.2 0-.5.7-.7 1.8v4a32 32 0 0 0 2.7 9.9 38.5 38.5 0 0 0 49.1 19.3c5.2-2.3 10-6.4 13-10.5 1.4-2.1 2.5-4.3 3-6.2.5-1.9.4-3.6-.3-4.9-.4-.8-.9-1.4-1.3-1.7-.3-.3-.6-.3-1-.2-.9.2-2.3 1.4-4.3 3.8-5 6.2-12.8 9.5-22.6 9.4-6.2 0-11-1.1-16-4.4-5-3.2-10.4-8.6-18-17.3-.8-1-1.7-2-2.5-2.4l-1-.6c-.1 0-.2 0 0 0zm-33.6 4.2-.6.2-1.4.7a53.5 53.5 0 0 0-4 2.5c-8 5.5-15.6 8.3-23.9 8.4-8.3 0-17.2-2.7-28-8.2a42 42 0 0 0-7.3-3c-2-.5-3.1-.5-3.6-.2-.2.1-.3.3-.4.6 0 .3 0 .8.2 1.5.4 1.3 1.4 3.1 3.1 5.5 4 5.4 10.5 10.1 19.7 14 9.3 3.9 23.8 3.5 32.4-1a42 42 0 0 0 9.1-6.5c2.6-2.6 4.5-6.5 5.3-9.6.5-1.5.6-3 .4-3.8 0-.4-.2-.7-.4-.9-.1-.2-.3-.2-.6-.2zm-132.5 30.8c-.3 0-.4 0-.5.2l-.1.5c0 .5.4 1.7 1.2 3.1a87.3 87.3 0 0 0 13.5 16.2c17 15.6 34.6 20.7 49 14.4a33.3 33.3 0 0 0 19-23c.4-2 .1-3.1-.2-3.5-.2-.2-.5-.3-1-.3l-1.7.5a24 24 0 0 0-5.7 4.6c-7.7 8-14.6 12-23 11.4-8.3-.4-18-5.2-31.7-14.3-5.2-3.4-9.4-6-12.5-7.6a15.5 15.5 0 0 0-6.3-2.2zm109.4 0c-.2 0-.3 0-.5.2-.1 0-.3.3-.4.7a9 9 0 0 0 0 3.3c.4 2.9 1.6 6.7 3.5 10.3 11 20.5 29.4 30.5 46.8 25.7a37.3 37.3 0 0 0 15.6-10c4.4-4.6 7.4-9.9 7.4-13.8 0-1.3-.1-2.3-.4-2.7 0-.3-.2-.4-.3-.4h-.5c-.6 0-1.5.4-2.7 1.2a57 57 0 0 0-4.7 3.7c-9 7.7-16.9 11.2-25.1 10-8.2-1.3-16.7-7.1-27-17.7a159.8 159.8 0 0 0-10.6-9.8 9.8 9.8 0 0 0-.9-.6l-.2-.1zm-140.2 43.5c-1 0-1.6.2-1.8.5-.2.4-.3 1 0 2.1.8 2.2 3.1 5.6 7.1 9.6a78.2 78.2 0 0 0 27.4 17.9c9.7 3.8 16.7 4.1 23.4 1.1 5.5-2.5 8.4-6.1 8.4-10.4a4 4 0 0 0-.4-2c-.3-.4-.6-.6-1-.7-.9-.1-2.5.4-4.6 1.8-2.7 2-6.4 2.3-11.3 1.2-5-1.2-11.3-3.8-19.5-8-8-4-17.5-9-21.3-11-2.9-1.4-5-2-6.4-2.1zm160.1 2.8c-.6-.1-1.7.2-3.1 1-1.4 1-3.2 2.3-5.2 4.1a58 58 0 0 1-12.7 8.7c-5.9 2.7-8.6 3.2-18.3 3.2-12.6 0-17.2-1.6-29.9-11.2a21 21 0 0 0-6.4-3.8c-.5 0-.5 0-.7.2-.2.3-.3 1-.3 2 0 2.2 1.5 5.7 3.8 9.2 2.4 3.4 5.7 7 9.2 9.5 8.1 6 14.3 7.8 26.2 7.4a34 34 0 0 0 18.3-4.1 51 51 0 0 0 13.1-9.8c3.8-3.8 6.5-8 7-10.7.4-2 .4-3.5.2-4.5a2 2 0 0 0-.5-1 1 1 0 0 0-.7-.2zm-2 21.4c-.5 0-.6 0-.8.4-.2.4-.3 1.2-.3 2.4 0 3.2 1.7 7.3 4.4 11 2.7 4 6.3 7.4 10 9.5a35 35 0 0 0 21.3 4.8c11-.9 17.8-3.4 23.8-12.6 1.5-2.5 2-4.8 1.4-6.7-.2-.7-.4-1.1-.8-1.4-.3-.2-.6-.3-1.2-.3-1 0-2.6.7-4.7 2.1-6 4.3-12 6.1-19.9 6.2-8.8 0-16.3-3-26.2-11-3.6-2.8-6-4.3-7-4.4zM290 605.5c-.6.3-.9.5-1 1a9 9 0 0 0 .1 3.3c1.8 11 13 25 24.4 30.2 8.5 4 20 4 28.5 0 7.7-3.5 16-11.1 19-17.3a25 25 0 0 0 2.2-6.3c.1-.7.1-1.3 0-1.6 0-.4-.2-.6-.4-.7-.3-.2-1.3-.2-2.8.5-1.6.7-3.6 2-6 4-10 8.2-18.6 12.1-27 11.4-8.6-.7-16.9-6-26.4-15.9a82.6 82.6 0 0 0-7.6-7.1 10 10 0 0 0-2-1.4c-.5-.2-.8-.2-1-.1z"
            fill="#309fdf"
          />
          <path
            d="M290 125.7a61.4 61.4 0 0 0-19 2.3c-19.9 5.7-33.5 15.8-36.5 52.2-3 36.6-18 45.5-20.3 46.7 14.7 26.7 38 24.5 30.1 59-2.4 11-17.6 23.5-32.8 46.5 34-27 56.4-48 99.6-100.5 0 0 39-47.6 25.1-77a52 52 0 0 0-46.1-29.2z"
            fill="#e9f2f1"
          />
          <path
            d="M288.5 120.8c-8.1 0-16.7 1.4-25.6 5.3-22.5 9.9-25 20.3-29.1 37a96.8 96.8 0 0 0-1.4 24.6 178 178 0 0 0-16.5-31.6s-19 19.8-36.5 18.6c-22.9-1.7-34 2-44.8 9.8-25.4 18.5-21.2 43.8-21.2 43.8s17.6-1.8 40.5 1c20.3 2.7 37.4 4.3 61.3 2.6 8.5-.6 15.8-10 19.3-19 4.5-4 2.9-22 4.8-24.5 3-3.4 8-4.7 10.6-5.2 3.7-.7 4.3 1.5 4.7 2.8a31 31 0 0 0 60.5-3.2c1-4.4 9-5 15.9-4.5 7 0 .9 15.9-1.7 22.3-5.4 13.2-24.9 39-24.9 39l124.3-85s-45.8 22-61.5 20c-19.7-2.3-25.7-34.8-43.2-44-9.9-5.1-22-9.6-35.5-9.8zm1.4 9.4a48.2 48.2 0 0 1 40.6 23.5c3.7 7.1 6.2 17-.3 20.2-7.6 3.7-14.7.7-15.5-2.8a31 31 0 0 0-30.2-24.1 30 30 0 0 0-30.8 27.4c-.4 5.2-9.1 7.7-12.7 3.7-2.7-3 1.7-16.8 3.7-22 6.2-16.2 27.8-25.7 45.2-26zm5.6 27.8a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm-22 29a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm40 523.4c-2.6-1.8-15.1 23.5-20 59-6.8 49-8.3 63.2-14.2 96-6 32.7-12.6 66.3-13.4 73.7-.6 4.8-1.7 19-.6 20.1 3.2 3.3 14.7-31.7 16.8-42 2-10.3 7.7-40.7 14.2-86.9 6.4-46.1 8.5-69.6 13.1-91.5 4.7-22 6.7-26.6 4.2-28.4zm66.3-27c-4.1-1.3-10.5 24.6-13.1 37.8-5.6 28.6-6.2 64-8.4 87a1099 1099 0 0 1-12 87.4c-2.7 15-8 29.4-9.8 44.6-1 9-5.2 26-.2 27.3 5.2 1.5 15.4-36.5 20-55.7 8.1-32.9 10.7-65.6 14.2-99.3 3.3-30.7 4.6-62.8 6.5-93.6.7-18.5 5.1-34.5 2.8-35.6z"
            fill="#0e254f"
          />
        </g>
      </defs>
      <rect width="1024" height="1024" rx="270" fill="#a7bcd9" />
      <use href={`#${groupId}`} transform="matrix(-1 0 0 1 1024 0)" />
      <use href={`#${groupId}`} />
    </svg>
  );
};

export const GitLabIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 32 32" fill="none">
    <path
      d="m31.46 12.78-.04-.12-4.35-11.35A1.14 1.14 0 0 0 25.94.6c-.24 0-.47.1-.66.24-.19.15-.33.36-.39.6l-2.94 9h-11.9l-2.94-9A1.14 1.14 0 0 0 6.07.58a1.15 1.15 0 0 0-1.14.72L.58 12.68l-.05.11a8.1 8.1 0 0 0 2.68 9.34l.02.01.04.03 6.63 4.97 3.28 2.48 2 1.52a1.35 1.35 0 0 0 1.62 0l2-1.52 3.28-2.48 6.67-5h.02a8.09 8.09 0 0 0 2.7-9.36Z"
      fill="#E24329"
    />
    <path
      d="m31.46 12.78-.04-.12a14.75 14.75 0 0 0-5.86 2.64l-9.55 7.24 6.09 4.6 6.67-5h.02a8.09 8.09 0 0 0 2.67-9.36Z"
      fill="#FC6D26"
    />
    <path
      d="m9.9 27.14 3.28 2.48 2 1.52a1.35 1.35 0 0 0 1.62 0l2-1.52 3.28-2.48-6.1-4.6-6.07 4.6Z"
      fill="#FCA326"
    />
    <path
      d="M6.44 15.3a14.71 14.71 0 0 0-5.86-2.63l-.05.12a8.1 8.1 0 0 0 2.68 9.34l.02.01.04.03 6.63 4.97 6.1-4.6-9.56-7.24Z"
      fill="#FC6D26"
    />
  </svg>
);

export const AzureDevOpsIcon: Icon = (props) => {
  const id = useId().replaceAll(":", "");
  const gradientA = `${id}-azure-a`;
  const gradientB = `${id}-azure-b`;
  const gradientC = `${id}-azure-c`;

  return (
    <svg {...props} viewBox="0 0 96 96">
      <defs>
        <linearGradient
          id={gradientA}
          x1="-1032.17"
          x2="-1059.21"
          y1="145.31"
          y2="65.43"
          gradientTransform="matrix(1 0 0 -1 1075 158)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#114a8b" />
          <stop offset="1" stopColor="#0669bc" />
        </linearGradient>
        <linearGradient
          id={gradientB}
          x1="-1023.73"
          x2="-1029.98"
          y1="108.08"
          y2="105.97"
          gradientTransform="matrix(1 0 0 -1 1075 158)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopOpacity=".3" />
          <stop offset=".07" stopOpacity=".2" />
          <stop offset=".32" stopOpacity=".1" />
          <stop offset=".62" stopOpacity=".05" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientC}
          x1="-1027.16"
          x2="-997.48"
          y1="147.64"
          y2="68.56"
          gradientTransform="matrix(1 0 0 -1 1075 158)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3ccbf4" />
          <stop offset="1" stopColor="#2892df" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientA})`}
        d="M33.34 6.54h26.04l-27.03 80.1a4.15 4.15 0 0 1-3.94 2.81H8.15a4.14 4.14 0 0 1-3.93-5.47L29.4 9.38a4.15 4.15 0 0 1 3.94-2.83z"
      />
      <path
        fill="#0078d4"
        d="M71.17 60.26H29.88a1.91 1.91 0 0 0-1.3 3.31l26.53 24.76a4.17 4.17 0 0 0 2.85 1.13h23.38z"
      />
      <path
        fill={`url(#${gradientB})`}
        d="M33.34 6.54a4.12 4.12 0 0 0-3.95 2.88L4.25 83.92a4.14 4.14 0 0 0 3.91 5.54h20.79a4.44 4.44 0 0 0 3.4-2.9l5.02-14.78 17.91 16.7a4.24 4.24 0 0 0 2.67.97h23.29L71.02 60.26H41.24L59.47 6.55z"
      />
      <path
        fill={`url(#${gradientC})`}
        d="M66.6 9.36a4.14 4.14 0 0 0-3.93-2.82H33.65a4.15 4.15 0 0 1 3.93 2.82l25.18 74.62a4.15 4.15 0 0 1-3.93 5.48h29.02a4.15 4.15 0 0 0 3.93-5.48z"
      />
    </svg>
  );
};

export const BitbucketIcon: Icon = (props) => {
  const id = useId().replaceAll(":", "");
  const gradientId = `${id}-bitbucket-a`;

  return (
    <svg {...props} viewBox="8.4 14.39 2481.29 2231.21">
      <path fill="none" d="M989.97,1493.09h518.05l125.04-730.04H852.22L989.97,1493.09z" />
      <path
        fill="#2684FF"
        d="M88.92,14.4C45.02,13.83,8.97,48.96,8.41,92.86c-0.06,4.61,0.28,9.22,1.02,13.77l337.48,2048.72 c8.68,51.75,53.26,89.8,105.74,90.24h1619.03c39.38,0.5,73.19-27.9,79.49-66.78l337.49-2071.78c7.03-43.34-22.41-84.17-65.75-91.2 c-4.55-0.74-9.15-1.08-13.76-1.02L88.92,14.4z M1509.99,1495.09H993.24l-139.92-731h781.89L1509.99,1495.09z"
      />
      <linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1="945.1094"
        y1="1524.8389"
        x2="944.4923"
        y2="1524.1893"
        gradientTransform="matrix(1996.6343 0 0 -1480.3047 -1884485.625 2258195)"
      >
        <stop offset="0.18" stopColor="#0052CC" />
        <stop offset="1" stopColor="#2684FF" />
      </linearGradient>
      <path
        fill={`url(#${gradientId})`}
        d="M2379.27,763.06h-745.5l-125.12,730.42H992.31l-609.67,723.67c19.32,16.71,43.96,26,69.5,26.21h1618.13 c39.35,0.51,73.14-27.88,79.44-66.72L2379.27,763.06z"
      />
    </svg>
  );
};

export const CursorIcon: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 466.73 532.09"
    className={cn("fill-[#26251E] dark:fill-[#EDECEC]", className)}
  >
    <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
  </svg>
);

export const GrokIcon: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("fill-[#0F0F0F] dark:fill-[#F5F5F5]", className)}
  >
    <path d="M9.26905 15.284L17.2479 9.36086C17.6391 9.07047 18.1981 9.18374 18.3845 9.63478C19.3655 12.0135 18.9272 14.8721 16.9755 16.8349C15.0238 18.7976 12.3082 19.228 9.8261 18.2477L7.1146 19.5102C11.0037 22.1834 15.7263 21.5223 18.6774 18.5525C21.0182 16.1985 21.7432 12.9897 21.0653 10.0961L21.0714 10.1023C20.0884 5.85143 21.3131 4.15233 23.8218 0.677913C23.8812 0.595532 23.9406 0.513151 24 0.428711L20.6987 3.74866V3.73836L9.267 15.2861" />
    <path d="M7.62249 16.7237C4.83113 14.0422 5.3124 9.89222 7.69417 7.49905C9.45541 5.72786 12.341 5.00497 14.86 6.06768L17.5653 4.81138C17.0779 4.45714 16.4533 4.07613 15.7365 3.80839C12.4966 2.46764 8.6178 3.13492 5.98413 5.78141C3.45081 8.32904 2.65415 12.2463 4.02219 15.5889C5.04412 18.0871 3.36889 19.8541 1.68137 21.6377C1.08337 22.2699 0.483318 22.9022 0 23.5716L7.62045 16.7257" />
  </svg>
);

export const TraeIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    {/* Back rectangle: left strip + bottom strip drawn separately — empty bottom-left corner is the gap between them */}
    <rect x="1" y="4" width="3" height="14" />
    <rect x="4" y="18" width="18" height="3" />
    {/* Front frame: top bar + right bar only — left and bottom are replaced by the back strips above */}
    <rect x="4" y="4" width="18" height="3" />
    <rect x="19" y="7" width="3" height="11" />
    {/* Two diamonds, offset slightly to the right within the open area */}
    <path d="M11 10L13 12L11 14L9 12Z" />
    <path d="M16 10L18 12L16 14L14 12Z" />
  </svg>
);

export const KiroIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 1200 1200" fill="none">
    <rect width="1200" height="1200" rx="260" fill="#9046FF" />
    <path
      d="M398.554 818.914C316.315 1001.03 491.477 1046.74 620.672 940.156C658.687 1059.66 801.052 970.473 852.234 877.795C964.787 673.567 919.318 465.357 907.64 422.374C827.637 129.443 427.623 128.946 358.8 423.865C342.651 475.544 342.402 534.18 333.458 595.051C328.986 625.86 325.507 645.488 313.83 677.785C306.873 696.424 297.68 712.819 282.773 740.645C259.915 783.881 269.604 867.113 387.87 823.883L399.051 818.914H398.554Z"
      fill="#fff"
    />
    <path
      d="M636.123 549.353C603.328 549.353 598.359 510.097 598.359 486.742C598.359 465.623 602.086 448.977 609.293 438.293C615.504 428.852 624.697 424.131 636.123 424.131C647.555 424.131 657.492 428.852 664.447 438.541C672.398 449.474 676.623 466.12 676.623 486.742C676.623 525.998 661.471 549.353 636.375 549.353H636.123Z"
      fill="#000"
    />
    <path
      d="M771.24 549.353C738.445 549.353 733.477 510.097 733.477 486.742C733.477 465.623 737.203 448.977 744.41 438.293C750.621 428.852 759.814 424.131 771.24 424.131C782.672 424.131 792.609 428.852 799.564 438.541C807.516 449.474 811.74 466.12 811.74 486.742C811.74 525.998 796.588 549.353 771.492 549.353H771.24Z"
      fill="#000"
    />
  </svg>
);

export const VisualStudioCode: Icon = (props) => {
  const id = useId();
  const maskId = `${id}-vscode-a`;
  const topShadowFilterId = `${id}-vscode-b`;
  const sideShadowFilterId = `${id}-vscode-c`;
  const overlayGradientId = `${id}-vscode-d`;

  return (
    <svg {...props} fill="none" viewBox="0 0 100 100">
      <mask id={maskId} width="100" height="100" x="0" y="0" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M70.912 99.317a6.223 6.223 0 0 0 4.96-.19l20.589-9.907A6.25 6.25 0 0 0 100 83.587V16.413a6.25 6.25 0 0 0-3.54-5.632L75.874.874a6.226 6.226 0 0 0-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 0 0-5.318.236l-5.506 5.009a4.168 4.168 0 0 0-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 0 0 .004 6.162l5.506 5.01a4.162 4.162 0 0 0 5.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 0 0 2.143 1.4ZM75.015 27.3 45.11 50l29.906 22.701V27.3Z"
          clipRule="evenodd"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          fill="#0065A9"
          d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"
        />
        <g filter={`url(#${topShadowFilterId})`}>
          <path
            fill="#007ACC"
            d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"
          />
        </g>
        <g filter={`url(#${sideShadowFilterId})`}>
          <path
            fill="#1F9CF0"
            d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"
          />
        </g>
        <path
          fill={`url(#${overlayGradientId})`}
          fillRule="evenodd"
          d="M70.851 99.317a6.224 6.224 0 0 0 4.96-.19L96.4 89.22a6.25 6.25 0 0 0 3.54-5.633V16.413a6.25 6.25 0 0 0-3.54-5.632L75.812.874a6.226 6.226 0 0 0-7.104 1.21L29.294 38.04 12.126 25.01a4.162 4.162 0 0 0-5.317.236l-5.507 5.009a4.168 4.168 0 0 0-.004 6.162L16.186 50 1.298 63.583a4.168 4.168 0 0 0 .004 6.162l5.507 5.009a4.162 4.162 0 0 0 5.317.236L29.294 61.96l39.414 35.958a6.218 6.218 0 0 0 2.143 1.4ZM74.954 27.3 45.048 50l29.906 22.701V27.3Z"
          clipRule="evenodd"
          opacity=".25"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <filter
          id={topShadowFilterId}
          width="116.727"
          height="92.246"
          x="-8.394"
          y="15.829"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id={sideShadowFilterId}
          width="47.917"
          height="116.151"
          x="60.417"
          y="-8.076"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id={overlayGradientId}
          x1="49.939"
          x2="49.939"
          y1=".258"
          y2="99.742"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const VisualStudioCodeInsiders: Icon = (props) => {
  const id = useId();
  const maskId = `${id}-vscode-insiders-a`;
  const topShadowFilterId = `${id}-vscode-insiders-b`;
  const sideShadowFilterId = `${id}-vscode-insiders-c`;
  const overlayGradientId = `${id}-vscode-insiders-d`;

  return (
    <svg {...props} fill="none" viewBox="0 0 100 100">
      <mask id={maskId} width="100" height="100" x="0" y="0" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M70.912 99.317a6.223 6.223 0 0 0 4.96-.19l20.589-9.907A6.25 6.25 0 0 0 100 83.587V16.413a6.25 6.25 0 0 0-3.54-5.632L75.874.874a6.226 6.226 0 0 0-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 0 0-5.318.236l-5.506 5.009a4.168 4.168 0 0 0-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 0 0 .004 6.162l5.506 5.01a4.162 4.162 0 0 0 5.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 0 0 2.143 1.4ZM75.015 27.3 45.11 50l29.906 22.701V27.3Z"
          clipRule="evenodd"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          fill="#009a7c"
          d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"
        />
        <g filter={`url(#${topShadowFilterId})`}>
          <path
            fill="#00b294"
            d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"
          />
        </g>
        <g filter={`url(#${sideShadowFilterId})`}>
          <path
            fill="#24bfa5"
            d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"
          />
        </g>
        <path
          fill={`url(#${overlayGradientId})`}
          fillRule="evenodd"
          d="M70.851 99.317a6.224 6.224 0 0 0 4.96-.19L96.4 89.22a6.25 6.25 0 0 0 3.54-5.633V16.413a6.25 6.25 0 0 0-3.54-5.632L75.812.874a6.226 6.226 0 0 0-7.104 1.21L29.294 38.04 12.126 25.01a4.162 4.162 0 0 0-5.317.236l-5.507 5.009a4.168 4.168 0 0 0-.004 6.162L16.186 50 1.298 63.583a4.168 4.168 0 0 0 .004 6.162l5.507 5.009a4.162 4.162 0 0 0 5.317.236L29.294 61.96l39.414 35.958a6.218 6.218 0 0 0 2.143 1.4ZM74.954 27.3 45.048 50l29.906 22.701V27.3Z"
          clipRule="evenodd"
          opacity=".25"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <filter
          id={topShadowFilterId}
          width="116.727"
          height="92.246"
          x="-8.394"
          y="15.829"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id={sideShadowFilterId}
          width="47.917"
          height="116.151"
          x="60.417"
          y="-8.076"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id={overlayGradientId}
          x1="49.939"
          x2="49.939"
          y1=".258"
          y2="99.742"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const VSCodium: Icon = (props) => {
  const id = useId();
  const gradientId = `${id}-vscodium-gradient`;

  return (
    <svg {...props} viewBox="0 0 100 100">
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          x2="100"
          y1="0"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#62A0EA" />
          <stop offset="1" stopColor="#1A5FB4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M48.26 2.274C45.406 4.105 44.583 7.898 46.422 10.742C56.531 26.397 58.917 38.205 57.882 48.553C53.698 68.369 44.603 72.389 36.655 72.389C28.895 72.389 30.973 59.618 36.806 55.88C40.288 53.706 44.748 52.293 48.171 52.293C51.563 52.293 54.313 49.552 54.313 46.17C54.313 42.787 51.563 40.046 48.171 40.046C44.173 40.046 40.251 40.886 36.59 42.316C37.338 38.787 37.614 34.973 36.647 30.919C35.179 24.763 30.953 18.883 23.615 13.183C22.33 12.183 20.7 11.734 19.083 11.934C17.466 12.134 15.995 12.966 14.994 14.248C12.912 16.918 13.394 20.766 16.072 22.843C22.05 27.486 24.024 30.923 24.699 33.752C25.374 36.581 24.831 39.616 23.475 43.786C21.742 49.406 19.73 54.423 18.848 59.234C18.414 61.602 18.377 64.179 18.265 66.238C13.96 62.042 12.275 56.502 12.275 48.407C12.274 45.025 9.524 42.283 6.133 42.284C2.744 42.287-0.002 45.027-0.003 48.407C-0.003 59.463 3.23 69.983 11.895 77.001C19.739 84.474 39.686 81.712 39.686 93.709C39.686 97.095 44.642 98.743 48.033 98.743C51.511 98.743 55.888 96.418 55.888 93.709C55.888 80.097 70.233 71.824 93.848 71.86C97.24 71.865 99.992 69.126 99.997 65.744C100.003 62.361 97.259 59.614 93.867 59.608C92.252 59.606 90.678 59.661 89.126 59.753C91.766 53.544 92.937 46.708 92.695 39.324C92.583 35.943 89.745 33.293 86.356 33.403C82.963 33.513 80.305 36.346 80.416 39.729C80.736 49.397 80.374 58.03 73.171 62.581C71.123 63.874 68.742 64.996 66.484 64.996C68.237 60.228 69.561 55.195 70.103 49.77C70.449 46.308 70.486 42.195 70.091 39C69.478 34.05 68.738 28.436 70.617 24.207C72.305 20.565 76.087 19.04 81.64 19.04C85.029 19.037 87.775 16.296 87.776 12.917C87.778 9.534 85.031 6.79 81.64 6.787C73.388 6.787 67.133 11.13 63.587 16.377C61.733 12.417 59.475 8.336 56.747 4.112C55.866 2.747 54.478 1.788 52.887 1.443C52.099 1.272 51.285 1.257 50.491 1.399C49.697 1.542 48.939 1.839 48.26 2.274z"
      />
    </svg>
  );
};

export const Zed: Icon = (props) => {
  const id = useId();
  const clipPathId = `${id}-zed-logo-a`;

  return (
    <svg {...props} fill="none" viewBox="0 0 96 96">
      <g clipPath={`url(#${clipPathId})`}>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9 6a3 3 0 0 0-3 3v66H0V9a9 9 0 0 1 9-9h80.379c4.009 0 6.016 4.847 3.182 7.682L43.055 57.187H57V51h6v7.688a4.5 4.5 0 0 1-4.5 4.5H37.055L26.743 73.5H73.5V36h6v37.5a6 6 0 0 1-6 6H20.743L10.243 90H87a3 3 0 0 0 3-3V21h6v66a9 9 0 0 1-9 9H6.621c-4.009 0-6.016-4.847-3.182-7.682L52.757 39H39v6h-6v-7.5a4.5 4.5 0 0 1 4.5-4.5h21.257l10.5-10.5H22.5V60h-6V22.5a6 6 0 0 1 6-6h52.757L85.757 6H9Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <path fill="#fff" d="M0 0h96v96H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OpenAI: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 260"
    className={cn("fill-black dark:fill-white", className)}
  >
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
  </svg>
);

export const ClaudeAI: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 257"
    className={cn("fill-[#d97757]", className)}
  >
    <path d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" />
  </svg>
);

export const Gemini: Icon = (props) => (
  <svg {...props} viewBox="0 0 296 298" fill="none">
    <mask
      id="gemini__a"
      width="296"
      height="298"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "alpha" }}
    >
      <path
        fill="#3186FF"
        d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"
      />
    </mask>
    <g mask="url(#gemini__a)">
      <g filter="url(#gemini__b)">
        <ellipse cx="163" cy="149" fill="#3689FF" rx="196" ry="159" />
      </g>
      <g filter="url(#gemini__c)">
        <ellipse cx="33.5" cy="142.5" fill="#F6C013" rx="68.5" ry="72.5" />
      </g>
      <g filter="url(#gemini__d)">
        <ellipse cx="19.5" cy="148.5" fill="#F6C013" rx="68.5" ry="72.5" />
      </g>
      <g filter="url(#gemini__e)">
        <path fill="#FA4340" d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z" />
      </g>
      <g filter="url(#gemini__f)">
        <path fill="#FA4340" d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z" />
      </g>
      <g filter="url(#gemini__g)">
        <path fill="#14BB69" d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z" />
      </g>
      <g filter="url(#gemini__h)">
        <path fill="#14BB69" d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z" />
      </g>
    </g>
    <defs>
      <filter
        id="gemini__b"
        width="464"
        height="390"
        x="-69"
        y="-46"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="18" />
      </filter>
      <filter
        id="gemini__c"
        width="265"
        height="273"
        x="-99"
        y="6"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
      <filter
        id="gemini__d"
        width="265"
        height="273"
        x="-113"
        y="12"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
      <filter
        id="gemini__e"
        width="299.5"
        height="329"
        x="-41.5"
        y="-130"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
      <filter
        id="gemini__f"
        width="299.5"
        height="329"
        x="-45"
        y="-153"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
      <filter
        id="gemini__g"
        width="299.5"
        height="329"
        x="-41"
        y="91"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
      <filter
        id="gemini__h"
        width="299.5"
        height="329"
        x="-39"
        y="132"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32" />
      </filter>
    </defs>
  </svg>
);

const ANTIGRAVITY_ICON_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAANgAAAABAAAA2AAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAABAKADAAQAAAABAAABAAAAAADqZiaaAAAACXBIWXMAACE4AAAhOAFFljFgAABAAElEQVR4Ae29C6BuVVnvPed833etfUEQPZCYtwhBBU1FRDAVCFTMe+GnlXb7wi4nO5YCG28b/UQRsrI8iafyO56yDlSW+pn6WWp5gWSDaJam3ZSjJ1DQgL3XWu9lnv/v/4wx33dtNgibvfe6jbHWnGOMZzzjMp85/s94xphjzreqiisSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEthwEqg33BWXC7YE2u2n9Ksjbo77/+EjJ/Xll4+LaDaeBIoCWMf3vL3s2Lkbb1j4rv6wflg9ro5tRr0HVuPqPtWkPqQdVfdo2qZfjeu2HdUL9ai+RfEbRf9aO26+NKjrzw8m/S/Vb/3bb65jEW34SysKYJ11gRt+95h7DKrxSQL6aU1bP3EyrI5rxtVB81VTD6qmmoxqHwJ9JR4dddXoqPEn8idNtbQk8rgaVaP6hrqtr27H1cfGVf99B93vii/W26vJOhPZhr6cogDWye2/4Y+OPLo/qn60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3u6zXJICSI/+rAjyiD6b3oWzRk4Wgj8HUw313sBrHnz1n77gc9vqm1Ze3KUFa0EC176y/lsB4ynaMPSBZk4tpitmsEdwehnQcxrTzzQOxYtqArzSYlqgANAXQVOBB2g28IPTQlYutOIKYK6aO7PX33xvf9DTYJeYus1TSZoWXQJ2pxBERLhWCggQXh2ieV9/O/napJ284Jrzeq+9/PLnlZ/vQkTF3WkJfHpb/c83N9Xz9Crxm9XFJvkJgQuYdku6m4/bFhxrAqlLJp5QCHriIEUwecpt8xx4yoorAP3C62l1fk8zg1hyAO4B6RxCODOSJ5w0bvCR3OiHHP1Sz1/Vw9Hpn93W/xNyFVcksDcS+KJeJdZbob8ikPykBu4b+LDIrAP8d+SmvTX6svnVZz0NqJsHHfUWfcl6hd2KKoDjz75KIq3vK23YgVkB/3me343ukpLDGerys+oNqXpzj6iLk+HoTYsL9bPKvv4V7lnrqPqrzqvfKQVwitYF/BuEjDu7O3dDndwtU580jwnLuSFp2ju4343LRrTlTAcotqIKYMd93zcWsG/VXqkkudCUVgKd4AD7HiRuAYmeR/3J5B/qdvzsz5w/OPfza/xb7Qfo3pdq7oIErjm//vvFheo57bB6jbLd2v0C0e5l0G9zd8XPhwKxLiCau3v9Zb0uvOI/L7eiCqDavl1PTZqPhsCymZSlh2QVRqBTKRJRDB6Z+9rYo+BQv9d36XC869Srtw0+YIZyKhLYDxJgYNFTgteqTz5dXxj6ZNVX9+Ndgt3cbA/2OKYTi4E41hK0uDiU986grOx5tq0r0pJHXXjzYW0z/8FmbvCoyVAPSi2pDPwM9tw00bW6j9AnI+mOtv7rST1+w7XnDT6YOYpfJHAgJHDSm9vNCwvVz2mD34s1CB3tZSyWmmfA7nFKJEAG/q0stFVAf9v1WvLrRFpxt+IKAAk8+g0LR02a3sV6TPr0etDvW4jeEKREtTA/XdHnuiTJ+quifagdTn6/d3j/EzteXEtrFFcksDISeOT29p76dYAz9bLvWZqpnqy+eVgj49Rgz+hSt5XFwActdmh8u+SabfWqWZzOTVwZ6S2rVe8CvHHh8U3df5rmSg8V0vkJ5r605S5pgOu0RfPL2m115a7Jzr/9wvkHf3NZ1hIpElgFEmBzjxYKj5UCOFYD/XdrE9pAimFBo/91vba6cuew+ntNI/j9+lXjVpECWC6TU7a3/ZuPqOojP1xNLr+8Ls/xl4unxIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBIoEigSKBPZOAv8HjhBixXjGGpoAAAAASUVORK5CYII=";

export const AntigravityIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 128 128" fill="none">
    <image href={ANTIGRAVITY_ICON_DATA_URL} width="128" height="128" />
  </svg>
);

export const OpenCodeIcon: Icon = (props) => (
  <svg {...props} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#opencode__clip0_1311_94969)">
      <path className="dark:hidden" d="M24 32H8V16H24V32Z" fill="#CFCECD" />
      <path className="dark:hidden" d="M24 8H8V32H24V8ZM32 40H0V0H32V40Z" fill="#211E1E" />
      <path className="hidden dark:block" d="M24 32H8V16H24V32Z" fill="#4B4646" />
      <path className="hidden dark:block" d="M24 8H8V32H24V8ZM32 40H0V0H32V40Z" fill="#F1ECEC" />
    </g>
    <defs>
      <clipPath id="opencode__clip0_1311_94969">
        <rect width="32" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const GithubCopilotIcon: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 208"
    className={cn("fill-black dark:fill-white", className)}
  >
    <path d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z" />
  </svg>
);

export const ACPRegistryIcon: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 576 220"
    fill="none"
    className={cn("fill-black dark:fill-white", className)}
  >
    <path d="M568.003 115.821L517.278 27.9661C507.183 10.4816 489.084 0.0227367 468.894 0.0227367C448.727 0.0227367 430.674 10.4361 420.556 27.8752L343.251 161.749H242.755C236.23 161.749 230.386 158.384 227.135 152.745C223.861 147.106 223.861 140.376 227.135 134.715L277.861 46.8603C281.112 41.2216 286.955 37.8338 293.481 37.8338C300.006 37.8338 305.827 41.1988 309.101 46.8603L312.125 52.0897C313.353 54.2042 315.604 55.5002 318.036 55.5002C320.469 55.5002 322.743 54.1815 323.948 52.067L337.385 28.5118C338.795 26.0335 338.522 22.9413 336.703 20.7586C325.699 7.57131 309.874 0 293.322 0C292.662 0 292.003 0 291.321 0.0454733C272.04 0.75031 254.76 11.1864 245.074 27.9434L200.215 105.657L155.81 29.1484C145.465 11.2092 126.594 0.0227367 106.608 0.0227367C105.949 0.0227367 105.289 0.0227367 104.607 0.06821C85.3265 0.773047 68.0467 11.2092 58.3608 27.9661L7.65806 115.821C-6.25678 139.899 -0.868187 168.82 21.05 187.759C29.8945 195.422 41.6039 199.628 54.0181 199.628H148.648C151.081 199.628 153.332 198.332 154.56 196.217L168.52 172.026C169.748 169.911 169.748 167.319 168.52 165.205C167.292 163.09 165.041 161.794 162.608 161.794H56.0417C49.5163 161.794 43.6729 158.429 40.4216 152.79C37.1475 147.152 37.1475 140.422 40.4216 134.76L91.1471 46.9057C94.3985 41.2671 100.242 37.8793 106.767 37.8793C113.293 37.8793 119.113 41.2443 122.387 46.9057L194.826 172.526C195.031 172.89 195.258 173.208 195.531 173.526C198.76 178.665 202.83 183.485 207.786 187.782C216.631 195.444 228.34 199.651 240.754 199.651H321.424L315.581 209.769C314.353 211.883 314.353 214.475 315.581 216.59C316.809 218.704 319.059 220 321.492 220H349.436C351.868 220 354.119 218.704 355.347 216.59L364.396 200.901L367.17 196.468C367.17 196.468 367.261 196.331 367.284 196.263L453.274 46.9285C456.525 41.2898 462.369 37.902 468.894 37.902C475.42 37.902 481.263 41.2671 484.514 46.9285L535.24 134.783C538.491 140.422 538.514 147.174 535.24 152.813C531.988 158.452 526.145 161.84 519.62 161.84H418.669C416.236 161.84 413.985 163.136 412.757 165.25L398.774 189.442C397.546 191.556 397.546 194.148 398.774 196.263C400.002 198.377 402.253 199.673 404.686 199.673H518.21C539.81 199.673 559.295 188.237 569.026 169.843C578.053 152.79 577.666 132.623 567.981 115.843L568.003 115.821Z" />
  </svg>
);

export const PiAgentIcon: Icon = ({ className, ...props }) => (
  <svg {...props} viewBox="0 0 800 800" className={cn("fill-none", className)}>
    <rect width="800" height="800" rx="160" fill="#000" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"
    />
    <path fill="#fff" d="M517.36 400H634.72V634.72H517.36Z" />
  </svg>
);
