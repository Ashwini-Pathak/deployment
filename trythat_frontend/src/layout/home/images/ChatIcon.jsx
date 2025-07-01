export default function ChatIcon({ strokeColor, selectedPage, width = '25', height = '25' }) {
  return (
    <>
      {selectedPage ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20">
          <path
            id="Icon_material-chat_bubble_outline"
            data-name="Icon material-chat_bubble_outline"
            d="M21,3H5A2.006,2.006,0,0,0,3,5V23l4-4H21a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,21,3ZM7,17,5,5Z"
            transform="translate(-3 -3)"
            fill={strokeColor}
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20">
          <path
            id="Icon_material-chat_bubble_outline"
            data-name="Icon material-chat_bubble_outline"
            d="M21,3H5A2.006,2.006,0,0,0,3,5V23l4-4H21a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,21,3Zm0,14H7L5,19V5H21Z"
            transform="translate(-3 -3)"
            fill={'#fff'}
          />
        </svg>
      )}
    </>
  );
}
