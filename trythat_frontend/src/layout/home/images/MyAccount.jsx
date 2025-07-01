export default function MyAccountIcon({ strokeColor }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 22 22">
      <g id="Group_23280" data-name="Group 23280" transform="translate(-47.87 -437.869)">
        <g id="Icon_feather-user" data-name="Icon feather-user" transform="translate(54.041 442.713)">
          <path
            id="Path_96"
            data-name="Path 96"
            d="M15.656,26.121V24.914A2.414,2.414,0,0,0,13.242,22.5H8.414A2.414,2.414,0,0,0,6,24.914v1.207"
            transform="translate(-6 -13.289)"
            fill="none"
            stroke={strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            id="Path_97"
            data-name="Path 97"
            d="M18.411,7.706A3.206,3.206,0,1,1,15.206,4.5a3.206,3.206,0,0,1,3.206,3.206Z"
            transform="translate(-10.377 -4.5)"
            fill="none"
            stroke={strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </g>
        <g
          id="Ellipse_2"
          data-name="Ellipse 2"
          transform="translate(47.87 437.869)"
          fill="none"
          stroke={strokeColor}
          stroke-width="1.5"
        >
          <circle cx="11" cy="11" r="11" stroke={strokeColor} />
          <circle cx="11" cy="11" r="10.25" fill="none" />
        </g>
      </g>
    </svg>
  );
}
