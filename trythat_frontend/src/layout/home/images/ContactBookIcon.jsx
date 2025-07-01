export default function ContactBookIcon({ strokeColor, selectedPage }) {
  return (
    <>
      {selectedPage ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18.683 22.853">
          <g id="Icon_feather-book" data-name="Icon feather-book" transform="translate(-5, -2)">
            <path
              id="Path_83"
              data-name="Path 83"
              d="M8.607,3H22.683V23.853H8.607A2.607,2.607,0,0,1,6,21.247V5.607A2.607,2.607,0,0,1,8.607,3Z"
              fill="#ffa300"
            />
            <path
              id="Path_82"
              data-name="Path 82"
              d="M6,28.107A2.684,2.684,0,0,1,8.754,25.5H23.628"
              transform="translate(-0.945 -6.86)"
              fill="none"
              stroke="#0080fc"
              stroke-linecap="round"
              stroke-linejoin="bevel"
              stroke-width="2"
            />
          </g>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18.683 22.853">
          <g id="Icon_feather-book" data-name="Icon feather-book" transform="translate(-5 -2)">
            <path
              id="Path_82"
              data-name="Path 82"
              d="M6,28.107A2.607,2.607,0,0,1,8.607,25.5H22.683"
              transform="translate(-0.945 -6.86)"
              fill={strokeColor}
              stroke={strokeColor}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              id="Path_83"
              data-name="Path 83"
              d="M8.607,3H22.683V23.853H8.607A2.607,2.607,0,0,1,6,21.247V5.607A2.607,2.607,0,0,1,8.607,3Z"
              fill="none"
              stroke={strokeColor}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </svg>
      )}
    </>
  );
}
