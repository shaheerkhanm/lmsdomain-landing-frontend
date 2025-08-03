type IconProps = React.HTMLAttributes<SVGElement>;


export const Icons = {
    button_arrrow: (props: IconProps) => (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="0.371094" y="0.169922" width="29.13" height="29.1297" rx="5" fill="white" />
            <path d="M12.6621 9.69042C12.9407 9.41179 13.3924 9.41179 13.671 9.69042L18.211 14.2305C18.4897 14.5091 18.4897 14.9607 18.211 15.2393L13.671 19.7794C13.3924 20.058 12.9407 20.058 12.6621 19.7794C12.3835 19.5007 12.3835 19.0491 12.6621 18.7705L16.6977 14.7349L12.6621 10.6993C12.3835 10.4207 12.3835 9.96905 12.6621 9.69042Z" fill="#101725" stroke="#101725" />
        </svg>
    ),
    tick_button: (props: IconProps) => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="0.943359" y="0.886963" width="11.6079" height="11.6078" rx="3.24768" fill="#6C4BFF" />
            <path d="M4.42773 7.19382L6.03746 8.68347L9.33883 4.61719" stroke="white" strokeWidth="0.974305" strokeLinecap="round" />
        </svg>
    ),
    globe_icon: (props: IconProps) => (
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M10.7736 19.0471C5.72095 19.0471 1.625 14.9511 1.625 9.89856C1.625 7.34379 2.67219 5.0336 4.36076 3.37382M10.7736 19.0471C9.89255 18.3943 10.0332 17.6341 10.4751 16.8741C11.1547 15.7055 11.1547 15.7055 11.1547 14.1475C11.1547 12.5895 12.0805 11.859 15.3478 12.5124C16.8159 12.8061 17.8857 10.7776 19.7916 11.4474M10.7736 19.0471C15.2982 19.0471 19.0557 15.7624 19.7916 11.4474M4.36076 3.37382C5.13773 3.45582 5.57276 3.87207 6.2953 4.63554C7.66707 6.085 9.03881 6.20594 9.95339 5.72279C11.3251 4.99807 10.1724 3.82419 11.7824 3.18624C12.7694 2.79517 12.9575 1.77097 12.4904 0.910823M4.36076 3.37382C6.01169 1.75104 8.27572 0.75 10.7736 0.75C11.3603 0.75 11.9342 0.805248 12.4904 0.910823M19.7916 11.4474C19.8774 10.944 19.9221 10.4265 19.9221 9.89856C19.9221 5.43275 16.7223 1.7143 12.4904 0.910823" stroke="white" strokeWidth="1.37228" strokeLinejoin="round" />
        </svg>
    ),
    globarrrow_icon: (props: IconProps) => (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g filter="url(#filter0_d_373_3309)">
                <path d="M31.0733 2.71588L4.18679 11.6865L18.4333 14.8511L22.1027 29.6024L31.0733 2.71588Z" fill="#6C4BFF" />
                <path d="M6.05007 11.5896L18.5411 14.3648L18.8422 14.4311L18.9168 14.7308L22.1734 27.8192L30.2857 3.50412L6.05007 11.5896Z" stroke="white" stroke-width="0.996253" />
            </g>
            <defs>
                <filter id="filter0_d_373_3309" x="0.202488" y="0.723315" width="34.8567" height="34.8567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1.99251" />
                    <feGaussianBlur stdDeviation="1.99251" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_373_3309" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_373_3309" result="shape" />
                </filter>
            </defs>
        </svg>

    ),

}