export default function SavedIcon({ fillColor, strokeColor, selectedPage }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 17.556 22">
      <g id="Icon_feather-bookmark" data-name="Icon feather-bookmark" transform="translate(1 1)">
        <path
          id="Icon_feather-bookmark-2"
          data-name="Icon feather-bookmark"
          d="M23.056,24.5l-7.778-5.556L7.5,24.5V6.722A2.222,2.222,0,0,1,9.722,4.5H20.833a2.222,2.222,0,0,1,2.222,2.222Z"
          transform="translate(-7.5 -4.5)"
          fill={selectedPage ? fillColor : 'none'}
          stroke={strokeColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </g>
    </svg>
  );
}
